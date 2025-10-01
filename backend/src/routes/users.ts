import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { query } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

interface UserProfile {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  // Customer-specific fields
  riskTolerance?: string;
  investmentGoals?: string;
  communicationPreference?: string;
  // Employee-specific fields
  department?: string;
  title?: string;
}

// GET /api/users/profile - Get user profile
router.get('/profile', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    // Get basic user information
    const userResult = await query(`
      SELECT 
        id, email, role, first_name, last_name, 
        phone, address, created_at, updated_at
      FROM users 
      WHERE id = $1
    `, [userId]);

    if (userResult.rows.length === 0) {
      throw new AppError('User not found', 404);
    }

    const user = userResult.rows[0];
    const profileData: any = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      address: user.address,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };

    // Get role-specific profile data
    if (user.role === 'customer') {
      const customerResult = await query(`
        SELECT 
          risk_tolerance, 
          investment_goals, 
          communication_preference
        FROM customer_profiles 
        WHERE user_id = $1
      `, [userId]);

      if (customerResult.rows.length > 0) {
        const customerProfile = customerResult.rows[0];
        profileData.riskTolerance = customerProfile.risk_tolerance;
        profileData.investmentGoals = customerProfile.investment_goals;
        profileData.communicationPreference = customerProfile.communication_preference;
      }
    } else if (user.role === 'employee' || user.role === 'admin') {
      const employeeResult = await query(`
        SELECT 
          department, 
          title
        FROM employee_profiles 
        WHERE user_id = $1
      `, [userId]);

      if (employeeResult.rows.length > 0) {
        const employeeProfile = employeeResult.rows[0];
        profileData.department = employeeProfile.department;
        profileData.title = employeeProfile.title;
      }
    }

    logger.info(`Retrieved profile for user ${userId}`);

    res.json({
      success: true,
      data: profileData
    });
  } catch (error) {
    logger.error(`Failed to fetch profile for user ${req.user?.userId}:`, error);
    next(error);
  }
});

// PUT /api/users/profile - Update user profile
router.put('/profile', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const { 
      firstName, 
      lastName, 
      phone, 
      address,
      // Customer-specific fields
      riskTolerance,
      investmentGoals,
      communicationPreference,
      // Employee-specific fields
      department,
      title
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName) {
      throw new AppError('First name and last name are required', 400);
    }

    // Update basic user information
    const userUpdateResult = await query(`
      UPDATE users 
      SET first_name = $1, last_name = $2, phone = $3, address = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING role
    `, [firstName, lastName, phone, address, userId]);

    if (userUpdateResult.rows.length === 0) {
      throw new AppError('User not found', 404);
    }

    const userRole = userUpdateResult.rows[0].role;

    // Update role-specific profile
    if (userRole === 'customer') {
      // Validate customer-specific fields
      const validRiskLevels = ['Conservative', 'Moderate', 'Aggressive'];
      const validCommPrefs = ['Email', 'Phone', 'SMS', 'Portal'];

      if (riskTolerance && !validRiskLevels.includes(riskTolerance)) {
        throw new AppError('Invalid risk tolerance level', 400);
      }

      if (communicationPreference && !validCommPrefs.includes(communicationPreference)) {
        throw new AppError('Invalid communication preference', 400);
      }

      // Update or create customer profile
      await query(`
        INSERT INTO customer_profiles (user_id, risk_tolerance, investment_goals, communication_preference)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET 
          risk_tolerance = EXCLUDED.risk_tolerance,
          investment_goals = EXCLUDED.investment_goals,
          communication_preference = EXCLUDED.communication_preference,
          updated_at = NOW()
      `, [userId, riskTolerance, investmentGoals, communicationPreference]);

    } else if (userRole === 'employee' || userRole === 'admin') {
      // Update or create employee profile
      await query(`
        INSERT INTO employee_profiles (user_id, department, title)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id)
        DO UPDATE SET 
          department = EXCLUDED.department,
          title = EXCLUDED.title,
          updated_at = NOW()
      `, [userId, department, title]);
    }

    logger.info(`Profile updated for user ${userId}`);

    res.json({
      success: true,
      data: {
        message: 'Profile updated successfully'
      }
    });
  } catch (error) {
    logger.error(`Failed to update profile for user ${req.user?.userId}:`, error);
    next(error);
  }
});

// GET /api/users/notifications - Get user notifications
router.get('/notifications', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const { limit = '10', unreadOnly = 'false' } = req.query;

    let whereClause = 'WHERE user_id = $1';
    const params = [userId];

    if (unreadOnly === 'true') {
      whereClause += ' AND is_read = false';
    }

    const notificationsResult = await query(`
      SELECT 
        id, type, title, message, is_read, created_at
      FROM notifications 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $2
    `, [...params, parseInt(limit as string)]);

    logger.info(`Retrieved ${notificationsResult.rows.length} notifications for user ${userId}`);

    res.json({
      success: true,
      data: {
        notifications: notificationsResult.rows
      }
    });
  } catch (error) {
    logger.error(`Failed to fetch notifications for user ${req.user?.userId}:`, error);
    next(error);
  }
});

// PUT /api/users/notifications/:id/read - Mark notification as read
router.put('/notifications/:id/read', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const notificationId = parseInt(req.params.id);

    if (isNaN(notificationId)) {
      throw new AppError('Invalid notification ID', 400);
    }

    const result = await query(`
      UPDATE notifications 
      SET is_read = true, updated_at = NOW()
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `, [notificationId, userId]);

    if (result.rows.length === 0) {
      throw new AppError('Notification not found or unauthorized', 404);
    }

    logger.info(`Notification ${notificationId} marked as read by user ${userId}`);

    res.json({
      success: true,
      data: {
        message: 'Notification marked as read'
      }
    });
  } catch (error) {
    logger.error(`Failed to mark notification as read:`, error);
    next(error);
  }
});

export default router;