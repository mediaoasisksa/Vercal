
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Divider } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import { toast } from "sonner";

const { Title, Paragraph } = Typography;

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 30,
    currency: 'SAR',
    features: [
      'Custom subdomain',
      'Brand customization',
      'Unlimited meetings',
      'Up to 100 participants'
    ],
    popular: true
  },
  {
    id: 'annual',
    name: 'Annual',
    price: 40,
    currency: 'SAR',
    features: [
      'Everything in Monthly plan',
      'Priority support',
      'Advanced analytics',
      'Save 16% compared to monthly'
    ],
    popular: false
  }
];

const Pricing: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = (planId: string) => {
    if (!isAuthenticated) {
      toast.info("Please sign in to subscribe");
      navigate('/signup', { state: { from: '/pricing', planId } });
      return;
    }
    
    navigate(`/checkout/${planId}`);
  };

  return (
    <MainLayout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Title level={2}>Simple, Transparent Pricing</Title>
            <Paragraph className="text-lg text-gray-600">
              Choose the plan that works for your business needs
            </Paragraph>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`h-full relative ${plan.popular ? 'border-virtucalls-primary shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-virtucalls-primary text-white px-4 py-1 text-sm rounded-bl-lg">
                    Popular
                  </div>
                )}
                <div className="text-center">
                  <Title level={3} className="mb-1">{plan.name}</Title>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.currency} {plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-3 text-left mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircleFilled className="text-virtucalls-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    type={plan.popular ? "primary" : "default"}
                    size="large" 
                    block
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
