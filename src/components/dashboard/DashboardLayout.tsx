
import React, { ReactNode, useState } from 'react';
import { Layout, Menu, Typography, Button, Drawer } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuOutlined, HomeOutlined, SettingOutlined, UserOutlined, LogoutOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { useIsMobile } from '../../hooks/use-mobile';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  // Only show join room option if user is subscribed
  const menuItems = [
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      key: '/dashboard/account',
      icon: <UserOutlined />,
      label: 'Account Settings',
      path: '/dashboard/account',
    },
    {
      key: '/dashboard/room',
      icon: <SettingOutlined />,
      label: 'Room Settings',
      path: '/dashboard/room',
    },
  ];

  // Add join room option if subscribed
  if (user?.isSubscribed) {
    menuItems.push({
      key: '/dashboard/join',
      icon: <VideoCameraOutlined />,
      label: 'Join Room',
      path: '/dashboard/join',
    });
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileMenuVisible(false);
    }
  };

  const renderMenu = () => (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname]}
      className="border-r-0"
      items={menuItems.map(item => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
        onClick: () => handleMenuClick(item.path),
      }))}
    />
  );

  return (
    <Layout className="min-h-screen">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider
          width={250}
          theme="light"
          className="shadow-md"
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
        >
          <div className="p-4 flex items-center justify-center border-b border-gray-200">
            <Link to="/" className="text-xl font-bold text-virtucalls-primary">
              VirtuCalls
            </Link>
          </div>
          {renderMenu()}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 ">
            <Button 
              type="text" 
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
              block
              className="text-left "
            >
              Logout
            </Button>
          </div>
        </Sider>
      )}

      <Layout className={!isMobile ? "ml-[250px]" : ""}>
        {/* Header */}
        <Header className="bg-white shadow-sm px-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            {isMobile && (
              <Button 
                type="text" 
                icon={<MenuOutlined />} 
                onClick={() => setMobileMenuVisible(true)}
                className="mr-3"
              />
            )}
            <Title level={4} className="m-0">{title}</Title>
          </div>
          
          <div className="flex items-center">
            <span className="mr-4 hidden sm:block">
              {user?.isSubscribed ? (
                <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  Subscribed
                </span>
              ) : (
                <span className="text-sm px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  Free
                </span>
              )}
            </span>
            
            <span className="text-gray-700">
              {user?.name || "User"}
            </span>
          </div>
        </Header>

        {/* Content */}
        <Content className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
          {children}
        </Content>
      </Layout>

      {/* Mobile Drawer Menu */}
      <Drawer
        title={
          <div className="text-virtucalls-primary font-bold">VirtuCalls</div>
        }
        placement="left"
        onClose={() => setMobileMenuVisible(false)}
        open={isMobile && mobileMenuVisible}
        bodyStyle={{ padding: 0 }}
      >
        {renderMenu()}
        <div className="p-4 border-t border-gray-200">
          <Button 
            type="text" 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
            block
            className="text-left"
          >
            Logout
          </Button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default DashboardLayout;
