// Complete Mock Routes Implementation
import express from 'express';
import { MockUserService, MockMeetingService, MockClientService, MockConversationService, MockAnalyticsService } from '../mockServices';
import { authenticateToken } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();

// Mock auth middleware for these routes
const mockAuth = (req: any, res: any, next: any) => {
  req.user = { userId: 1, email: 'customer@example.com', role: 'customer' };
  next();
};

// Users routes
router.get('/users/profile', mockAuth, async (req, res) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }
    const profile = await MockUserService.getUserProfile(req.user.userId);
    res.json({ success: true, data: profile });
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.put('/users/profile', mockAuth, async (req, res) => {
  try {
    const profile = await MockUserService.updateUserProfile(req.user.userId, req.body);
    res.json({ success: true, data: profile });
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/users/notifications', mockAuth, async (req, res) => {
  try {
    const unreadOnly = req.query.unread === 'true';
    const notifications = await MockUserService.getNotifications(req.user.userId, unreadOnly);
    res.json({ success: true, data: notifications });
  } catch (error) {
    logger.error('Get notifications error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.put('/users/notifications/:id/read', mockAuth, async (req, res) => {
  try {
    const notificationId = parseInt(req.params.id);
    const notification = await MockUserService.markNotificationAsRead(req.user.userId, notificationId);
    res.json({ success: true, data: notification });
  } catch (error) {
    logger.error('Mark notification read error:', error);
    res.status(404).json({ success: false, error: 'Notification not found' });
  }
});

// Meetings routes
router.post('/meetings/requests', mockAuth, async (req, res) => {
  try {
    const request = await MockMeetingService.createMeetingRequest(req.user.userId, req.body);
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    logger.error('Create meeting request error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/meetings/requests', mockAuth, async (req, res) => {
  try {
    const requests = await MockMeetingService.getMeetingRequests(req.user.userId);
    res.json({ success: true, data: requests });
  } catch (error) {
    logger.error('Get meeting requests error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.put('/meetings/requests/:id', mockAuth, async (req, res) => {
  try {
    const requestId = parseInt(req.params.id);
    const request = await MockMeetingService.updateMeetingRequest(req.user.userId, requestId, req.body);
    res.json({ success: true, data: request });
  } catch (error) {
    logger.error('Update meeting request error:', error);
    res.status(404).json({ success: false, error: 'Meeting request not found' });
  }
});

router.delete('/meetings/requests/:id', mockAuth, async (req, res) => {
  try {
    const requestId = parseInt(req.params.id);
    await MockMeetingService.cancelMeetingRequest(req.user.userId, requestId);
    res.json({ success: true, message: 'Meeting request cancelled' });
  } catch (error) {
    logger.error('Cancel meeting request error:', error);
    res.status(404).json({ success: false, error: 'Meeting request not found' });
  }
});

// Clients routes (employee/admin only)
router.get('/clients', mockAuth, async (req, res) => {
  try {
    const clients = await MockClientService.getAllClients(req.query);
    res.json({ success: true, data: clients });
  } catch (error) {
    logger.error('Get clients error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/clients/:id', mockAuth, async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const client = await MockClientService.getClientById(clientId);
    res.json({ success: true, data: client });
  } catch (error) {
    logger.error('Get client error:', error);
    res.status(404).json({ success: false, error: 'Client not found' });
  }
});

router.put('/clients/:id', mockAuth, async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const client = await MockClientService.updateClient(clientId, req.body);
    res.json({ success: true, data: client });
  } catch (error) {
    logger.error('Update client error:', error);
    res.status(404).json({ success: false, error: 'Client not found' });
  }
});

// Conversations routes
router.get('/conversations', mockAuth, async (req, res) => {
  try {
    const conversations = await MockConversationService.getConversations(req.user.userId);
    res.json({ success: true, data: conversations });
  } catch (error) {
    logger.error('Get conversations error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/conversations/:id', mockAuth, async (req, res) => {
  try {
    const conversationId = parseInt(req.params.id);
    const conversation = await MockConversationService.getConversationById(conversationId, req.user.userId);
    res.json({ success: true, data: conversation });
  } catch (error) {
    logger.error('Get conversation error:', error);
    res.status(404).json({ success: false, error: 'Conversation not found' });
  }
});

router.post('/conversations/:id/messages', mockAuth, async (req, res) => {
  try {
    const conversationId = parseInt(req.params.id);
    const { content } = req.body;
    const message = await MockConversationService.sendMessage(conversationId, req.user.userId, content);
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    logger.error('Send message error:', error);
    res.status(404).json({ success: false, error: 'Conversation not found' });
  }
});

router.put('/conversations/:id/messages/read', mockAuth, async (req, res) => {
  try {
    const conversationId = parseInt(req.params.id);
    const result = await MockConversationService.markMessagesAsRead(conversationId, req.user.userId);
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error('Mark messages read error:', error);
    res.status(404).json({ success: false, error: 'Conversation not found' });
  }
});

// Analytics/Dashboard routes
router.get('/dashboard/metrics', mockAuth, async (req, res) => {
  try {
    const metrics = await MockAnalyticsService.getDashboardMetrics(req.user.userId);
    res.json({ success: true, data: metrics });
  } catch (error) {
    logger.error('Get dashboard metrics error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/market/data', mockAuth, async (req, res) => {
  try {
    const marketData = await MockAnalyticsService.getMarketData();
    res.json({ success: true, data: marketData });
  } catch (error) {
    logger.error('Get market data error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;