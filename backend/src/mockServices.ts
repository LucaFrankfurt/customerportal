// Mock API Services
// This file contains all the mock API services that replace database operations

import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import {
  User,
  Client,
  Portfolio,
  Holding,
  Transaction,
  Notification,
  MeetingRequest,
  Conversation,
  Message,
  mockUsers,
  mockClients,
  mockPortfolios,
  mockHoldings,
  mockTransactions,
  mockNotifications,
  mockMeetingRequests,
  mockConversations,
  mockMessages,
  findUserByEmail,
  findUserById,
  findPortfolioByUserId,
  findHoldingsByPortfolioId,
  findTransactionsByPortfolioId,
  findNotificationsByUserId,
  findMeetingRequestsByUserId,
  findConversationsByUserId,
  findMessagesByConversationId
} from './mockData';

export class MockAuthService {
  static async login(email: string, password: string) {
    const user = findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const jwtSecret = process.env.JWT_SECRET || 'mock-secret-key';
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    } as SignOptions);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name
      }
    };
  }

  static async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }) {
    const existingUser = findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);
    
    const newUser: User = {
      id: mockUsers.length + 1,
      email: userData.email,
      password_hash: passwordHash,
      first_name: userData.firstName,
      last_name: userData.lastName,
      role: (userData.role as 'customer' | 'employee' | 'admin') || 'customer',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    mockUsers.push(newUser);

    const jwtSecret = process.env.JWT_SECRET || 'mock-secret-key';
    const payload = {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role
    };
    
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    } as SignOptions);

    return {
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        firstName: newUser.first_name,
        lastName: newUser.last_name
      }
    };
  }
}

export class MockPortfolioService {
  static async getPortfolioSummary(userId: number) {
    const portfolio = findPortfolioByUserId(userId);
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    return {
      totalValue: portfolio.total_value,
      ytdPerformance: portfolio.ytd_performance,
      monthlyReturn: portfolio.monthly_return,
      riskScore: portfolio.risk_score,
      dayChange: portfolio.day_change,
      lastUpdated: portfolio.updated_at
    };
  }

  static async getHoldings(userId: number) {
    const portfolio = findPortfolioByUserId(userId);
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const holdings = findHoldingsByPortfolioId(portfolio.id);
    return holdings.map(holding => ({
      symbol: holding.symbol,
      name: holding.security_name,
      quantity: holding.quantity,
      currentPrice: holding.current_price,
      marketValue: holding.market_value,
      dayChange: holding.day_change,
      totalReturn: holding.total_return,
      allocation: holding.allocation_percentage
    }));
  }

  static async getTransactions(userId: number, limit?: number, offset?: number) {
    const portfolio = findPortfolioByUserId(userId);
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const transactions = findTransactionsByPortfolioId(portfolio.id);
    const sortedTransactions = transactions.sort((a, b) => 
      new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
    );

    const start = offset || 0;
    const end = limit ? start + limit : sortedTransactions.length;
    const paginatedTransactions = sortedTransactions.slice(start, end);

    return {
      transactions: paginatedTransactions.map(transaction => ({
        id: transaction.id,
        date: transaction.transaction_date,
        type: transaction.transaction_type,
        security: transaction.security_name,
        symbol: transaction.symbol,
        quantity: transaction.quantity,
        price: transaction.price_per_unit,
        amount: transaction.total_amount,
        status: transaction.status
      })),
      total: sortedTransactions.length,
      hasMore: end < sortedTransactions.length
    };
  }

  static async getPerformanceHistory(userId: number, period: string = '1Y') {
    // Generate mock performance data for charts
    const days = period === '1M' ? 30 : period === '3M' ? 90 : period === '6M' ? 180 : 365;
    const data = [];
    let baseValue = 2500000; // Starting portfolio value
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const variation = (Math.random() - 0.5) * 0.02; // Random variation of ±1%
      baseValue *= (1 + variation);
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(baseValue),
        return: ((baseValue - 2500000) / 2500000 * 100).toFixed(2)
      });
    }

    return data;
  }
}

export class MockUserService {
  static async getUserProfile(userId: number) {
    const user = findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
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
    };
  }

  static async updateUserProfile(userId: number, updateData: Partial<User>) {
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updateData,
      updated_at: new Date().toISOString()
    };

    return this.getUserProfile(userId);
  }

  static async getNotifications(userId: number, unreadOnly: boolean = false) {
    let notifications = findNotificationsByUserId(userId);
    
    if (unreadOnly) {
      notifications = notifications.filter(n => !n.is_read);
    }

    return notifications.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  static async markNotificationAsRead(userId: number, notificationId: number) {
    const notification = mockNotifications.find(n => 
      n.id === notificationId && n.user_id === userId
    );
    
    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.is_read = true;
    notification.updated_at = new Date().toISOString();
    
    return notification;
  }
}

export class MockMeetingService {
  static async createMeetingRequest(userId: number, requestData: Omit<MeetingRequest, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'status'>) {
    const newRequest: MeetingRequest = {
      id: mockMeetingRequests.length + 1,
      user_id: userId,
      ...requestData,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    mockMeetingRequests.push(newRequest);
    return newRequest;
  }

  static async getMeetingRequests(userId: number) {
    return findMeetingRequestsByUserId(userId).sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  static async updateMeetingRequest(userId: number, requestId: number, updateData: Partial<MeetingRequest>) {
    const requestIndex = mockMeetingRequests.findIndex(req => 
      req.id === requestId && req.user_id === userId
    );
    
    if (requestIndex === -1) {
      throw new Error('Meeting request not found');
    }

    mockMeetingRequests[requestIndex] = {
      ...mockMeetingRequests[requestIndex],
      ...updateData,
      updated_at: new Date().toISOString()
    };

    return mockMeetingRequests[requestIndex];
  }

  static async cancelMeetingRequest(userId: number, requestId: number) {
    return this.updateMeetingRequest(userId, requestId, { status: 'cancelled' });
  }
}

export class MockClientService {
  static async getAllClients(filters?: {
    status?: string;
    priority?: string;
    search?: string;
  }) {
    let clients = [...mockClients];

    if (filters) {
      if (filters.status) {
        clients = clients.filter(client => client.status === filters.status);
      }
      if (filters.priority) {
        clients = clients.filter(client => client.priority === filters.priority);
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        clients = clients.filter(client => 
          client.name.toLowerCase().includes(searchTerm) ||
          client.contact_person.toLowerCase().includes(searchTerm) ||
          client.email.toLowerCase().includes(searchTerm)
        );
      }
    }

    return clients.sort((a, b) => 
      new Date(b.last_contact).getTime() - new Date(a.last_contact).getTime()
    );
  }

  static async getClientById(clientId: number) {
    const client = mockClients.find(client => client.id === clientId);
    if (!client) {
      throw new Error('Client not found');
    }
    return client;
  }

  static async updateClient(clientId: number, updateData: Partial<Client>) {
    const clientIndex = mockClients.findIndex(client => client.id === clientId);
    if (clientIndex === -1) {
      throw new Error('Client not found');
    }

    mockClients[clientIndex] = {
      ...mockClients[clientIndex],
      ...updateData,
      updated_at: new Date().toISOString()
    };

    return mockClients[clientIndex];
  }
}

export class MockConversationService {
  static async getConversations(userId: number) {
    return findConversationsByUserId(userId).map(conv => ({
      ...conv,
      messages: findMessagesByConversationId(conv.id)
    }));
  }

  static async getConversationById(conversationId: number, userId: number) {
    const conversation = mockConversations.find(conv => 
      conv.id === conversationId && 
      (conv.customer_id === userId || conv.employee_id === userId)
    );
    
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const messages = findMessagesByConversationId(conversationId);
    return {
      ...conversation,
      messages
    };
  }

  static async sendMessage(conversationId: number, senderId: number, content: string) {
    const conversation = mockConversations.find(conv => 
      conv.id === conversationId && 
      (conv.customer_id === senderId || conv.employee_id === senderId)
    );
    
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const newMessage: Message = {
      id: mockMessages.length + 1,
      conversation_id: conversationId,
      sender_id: senderId,
      content,
      is_read: false,
      created_at: new Date().toISOString()
    };

    mockMessages.push(newMessage);
    
    // Update conversation timestamp
    conversation.updated_at = new Date().toISOString();
    
    return newMessage;
  }

  static async markMessagesAsRead(conversationId: number, userId: number) {
    const messages = findMessagesByConversationId(conversationId);
    messages.forEach(message => {
      if (message.sender_id !== userId) {
        message.is_read = true;
      }
    });
    
    return { success: true };
  }
}

export class MockAnalyticsService {
  static async getDashboardMetrics(userId: number) {
    const portfolio = findPortfolioByUserId(userId);
    const holdings = portfolio ? findHoldingsByPortfolioId(portfolio.id) : [];
    const transactions = portfolio ? findTransactionsByPortfolioId(portfolio.id) : [];
    const notifications = findNotificationsByUserId(userId);
    
    return {
      totalPortfolioValue: portfolio?.total_value || '$0',
      ytdPerformance: portfolio?.ytd_performance || '0%',
      totalHoldings: holdings.length,
      recentTransactions: transactions.slice(0, 5).length,
      unreadNotifications: notifications.filter(n => !n.is_read).length,
      riskScore: portfolio?.risk_score || 'N/A',
      dayChange: portfolio?.day_change || '$0 (0%)'
    };
  }

  static async getMarketData() {
    // Mock market data
    return {
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
    };
  }
}