// Mock Data for Customer Portal
// This file contains all mock data and generators for the customer portal

export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: 'customer' | 'employee' | 'admin';
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: number;
  name: string;
  contact_person: string;
  email: string;
  phone?: string;
  aum: string;
  status: 'Active' | 'Inactive' | 'Review Pending' | 'Onboarding';
  priority: 'High' | 'Medium' | 'Low';
  performance: string;
  last_contact: string;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: number;
  user_id: number;
  total_value: string;
  ytd_performance: string;
  monthly_return: string;
  risk_score: string;
  day_change: string;
  created_at: string;
  updated_at: string;
}

export interface Holding {
  id: number;
  portfolio_id: number;
  symbol: string;
  security_name: string;
  quantity: number;
  current_price: string;
  market_value: string;
  day_change: string;
  total_return: string;
  allocation_percentage: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  portfolio_id: number;
  transaction_date: string;
  transaction_type: 'Buy' | 'Sell' | 'Dividend' | 'Interest';
  security_name: string;
  symbol: string;
  quantity: number;
  price_per_unit: string;
  total_amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
  created_at: string;
}

export interface Conversation {
  id: number;
  employee_id: number;
  customer_id: number;
  status: 'active' | 'closed' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  type: 'alert' | 'market' | 'document' | 'system' | 'meeting';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface MeetingRequest {
  id: number;
  user_id: number;
  type: 'portfolio-review' | 'investment-planning' | 'general-consultation' | 'other';
  preferred_date: string;
  preferred_time: string;
  duration: number;
  format: 'in-person' | 'video-call' | 'phone-call';
  topic?: string;
  notes?: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

// Mock Users
export const mockUsers: User[] = [
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
  },
  {
    id: 2,
    email: 'employee@example.com',
    password_hash: '$2b$10$rOZ7VpjChyU7ejmU8VersOH2C7I.tyTZWmsE6VTRVeIJEvNLwGqPK',
    role: 'employee',
    first_name: 'Alex',
    last_name: 'Thompson',
    phone: '+1-555-5678',
    address: '456 Business Ave, New York, NY 10002',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    email: 'admin@example.com',
    password_hash: '$2b$10$rOZ7VpjChyU7ejmU8VersOH2C7I.tyTZWmsE6VTRVeIJEvNLwGqPK',
    role: 'admin',
    first_name: 'Michael',
    last_name: 'Chen',
    phone: '+1-555-9999',
    address: '789 Admin Blvd, New York, NY 10003',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: 1,
    name: 'Meridian Pension Fund',
    contact_person: 'Sarah Johnson',
    email: 'sarah.johnson@meridianpension.com',
    phone: '+1-555-0101',
    aum: '$450M',
    status: 'Active',
    priority: 'High',
    performance: '+12.3%',
    last_contact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Global University Endowment',
    contact_person: 'Michael Chen',
    email: 'michael.chen@globaluni.edu',
    phone: '+1-555-0102',
    aum: '$280M',
    status: 'Review Pending',
    priority: 'Medium',
    performance: '+8.9%',
    last_contact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Sterling Insurance Corp',
    contact_person: 'Emily Rodriguez',
    email: 'emily.rodriguez@sterlinginsurance.com',
    phone: '+1-555-0103',
    aum: '$320M',
    status: 'Active',
    priority: 'Low',
    performance: '+15.1%',
    last_contact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Pacific Health System',
    contact_person: 'David Kim',
    email: 'david.kim@pacifichealth.org',
    phone: '+1-555-0104',
    aum: '$190M',
    status: 'Onboarding',
    priority: 'High',
    performance: 'N/A',
    last_contact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
  }
];

// Mock Portfolios
export const mockPortfolios: Portfolio[] = [
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

// Mock Holdings
export const mockHoldings: Holding[] = [
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
    allocation_percentage: '25.8%',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
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
    allocation_percentage: '12.2%',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
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
    allocation_percentage: '4.1%',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    portfolio_id: 1,
    symbol: 'GOOGL',
    security_name: 'Alphabet Inc Class A',
    quantity: 200,
    current_price: '$138.75',
    market_value: '$27,750.00',
    day_change: '+2.1%',
    total_return: '+18.9%',
    allocation_percentage: '2.0%',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    portfolio_id: 1,
    symbol: 'TSLA',
    security_name: 'Tesla Inc',
    quantity: 100,
    current_price: '$251.05',
    market_value: '$25,105.00',
    day_change: '-1.8%',
    total_return: '+5.2%',
    allocation_percentage: '1.8%',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
  }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
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
  },
  {
    id: 4,
    portfolio_id: 1,
    transaction_date: '2025-09-20',
    transaction_type: 'Buy',
    security_name: 'APPLE INC',
    symbol: 'AAPL',
    quantity: 100,
    price_per_unit: '$189.46',
    total_amount: '$18,946.00',
    status: 'Completed',
    created_at: '2025-09-20T11:20:00Z'
  },
  {
    id: 5,
    portfolio_id: 1,
    transaction_date: '2025-09-18',
    transaction_type: 'Dividend',
    security_name: 'VANGUARD S&P 500 ETF',
    symbol: 'VOO',
    quantity: 700,
    price_per_unit: '$1.45',
    total_amount: '$1,015.00',
    status: 'Completed',
    created_at: '2025-09-18T08:00:00Z'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
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

// Mock Meeting Requests
export const mockMeetingRequests: MeetingRequest[] = [
  {
    id: 1,
    user_id: 1,
    type: 'portfolio-review',
    preferred_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    preferred_time: '10:00:00',
    duration: 60,
    format: 'video-call',
    topic: 'Q4 Portfolio Performance Review',
    notes: 'I would like to review my portfolio performance and discuss rebalancing options.',
    urgency: 'high',
    status: 'pending',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    user_id: 1,
    type: 'investment-planning',
    preferred_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    preferred_time: '14:00:00',
    duration: 90,
    format: 'in-person',
    topic: 'Retirement Planning Discussion',
    notes: 'Need to discuss retirement investment strategy and timeline.',
    urgency: 'medium',
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 1,
    employee_id: 2,
    customer_id: 1,
    status: 'active',
    created_at: '2025-09-20T10:00:00Z',
    updated_at: new Date().toISOString()
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 1,
    conversation_id: 1,
    sender_id: 1,
    content: 'Hi Alex, I have some questions about my portfolio performance this quarter.',
    is_read: true,
    created_at: '2025-09-20T10:00:00Z'
  },
  {
    id: 2,
    conversation_id: 1,
    sender_id: 2,
    content: 'Hello Sarah! I\'d be happy to help you with any questions about your portfolio. What specific areas would you like to discuss?',
    is_read: true,
    created_at: '2025-09-20T10:05:00Z'
  },
  {
    id: 3,
    conversation_id: 1,
    sender_id: 1,
    content: 'I noticed my tech holdings have been performing well. Should I consider rebalancing or taking some profits?',
    is_read: true,
    created_at: '2025-09-20T10:10:00Z'
  },
  {
    id: 4,
    conversation_id: 1,
    sender_id: 2,
    content: 'Great question! Your tech holdings have indeed outperformed. Let me review your current allocation and we can schedule a call to discuss rebalancing strategies.',
    is_read: false,
    created_at: '2025-09-20T10:15:00Z'
  }
];

// Utility functions for generating realistic data
export function generateRandomPrice(min: number, max: number): string {
  const price = (Math.random() * (max - min) + min).toFixed(2);
  return `$${price}`;
}

export function generateRandomPercentage(min: number, max: number): string {
  const percentage = Math.random() * (max - min) + min;
  return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
}

export function generateRandomDate(daysAgo: number): string {
  const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

// Helper functions to find mock data
export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const findUserById = (id: number): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const findPortfolioByUserId = (userId: number): Portfolio | undefined => {
  return mockPortfolios.find(portfolio => portfolio.user_id === userId);
};

export const findHoldingsByPortfolioId = (portfolioId: number): Holding[] => {
  return mockHoldings.filter(holding => holding.portfolio_id === portfolioId);
};

export const findTransactionsByPortfolioId = (portfolioId: number): Transaction[] => {
  return mockTransactions.filter(transaction => transaction.portfolio_id === portfolioId);
};

export const findNotificationsByUserId = (userId: number): Notification[] => {
  return mockNotifications.filter(notification => notification.user_id === userId);
};

export const findMeetingRequestsByUserId = (userId: number): MeetingRequest[] => {
  return mockMeetingRequests.filter(request => request.user_id === userId);
};

export const findConversationsByUserId = (userId: number): Conversation[] => {
  return mockConversations.filter(conv => 
    conv.customer_id === userId || conv.employee_id === userId
  );
};

export const findMessagesByConversationId = (conversationId: number): Message[] => {
  return mockMessages.filter(message => message.conversation_id === conversationId);
};