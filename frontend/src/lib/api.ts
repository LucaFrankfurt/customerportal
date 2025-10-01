// API utility functions for the customer portal frontend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class APIRequestError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'APIRequestError';
    this.status = status;
  }
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Generic API request function
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new APIRequestError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof APIRequestError) {
      throw error;
    }
    throw new APIRequestError('Network error occurred');
  }
}

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiRequest<{ success: boolean; data: { user: any; token: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }) => {
    return apiRequest<{ success: boolean; data: { user: any; token: string } }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    return apiRequest<{ success: boolean }>('/auth/logout', {
      method: 'POST',
    });
  },
};

// Meeting API
export const meetingAPI = {
  createMeetingRequest: async (meetingData: {
    type: string;
    preferredDate: string;
    preferredTime: string;
    duration: number;
    format: string;
    topic?: string;
    notes?: string;
    urgency: string;
  }) => {
    return apiRequest<{ 
      success: boolean; 
      data: { 
        meetingRequest: any; 
        message: string; 
      } 
    }>('/meetings/request', {
      method: 'POST',
      body: JSON.stringify(meetingData),
    });
  },

  getMeetingRequests: async (status?: string, limit = 10, offset = 0) => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      ...(status && { status }),
    });
    
    return apiRequest<{ 
      success: boolean; 
      data: { 
        meetingRequests: any[]; 
        total: number; 
      } 
    }>(`/meetings?${params}`);
  },

  getMeetingRequest: async (id: number) => {
    return apiRequest<{ 
      success: boolean; 
      data: { 
        meetingRequest: any; 
      } 
    }>(`/meetings/${id}`);
  },

  updateMeetingRequest: async (id: number, updates: { status?: string; notes?: string }) => {
    return apiRequest<{ 
      success: boolean; 
      data: { 
        meetingRequest: any; 
        message: string; 
      } 
    }>(`/meetings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
};

// Portfolio API
export const portfolioAPI = {
  getPortfolio: async () => {
    return apiRequest<{ success: boolean; data: { portfolio: any } }>('/portfolio');
  },

  getHoldings: async () => {
    return apiRequest<{ success: boolean; data: { holdings: any[] } }>('/portfolio/holdings');
  },

  getTransactions: async (limit = 20, offset = 0) => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });
    
    return apiRequest<{ success: boolean; data: { transactions: any[] } }>(`/portfolio/transactions?${params}`);
  },

  getPerformance: async () => {
    return apiRequest<{ success: boolean; data: { performance: any[] } }>('/portfolio/performance');
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    return apiRequest<{ success: boolean; data: { user: any } }>('/users/profile');
  },

  updateProfile: async (updates: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    riskTolerance?: string;
    investmentGoals?: string;
    communicationPreference?: string;
  }) => {
    return apiRequest<{ success: boolean; data: { user: any } }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
};

// Conversation API
export const conversationAPI = {
  getConversations: async () => {
    return apiRequest<{ success: boolean; data: { conversations: any[] } }>('/conversations');
  },

  getConversation: async (id: number) => {
    return apiRequest<{ success: boolean; data: { conversation: any; messages: any[] } }>(`/conversations/${id}`);
  },

  sendMessage: async (conversationId: number, content: string) => {
    return apiRequest<{ success: boolean; data: { message: any } }>(`/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  },
};

// Utility functions
export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export { APIRequestError };