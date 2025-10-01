// Mock Backend Server
// This replaces the entire backend with mock implementations

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createWriteStream } from 'fs';
import { join } from 'path';

// Mock routes
import mockAuthRoutes from './routes/mockAuth';
import mockPortfolioRoutes from './routes/mockPortfolio';

// Create mock logger since we can't import the real one
export const logger = {
  info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
  debug: (message: string, ...args: any[]) => console.debug(`[DEBUG] ${message}`, ...args)
};

const app = express();
const PORT = process.env.PORT || 3001;

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
  max: 100, // Limit each IP to 100 requests per windowMs
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Mock Customer Portal API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mock API routes
app.use('/api/auth', mockAuthRoutes);
app.use('/api/portfolio', mockPortfolioRoutes);

// Mock additional routes with comprehensive implementations
// Import services (will be defined inline due to import issues)

// Simple mock auth middleware
const mockAuth = (req: any, res: any, next: any) => {
  req.user = { userId: 1, email: 'customer@example.com', role: 'customer' };
  next();
};

// Users endpoints
app.get('/api/users/profile', mockAuth, async (req, res) => {
  try {
    const profile = await MockUserService.getUserProfile(1);
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.put('/api/users/profile', mockAuth, async (req, res) => {
  try {
    const profile = await MockUserService.updateUserProfile(1, req.body);
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/users/notifications', mockAuth, async (req, res) => {
  try {
    const unreadOnly = req.query.unread === 'true';
    const notifications = await MockUserService.getNotifications(1, unreadOnly);
    res.json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Meetings endpoints
app.post('/api/meetings/requests', mockAuth, async (req, res) => {
  try {
    const request = await MockMeetingService.createMeetingRequest(1, req.body);
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/meetings/requests', mockAuth, async (req, res) => {
  try {
    const requests = await MockMeetingService.getMeetingRequests(1);
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Clients endpoints
app.get('/api/clients', mockAuth, async (req, res) => {
  try {
    const clients = await MockClientService.getAllClients(req.query);
    res.json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/clients/:id', mockAuth, async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const client = await MockClientService.getClientById(clientId);
    res.json({ success: true, data: client });
  } catch (error) {
    res.status(404).json({ success: false, error: 'Client not found' });
  }
});

// Conversations endpoints
app.get('/api/conversations', mockAuth, async (req, res) => {
  try {
    const conversations = await MockConversationService.getConversations(1);
    res.json({ success: true, data: conversations });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/conversations/:id', mockAuth, async (req, res) => {
  try {
    const conversationId = parseInt(req.params.id);
    const conversation = await MockConversationService.getConversationById(conversationId, 1);
    res.json({ success: true, data: conversation });
  } catch (error) {
    res.status(404).json({ success: false, error: 'Conversation not found' });
  }
});

app.post('/api/conversations/:id/messages', mockAuth, async (req, res) => {
  try {
    const conversationId = parseInt(req.params.id);
    const { content } = req.body;
    const message = await MockConversationService.sendMessage(conversationId, 1, content);
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(404).json({ success: false, error: 'Conversation not found' });
  }
});

// Analytics endpoints
app.get('/api/dashboard/metrics', mockAuth, async (req, res) => {
  try {
    const metrics = await MockAnalyticsService.getDashboardMetrics(1);
    res.json({ success: true, data: metrics });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/market/data', mockAuth, async (req, res) => {
  try {
    const marketData = await MockAnalyticsService.getMarketData();
    res.json({ success: true, data: marketData });
  } catch (error) {
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
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;