import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const PORT = Number(process.env.PORT || 3001);
const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret-key';

interface DemoUser {
  id: string;
  email: string;
  password: string;
  role: 'customer' | 'employee' | 'admin';
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  organization?: string;
}

interface MeetingRequest {
  id: string;
  userId: string;
  type: string;
  preferredDate: string;
  preferredTime: string;
  duration: number;
  format: string;
  topic?: string;
  notes?: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
  updatedAt: string;
  advisor?: string;
}

interface HoldingSummary {
  symbol: string;
  name: string;
  quantity: number;
  currentPrice: number;
  marketValue: number;
  dayChangePercent: number;
  totalReturnPercent: number;
  allocationPercent: number;
}

interface TransactionRecord {
  id: string;
  date: string;
  type: 'Buy' | 'Sell' | 'Dividend' | 'Fee';
  security: string;
  symbol: string;
  quantity: number;
  price: number;
  amount: number;
  status: 'Completed' | 'Pending';
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'market' | 'document';
  createdAt: string;
  unread: boolean;
}

interface ConversationSummary {
  id: string;
  title: string;
  customerName: string;
  advisorName: string;
  lastMessagePreview: string;
  updatedAt: string;
}

interface ConversationMessage {
  id: string;
  conversationId: string;
  sender: 'customer' | 'advisor';
  senderName: string;
  content: string;
  timestamp: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: DemoUser;
    }
  }
}

const users: DemoUser[] = [
  {
    id: 'user-1001',
    email: 'customer@example.com',
    password: 'password123',
    role: 'customer',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+1 (555) 123-4567',
    address: '123 Financial District, New York, NY 10004',
    organization: 'Meridian Pension Partners'
  },
  {
    id: 'user-2001',
    email: 'employee@example.com',
    password: 'password123',
    role: 'employee',
    firstName: 'Alex',
    lastName: 'Thompson',
    phone: '+1 (555) 987-6543',
    address: '45 Wall Street, New York, NY 10005',
    organization: 'Asset Capital Advisors'
  }
];

const meetingRequests: MeetingRequest[] = [
  {
    id: 'meet-3001',
    userId: 'user-1001',
    type: 'portfolio-review',
    preferredDate: '2025-10-05',
    preferredTime: '14:00',
    duration: 60,
    format: 'video-call',
    topic: 'Q3 performance review and rebalancing',
    notes: 'Discuss potential increase in ESG allocation and review hedge strategy.',
    urgency: 'medium',
    status: 'confirmed',
    createdAt: '2025-09-26T18:45:00Z',
    updatedAt: '2025-09-27T10:15:00Z',
    advisor: 'Alex Thompson'
  },
  {
    id: 'meet-3002',
    userId: 'user-1001',
    type: 'investment-planning',
    preferredDate: '2025-10-12',
    preferredTime: '09:30',
    duration: 90,
    format: 'in-person',
    topic: 'Private credit opportunities',
    notes: 'Review new allocations for 2026 plan year.',
    urgency: 'high',
    status: 'pending',
    createdAt: '2025-09-28T14:05:00Z',
    updatedAt: '2025-09-28T14:05:00Z',
    advisor: 'Alex Thompson'
  }
];

const holdings: HoldingSummary[] = [
  {
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    quantity: 850,
    currentPrice: 421.35,
    marketValue: 358147.5,
    dayChangePercent: 1.2,
    totalReturnPercent: 15.3,
    allocationPercent: 25.8
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 400,
    currentPrice: 422.89,
    marketValue: 169156,
    dayChangePercent: 0.8,
    totalReturnPercent: 22.1,
    allocationPercent: 12.2
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 300,
    currentPrice: 189.46,
    marketValue: 56838,
    dayChangePercent: -0.5,
    totalReturnPercent: 8.7,
    allocationPercent: 4.1
  }
];

const transactions: TransactionRecord[] = [
  {
    id: 'txn-5001',
    date: '2025-09-28',
    type: 'Buy',
    security: 'Vanguard S&P 500 ETF',
    symbol: 'VOO',
    quantity: 150,
    price: 421.35,
    amount: 63202.5,
    status: 'Completed'
  },
  {
    id: 'txn-5002',
    date: '2025-09-25',
    type: 'Dividend',
    security: 'Microsoft Corp',
    symbol: 'MSFT',
    quantity: 200,
    price: 2.72,
    amount: 544,
    status: 'Completed'
  },
  {
    id: 'txn-5003',
    date: '2025-09-23',
    type: 'Sell',
    security: 'Tesla Inc',
    symbol: 'TSLA',
    quantity: 50,
    price: 251.05,
    amount: 12552.5,
    status: 'Completed'
  }
];

const notifications: NotificationItem[] = [
  {
    id: 'note-7001',
    title: 'Quarterly Review Scheduled',
    message: 'Your Q3 portfolio review is scheduled for October 5th at 2:00 PM with your advisor Alex Thompson.',
    type: 'alert',
    createdAt: '2025-09-28T11:30:00Z',
    unread: true
  },
  {
    id: 'note-7002',
    title: 'Market Update',
    message: 'Tech sector showing strong performance this week. Your MSFT holdings are up 4.2%.',
    type: 'market',
    createdAt: '2025-09-27T08:45:00Z',
    unread: false
  }
];

const conversations: ConversationSummary[] = [
  {
    id: 'conv-1001',
    title: 'Portfolio Rebalancing',
    customerName: 'Sarah Johnson',
    advisorName: 'Alex Thompson',
    lastMessagePreview: 'Thanks for the update. Ill review the proposed changes and get back to you tomorrow.',
    updatedAt: '2025-09-29T15:20:00Z'
  },
  {
    id: 'conv-1002',
    title: 'Market Insights',
    customerName: 'Sarah Johnson',
    advisorName: 'Asset Capital Research Team',
    lastMessagePreview: 'Sharing the latest report on infrastructure investments you requested.',
    updatedAt: '2025-09-28T09:05:00Z'
  }
];

const conversationMessages: ConversationMessage[] = [
  {
    id: 'msg-9001',
    conversationId: 'conv-1001',
    sender: 'advisor',
    senderName: 'Alex Thompson',
    content: 'Hi Sarah, your portfolio is up 12.4% YTD. Lets review the rebalancing sheet attached.',
    timestamp: '2025-09-29T15:05:00Z'
  },
  {
    id: 'msg-9002',
    conversationId: 'conv-1001',
    sender: 'customer',
    senderName: 'Sarah Johnson',
    content: 'Thanks Alex, the changes look good. Could we increase our ESG allocation slightly?',
    timestamp: '2025-09-29T15:12:00Z'
  }
];

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const formatUserResponse = (user: DemoUser) => ({
  id: user.id,
  email: user.email,
  role: user.role,
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone,
  address: user.address,
  organization: user.organization ?? 'Asset Capital Client'
});

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization required' });
  }

  const token = header.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = users.find((u) => u.id === payload.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid session' });
    }

    req.currentUser = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Demo mock backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = users.find((u) => u.email === email.trim().toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

  res.json({
    success: true,
    data: {
      token,
      user: formatUserResponse(user),
    },
  });
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName, role = 'customer' } = req.body ?? {};

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  if (users.some((u) => u.email === email.trim().toLowerCase())) {
    return res.status(409).json({ success: false, message: 'Email already registered' });
  }

  const newUser: DemoUser = {
    id: `user-${Date.now()}`,
    email: email.trim().toLowerCase(),
    password,
    role,
    firstName,
    lastName,
    phone: '',
    address: '',
    organization: 'Demo Account'
  };

  users.push(newUser);

  const token = jwt.sign({ userId: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '24h' });

  res.status(201).json({
    success: true,
    message: 'Account created',
    data: {
      token,
      user: formatUserResponse(newUser),
    },
  });
});

app.post('/api/auth/logout', (_req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

app.get('/api/portfolio', authenticate, (req, res) => {
  res.json({
    success: true,
    data: {
      portfolio: {
        totalValue: formatCurrency(2847320),
        totalValueNumeric: 2847320,
        ytdPerformance: 0.124,
        monthlyReturn: 0.021,
        riskScore: 7.2,
        dayChange: {
          amount: 87450,
          percent: 3.17,
        },
        cashBalance: formatCurrency(156789.25),
        asOf: '2025-09-28T16:00:00Z',
      },
    },
  });
});

app.get('/api/portfolio/holdings', authenticate, (_req, res) => {
  res.json({
    success: true,
    data: {
      holdings: holdings.map((holding) => ({
        ...holding,
        currentPriceFormatted: formatCurrency(holding.currentPrice),
        marketValueFormatted: formatCurrency(holding.marketValue),
      })),
    },
  });
});

app.get('/api/portfolio/transactions', authenticate, (req, res) => {
  const limit = Number(req.query.limit ?? 20);
  const offset = Number(req.query.offset ?? 0);
  const sliced = transactions.slice(offset, offset + limit);

  res.json({
    success: true,
    data: {
      transactions: sliced.map((txn) => ({
        ...txn,
        priceFormatted: formatCurrency(txn.price),
        amountFormatted: formatCurrency(txn.amount),
      })),
      total: transactions.length,
      limit,
      offset,
      hasMore: offset + limit < transactions.length,
    },
  });
});

app.get('/api/portfolio/performance', authenticate, (_req, res) => {
  const today = new Date();
  const points = Array.from({ length: 12 }).map((_, index) => {
    const date = new Date(today);
    date.setMonth(today.getMonth() - (11 - index));
    const base = 2500000;
    const variation = Math.sin(index / 2) * 0.05 + Math.random() * 0.02;
    const value = Math.round(base * (1 + variation));

    return {
      date: date.toISOString().split('T')[0],
      value,
      formattedValue: formatCurrency(value),
    };
  });

  res.json({ success: true, data: { performance: points } });
});

app.get('/api/users/profile', authenticate, (req, res) => {
  const user = req.currentUser!;
  res.json({ success: true, data: { user: formatUserResponse(user) } });
});

app.put('/api/users/profile', authenticate, (req, res) => {
  const user = req.currentUser!;
  const updates = req.body ?? {};

  Object.assign(user, {
    phone: typeof updates.phone === 'string' ? updates.phone : user.phone,
    address: typeof updates.address === 'string' ? updates.address : user.address,
    firstName: typeof updates.firstName === 'string' ? updates.firstName : user.firstName,
    lastName: typeof updates.lastName === 'string' ? updates.lastName : user.lastName,
  });

  res.json({
    success: true,
    message: 'Profile updated',
    data: { user: formatUserResponse(user) },
  });
});

app.get('/api/users/notifications', authenticate, (req, res) => {
  const unread = String(req.query.unread ?? '').toLowerCase() === 'true';
  const filtered = unread ? notifications.filter((n) => n.unread) : notifications;

  res.json({ success: true, data: { notifications: filtered } });
});

app.post('/api/meetings/request', authenticate, (req, res) => {
  const { type, preferredDate, preferredTime, duration, format, topic, notes, urgency } = req.body ?? {};

  if (!type || !preferredDate || !preferredTime || !duration || !format || !urgency) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const newMeeting: MeetingRequest = {
    id: `meet-${Date.now()}`,
    userId: req.currentUser!.id,
    type,
    preferredDate,
    preferredTime,
    duration: Number(duration),
    format,
    topic,
    notes,
    urgency,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    advisor: 'Alex Thompson',
  };

  meetingRequests.unshift(newMeeting);

  res.status(201).json({
    success: true,
    message: 'Meeting request submitted',
    data: { meetingRequest: newMeeting },
  });
});

app.get('/api/meetings', authenticate, (req, res) => {
  const statusFilter = String(req.query.status ?? '').toLowerCase();
  const limit = Number(req.query.limit ?? 10);
  const offset = Number(req.query.offset ?? 0);

  const filtered = meetingRequests.filter((meeting) =>
    statusFilter ? meeting.status === statusFilter : true,
  );

  const paginated = filtered.slice(offset, offset + limit);

  res.json({
    success: true,
    data: {
      meetingRequests: paginated,
      total: filtered.length,
      limit,
      offset,
    },
  });
});

app.get('/api/meetings/:id', authenticate, (req, res) => {
  const meeting = meetingRequests.find((item) => item.id === req.params.id);
  if (!meeting) {
    return res.status(404).json({ success: false, message: 'Meeting not found' });
  }

  res.json({ success: true, data: { meetingRequest: meeting } });
});

app.put('/api/meetings/:id', authenticate, (req, res) => {
  const meeting = meetingRequests.find((item) => item.id === req.params.id);
  if (!meeting) {
    return res.status(404).json({ success: false, message: 'Meeting not found' });
  }

  const allowedStatuses = ['pending', 'confirmed', 'completed'];
  const { status, notes } = req.body ?? {};

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  if (typeof status === 'string') {
    meeting.status = status as MeetingRequest['status'];
  }

  if (typeof notes === 'string') {
    meeting.notes = notes;
  }

  meeting.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: 'Meeting updated',
    data: { meetingRequest: meeting },
  });
});

app.get('/api/conversations', authenticate, (_req, res) => {
  res.json({ success: true, data: { conversations } });
});

app.get('/api/conversations/:id', authenticate, (req, res) => {
  const conversation = conversations.find((item) => item.id === req.params.id);
  if (!conversation) {
    return res.status(404).json({ success: false, message: 'Conversation not found' });
  }

  const messages = conversationMessages
    .filter((message) => message.conversationId === conversation.id)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  res.json({
    success: true,
    data: {
      conversation,
      messages,
    },
  });
});

app.post('/api/conversations/:conversationId/messages', authenticate, (req, res) => {
  const conversation = conversations.find((item) => item.id === req.params.conversationId);
  if (!conversation) {
    return res.status(404).json({ success: false, message: 'Conversation not found' });
  }

  const content = (req.body?.content ?? '').trim();
  if (!content) {
    return res.status(400).json({ success: false, message: 'Content is required' });
  }

  const newMessage: ConversationMessage = {
    id: `msg-${Date.now()}`,
    conversationId: conversation.id,
    sender: req.currentUser?.role === 'customer' ? 'customer' : 'advisor',
    senderName: `${req.currentUser?.firstName ?? 'Demo'} ${req.currentUser?.lastName ?? 'User'}`.trim(),
    content,
    timestamp: new Date().toISOString(),
  };

  conversationMessages.push(newMessage);
  conversation.lastMessagePreview = content.substring(0, 140);
  conversation.updatedAt = newMessage.timestamp;

  res.status(201).json({ success: true, data: { message: newMessage } });
});

app.get('/api/dashboard/metrics', authenticate, (_req, res) => {
  res.json({
    success: true,
    data: {
      metrics: {
        totalPortfolioValue: formatCurrency(2847320),
        ytdPerformancePercent: 12.4,
        monthlyReturnPercent: 2.1,
        riskScore: 7.2,
        unreadNotifications: notifications.filter((item) => item.unread).length,
        scheduledMeetings: meetingRequests.filter((meeting) => meeting.status !== 'completed').length,
      },
    },
  });
});

app.get('/api/market/data', authenticate, (_req, res) => {
  res.json({
    success: true,
    data: {
      indices: [
        { name: 'S&P 500', value: 4567.89, changePercent: 1.2 },
        { name: 'Dow Jones', value: 34123.45, changePercent: 0.8 },
        { name: 'NASDAQ', value: 14890.12, changePercent: 1.5 },
      ],
      highlights: [
        { title: 'Global Markets', detail: 'European equities rally on positive economic data.' },
        { title: 'Energy', detail: 'Oil prices retreat as supply concerns ease.' },
      ],
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found', path: req.originalUrl });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Mock Backend] Unhandled error:', error);
  res.status(500).json({ success: false, message: 'Unexpected server error' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Demo mock backend listening on http://localhost:${PORT}`);
  console.log('   ↳ Health check:', `http://localhost:${PORT}/health`);
  console.log('   ↳ Login with customer@example.com / password123');
});
