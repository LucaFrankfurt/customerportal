const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const logger = {
  info: (message, ...args) => console.log(`[INFO] ${message}`, ...args),
  error: (message, ...args) => console.error(`[ERROR] ${message}`, ...args),
  warn: (message, ...args) => console.warn(`[WARN] ${message}`, ...args),
  debug: (message, ...args) => console.debug(`[DEBUG] ${message}`, ...args)
};

// Mock Data
const mockUsers = [
  {
    id: 1,
    email: 'customer@example.com',
    password_hash: '$2b$10$rOZ7VpjChyU7ejmU8VersOH2C7I.tyTZWmsE6VTRVeIJEvNLwGqPK', // password123
    role: 'customer',
    first_name: 'Sarah',
    last_name: 'Johnson',
    phone: '+1-555-1234',
    address: '123 Main St, New York, NY 10001',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

const mockPortfolios = [
  {
    user_id: 1,
    id: 1,
    portfolio_name: 'Primary Portfolio',
    total_value: 2847320.75,
    currency: 'USD',
    cash_balance: 156789.25,
    ytd_performance: 0.124,
    monthly_return: 0.021,
    risk_score: 7.2,
    last_updated: '2025-10-01T14:30:00Z'
  }
];

const mockHoldings = [
  {
    portfolio_id: 1,
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    quantity: 850,
    current_price: 421.35,
    market_value: 358147.50,
    cost_basis: 335000.00,
    unrealized_gain: 23147.50,
    sector: 'Index Fund',
    allocation_percentage: 12.58
  },
  {
    portfolio_id: 1,
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 400,
    current_price: 422.89,
    market_value: 169156.00,
    cost_basis: 158000.00,
    unrealized_gain: 11156.00,
    sector: 'Technology',
    allocation_percentage: 5.94
  },
  {
    portfolio_id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc',
    quantity: 300,
    current_price: 189.46,
    market_value: 56838.00,
    cost_basis: 54000.00,
    unrealized_gain: 2838.00,
    sector: 'Technology',
    allocation_percentage: 2.00
  }
];

const mockTransactions = [
  {
    portfolio_id: 1,
    id: 1,
    symbol: 'VOO',
    transaction_type: 'BUY',
    quantity: 150,
    price_per_share: 421.35,
    total_amount: 63202.50,
    transaction_date: '2025-09-28T10:30:00Z',
    fees: 4.95
  },
  {
    portfolio_id: 1,
    id: 2,
    symbol: 'MSFT',
    transaction_type: 'DIVIDEND',
    quantity: 400,
    price_per_share: 1.36,
    total_amount: 544.00,
    transaction_date: '2025-09-25T00:00:00Z',
    fees: 0.00
  },
  {
    portfolio_id: 1,
    id: 3,
    symbol: 'TSLA',
    transaction_type: 'SELL',
    quantity: 50,
    price_per_share: 251.05,
    total_amount: 12552.50,
    transaction_date: '2025-09-23T14:15:00Z',
    fees: 4.95
  }
];

const mockNotifications = [
  {
    user_id: 1,
    id: 1,
    title: 'Monthly Portfolio Update',
    message: 'Your portfolio gained 2.1% this month, outperforming the S&P 500.',
    type: 'portfolio_update',
    is_read: false,
    created_at: '2025-10-01T09:00:00Z'
  },
  {
    user_id: 1,
    id: 2,
    title: 'Dividend Payment Received',
    message: 'Microsoft (MSFT) dividend of $544.00 has been credited to your account.',
    type: 'dividend',
    is_read: false,
    created_at: '2025-09-25T08:30:00Z'
  },
  {
    user_id: 1,
    id: 3,
    title: 'Trade Confirmation',
    message: 'Your sale of 50 TSLA shares has been executed at $251.05 per share.',
    type: 'trade_confirmation',
    is_read: true,
    created_at: '2025-09-23T14:20:00Z'
  }
];

// Create Express app
const app = express();

// Configure server - Mock server always runs on port 3002
const PORT = 3002;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Mock authentication middleware
const mockAuth = (req, res, next) => {
  // For mock server, just simulate authenticated user
  req.user = { userId: 1, email: 'customer@example.com', role: 'customer' };
  next();
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Mock Customer Portal API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Auth endpoints
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const jwtSecret = process.env.JWT_SECRET || 'mock-secret-key';
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });

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
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Portfolio endpoints
app.get('/api/portfolio/summary', mockAuth, async (req, res) => {
  try {
    const portfolio = mockPortfolios.find(p => p.user_id === 1);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    const dayChange = 87450;
    const dayChangePercent = 3.17;

    res.json({
      success: true,
      data: {
        totalValue: `$${portfolio.total_value.toLocaleString()}`,
        totalValueNumeric: portfolio.total_value,
        ytdPerformance: `+${(portfolio.ytd_performance * 100).toFixed(1)}%`,
        ytdPerformanceNumeric: portfolio.ytd_performance,
        monthlyReturn: `+${(portfolio.monthly_return * 100).toFixed(1)}%`,
        monthlyReturnNumeric: portfolio.monthly_return,
        riskScore: `${portfolio.risk_score}/10`,
        riskScoreNumeric: portfolio.risk_score,
        dayChange: `+$${dayChange.toLocaleString()} (${dayChangePercent}%)`,
        dayChangeNumeric: dayChange,
        dayChangePercent: dayChangePercent,
        cashBalance: `$${portfolio.cash_balance.toLocaleString()}`,
        cashBalanceNumeric: portfolio.cash_balance,
        lastUpdated: portfolio.last_updated
      }
    });
  } catch (error) {
    logger.error('Portfolio summary error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.get('/api/portfolio/holdings', mockAuth, async (req, res) => {
  try {
    const holdings = mockHoldings.filter(h => h.portfolio_id === 1);

    const formattedHoldings = holdings.map(holding => ({
      symbol: holding.symbol,
      name: holding.name,
      quantity: holding.quantity,
      currentPrice: `$${holding.current_price.toFixed(2)}`,
      currentPriceNumeric: holding.current_price,
      marketValue: `$${holding.market_value.toLocaleString()}`,
      marketValueNumeric: holding.market_value,
      costBasis: `$${holding.cost_basis.toLocaleString()}`,
      costBasisNumeric: holding.cost_basis,
      unrealizedGain: `$${holding.unrealized_gain.toLocaleString()}`,
      unrealizedGainNumeric: holding.unrealized_gain,
      unrealizedGainPercent: `${((holding.unrealized_gain / holding.cost_basis) * 100).toFixed(2)}%`,
      sector: holding.sector,
      allocationPercentage: `${holding.allocation_percentage}%`,
      allocationPercentageNumeric: holding.allocation_percentage
    }));

    res.json({
      success: true,
      data: formattedHoldings
    });
  } catch (error) {
    logger.error('Portfolio holdings error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.get('/api/portfolio/transactions', mockAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    
    const transactions = mockTransactions.filter(t => t.portfolio_id === 1);
    const paginatedTransactions = transactions
      .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
      .slice(offset, offset + limit);

    const formattedTransactions = paginatedTransactions.map(transaction => ({
      id: transaction.id,
      symbol: transaction.symbol,
      type: transaction.transaction_type,
      quantity: transaction.quantity,
      pricePerShare: `$${transaction.price_per_share.toFixed(2)}`,
      pricePerShareNumeric: transaction.price_per_share,
      totalAmount: `$${transaction.total_amount.toLocaleString()}`,
      totalAmountNumeric: transaction.total_amount,
      fees: `$${transaction.fees.toFixed(2)}`,
      feesNumeric: transaction.fees,
      date: transaction.transaction_date,
      formattedDate: new Date(transaction.transaction_date).toLocaleDateString()
    }));

    res.json({
      success: true,
      data: {
        transactions: formattedTransactions,
        pagination: {
          total: transactions.length,
          limit: limit,
          offset: offset,
          hasMore: offset + limit < transactions.length
        }
      }
    });
  } catch (error) {
    logger.error('Portfolio transactions error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// User endpoints
app.get('/api/users/profile', mockAuth, async (req, res) => {
  try {
    const user = mockUsers.find(u => u.id === 1);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        address: user.address,
        isActive: user.is_active,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    });
  } catch (error) {
    logger.error('User profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.get('/api/users/notifications', mockAuth, async (req, res) => {
  try {
    const unreadOnly = req.query.unread === 'true';
    let notifications = mockNotifications.filter(n => n.user_id === 1);
    
    if (unreadOnly) {
      notifications = notifications.filter(n => !n.is_read);
    }

    notifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    logger.error('User notifications error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Dashboard endpoints
app.get('/api/dashboard/metrics', mockAuth, async (req, res) => {
  try {
    const portfolio = mockPortfolios.find(p => p.user_id === 1);
    const holdings = mockHoldings.filter(h => h.portfolio_id === 1);
    const recentTransactions = mockTransactions
      .filter(t => t.portfolio_id === 1)
      .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
      .slice(0, 5);

    res.json({
      success: true,
      data: {
        overview: {
          totalValue: portfolio.total_value,
          ytdPerformance: portfolio.ytd_performance,
          monthlyReturn: portfolio.monthly_return,
          riskScore: portfolio.risk_score,
          cashBalance: portfolio.cash_balance
        },
        topHoldings: holdings.slice(0, 3),
        recentTransactions: recentTransactions,
        performanceMetrics: {
          sharpeRatio: 1.25,
          volatility: 0.142,
          maxDrawdown: -0.089,
          beta: 0.98
        }
      }
    });
  } catch (error) {
    logger.error('Dashboard metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.get('/api/market/data', mockAuth, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        indices: [
          { name: 'S&P 500', value: 4371.71, change: 1.24, changePercent: 0.028 },
          { name: 'Dow Jones', value: 33875.40, change: -45.22, changePercent: -0.0013 },
          { name: 'NASDAQ', value: 13505.85, change: 31.52, changePercent: 0.0023 }
        ],
        marketStatus: 'CLOSED',
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Market data error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Request logging middleware
app.use('*', (req, res) => {
  logger.info(`${req.method} ${req.originalUrl} - 404 Not Found`);
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error'
      : err.message
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Mock Customer Portal API Server is running on port ${PORT}`);
  logger.info(`📱 Health check: http://localhost:${PORT}/health`);
  logger.info(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
  logger.info(`📊 Portfolio endpoints: http://localhost:${PORT}/api/portfolio`);
  logger.info(`👤 User endpoints: http://localhost:${PORT}/api/users`);
  logger.info(`📈 Dashboard endpoints: http://localhost:${PORT}/api/dashboard`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});