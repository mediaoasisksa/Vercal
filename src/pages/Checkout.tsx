
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Typography, Button, Spin } from 'antd';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import { HyperPayService } from '../services';
import { toast } from "sonner";

const { Title, Paragraph } = Typography;

const Checkout: React.FC = () => {
  const { planId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getPlanDetails = (planId: string) => {
    return {
      monthly: {
        price: 30,
        name: 'Monthly Plan',
        currency: 'SAR'
      },
      annual: {
        price: 40,
        name: 'Annual Plan',
        currency: 'SAR'
      }
    }[planId] || { price: 0, name: '', currency: 'SAR' };
  };

  const handleCheckout = async () => {
    if (!user || !planId) return;

    setLoading(true);
    try {
      const plan = getPlanDetails(planId);
      const paymentRequest = {
        amount: plan.price,
        currency: plan.currency,
        customerId: user.id,
        description: `Subscription to ${plan.name}`
      };

      const { redirectUrl } = await HyperPayService.initiatePayment(paymentRequest);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const plan = getPlanDetails(planId || '');

  if (!planId || !plan.name) {
    navigate('/pricing');
    return null;
  }

  return (
    <MainLayout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <div className="text-center mb-8">
                <Title level={2}>Complete Your Purchase</Title>
                <Paragraph className="text-gray-600">
                  You're subscribing to our {plan.name}
                </Paragraph>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between p-4 bg-gray-50 rounded">
                  <span>Subscription</span>
                  <span className="font-semibold">{plan.name}</span>
                </div>
                <div className="flex justify-between p-4 bg-gray-50 rounded">
                  <span>Amount</span>
                  <span className="font-semibold">{plan.currency} {plan.price}</span>
                </div>

                <Button 
                  type="primary" 
                  size="large" 
                  block
                  onClick={handleCheckout}
                  loading={loading}
                >
                  Proceed to Payment
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
