
import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload, Typography, Tabs, Radio, Row, Col, Alert, Divider, Select, ColorPicker } from 'antd';
import { UploadOutlined, PictureOutlined, SaveOutlined, EyeOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import type { UploadFile } from 'antd';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Mock data for room settings
const initialRoomSettings = {
  title: 'My Meeting Room',
  welcomeMessage: 'Welcome to my virtual meeting room!',
  logo: null,
  backgroundType: 'color',
  backgroundColor: '#f0f2f5',
  backgroundImage: null,
  primaryColor: '#1890ff',
  theme: 'light',
  layout: 'grid',
  watermark: true
};

const RoomSettings: React.FC = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<UploadFile[]>([]);
  const [backgroundFile, setBackgroundFile] = useState<UploadFile[]>([]);
  const [backgroundType, setBackgroundType] = useState<'color' | 'image'>(initialRoomSettings.backgroundType as 'color' | 'image');
  const [previewVisible, setPreviewVisible] = useState(false);
  
  const isSubscribed = user?.isSubscribed || false;

  React.useEffect(() => {
    // Initialize form with mock settings
    form.setFieldsValue(initialRoomSettings);
  }, [form]);

  const handleRoomSettingsUpdate = async (values: any) => {
    if (!isSubscribed) {
      setError('You need to subscribe to save room settings.');
      return;
    }
    
    setLoading(true);
    setSuccess(null);
    setError(null);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const settings = {
        ...values,
        backgroundType,
        logo: logoFile.length > 0 ? logoFile[0] : null,
        backgroundImage: backgroundFile.length > 0 ? backgroundFile[0] : null,
      };
      
      console.log('Saving room settings:', settings);
      setSuccess('Room settings updated successfully!');
    } catch (error) {
      setError('Failed to update room settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackgroundTypeChange = (e: RadioChangeEvent) => {
    setBackgroundType(e.target.value);
  };

  const handlePreview = () => {
    if (!isSubscribed) {
      setError('You need to subscribe to preview room settings.');
      return;
    }
    setPreviewVisible(true);
  };

  const previewUrl = user?.subdomain ? `https://${user.subdomain}.virtucalls.com` : '';

  return (
    <DashboardLayout title="Room Settings">
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

        {!isSubscribed && (
          <Alert
            message="Subscription Required"
            description={
              <div>
                <p>You need to subscribe to customize and save room settings.</p>
                <Button type="primary" href="/pricing" className="mt-2">
                  Subscribe Now
                </Button>
              </div>
            }
            type="warning"
            showIcon
            className="mb-6"
          />
        )}

        <Card className="shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <Title level={4} className="m-0">Customize Your Meeting Room</Title>
            <Button 
              type="primary"
              icon={<EyeOutlined />}
              onClick={handlePreview}
              disabled={!isSubscribed}
            >
              Preview
            </Button>
          </div>

          <Paragraph className="text-gray-600 mb-6">
            Customize how your virtual meeting room looks to participants.
            {isSubscribed && user?.subdomain && (
              <span className="block mt-2">
                Your room will be available at: <a 
                  href={previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-virtucalls-primary"
                >
                  {user.subdomain}.virtucalls.com
                </a>
              </span>
            )}
          </Paragraph>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleRoomSettingsUpdate}
            disabled={!isSubscribed}
          >
            <Tabs defaultActiveKey="branding">
              <TabPane tab="Branding" key="branding">
                <Row gutter={24}>
                  <Col xs={24} md={14}>
                    <Form.Item
                      label="Room Title"
                      name="title"
                      rules={[{ required: true, message: 'Please enter a room title' }]}
                    >
                      <Input placeholder="My Meeting Room" />
                    </Form.Item>

                    <Form.Item
                      label="Welcome Message"
                      name="welcomeMessage"
                      rules={[{ required: true, message: 'Please enter a welcome message' }]}
                    >
                      <Input.TextArea 
                        placeholder="Welcome to my virtual meeting room!" 
                        rows={3}
                      />
                    </Form.Item>
                    
                    <Form.Item
                      label="Primary Color"
                      name="primaryColor"
                      tooltip="This color will be used for buttons and accents in your room"
                    >
                      <ColorPicker />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={10}>
                    <Form.Item
                      label="Logo"
                      name="logo"
                      tooltip="Upload your company or personal logo"
                    >
                      <Upload
                        listType="picture-card"
                        fileList={logoFile}
                        onChange={({ fileList }) => setLogoFile(fileList)}
                        beforeUpload={() => false}
                        maxCount={1}
                      >
                        {logoFile.length === 0 && (
                          <div>
                            <UploadOutlined />
                            <div className="mt-2">Upload</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </TabPane>
              
              <TabPane tab="Background" key="background">
                <Form.Item label="Background Type">
                  <Radio.Group value={backgroundType} onChange={handleBackgroundTypeChange}>
                    <Radio value="color">Solid Color</Radio>
                    <Radio value="image">Background Image</Radio>
                  </Radio.Group>
                </Form.Item>

                {backgroundType === 'color' && (
                  <Form.Item
                    label="Background Color"
                    name="backgroundColor"
                  >
                    <ColorPicker />
                  </Form.Item>
                )}

                {backgroundType === 'image' && (
                  <Form.Item
                    label="Background Image"
                    name="backgroundImage"
                  >
                    <Upload
                      listType="picture-card"
                      fileList={backgroundFile}
                      onChange={({ fileList }) => setBackgroundFile(fileList)}
                      beforeUpload={() => false}
                      maxCount={1}
                    >
                      {backgroundFile.length === 0 && (
                        <div>
                          <PictureOutlined />
                          <div className="mt-2">Upload</div>
                        </div>
                      )}
                    </Upload>
                    <Paragraph className="text-gray-500 text-xs mt-1">
                      Recommended size: 1920x1080px. Max file size: 5MB.
                    </Paragraph>
                  </Form.Item>
                )}
              </TabPane>
              
              <TabPane tab="Layout" key="layout">
                <Form.Item
                  label="Theme"
                  name="theme"
                >
                  <Select>
                    <Option value="light">Light</Option>
                    <Option value="dark">Dark</Option>
                    <Option value="custom">Custom (based on Primary Color)</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Video Layout"
                  name="layout"
                >
                  <Select>
                    <Option value="grid">Grid</Option>
                    <Option value="spotlight">Spotlight (Focus on active speaker)</Option>
                    <Option value="sidebar">Sidebar</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="watermark"
                  valuePropName="checked"
                  label="Display Watermark"
                >
                  <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </TabPane>
            </Tabs>
            
            <Divider />
            
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SaveOutlined />}
                disabled={!isSubscribed}
              >
                Save Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RoomSettings;
