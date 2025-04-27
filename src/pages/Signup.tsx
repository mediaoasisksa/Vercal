
import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';

const { Title, Paragraph } = Typography;

const Signup: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { name: string; email: string; password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signup(values.name, values.email, values.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="py-16 bg-gray-50 min-h-[calc(100vh-64px-200px)] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-md">
              <div className="text-center mb-6">
                <Title level={2} className="text-virtucalls-primary">Create Account</Title>
                <Paragraph className="text-gray-600">
                  Sign up to create your branded virtual meeting room
                </Paragraph>
              </div>

              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  className="mb-6"
                  closable
                  onClose={() => setError(null)}
                />
              )}

              <Form
                name="signup"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                  <Input 
                    prefix={<UserOutlined className="text-gray-400" />} 
                    placeholder="Full Name" 
                    size="large" 
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email address!' }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined className="text-gray-400" />} 
                    placeholder="Email" 
                    size="large" 
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 8, message: 'Password must be at least 8 characters!' }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  rules={[
                    { required: true, message: 'Please confirm your password!' }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Confirm Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item className="mb-2">
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    block
                    size="large"
                  >
                    Create Account
                  </Button>
                </Form.Item>
              </Form>

              <Divider plain>Already have an account?</Divider>
              
              <div className="text-center">
                <Link to="/login">
                  <Button type="default" block size="large">
                    Sign In
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
