
import React, { useState } from 'react';
import { Card, Form, Input, Button, Divider, Alert, Typography, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, GlobalOutlined, LockOutlined } from '@ant-design/icons';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const { Title, Paragraph } = Typography;

const AccountSettings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with user data
  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        subdomain: user.subdomain || '',
      });
    }
  }, [user, form]);

  const handleProfileUpdate = async (values: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if subdomain is unique (mock validation)
      if (values.subdomain !== user?.subdomain && Math.random() > 0.7) {
        throw new Error('This subdomain is already taken. Please choose another.');
      }
      
      // Update user profile
      updateUser({
        name: values.name,
        email: values.email,
        subdomain: values.subdomain,
      });
      
      setSuccess('Profile updated successfully!');
    } catch (error: any) {
      setError(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (values: any) => {
    setPasswordLoading(true);
    setSuccess(null);
    setError(null);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock password validation
      if (values.newPassword !== values.confirmPassword) {
        throw new Error('New passwords do not match.');
      }
      
      // Password updated successfully
      setSuccess('Password updated successfully!');
      passwordForm.resetFields();
    } catch (error: any) {
      setError(error.message || 'Failed to update password. Please try again.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <DashboardLayout title="Account Settings">
      <div className="space-y-6">
        {success && (
          <Alert
            message="Success"
            description={success}
            type="success"
            showIcon
            closable
            onClose={() => setSuccess(null)}
          />
        )}
        
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
          />
        )}

        <Card className="shadow-sm">
          <Title level={4}>Profile Information</Title>
          <Paragraph className="text-gray-600 mb-6">
            Update your account details and customize your subdomain.
          </Paragraph>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleProfileUpdate}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input 
                    prefix={<UserOutlined className="text-gray-400" />} 
                    placeholder="Your Name" 
                  />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined className="text-gray-400" />} 
                    placeholder="your.email@example.com" 
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="subdomain"
              label={
                <span>
                  Custom Subdomain
                  {!user?.isSubscribed && (
                    <span className="text-yellow-500 ml-2">(Subscribe to activate)</span>
                  )}
                </span>
              }
              extra={
                <span>
                  Your meeting room will be available at: 
                  <strong className="ml-1 text-virtucalls-primary">
                    {form.getFieldValue('subdomain') || 'yourname'}.virtucalls.com
                  </strong>
                </span>
              }
              rules={[
                { required: true, message: 'Please enter a subdomain' },
                { pattern: /^[a-z0-9-]+$/, message: 'Subdomain can only contain lowercase letters, numbers, and hyphens' },
                { min: 3, max: 20, message: 'Subdomain must be between 3-20 characters' }
              ]}
            >
              <Input 
                prefix={<GlobalOutlined className="text-gray-400" />} 
                placeholder="your-subdomain"
                disabled={!user?.isSubscribed}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card className="shadow-sm">
          <Title level={4}>Change Password</Title>
          <Paragraph className="text-gray-600 mb-6">
            Update your password to keep your account secure.
          </Paragraph>

          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordUpdate}
          >
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                  rules={[{ required: true, message: 'Please enter your current password' }]}
                >
                  <Input.Password 
                    prefix={<LockOutlined className="text-gray-400" />} 
                    placeholder="Current Password" 
                  />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={8}>
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    { required: true, message: 'Please enter a new password' },
                    { min: 8, message: 'Password must be at least 8 characters' }
                  ]}
                >
                  <Input.Password 
                    prefix={<LockOutlined className="text-gray-400" />} 
                    placeholder="New Password" 
                  />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={8}>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm New Password"
                  rules={[
                    { required: true, message: 'Please confirm your new password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match'));
                      },
                    }),
                  ]}
                >
                  <Input.Password 
                    prefix={<LockOutlined className="text-gray-400" />} 
                    placeholder="Confirm New Password" 
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={passwordLoading}
              >
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card className="shadow-sm">
          <Title level={4}>Subscription Status</Title>
          <Paragraph className="text-gray-600 mb-4">
            {user?.isSubscribed 
              ? "You currently have an active subscription."
              : "You don't have an active subscription. Subscribe to access all features."}
          </Paragraph>

          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full ${user?.isSubscribed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {user?.isSubscribed ? 'Active' : 'Inactive'}
            </div>
            
            {!user?.isSubscribed && (
              <Button type="primary" href="/pricing">
                Subscribe Now
              </Button>
            )}
            
            {user?.isSubscribed && (
              <Button type="default">
                Manage Subscription
              </Button>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AccountSettings;
