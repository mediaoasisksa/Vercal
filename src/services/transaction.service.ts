
import api from './api';

export interface Transaction {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  createdAt: string;
  description: string;
  paymentReference?: string;
}

const TransactionService = {
  async getAll(userId: string): Promise<Transaction[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response
      const mockData: Transaction[] = [
        {
          id: '1',
          userId,
          subscriptionId: '1',
          amount: 9.99,
          currency: 'USD',
          status: 'completed',
          paymentMethod: 'card',
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Monthly subscription - Professional Plan',
          paymentReference: 'pay_123456789'
        },
        {
          id: '2',
          userId,
          subscriptionId: '1',
          amount: 9.99,
          currency: 'USD',
          status: 'completed',
          paymentMethod: 'card',
          createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Monthly subscription - Professional Plan',
          paymentReference: 'pay_123456788'
        }
      ];
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.get(`/transactions/${userId}`);
      // return response.data;
    } catch (error) {
      console.error('Get transactions error:', error);
      throw error;
    }
  }
};

export default TransactionService;
