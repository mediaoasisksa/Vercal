
import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';

const { Title, Paragraph } = Typography;

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  // If user is already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      await login(values.email, values.password);
      // Navigation will be handled by the useEffect above
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials and try again.');
      console.error('Login error:', err);
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
                <Title level={2} className="text-virtucalls-primary">Welcome Back</Title>
                <Paragraph className="text-gray-600">
                  Sign in to access your branded virtual meeting room
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
                name="login"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email address!' }
                  ]}
                >
                  <Input 
                    prefix={<UserOutlined className="text-gray-400" />} 
                    placeholder="Email" 
                    size="large" 
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Password"
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
                    Sign In
                  </Button>
                </Form.Item>

                <div className="text-center mb-2">
                  <Link to="/forgot-password" className="text-virtucalls-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </Form>

              <Divider plain>Don't have an account?</Divider>
              
              <div className="text-center">
                <Link to="/signup">
                  <Button type="default" block size="large">
                    Create Account
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

export default Login;
