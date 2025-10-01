// Mock Portfolio Routes
import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { MockPortfolioService } from '../mockServices';
import { logger } from '../utils/logger';

const router = express.Router();

// Mock authentication middleware that uses decoded JWT
const mockAuthenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }

  try {
    // For mock purposes, we'll just assume valid token with user ID 1
    // In a real implementation, we'd decode and verify the JWT
    req.user = {
      userId: 1,
      email: 'customer@example.com',
      role: 'customer'
    };
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};

// GET /api/portfolio/summary - Get portfolio summary statistics
router.get('/summary', mockAuthenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId || typeof userId !== 'number') {
      return res.status(401).json({ success: false, error: 'User ID not found' });
    }
    const summary = await MockPortfolioService.getPortfolioSummary(userId);
    
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    logger.error('Portfolio summary error:', error);
    if (error instanceof Error && error.message === 'Portfolio not found') {
      res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
});

// GET /api/portfolio/holdings - Get all holdings
router.get('/holdings', mockAuthenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId || typeof userId !== 'number') {
      return res.status(401).json({ success: false, error: 'User ID not found' });
    }
    const holdings = await MockPortfolioService.getHoldings(userId);
    
    res.json({
      success: true,
      data: holdings
    });
  } catch (error) {
    logger.error('Portfolio holdings error:', error);
    if (error instanceof Error && error.message === 'Portfolio not found') {
      res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
});

// GET /api/portfolio/transactions - Get transaction history
router.get('/transactions', mockAuthenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId || typeof userId !== 'number') {
      return res.status(401).json({ success: false, error: 'User ID not found' });
    }
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
    
    const result = await MockPortfolioService.getTransactions(userId, limit, offset);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Portfolio transactions error:', error);
    if (error instanceof Error && error.message === 'Portfolio not found') {
      res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
});

// GET /api/portfolio/performance - Get performance history
router.get('/performance', mockAuthenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId || typeof userId !== 'number') {
      return res.status(401).json({ success: false, error: 'User ID not found' });
    }
    const period = (req.query.period as string) || '1Y';
    
    const performance = await MockPortfolioService.getPerformanceHistory(userId, period);
    
    res.json({
      success: true,
      data: performance
    });
  } catch (error) {
    logger.error('Portfolio performance error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;