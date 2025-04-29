import React from 'react';
import { Button, Typography, Card, Row, Col, Divider, Avatar } from 'antd';
import { CheckCircleFilled, UserOutlined, VideoCameraOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const { Title, Paragraph } = Typography;

// Mock data for testimonials
const testimonials = [];

const Index: React.FC = () => {
  // Check if testimonials exist
  const hasTestimonials = testimonials.length > 0;
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-virtucalls-primary to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <div className="space-y-6">
                <Title level={1} className="!text-white m-0">
                  Your Branded Virtual Meeting Experience
                </Title>
                <Paragraph className="text-lg text-white opacity-90">
                  Create your own customizable virtual meeting rooms with your brand, your domain, your way.
                  Impress clients and enhance team collaboration with a professional touch.
                </Paragraph>
                <div className="pt-4">
                  <Link to="/signup">
                    <Button type="default" size="large" className="mr-4 text-virtucalls-primary font-medium">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button type="text" size="large" className="text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12} className="flex justify-center">
              <img 
                src="/images/home_1.jpg"
                alt="Virtual Meeting Platform" 
                className="max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </Col>
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Title level={2} className="text-virtucalls-primary">Why Choose VirtuCalls?</Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers a unique branded meeting experience that stands out from standard video conferencing tools.
            </Paragraph>
          </div>

          <Row gutter={[32, 32]} className="mb-8">
            <Col xs={24} md={8}>
              <Card className="h-full shadow-sm hover:shadow-md transition-shadow border-t-4 border-virtucalls-primary">
                <div className="text-center">
                  <UserOutlined className="text-4xl text-virtucalls-primary mb-4" />
                  <Title level={4}>Custom Subdomains</Title>
                  <Paragraph className="text-gray-600">
                    Get your own personalized meeting URL that reflects your brand identity.
                  </Paragraph>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full shadow-sm hover:shadow-md transition-shadow border-t-4 border-virtucalls-primary">
                <div className="text-center">
                  <SettingOutlined className="text-4xl text-virtucalls-primary mb-4" />
                  <Title level={4}>Brand Customization</Title>
                  <Paragraph className="text-gray-600">
                    Add your logo, colors, and background to create a fully branded meeting room.
                  </Paragraph>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full shadow-sm hover:shadow-md transition-shadow border-t-4 border-virtucalls-primary">
                <div className="text-center">
                  <VideoCameraOutlined className="text-4xl text-virtucalls-primary mb-4" />
                  <Title level={4}>Professional Meetings</Title>
                  <Paragraph className="text-gray-600">
                    Impress clients and team members with a professional meeting environment.
                  </Paragraph>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Title level={2}>Simple, Transparent Pricing</Title>
            <Paragraph className="text-lg text-gray-600">
              Choose the plan that works for your business needs
            </Paragraph>
          </div>

          <Row gutter={[32, 32]} justify="center">
            {/* Monthly Plan */}
            <Col xs={24} sm={12} md={10} lg={8}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow relative">
                <div className="text-center">
                  <Title level={3} className="mb-1">Monthly</Title>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">$40</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-center">
                      <CheckCircleFilled className="text-virtucalls-primary mr-2" /> Custom subdomain
                    </li>
                    <li className="flex items-center">
                      <CheckCircleFilled className="text-virtucalls-primary mr-2" /> Brand customization
                    </li>
                    <li className="flex items-center">
                      <CheckCircleFilled className="text-virtucalls-primary mr-2" /> Unlimited meetings
                    </li>
                    <li className="flex items-center">
                      <CheckCircleFilled className="text-virtucalls-primary mr-2" /> Up to 100 participants
                    </li>
                  </ul>
                  <Button type="primary" size="large" block onClick={() => navigate('/pricing')}>
                    Subscribe Now
                  </Button>
                </div>
              </Card>
            </Col>

            {/* Annual Plan */}
            <Col xs={24} sm={12} md={10} lg={8}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow border">
              <div className="absolute top-0 right-0 bg-virtucalls-primary text-white px-4 py-1 text-sm rounded-bl-lg">
                  Popular
                </div>
                <div className="text-center">
                  <Title level={3} className="mb-1">Annual</Title>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">$4340</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-center">
                      <CheckCircleFilled className="text-virtucalls-primary mr-2" /> Everything in Monthly plan
                    </li>
                    <li className="flex items-center">
                      <CheckCircleFilled className="text-virtucalls-primary mr-2" /> Priority support
                    </li>
                    <li className="flex items-center">
                      <CheckCircleFilled className="text-virtucalls-primary mr-2" /> Advanced analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircleFilled className="text-virtucalls-primary mr-2" /> Save 16% compared to monthly
                    </li>
                  </ul>
                  <Button type="primary" size="large" block onClick={() => navigate('/pricing')}>
                    Subscribe Now
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <Row justify="center" align="middle">
      <Col xs={24} md={12}>
        {/* wrapper to constrain width, center text & add vertical rhythm */}
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          
          {/* Section title */}
          <Title level={2} className="text-virtucalls-primary">
            About VirtuCalls
          </Title>

          {/* little decorative underline */}
          <div className="w-16 h-1 bg-virtucalls-primary mx-auto rounded" />

          {/* Body copy */}
          <Paragraph className="text-lg text-gray-600">
            VirtuCalls was created to solve a common problem faced by businesses everywhere: the need for professional,
            branded virtual meeting spaces that reflect their company identity.
          </Paragraph>
          <Paragraph className="text-gray-600">
            Our team of experts in video conferencing and brand experience have built a platform that empowers businesses
            to create memorable meeting experiences that stand out from the competition.
          </Paragraph>
          <Paragraph className="text-gray-600">
            With VirtuCalls, you’re not just joining another video call—you’re inviting participants into your
            branded digital space, enhancing your professional image and making lasting impressions.
          </Paragraph>
        </div>
      </Col>
    </Row>
  </div>
</section>

      {/* Testimonials Section - conditionally rendered */}
      {hasTestimonials && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Title level={2}>What Our Customers Say</Title>
              <Divider className="my-4" />
            </div>
            
            <Row gutter={[32, 32]}>
              {testimonials.map(testimonial => (
                <Col key={testimonial.id} xs={24} md={8}>
                  <Card className="h-full shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <Paragraph className="text-gray-600 italic">"{testimonial.testimonial}"</Paragraph>
                      </div>
                      <div className="mt-auto pt-4 flex items-center">
                        <Avatar 
                          icon={<UserOutlined />} 
                          className="bg-virtucalls-primary" 
                          size="large"
                        />
                        <div className="ml-3">
                          <p className="font-medium mb-0">{testimonial.name}</p>
                          <p className="text-sm text-gray-500 mb-0">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-virtucalls-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <Title level={2} className="text-white mb-4">Ready to Transform Your Virtual Meetings?</Title>
          <Paragraph className="text-lg text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have elevated their virtual presence with VirtuCalls.
          </Paragraph>
          <Link to="/signup">
            <Button size="large" type="default" className="text-virtucalls-primary font-medium">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
