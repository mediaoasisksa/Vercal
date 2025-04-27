
import api from './api';

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  status: 'active' | 'canceled' | 'expired';
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod: string;
}

export interface CreateSubscriptionData {
  planId: string;
  paymentMethod: string;
  autoRenew?: boolean;
}

const SubscriptionService = {
  async getActive(userId: string): Promise<Subscription | null> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response - 50% chance of having subscription
      if (Math.random() > 0.5) {
        return null;
      }
      
      const mockData: Subscription = {
        id: '1',
        userId,
        planId: 'pro',
        planName: 'Professional',
        status: 'active',
        amount: 9.99,
        currency: 'USD',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days in future
        autoRenew: true,
        paymentMethod: 'card'
      };
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.get(`/subscriptions/active/${userId}`);
      // return response.data;
    } catch (error) {
      console.error('Get active subscription error:', error);
      throw error;
    }
  },
  
  async getHistory(userId: string): Promise<Subscription[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response
      const mockData: Subscription[] = [
        {
          id: '1',
          userId,
          planId: 'pro',
          planName: 'Professional',
          status: 'active',
          amount: 9.99,
          currency: 'USD',
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          autoRenew: true,
          paymentMethod: 'card'
        },
        {
          id: '2',
          userId,
          planId: 'free',
          planName: 'Free',
          status: 'expired',
          amount: 0,
          currency: 'USD',
          startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          autoRenew: false,
          paymentMethod: 'none'
        }
      ];
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.get(`/subscriptions/history/${userId}`);
      // return response.data;
    } catch (error) {
      console.error('Get subscription history error:', error);
      throw error;
    }
  },
  
  async create(userId: string, data: CreateSubscriptionData): Promise<Subscription> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock creation response
      let planName = 'Free';
      let amount = 0;
      
      if (data.planId === 'pro') {
        planName = 'Professional';
        amount = 9.99;
      } else if (data.planId === 'business') {
        planName = 'Business';
        amount = 19.99;
      }
      
      const mockData: Subscription = {
        id: Math.random().toString(36).substring(2, 9),
        userId,
        planId: data.planId,
        planName,
        status: 'active',
        amount,
        currency: 'USD',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        autoRenew: data.autoRenew || false,
        paymentMethod: data.paymentMethod
      };
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.post(`/subscriptions/${userId}`, data);
      // return response.data;
    } catch (error) {
      console.error('Create subscription error:', error);
      throw error;
    }
  },
  
  async cancel(userId: string, subscriptionId: string): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Real implementation would be:
      // await api.post(`/subscriptions/${userId}/${subscriptionId}/cancel`);
    } catch (error) {
      console.error('Cancel subscription error:', error);
      throw error;
    }
  },
  
  async updateAutoRenew(userId: string, subscriptionId: string, autoRenew: boolean): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Real implementation would be:
      // await api.put(`/subscriptions/${userId}/${subscriptionId}/autorenew`, { autoRenew });
    } catch (error) {
      console.error('Update auto-renew error:', error);
      throw error;
    }
  }
};

export default SubscriptionService;
