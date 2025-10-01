import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { query } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

interface Client {
  id: number;
  name: string;
  contact_person: string;
  email: string;
  phone?: string;
  aum: string;
  status: 'Active' | 'Inactive' | 'Review Pending' | 'Onboarding';
  priority: 'High' | 'Medium' | 'Low';
  performance: string;
  last_contact: Date;
  created_at: Date;
  updated_at: Date;
}

// GET /api/clients - Get all clients with search and pagination (employees only)
router.get('/', authenticateToken, authorizeRoles('employee', 'admin'), async (req, res, next) => {
  try {
    const { search, page = '1', limit = '10', status, priority } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    let whereClause = 'WHERE 1=1';
    const params: any[] = [];
    let paramCount = 0;

    // Add search filter
    if (search) {
      paramCount++;
      whereClause += ` AND (name ILIKE $${paramCount} OR contact_person ILIKE $${paramCount} OR email ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    // Add status filter
    if (status) {
      paramCount++;
      whereClause += ` AND status = $${paramCount}`;
      params.push(status);
    }

    // Add priority filter
    if (priority) {
      paramCount++;
      whereClause += ` AND priority = $${paramCount}`;
      params.push(priority);
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) FROM clients ${whereClause}`, params);
    const total = parseInt(countResult.rows[0].count);

    // Get clients with pagination
    const clientsResult = await query(
      `SELECT * FROM clients ${whereClause} ORDER BY last_contact DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`,
      [...params, parseInt(limit as string), offset]
    );

    logger.info(`Retrieved ${clientsResult.rows.length} clients for employee ${req.user?.userId}`);

    res.json({
      success: true,
      data: {
        clients: clientsResult.rows,
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    logger.error('Failed to fetch clients:', error);
    next(error);
  }
});

// GET /api/clients/stats - Get client statistics (employees only)
router.get('/stats', authenticateToken, authorizeRoles('employee', 'admin'), async (req, res, next) => {
  try {
    // Get total clients
    const totalClientsResult = await query('SELECT COUNT(*) FROM clients');
    const totalClients = parseInt(totalClientsResult.rows[0].count);

    // Get total AUM (sum of all client AUM values)
    const totalAumResult = await query(`
      SELECT SUM(CAST(REPLACE(REPLACE(aum, '$', ''), 'M', '') AS DECIMAL) * 1000000) as total_aum 
      FROM clients 
      WHERE aum ~ '^\\$[0-9]+M$'
    `);
    const totalAum = totalAumResult.rows[0].total_aum || 0;

    // Get performance metrics
    const performanceResult = await query(`
      SELECT AVG(CAST(REPLACE(performance, '%', '') AS DECIMAL)) as avg_performance
      FROM clients 
      WHERE performance ~ '^[+-]?[0-9]+\.?[0-9]*%$'
    `);
    const avgPerformance = parseFloat(performanceResult.rows[0].avg_performance) || 0;

    // Get open tasks (high priority clients with recent contact)
    const openTasksResult = await query(`
      SELECT COUNT(*) FROM clients 
      WHERE priority = 'High' AND last_contact < NOW() - INTERVAL '7 days'
    `);
    const openTasks = parseInt(openTasksResult.rows[0].count);

    res.json({
      success: true,
      data: {
        totalClients,
        totalAum: `$${(totalAum / 1000000000).toFixed(1)}B`,
        avgPerformance: `${avgPerformance.toFixed(1)}%`,
        openTasks,
        monthlyGrowth: '+3' // This would be calculated from historical data
      }
    });
  } catch (error) {
    logger.error('Failed to fetch client stats:', error);
    next(error);
  }
});

// GET /api/clients/:id - Get specific client details (employees only)
router.get('/:id', authenticateToken, authorizeRoles('employee', 'admin'), async (req, res, next) => {
  try {
    const clientId = parseInt(req.params.id);
    
    if (isNaN(clientId)) {
      throw new AppError('Invalid client ID', 400);
    }

    const result = await query('SELECT * FROM clients WHERE id = $1', [clientId]);
    
    if (result.rows.length === 0) {
      throw new AppError('Client not found', 404);
    }

    logger.info(`Retrieved client ${clientId} details for employee ${req.user?.userId}`);

    res.json({
      success: true,
      data: {
        client: result.rows[0]
      }
    });
  } catch (error) {
    logger.error(`Failed to fetch client ${req.params.id}:`, error);
    next(error);
  }
});

// PUT /api/clients/:id - Update client (employees only)
router.put('/:id', authenticateToken, authorizeRoles('employee', 'admin'), async (req, res, next) => {
  try {
    const clientId = parseInt(req.params.id);
    
    if (isNaN(clientId)) {
      throw new AppError('Invalid client ID', 400);
    }

    const { name, contact_person, email, phone, aum, status, priority, performance } = req.body;

    // Validate required fields
    if (!name || !contact_person || !email) {
      throw new AppError('Name, contact person, and email are required', 400);
    }

    // Validate enum values
    const validStatuses = ['Active', 'Inactive', 'Review Pending', 'Onboarding'];
    const validPriorities = ['High', 'Medium', 'Low'];

    if (status && !validStatuses.includes(status)) {
      throw new AppError('Invalid status', 400);
    }

    if (priority && !validPriorities.includes(priority)) {
      throw new AppError('Invalid priority', 400);
    }

    const result = await query(
      `UPDATE clients 
       SET name = $1, contact_person = $2, email = $3, phone = $4, 
           aum = $5, status = $6, priority = $7, performance = $8, 
           updated_at = NOW()
       WHERE id = $9
       RETURNING *`,
      [name, contact_person, email, phone, aum, status, priority, performance, clientId]
    );

    if (result.rows.length === 0) {
      throw new AppError('Client not found', 404);
    }

    logger.info(`Client ${clientId} updated by employee ${req.user?.userId}`);

    res.json({
      success: true,
      data: {
        client: result.rows[0],
        message: 'Client updated successfully'
      }
    });
  } catch (error) {
    logger.error(`Failed to update client ${req.params.id}:`, error);
    next(error);
  }
});

// POST /api/clients - Create new client (employees only)
router.post('/', authenticateToken, authorizeRoles('employee', 'admin'), async (req, res, next) => {
  try {
    const { name, contact_person, email, phone, aum, status = 'Onboarding', priority = 'Medium', performance = 'N/A' } = req.body;

    // Validate required fields
    if (!name || !contact_person || !email) {
      throw new AppError('Name, contact person, and email are required', 400);
    }

    // Check if client already exists
    const existingClient = await query('SELECT id FROM clients WHERE email = $1', [email]);
    if (existingClient.rows.length > 0) {
      throw new AppError('Client with this email already exists', 409);
    }

    const result = await query(
      `INSERT INTO clients (name, contact_person, email, phone, aum, status, priority, performance, last_contact, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW(), NOW())
       RETURNING *`,
      [name, contact_person, email, phone, aum, status, priority, performance]
    );

    logger.info(`New client created by employee ${req.user?.userId}: ${result.rows[0].id}`);

    res.status(201).json({
      success: true,
      data: {
        client: result.rows[0],
        message: 'Client created successfully'
      }
    });
  } catch (error) {
    logger.error('Failed to create client:', error);
    next(error);
  }
});

export default router;