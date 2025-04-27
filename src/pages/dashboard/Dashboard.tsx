
import React from 'react';
import { Row, Col, Card, Typography, Statistic, Button, Divider } from 'antd';
import { UserOutlined, VideoCameraOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isSubscribed = user?.isSubscribed || false;

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Card */}
        <Card className="shadow-sm">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={16}>
              <Title level={3} className="m-0 mb-2">Welcome, {user?.name || 'User'}</Title>
              <Paragraph className="text-gray-600 mb-4">
                Manage your virtual meeting room settings and account details from this dashboard.
              </Paragraph>
              
              {isSubscribed ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/dashboard/room">
                    <Button type="primary" icon={<SettingOutlined />}>
                      Customize Room
                    </Button>
                  </Link>
                  <Link to="/dashboard/join">
                    <Button icon={<VideoCameraOutlined />}>
                      Join Your Room
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/pricing">
                    <Button type="primary">
                      Subscribe Now
                    </Button>
                  </Link>
                  <Link to="/dashboard/account">
                    <Button icon={<UserOutlined />}>
                      Account Settings
                    </Button>
                  </Link>
                </div>
              )}
            </Col>
            <Col xs={24} md={8}>
              <Card className={`border-t-4 ${isSubscribed ? 'border-green-500' : 'border-yellow-500'}`}>
                <Statistic 
                  title="Subscription Status" 
                  value={isSubscribed ? "Active" : "Inactive"} 
                  valueStyle={{ color: isSubscribed ? '#52c41a' : '#faad14' }}
                />
                {isSubscribed && user?.subdomain && (
                  <Paragraph className="mt-2 mb-0">
                    Your room: <a href={`https://${user.subdomain}.virtucalls.com`} target="_blank" rel="noopener noreferrer" className="font-medium text-virtucalls-primary">
                      {user.subdomain}.virtucalls.com
                    </a>
                  </Paragraph>
                )}
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Quick Actions */}
        <div>
          <Title level={4} className="mb-4">Quick Actions</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={8}>
              <Link to="/dashboard/account">
                <Card hoverable className="h-full">
                  <div className="flex flex-col items-center text-center">
                    <UserOutlined className="text-3xl text-virtucalls-primary mb-2" />
                    <Title level={5} className="m-0 mb-2">Account Settings</Title>
                    <Paragraph className="text-gray-600 mb-0">
                      Update your profile and account details
                    </Paragraph>
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Link to="/dashboard/room">
                <Card hoverable className="h-full">
                  <div className="flex flex-col items-center text-center">
                    <SettingOutlined className="text-3xl text-virtucalls-primary mb-2" />
                    <Title level={5} className="m-0 mb-2">Room Settings</Title>
                    <Paragraph className="text-gray-600 mb-0">
                      Customize your virtual meeting room
                    </Paragraph>
                  </div>
                </Card>
              </Link>
            </Col>
            
            {isSubscribed && (
              <Col xs={24} sm={12} lg={8}>
                <Link to="/dashboard/join">
                  <Card hoverable className="h-full">
                    <div className="flex flex-col items-center text-center">
                      <VideoCameraOutlined className="text-3xl text-virtucalls-primary mb-2" />
                      <Title level={5} className="m-0 mb-2">Join Room</Title>
                      <Paragraph className="text-gray-600 mb-0">
                        Enter your virtual meeting room
                      </Paragraph>
                    </div>
                  </Card>
                </Link>
              </Col>
            )}
            
            {!isSubscribed && (
              <Col xs={24} sm={12} lg={8}>
                <Link to="/pricing">
                  <Card hoverable className="h-full border-dashed">
                    <div className="flex flex-col items-center text-center">
                      <VideoCameraOutlined className="text-3xl text-gray-400 mb-2" />
                      <Title level={5} className="m-0 mb-2">Join Room</Title>
                      <Paragraph className="text-gray-500 mb-0">
                        Subscribe to access your meeting room
                      </Paragraph>
                    </div>
                  </Card>
                </Link>
              </Col>
            )}
          </Row>
        </div>

        {isSubscribed && (
          <div>
            <Divider />
            <Title level={4} className="mb-4">Room Information</Title>
            <Card className="shadow-sm">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Statistic
                    title="Your Room URL"
                    value={user?.subdomain ? `${user.subdomain}.virtucalls.com` : 'Not set'}
                    valueStyle={{ fontSize: '16px' }}
                  />
                  <Paragraph className="mt-2 text-gray-600">
                    Share this link with your meeting participants
                  </Paragraph>
                </Col>
                <Col xs={24} md={12}>
                  <Paragraph strong>Room Access</Paragraph>
                  <Paragraph className="text-gray-600">
                    When you join from this dashboard, you'll have admin privileges.
                    Others joining via the link will be regular participants.
                  </Paragraph>
                  <div className="mt-4">
                    <Link to="/dashboard/join">
                      <Button type="primary" icon={<VideoCameraOutlined />}>
                        Join as Admin
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
