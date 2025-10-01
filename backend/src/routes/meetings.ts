import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { query } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

interface MeetingRequest {
  id?: number;
  userId: number;
  type: 'portfolio-review' | 'investment-planning' | 'general-consultation' | 'other';
  preferredDate: string;
  preferredTime: string;
  duration: number;
  format: 'in-person' | 'video-call' | 'phone-call';
  topic?: string;
  notes?: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

// POST /api/meetings/request - Create new meeting request
router.post('/request', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const { 
      type, 
      preferredDate, 
      preferredTime, 
      duration, 
      format, 
      topic, 
      notes, 
      urgency 
    } = req.body;

    // Validate required fields
    if (!type || !preferredDate || !preferredTime || !duration || !format || !urgency) {
      throw new AppError('Missing required fields', 400);
    }

    // Validate enum values
    const validTypes = ['portfolio-review', 'investment-planning', 'general-consultation', 'other'];
    const validFormats = ['in-person', 'video-call', 'phone-call'];
    const validUrgencies = ['low', 'medium', 'high'];

    if (!validTypes.includes(type)) {
      throw new AppError('Invalid meeting type', 400);
    }

    if (!validFormats.includes(format)) {
      throw new AppError('Invalid meeting format', 400);
    }

    if (!validUrgencies.includes(urgency)) {
      throw new AppError('Invalid urgency level', 400);
    }

    // Validate date is in the future
    const requestedDate = new Date(preferredDate);
    if (requestedDate <= new Date()) {
      throw new AppError('Meeting date must be in the future', 400);
    }

    // Insert meeting request
    const result = await query(`
      INSERT INTO meeting_requests (
        user_id, type, preferred_date, preferred_time, duration, 
        format, topic, notes, urgency, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', NOW(), NOW())
      RETURNING *
    `, [userId, type, preferredDate, preferredTime, parseInt(duration), format, topic, notes, urgency]);

    const meetingRequest = result.rows[0];

    logger.info(`Meeting request created by user ${userId}: ${meetingRequest.id}`);

    res.status(201).json({
      success: true,
      data: {
        meetingRequest,
        message: 'Meeting request submitted successfully'
      }
    });
  } catch (error) {
    logger.error('Failed to create meeting request:', error);
    next(error);
  }
});

// GET /api/meetings - Get user's meeting requests
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const { status, limit = '10', offset = '0' } = req.query;

    let whereClause = 'WHERE user_id = $1';
    const params = [userId];
    let paramCount = 1;

    if (status && typeof status === 'string') {
      paramCount++;
      whereClause += ` AND status = $${paramCount}`;
      params.push(status);
    }

    const result = await query(`
      SELECT 
        id, type, preferred_date, preferred_time, duration, format,
        topic, notes, urgency, status, created_at, updated_at
      FROM meeting_requests 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `, [...params, parseInt(limit as string), parseInt(offset as string)]);

    logger.info(`Retrieved ${result.rows.length} meeting requests for user ${userId}`);

    res.json({
      success: true,
      data: {
        meetingRequests: result.rows,
        total: result.rows.length
      }
    });
  } catch (error) {
    logger.error(`Failed to fetch meeting requests for user ${req.user?.userId}:`, error);
    next(error);
  }
});

// GET /api/meetings/:id - Get specific meeting request
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const meetingId = parseInt(req.params.id);

    if (isNaN(meetingId)) {
      throw new AppError('Invalid meeting ID', 400);
    }

    const result = await query(`
      SELECT * FROM meeting_requests 
      WHERE id = $1 AND user_id = $2
    `, [meetingId, userId]);

    if (result.rows.length === 0) {
      throw new AppError('Meeting request not found', 404);
    }

    logger.info(`Retrieved meeting request ${meetingId} for user ${userId}`);

    res.json({
      success: true,
      data: {
        meetingRequest: result.rows[0]
      }
    });
  } catch (error) {
    logger.error(`Failed to fetch meeting request ${req.params.id}:`, error);
    next(error);
  }
});

// PUT /api/meetings/:id - Update meeting request (user can cancel)
router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const meetingId = parseInt(req.params.id);
    const { status, notes } = req.body;

    if (isNaN(meetingId)) {
      throw new AppError('Invalid meeting ID', 400);
    }

    // Users can only cancel their own pending meetings
    if (status && status !== 'cancelled') {
      throw new AppError('Users can only cancel meeting requests', 400);
    }

    const result = await query(`
      UPDATE meeting_requests 
      SET status = COALESCE($1, status), 
          notes = COALESCE($2, notes),
          updated_at = NOW()
      WHERE id = $3 AND user_id = $4 AND status = 'pending'
      RETURNING *
    `, [status, notes, meetingId, userId]);

    if (result.rows.length === 0) {
      throw new AppError('Meeting request not found or cannot be modified', 404);
    }

    logger.info(`Meeting request ${meetingId} updated by user ${userId}`);

    res.json({
      success: true,
      data: {
        meetingRequest: result.rows[0],
        message: 'Meeting request updated successfully'
      }
    });
  } catch (error) {
    logger.error(`Failed to update meeting request ${req.params.id}:`, error);
    next(error);
  }
});

// GET /api/meetings/admin/all - Get all meeting requests (employees/admin only)
router.get('/admin/all', authenticateToken, authorizeRoles('employee', 'admin'), async (req, res, next) => {
  try {
    const { status, urgency, limit = '20', offset = '0' } = req.query;

    let whereClause = 'WHERE 1=1';
    const params: any[] = [];
    let paramCount = 0;

    if (status && typeof status === 'string') {
      paramCount++;
      whereClause += ` AND mr.status = $${paramCount}`;
      params.push(status);
    }

    if (urgency && typeof urgency === 'string') {
      paramCount++;
      whereClause += ` AND mr.urgency = $${paramCount}`;
      params.push(urgency);
    }

    const result = await query(`
      SELECT 
        mr.*,
        u.first_name || ' ' || u.last_name as user_name,
        u.email as user_email
      FROM meeting_requests mr
      JOIN users u ON mr.user_id = u.id
      ${whereClause}
      ORDER BY 
        CASE mr.urgency 
          WHEN 'high' THEN 1 
          WHEN 'medium' THEN 2 
          WHEN 'low' THEN 3 
        END,
        mr.created_at DESC
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `, [...params, parseInt(limit as string), parseInt(offset as string)]);

    logger.info(`Employee ${req.user?.userId} retrieved ${result.rows.length} meeting requests`);

    res.json({
      success: true,
      data: {
        meetingRequests: result.rows,
        total: result.rows.length
      }
    });
  } catch (error) {
    logger.error('Failed to fetch all meeting requests:', error);
    next(error);
  }
});

export default router;