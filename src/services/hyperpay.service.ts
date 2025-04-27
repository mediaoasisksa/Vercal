
import api from './api';

export interface PaymentRequest {
  amount: number;
  currency: string;
  customerId: string;
  description: string;
}

export interface PaymentResponse {
  checkoutId: string;
  redirectUrl: string;
}

export interface PaymentStatus {
  status: 'success' | 'pending' | 'failed';
  transactionId?: string;
  details?: string;
}

// This is a placeholder for HyperPay integration
// You'll need to implement the actual integration based on HyperPay documentation
const HyperPayService = {
  async initiatePayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Sanitize inputs - prevent XSS and injection attacks
      const sanitizedRequest = {
        amount: Number(paymentRequest.amount), // Ensure it's a number
        currency: String(paymentRequest.currency).substring(0, 3), // Limit to 3 chars
        customerId: String(paymentRequest.customerId), // String conversion
        description: String(paymentRequest.description).replace(/[<>]/g, '') // Remove < > characters
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const mockData: PaymentResponse = {
        checkoutId: `checkout_${Math.random().toString(36).substring(2, 9)}`,
        redirectUrl: `https://example.com/payment?id=${Math.random().toString(36).substring(2, 9)}`
      };
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.post('/payments/hyperpay/initiate', sanitizedRequest);
      // return response.data;
    } catch (error) {
      console.error('Initiate payment error:', error);
      throw error;
    }
  },
  
  async checkStatus(checkoutId: string): Promise<PaymentStatus> {
    try {
      // Sanitize input
      const sanitizedCheckoutId = String(checkoutId).replace(/[^a-zA-Z0-9_]/g, '');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response - 80% chance of success
      const isSuccess = Math.random() > 0.2;
      
      const mockData: PaymentStatus = {
        status: isSuccess ? 'success' : 'failed',
        transactionId: isSuccess ? `txn_${Math.random().toString(36).substring(2, 9)}` : undefined,
        details: isSuccess ? 'Payment processed successfully' : 'Payment failed: Insufficient funds'
      };
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.get(`/payments/hyperpay/status/${sanitizedCheckoutId}`);
      // return response.data;
    } catch (error) {
      console.error('Check payment status error:', error);
      throw error;
    }
  }
};

export default HyperPayService;
