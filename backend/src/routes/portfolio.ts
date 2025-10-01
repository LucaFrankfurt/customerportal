import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { query } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

interface PortfolioSummary {
  totalValue: string;
  ytdPerformance: string;
  monthlyReturn: string;
  riskScore: string;
  dayChange: string;
  lastUpdated: Date;
}

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  currentPrice: string;
  marketValue: string;
  dayChange: string;
  totalReturn: string;
  allocation: string;
}

interface Transaction {
  id: number;
  date: string;
  type: 'Buy' | 'Sell' | 'Dividend' | 'Interest';
  security: string;
  symbol: string;
  quantity: number;
  price: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

// GET /api/portfolio/summary - Get portfolio summary statistics
router.get('/summary', authenticateToken, authorizeRoles('customer', 'admin'), async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    // Get portfolio summary for the user
    const portfolioResult = await query(`
      SELECT 
        total_value,
        ytd_performance,
        monthly_return,
        risk_score,
        day_change,
        updated_at
      FROM portfolios 
      WHERE user_id = $1
    `, [userId]);

    if (portfolioResult.rows.length === 0) {
      throw new AppError('Portfolio not found for user', 404);
    }

    const portfolio = portfolioResult.rows[0];

    logger.info(`Retrieved portfolio summary for user ${userId}`);

    res.json({
      success: true,
      data: {
        totalValue: portfolio.total_value,
        ytdPerformance: portfolio.ytd_performance,
        monthlyReturn: portfolio.monthly_return,
        riskScore: portfolio.risk_score,
        dayChange: portfolio.day_change,
        lastUpdated: portfolio.updated_at
      }
    });
  } catch (error) {
    logger.error(`Failed to fetch portfolio summary for user ${req.user?.userId}:`, error);
    next(error);
  }
});

// GET /api/portfolio/holdings - Get current portfolio holdings
router.get('/holdings', authenticateToken, authorizeRoles('customer', 'admin'), async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    // Get user's portfolio ID
    const portfolioResult = await query('SELECT id FROM portfolios WHERE user_id = $1', [userId]);
    
    if (portfolioResult.rows.length === 0) {
      throw new AppError('Portfolio not found for user', 404);
    }

    const portfolioId = portfolioResult.rows[0].id;

    // Get all holdings for the portfolio
    const holdingsResult = await query(`
      SELECT 
        symbol,
        security_name,
        quantity,
        current_price,
        market_value,
        day_change,
        total_return,
        allocation_percentage
      FROM holdings 
      WHERE portfolio_id = $1 
      ORDER BY market_value DESC
    `, [portfolioId]);

    const holdings = holdingsResult.rows.map((holding: any) => ({
      symbol: holding.symbol,
      name: holding.security_name,
      quantity: holding.quantity,
      currentPrice: holding.current_price,
      marketValue: holding.market_value,
      dayChange: holding.day_change,
      totalReturn: holding.total_return,
      allocation: holding.allocation_percentage
    }));

    logger.info(`Retrieved ${holdings.length} holdings for user ${userId}`);

    res.json({
      success: true,
      data: {
        holdings
      }
    });
  } catch (error) {
    logger.error(`Failed to fetch holdings for user ${req.user?.userId}:`, error);
    next(error);
  }
});

// GET /api/portfolio/transactions - Get recent transactions
router.get('/transactions', authenticateToken, authorizeRoles('customer', 'admin'), async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const { limit = '10', offset = '0' } = req.query;

    // Get user's portfolio ID
    const portfolioResult = await query('SELECT id FROM portfolios WHERE user_id = $1', [userId]);
    
    if (portfolioResult.rows.length === 0) {
      throw new AppError('Portfolio not found for user', 404);
    }

    const portfolioId = portfolioResult.rows[0].id;

    // Get recent transactions
    const transactionsResult = await query(`
      SELECT 
        id,
        transaction_date,
        transaction_type,
        security_name,
        symbol,
        quantity,
        price_per_unit,
        total_amount,
        status,
        created_at
      FROM transactions 
      WHERE portfolio_id = $1 
      ORDER BY transaction_date DESC, created_at DESC
      LIMIT $2 OFFSET $3
    `, [portfolioId, parseInt(limit as string), parseInt(offset as string)]);

    const transactions = transactionsResult.rows.map((tx: any) => ({
      id: tx.id,
      date: tx.transaction_date,
      type: tx.transaction_type,
      security: tx.security_name,
      symbol: tx.symbol,
      quantity: tx.quantity,
      price: tx.price_per_unit,
      amount: tx.total_amount,
      status: tx.status
    }));

    // Get total count for pagination
    const countResult = await query('SELECT COUNT(*) FROM transactions WHERE portfolio_id = $1', [portfolioId]);
    const totalTransactions = parseInt(countResult.rows[0].count);

    logger.info(`Retrieved ${transactions.length} transactions for user ${userId}`);

    res.json({
      success: true,
      data: {
        transactions,
        total: totalTransactions,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string)
      }
    });
  } catch (error) {
    logger.error(`Failed to fetch transactions for user ${req.user?.userId}:`, error);
    next(error);
  }
});

// GET /api/portfolio/performance - Get historical performance data
router.get('/performance', authenticateToken, authorizeRoles('customer', 'admin'), async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const { period = '1Y' } = req.query; // 1M, 3M, 6M, 1Y, 2Y, 5Y

    // Get user's portfolio ID
    const portfolioResult = await query('SELECT id FROM portfolios WHERE user_id = $1', [userId]);
    
    if (portfolioResult.rows.length === 0) {
      throw new AppError('Portfolio not found for user', 404);
    }

    const portfolioId = portfolioResult.rows[0].id;

    // Determine date range based on period
    let dateClause = '';
    switch (period) {
      case '1M':
        dateClause = "AND date >= NOW() - INTERVAL '1 month'";
        break;
      case '3M':
        dateClause = "AND date >= NOW() - INTERVAL '3 months'";
        break;
      case '6M':
        dateClause = "AND date >= NOW() - INTERVAL '6 months'";
        break;
      case '1Y':
        dateClause = "AND date >= NOW() - INTERVAL '1 year'";
        break;
      case '2Y':
        dateClause = "AND date >= NOW() - INTERVAL '2 years'";
        break;
      case '5Y':
        dateClause = "AND date >= NOW() - INTERVAL '5 years'";
        break;
    }

    // Get performance history
    const performanceResult = await query(`
      SELECT 
        date,
        portfolio_value,
        daily_return,
        cumulative_return
      FROM portfolio_performance 
      WHERE portfolio_id = $1 ${dateClause}
      ORDER BY date ASC
    `, [portfolioId]);

    logger.info(`Retrieved performance data (${period}) for user ${userId}`);

    res.json({
      success: true,
      data: {
        period,
        performance: performanceResult.rows
      }
    });
  } catch (error) {
    logger.error(`Failed to fetch performance data for user ${req.user?.userId}:`, error);
    next(error);
  }
});

export default router;