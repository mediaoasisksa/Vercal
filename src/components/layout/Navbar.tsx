
import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isAuthenticated, user, logout } = useAuth();
  
  const menuItems = [
    { key: '/', label: 'Home', path: '/' }
  ];

  return (
    <Header className="bg-white shadow-md flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-virtucalls-primary">VirtuCalls</span>
        </Link>
      </div>

      {/* Navigation Items - Desktop */}
      <div className="hidden md:flex">
        <Menu 
          mode="horizontal" 
          selectedKeys={[currentPath]}
          className="border-0 bg-transparent"
          style={{ lineHeight: '64px' }}
          items={menuItems.map(item => ({
            key: item.key,
            label: <Link to={item.path}>{item.label}</Link>
          }))}
        />
      </div>

      {/* Auth Buttons */}
      <div className="flex space-x-2 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">
              <Button type="primary" size="middle">Dashboard</Button>
            </Link>
            <Button type="default" size="middle" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button type="default" size="middle">Login</Button>
            </Link>
            <Link to="/signup">
              <Button type="primary" size="middle">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
