// Mock Authentication Routes
import express from 'express';
import { MockAuthService } from '../mockServices';
import { logger } from '../utils/logger';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    try {
      const result = await MockAuthService.login(email, password);
      
      logger.info(`User ${email} logged in successfully`);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role = 'customer' } = req.body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    try {
      const result = await MockAuthService.register({
        email,
        password,
        firstName,
        lastName,
        role
      });

      logger.info(`New user ${email} registered successfully`);

      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'User with this email already exists') {
        res.status(409).json({
          success: false,
          error: 'User with this email already exists'
        });
      } else {
        throw error;
      }
    }
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;