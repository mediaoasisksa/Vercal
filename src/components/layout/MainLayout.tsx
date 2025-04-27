
import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Navbar from './Navbar';
import Footer from './Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="min-h-screen flex flex-col">
      <Navbar />
      <Content className="flex-1">
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
