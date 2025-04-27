
import React from 'react';
import { Card, Button, Typography, Divider, Alert, Row, Col, Tooltip } from 'antd';
import { VideoCameraOutlined, CopyOutlined, SettingOutlined, ShareAltOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const { Title, Paragraph, Text } = Typography;

const JoinRoom: React.FC = () => {
  const { user } = useAuth();
  const isSubscribed = user?.isSubscribed || false;
  const subdomain = user?.subdomain || 'your-subdomain';
  const roomUrl = `https://${subdomain}.virtucalls.com`;
  
  const [copied, setCopied] = React.useState(false);
  
  // Copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isSubscribed) {
    return (
      <DashboardLayout title="Join Room">
        <Card className="shadow-sm">
          <div className="text-center py-8">
            <Title level={4} className="mb-4">Subscription Required</Title>
            <Paragraph className="text-gray-600 mb-6">
              You need an active subscription to access your meeting room.
            </Paragraph>
            <Link to="/pricing">
              <Button type="primary" size="large">
                Subscribe Now
              </Button>
            </Link>
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Join Room">
      <div className="space-y-6">
        <Card className="shadow-sm">
          <div className="text-center py-6">
            <Title level={3} className="mb-4 text-virtucalls-primary">Your Meeting Room</Title>
            <Paragraph className="text-lg mb-6">
              Ready to start or join your meeting as a moderator?
            </Paragraph>
            
            <Button 
              type="primary" 
              size="large"
              icon={<VideoCameraOutlined />}
              href={roomUrl}
              target="_blank"
              className="mb-6 px-8"
            >
              Enter Room as Moderator
            </Button>
            
            <div className="max-w-lg mx-auto">
              <Alert
                message={
                  <div className="flex items-center justify-between">
                    <Text ellipsis className="flex-1">{roomUrl}</Text>
                    <Tooltip title={copied ? "Copied!" : "Copy URL"}>
                      <Button 
                        type="text" 
                        icon={<CopyOutlined />} 
                        onClick={copyToClipboard}
                      />
                    </Tooltip>
                  </div>
                }
                type="info"
              />
              <Paragraph className="text-sm text-gray-500 mt-2 text-left">
                Share this link with participants. They'll join as regular users.
              </Paragraph>
            </div>
          </div>
        </Card>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card className="h-full">
              <div className="flex items-start">
                <div className="bg-virtucalls-primary bg-opacity-10 p-3 rounded-lg mr-4">
                  <SettingOutlined className="text-xl text-virtucalls-primary" />
                </div>
                <div>
                  <Title level={5}>Customize Room</Title>
                  <Paragraph className="text-gray-600 mb-4">
                    Change the appearance and settings of your meeting room.
                  </Paragraph>
                  <Link to="/dashboard/room">
                    <Button type="default">
                      Room Settings
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card className="h-full">
              <div className="flex items-start">
                <div className="bg-virtucalls-primary bg-opacity-10 p-3 rounded-lg mr-4">
                  <ShareAltOutlined className="text-xl text-virtucalls-primary" />
                </div>
                <div>
                  <Title level={5}>Share Room</Title>
                  <Paragraph className="text-gray-600 mb-4">
                    Invite participants to join your meeting room.
                  </Paragraph>
                  <Button type="default" onClick={copyToClipboard}>
                    Copy Invite Link
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        
        <Card className="shadow-sm">
          <Title level={4}>Moderator vs. Participant</Title>
          <Divider />
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <div className="flex items-start">
                <div className="bg-virtucalls-primary p-3 rounded-full mr-4">
                  <UserOutlined className="text-lg text-white" />
                </div>
                <div>
                  <Title level={5}>Moderator Privileges (You)</Title>
                  <ul className="text-gray-600 pl-5 list-disc">
                    <li>Mute/unmute all participants</li>
                    <li>Remove participants from the meeting</li>
                    <li>Start/stop recording</li>
                    <li>Control screen sharing permissions</li>
                    <li>End meeting for all participants</li>
                  </ul>
                </div>
              </div>
            </Col>
            
            <Col xs={24} md={12}>
              <div className="flex items-start">
                <div className="bg-gray-200 p-3 rounded-full mr-4">
                  <UserOutlined className="text-lg text-gray-600" />
                </div>
                <div>
                  <Title level={5}>Participant Access (Others)</Title>
                  <ul className="text-gray-600 pl-5 list-disc">
                    <li>Join with audio and video</li>
                    <li>Chat with other participants</li>
                    <li>Share screen (if enabled by moderator)</li>
                    <li>Raise hand to get attention</li>
                    <li>Leave meeting at any time</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default JoinRoom;
