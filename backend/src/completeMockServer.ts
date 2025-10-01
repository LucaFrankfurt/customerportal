// Complete Self-Contained Mock Backend Server
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create mock logger
const logger = {
  info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
  debug: (message: string, ...args: any[]) => console.debug(`[DEBUG] ${message}`, ...args)
};

// Mock Data
const mockUsers = [
  {
    id: 1,
    email: 'customer@example.com',
    password_hash: '$2b$10$rOZ7VpjChyU7ejmU8VersOH2C7I.tyTZWmsE6VTRVeIJEvNLwGqPK',
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
    id: 1,
    user_id: 1,
    total_value: '$2,847,320',
    ytd_performance: '+12.4%',
    monthly_return: '+2.1%',
    risk_score: '7.2/10',
    day_change: '+$87,450 (3.17%)',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
  }
];

const mockHoldings = [
  {
    id: 1,
    portfolio_id: 1,
    symbol: 'VOO',
    security_name: 'Vanguard S&P 500 ETF',
    quantity: 850,
    current_price: '$421.35',
    market_value: '$358,147.50',
    day_change: '+1.2%',
    total_return: '+15.3%',
    allocation_percentage: '25.8%'
  },
  {
    id: 2,
    portfolio_id: 1,
    symbol: 'MSFT',
    security_name: 'Microsoft Corporation',
    quantity: 400,
    current_price: '$422.89',
    market_value: '$169,156.00',
    day_change: '+0.8%',
    total_return: '+22.1%',
    allocation_percentage: '12.2%'
  },
  {
    id: 3,
    portfolio_id: 1,
    symbol: 'AAPL',
    security_name: 'Apple Inc',
    quantity: 300,
    current_price: '$189.46',
    market_value: '$56,838.00',
    day_change: '-0.5%',
    total_return: '+8.7%',
    allocation_percentage: '4.1%'
  }
];

const mockTransactions = [
  {
    id: 1,
    portfolio_id: 1,
    transaction_date: '2025-09-28',
    transaction_type: 'Buy',
    security_name: 'VANGUARD S&P 500 ETF',
    symbol: 'VOO',
    quantity: 150,
    price_per_unit: '$421.35',
    total_amount: '$63,202.50',
    status: 'Completed',
    created_at: '2025-09-28T10:30:00Z'
  },
  {
    id: 2,
    portfolio_id: 1,
    transaction_date: '2025-09-25',
    transaction_type: 'Dividend',
    security_name: 'MICROSOFT CORP',
    symbol: 'MSFT',
    quantity: 200,
    price_per_unit: '$2.72',
    total_amount: '$544.00',
    status: 'Completed',
    created_at: '2025-09-25T09:15:00Z'
  },
  {
    id: 3,
    portfolio_id: 1,
    transaction_date: '2025-09-23',
    transaction_type: 'Sell',
    security_name: 'TESLA INC',
    symbol: 'TSLA',
    quantity: 50,
    price_per_unit: '$251.05',
    total_amount: '$12,552.50',
    status: 'Completed',
    created_at: '2025-09-23T14:45:00Z'
  }
];

const mockNotifications = [
  {
    id: 1,
    user_id: 1,
    type: 'alert',
    title: 'Quarterly Review Scheduled',
    message: 'Your Q3 portfolio review is scheduled for October 5th at 2:00 PM with your advisor Alex Thompson.',
    is_read: true,
    created_at: '2025-09-25T10:00:00Z',
    updated_at: '2025-09-25T10:00:00Z'
  },
  {
    id: 2,
    user_id: 1,
    type: 'market',
    title: 'Market Update',
    message: 'Tech sector showing strong performance this week. Your MSFT holdings up 4.2%.',
    is_read: true,
    created_at: '2025-09-26T14:30:00Z',
    updated_at: '2025-09-26T14:30:00Z'
  },
  {
    id: 3,
    user_id: 1,
    type: 'document',
    title: 'New Document Available',
    message: 'Your September monthly statement is now available for download.',
    is_read: false,
    created_at: '2025-09-28T09:00:00Z',
    updated_at: '2025-09-28T09:00:00Z'
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
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Simple mock auth middleware
const mockAuth = (req: any, res: any, next: any) => {
  req.user = { userId: 1, email: 'customer@example.com', role: 'customer' };
  next();
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Mock Customer Portal API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
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
    logger.error('Portfolio summary error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.get('/api/portfolio/holdings', mockAuth, async (req, res) => {
  try {
    const holdings = mockHoldings.map(holding => ({
      symbol: holding.symbol,
      name: holding.security_name,
      quantity: holding.quantity,
      currentPrice: holding.current_price,
      marketValue: holding.market_value,
      dayChange: holding.day_change,
      totalReturn: holding.total_return,
      allocation: holding.allocation_percentage
    }));
    
    res.json({
      success: true,
      data: holdings
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
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    
    const sortedTransactions = mockTransactions.sort((a, b) => 
      new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
    );

    const start = offset;
    const end = limit ? start + limit : sortedTransactions.length;
    const paginatedTransactions = sortedTransactions.slice(start, end);

    const transactions = paginatedTransactions.map(transaction => ({
      id: transaction.id,
      date: transaction.transaction_date,
      type: transaction.transaction_type,
      security: transaction.security_name,
      symbol: transaction.symbol,
      quantity: transaction.quantity,
      price: transaction.price_per_unit,
      amount: transaction.total_amount,
      status: transaction.status
    }));
    
    res.json({
      success: true,
      data: {
        transactions,
        total: sortedTransactions.length,
        hasMore: end < sortedTransactions.length
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
        role: user.role,
        isActive: user.is_active,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    });
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/users/notifications', mockAuth, async (req, res) => {
  try {
    const unreadOnly = req.query.unread === 'true';
    let notifications = mockNotifications.filter(n => n.user_id === 1);
    
    if (unreadOnly) {
      notifications = notifications.filter(n => !n.is_read);
    }

    const sortedNotifications = notifications.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    res.json({ success: true, data: sortedNotifications });
  } catch (error) {
    logger.error('Get notifications error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Dashboard endpoints
app.get('/api/dashboard/metrics', mockAuth, async (req, res) => {
  try {
    const portfolio = mockPortfolios.find(p => p.user_id === 1);
    const unreadNotifications = mockNotifications.filter(n => n.user_id === 1 && !n.is_read);
    
    res.json({
      success: true,
      data: {
        totalPortfolioValue: portfolio?.total_value || '$0',
        ytdPerformance: portfolio?.ytd_performance || '0%',
        totalHoldings: mockHoldings.length,
        recentTransactions: mockTransactions.slice(0, 5).length,
        unreadNotifications: unreadNotifications.length,
        riskScore: portfolio?.risk_score || 'N/A',
        dayChange: portfolio?.day_change || '$0 (0%)'
      }
    });
  } catch (error) {
    logger.error('Get dashboard metrics error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Market data endpoint
app.get('/api/market/data', mockAuth, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        indices: [
          { name: 'S&P 500', value: '4,567.89', change: '+1.2%', changeValue: '+54.32' },
          { name: 'Dow Jones', value: '34,123.45', change: '+0.8%', changeValue: '+273.21' },
          { name: 'NASDAQ', value: '14,890.12', change: '+1.5%', changeValue: '+220.14' }
        ],
        topMovers: [
          { symbol: 'AAPL', name: 'Apple Inc', price: '$189.46', change: '+2.1%' },
          { symbol: 'MSFT', name: 'Microsoft', price: '$422.89', change: '+1.8%' },
          { symbol: 'GOOGL', name: 'Alphabet', price: '$138.75', change: '+1.4%' },
          { symbol: 'TSLA', name: 'Tesla', price: '$251.05', change: '-1.2%' }
        ]
      }
    });
  } catch (error) {
    logger.error('Get market data error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Catch-all route for undefined endpoints
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((err: Error, req: any, res: any, next: any) => {
  logger.error('Unhandled error:', err);
  
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
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

export default app;