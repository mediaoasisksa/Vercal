
import api from './api';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  isPopular: boolean;
}

const PricingService = {
  async getPlans(): Promise<PricingPlan[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response
      const mockData: PricingPlan[] = [
        {
          id: 'free',
          name: 'Free',
          price: 0,
          currency: 'USD',
          billingCycle: 'monthly',
          features: [
            'Basic video calls',
            '3 participants max',
            '30 minutes max duration',
            'Standard quality'
          ],
          isPopular: false
        },
        {
          id: 'pro',
          name: 'Professional',
          price: 9.99,
          currency: 'USD',
          billingCycle: 'monthly',
          features: [
            'HD video calls',
            '10 participants max',
            'Unlimited duration',
            'Screen sharing',
            'Chat features',
            'Custom subdomain'
          ],
          isPopular: true
        },
        {
          id: 'business',
          name: 'Business',
          price: 19.99,
          currency: 'USD',
          billingCycle: 'monthly',
          features: [
            'Ultra HD video calls',
            '50 participants max',
            'Unlimited duration',
            'Advanced screen sharing',
            'Recording feature',
            'Custom branding',
            'Priority support'
          ],
          isPopular: false
        }
      ];
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.get('/pricing');
      // return response.data;
    } catch (error) {
      console.error('Get pricing plans error:', error);
      throw error;
    }
  }
};

export default PricingService;
