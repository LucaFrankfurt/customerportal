import express from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { query } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    // Find user in database
    const result = await query(
      'SELECT id, email, password_hash, role, first_name, last_name FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      throw new AppError('Invalid credentials', 401);
    }

    const user = result.rows[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new AppError('JWT secret not configured', 500);
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    } as SignOptions);

    // Log successful login
    logger.info(`User ${user.email} logged in successfully`);

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role = 'customer' } = req.body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      throw new AppError('All fields are required', 400);
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new AppError('User with this email already exists', 409);
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const result = await query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
       RETURNING id, email, role, first_name, last_name`,
      [email, passwordHash, firstName, lastName, role]
    );

    const newUser = result.rows[0];

    // Generate JWT token
    const jwtSecret2 = process.env.JWT_SECRET;
    if (!jwtSecret2) {
      throw new AppError('JWT secret not configured', 500);
    }

    const payload2 = {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role
    };
    const token = jwt.sign(payload2, jwtSecret2, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    } as SignOptions);

    logger.info(`New user ${newUser.email} registered successfully`);

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          firstName: newUser.first_name,
          lastName: newUser.last_name
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;