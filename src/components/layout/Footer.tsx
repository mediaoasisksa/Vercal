
import React from 'react';
import { Layout, Row, Col, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-gray-100 mt-auto pt-6 pb-4">
      <div className="container mx-auto">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <div className="mb-4">
              <Title level={5} className="text-virtucalls-primary mb-4">VirtuCalls</Title>
              <Text className="text-gray-600">
                Transform your virtual meetings with customizable, branded experiences.
                Create your own virtual meeting domain to impress clients and colleagues alike.
              </Text>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Title level={5} className="mb-4">Quick Links</Title>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-600 hover:text-virtucalls-primary">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-virtucalls-primary">About Us</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-virtucalls-primary">Pricing</Link>
              <Link to="/login" className="text-gray-600 hover:text-virtucalls-primary">Login</Link>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Title level={5} className="mb-4">Support</Title>
            <div className="flex flex-col space-y-2">
              <Link to="/faq" className="text-gray-600 hover:text-virtucalls-primary">FAQ</Link>
              <Link to="/contact" className="text-gray-600 hover:text-virtucalls-primary">Contact Us</Link>
              <Link to="/privacy" className="text-gray-600 hover:text-virtucalls-primary">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-600 hover:text-virtucalls-primary">Terms of Service</Link>
            </div>
          </Col>
        </Row>
        
        <Divider className="my-4" />
        
        <div className="text-center">
          <Text className="text-gray-500">© {new Date().getFullYear()} VirtuCalls. All rights reserved.</Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
