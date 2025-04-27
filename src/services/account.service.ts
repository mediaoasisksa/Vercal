
import api from './api';

export interface AccountSettings {
  id: string;
  userId: string;
  name: string;
  email: string;
  subdomain?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAccountData {
  name?: string;
  email?: string;
  subdomain?: string;
}

const AccountService = {
  async get(userId: string): Promise<AccountSettings> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response
      const mockData: AccountSettings = {
        id: '1',
        userId,
        name: 'Demo User',
        email: 'demo@example.com',
        subdomain: 'demo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.get(`/accounts/${userId}`);
      // return response.data;
    } catch (error) {
      console.error('Get account settings error:', error);
      throw error;
    }
  },
  
  async update(userId: string, data: UpdateAccountData): Promise<AccountSettings> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock update response
      const mockData: AccountSettings = {
        id: '1',
        userId,
        name: data.name || 'Demo User',
        email: data.email || 'demo@example.com',
        subdomain: data.subdomain || 'demo',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updatedAt: new Date().toISOString()
      };
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.put(`/accounts/${userId}`, data);
      // return response.data;
    } catch (error) {
      console.error('Update account settings error:', error);
      throw error;
    }
  },
  
  async createInitial(userId: string): Promise<AccountSettings> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock creation response
      const mockData: AccountSettings = {
        id: '1',
        userId,
        name: 'New User',
        email: 'new@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.post('/accounts', { userId });
      // return response.data;
    } catch (error) {
      console.error('Create account settings error:', error);
      throw error;
    }
  }
};

export default AccountService;
