
import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, Spin, Alert } from 'antd';
import { useParams } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

// Mock function to fetch room settings
const fetchRoomSettings = async (subdomain: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return {
    title: `${subdomain}'s Meeting Room`,
    welcomeMessage: 'Welcome to my virtual meeting room!',
    logo: null,
    backgroundType: 'color',
    backgroundColor: '#f0f2f5',
    primaryColor: '#1890ff',
    theme: 'light',
    owner: {
      name: subdomain.charAt(0).toUpperCase() + subdomain.slice(1),
      email: `${subdomain}@example.com`
    }
  };
};

const MeetingRoom: React.FC = () => {
  const { subdomain } = useParams<{ subdomain: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roomSettings, setRoomSettings] = useState<any>(null);
  
  useEffect(() => {
    const loadRoomSettings = async () => {
      try {
        if (!subdomain) {
          throw new Error('Invalid room URL');
        }
        
        const settings = await fetchRoomSettings(subdomain);
        setRoomSettings(settings);
      } catch (err) {
        setError('Unable to load meeting room. This room may not exist.');
        console.error('Error loading room:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadRoomSettings();
  }, [subdomain]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
        <Text className="ml-3">Loading meeting room...</Text>
      </div>
    );
  }

  if (error || !roomSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert
          type="error"
          message="Meeting Room Not Found"
          description={error || 'The requested meeting room does not exist or is unavailable.'}
          action={
            <Button type="primary" href="/">
              Go to Homepage
            </Button>
          }
        />
      </div>
    );
  }

  // Setting theme based on room settings
  const backgroundColor = roomSettings.backgroundType === 'color' 
    ? roomSettings.backgroundColor 
    : 'white';
  
  const primaryColor = roomSettings.primaryColor || '#1890ff';

  return (
    <Layout className="min-h-screen" style={{ backgroundColor }}>
      <Header className="bg-white shadow-sm flex items-center justify-between px-4">
        <div className="flex items-center">
          {roomSettings.logo ? (
            <img 
              src={roomSettings.logo} 
              alt="Room Logo" 
              className="h-8 mr-3" 
            />
          ) : (
            <div className="text-lg font-bold" style={{ color: primaryColor }}>
              VirtuCalls
            </div>
          )}
          <Title level={5} className="m-0 ml-2 hidden md:block">
            {roomSettings.title}
          </Title>
        </div>
        
        <div>
          <Text className="text-gray-600">
            Hosted by {roomSettings.owner.name}
          </Text>
        </div>
      </Header>
      
      <Content className="p-4 md:p-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <Title level={4} style={{ color: primaryColor }}>
              {roomSettings.welcomeMessage}
            </Title>
            <Text className="block mt-2">
              You're joining {roomSettings.owner.name}'s meeting room. The meeting will begin when you join.
            </Text>
          </div>
          
          {/* Meeting iframe container */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 300px)', minHeight: '500px' }}>
            {/* This is where the meeting iframe would go */}
            <div className="h-full flex items-center justify-center flex-col text-white">
              <Title level={3} className="text-white mb-6">Meeting Room</Title>
              <Text className="text-gray-300 mb-4">
                This is where the actual meeting interface will be loaded in an iframe.
              </Text>
              <Button type="primary" size="large">
                Join Meeting
              </Button>
            </div>
          </div>
        </div>
      </Content>
      
      <Footer className="text-center bg-white mt-auto">
        <Text className="text-gray-500">
          Powered by VirtuCalls © {new Date().getFullYear()}
        </Text>
      </Footer>
    </Layout>
  );
};

export default MeetingRoom;
