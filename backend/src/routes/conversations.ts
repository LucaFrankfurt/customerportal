import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { query } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

// GET /api/conversations - Get all conversations for user
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    let conversationsResult;

    if (userRole === 'customer') {
      // Customers see conversations where they are participants
      conversationsResult = await query(`
        SELECT 
          c.id, c.status, c.created_at, c.updated_at,
          u_emp.first_name || ' ' || u_emp.last_name as advisor_name,
          u_cust.first_name || ' ' || u_cust.last_name as customer_name,
          c.employee_id, c.customer_id
        FROM conversations c
        JOIN users u_emp ON c.employee_id = u_emp.id
        JOIN users u_cust ON c.customer_id = u_cust.id
        WHERE c.customer_id = $1
        ORDER BY c.updated_at DESC
      `, [userId]);
    } else {
      // Employees see conversations they are assigned to
      conversationsResult = await query(`
        SELECT 
          c.id, c.status, c.created_at, c.updated_at,
          u_emp.first_name || ' ' || u_emp.last_name as advisor_name,
          u_cust.first_name || ' ' || u_cust.last_name as customer_name,
          c.employee_id, c.customer_id
        FROM conversations c
        JOIN users u_emp ON c.employee_id = u_emp.id
        JOIN users u_cust ON c.customer_id = u_cust.id
        WHERE c.employee_id = $1
        ORDER BY c.updated_at DESC
      `, [userId]);
    }

    logger.info(`Retrieved ${conversationsResult.rows.length} conversations for user ${userId}`);

    res.json({
      success: true,
      data: {
        conversations: conversationsResult.rows
      }
    });
  } catch (error) {
    logger.error(`Failed to fetch conversations for user ${req.user?.userId}:`, error);
    next(error);
  }
});

// POST /api/conversations/client/:clientId - Create conversation with client (employees only)
router.post('/client/:clientId', authenticateToken, authorizeRoles('employee', 'admin'), async (req, res, next) => {
  try {
    const employeeId = req.user?.userId;
    const clientId = parseInt(req.params.clientId);

    if (isNaN(clientId)) {
      throw new AppError('Invalid client ID', 400);
    }

    // Get client's user ID
    const clientResult = await query(`
      SELECT u.id as user_id, u.first_name, u.last_name
      FROM clients c
      JOIN users u ON c.email = u.email
      WHERE c.id = $1
    `, [clientId]);

    if (clientResult.rows.length === 0) {
      throw new AppError('Client not found or not registered', 404);
    }

    const customerId = clientResult.rows[0].user_id;
    const customerName = `${clientResult.rows[0].first_name} ${clientResult.rows[0].last_name}`;

    // Check if conversation already exists
    const existingConv = await query(`
      SELECT id FROM conversations 
      WHERE employee_id = $1 AND customer_id = $2 AND status = 'active'
    `, [employeeId, customerId]);

    if (existingConv.rows.length > 0) {
      const conversationId = existingConv.rows[0].id;
      logger.info(`Using existing conversation ${conversationId} between employee ${employeeId} and customer ${customerId}`);

      return res.json({
        success: true,
        data: {
          conversationId,
          customerName,
          message: 'Using existing active conversation'
        }
      });
    }

    // Create new conversation
    const newConvResult = await query(`
      INSERT INTO conversations (employee_id, customer_id, status, created_at, updated_at)
      VALUES ($1, $2, 'active', NOW(), NOW())
      RETURNING id
    `, [employeeId, customerId]);

    const conversationId = newConvResult.rows[0].id;

    logger.info(`Created new conversation ${conversationId} between employee ${employeeId} and customer ${customerId}`);

    res.json({
      success: true,
      data: {
        conversationId,
        customerName,
        message: 'Conversation created successfully'
      }
    });
  } catch (error) {
    logger.error(`Failed to create conversation with client ${req.params.clientId}:`, error);
    next(error);
  }
});

// GET /api/conversations/:id - Get conversation details
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const conversationId = parseInt(req.params.id);
    const userId = req.user?.userId;

    if (isNaN(conversationId)) {
      throw new AppError('Invalid conversation ID', 400);
    }

    // Get conversation details with participant verification
    const convResult = await query(`
      SELECT 
        c.id, c.status, c.created_at, c.updated_at,
        u_emp.first_name || ' ' || u_emp.last_name as advisor_name,
        u_cust.first_name || ' ' || u_cust.last_name as customer_name,
        c.employee_id, c.customer_id
      FROM conversations c
      JOIN users u_emp ON c.employee_id = u_emp.id
      JOIN users u_cust ON c.customer_id = u_cust.id
      WHERE c.id = $1 AND (c.employee_id = $2 OR c.customer_id = $2)
    `, [conversationId, userId]);

    if (convResult.rows.length === 0) {
      throw new AppError('Conversation not found or unauthorized', 404);
    }

    const conversation = convResult.rows[0];

    logger.info(`Retrieved conversation ${conversationId} for user ${userId}`);

    res.json({
      success: true,
      data: {
        conversationId: conversation.id,
        customerName: conversation.customer_name,
        advisorName: conversation.advisor_name,
        status: conversation.status,
        employeeId: conversation.employee_id,
        customerId: conversation.customer_id,
        createdAt: conversation.created_at,
        updatedAt: conversation.updated_at
      }
    });
  } catch (error) {
    logger.error(`Failed to fetch conversation ${req.params.id}:`, error);
    next(error);
  }
});

// GET /api/conversations/:id/messages - Get messages in conversation
router.get('/:id/messages', authenticateToken, async (req, res, next) => {
  try {
    const conversationId = parseInt(req.params.id);
    const userId = req.user?.userId;
    const { limit = '50', offset = '0' } = req.query;

    if (isNaN(conversationId)) {
      throw new AppError('Invalid conversation ID', 400);
    }

    // Verify user has access to this conversation
    const accessCheck = await query(`
      SELECT id FROM conversations 
      WHERE id = $1 AND (employee_id = $2 OR customer_id = $2)
    `, [conversationId, userId]);

    if (accessCheck.rows.length === 0) {
      throw new AppError('Conversation not found or unauthorized', 404);
    }

    // Get messages
    const messagesResult = await query(`
      SELECT 
        m.id, m.content, m.created_at, m.is_read,
        u.first_name || ' ' || u.last_name as sender_name,
        u.role as sender_role,
        m.sender_id
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.conversation_id = $1
      ORDER BY m.created_at ASC
      LIMIT $2 OFFSET $3
    `, [conversationId, parseInt(limit as string), parseInt(offset as string)]);

    const messages = messagesResult.rows.map((msg: any) => ({
      id: msg.id,
      content: msg.content,
      timestamp: msg.created_at,
      senderName: msg.sender_name,
      senderRole: msg.sender_role,
      senderId: msg.sender_id,
      isRead: msg.is_read,
      isFromCurrentUser: msg.sender_id === userId
    }));

    logger.info(`Retrieved ${messages.length} messages for conversation ${conversationId}`);

    res.json({
      success: true,
      data: {
        messages
      }
    });
  } catch (error) {
    logger.error(`Failed to fetch messages for conversation ${req.params.id}:`, error);
    next(error);
  }
});

// POST /api/conversations/:id/messages - Send new message
router.post('/:id/messages', authenticateToken, async (req, res, next) => {
  try {
    const conversationId = parseInt(req.params.id);
    const userId = req.user?.userId;
    const { content } = req.body;

    if (isNaN(conversationId)) {
      throw new AppError('Invalid conversation ID', 400);
    }

    if (!content || content.trim().length === 0) {
      throw new AppError('Message content is required', 400);
    }

    // Verify user has access to this conversation
    const accessCheck = await query(`
      SELECT id FROM conversations 
      WHERE id = $1 AND (employee_id = $2 OR customer_id = $2)
    `, [conversationId, userId]);

    if (accessCheck.rows.length === 0) {
      throw new AppError('Conversation not found or unauthorized', 404);
    }

    // Insert new message
    const messageResult = await query(`
      INSERT INTO messages (conversation_id, sender_id, content, created_at, is_read)
      VALUES ($1, $2, $3, NOW(), false)
      RETURNING id, created_at
    `, [conversationId, userId, content.trim()]);

    // Update conversation timestamp
    await query(`
      UPDATE conversations 
      SET updated_at = NOW() 
      WHERE id = $1
    `, [conversationId]);

    const messageId = messageResult.rows[0].id;
    const timestamp = messageResult.rows[0].created_at;

    logger.info(`Message ${messageId} sent to conversation ${conversationId} by user ${userId}`);

    res.status(201).json({
      success: true,
      data: {
        messageId,
        timestamp,
        message: 'Message sent successfully'
      }
    });
  } catch (error) {
    logger.error(`Failed to send message to conversation ${req.params.id}:`, error);
    next(error);
  }
});

// PUT /api/conversations/:id/messages/read - Mark messages as read
router.put('/:id/messages/read', authenticateToken, async (req, res, next) => {
  try {
    const conversationId = parseInt(req.params.id);
    const userId = req.user?.userId;

    if (isNaN(conversationId)) {
      throw new AppError('Invalid conversation ID', 400);
    }

    // Verify user has access to this conversation
    const accessCheck = await query(`
      SELECT id FROM conversations 
      WHERE id = $1 AND (employee_id = $2 OR customer_id = $2)
    `, [conversationId, userId]);

    if (accessCheck.rows.length === 0) {
      throw new AppError('Conversation not found or unauthorized', 404);
    }

    // Mark all messages from other participants as read
    const result = await query(`
      UPDATE messages 
      SET is_read = true 
      WHERE conversation_id = $1 AND sender_id != $2 AND is_read = false
      RETURNING id
    `, [conversationId, userId]);

    const markedCount = result.rows.length;

    logger.info(`Marked ${markedCount} messages as read in conversation ${conversationId} for user ${userId}`);

    res.json({
      success: true,
      data: {
        markedCount,
        message: 'Messages marked as read'
      }
    });
  } catch (error) {
    logger.error(`Failed to mark messages as read in conversation ${req.params.id}:`, error);
    next(error);
  }
});

export default router;