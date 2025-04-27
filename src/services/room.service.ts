
import api from './api';

export interface RoomSettings {
  id: string;
  userId: string;
  title: string;
  welcomeMessage: string;
  logoUrl?: string;
  backgroundType: 'color' | 'image';
  backgroundColor: string;
  backgroundImageUrl?: string;
  primaryColor: string;
  theme: 'light' | 'dark' | 'custom';
  layout: 'grid' | 'spotlight' | 'sidebar';
  watermark: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateRoomData {
  title?: string;
  welcomeMessage?: string;
  logoUrl?: string;
  backgroundType?: 'color' | 'image';
  backgroundColor?: string;
  backgroundImageUrl?: string;
  primaryColor?: string;
  theme?: 'light' | 'dark' | 'custom';
  layout?: 'grid' | 'spotlight' | 'sidebar';
  watermark?: boolean;
}

const RoomSettingsService = {
  async get(userId: string): Promise<RoomSettings> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response
      const mockData: RoomSettings = {
        id: '1',
        userId,
        title: 'My Meeting Room',
        welcomeMessage: 'Welcome to my virtual meeting room!',
        backgroundType: 'color',
        backgroundColor: '#f0f2f5',
        primaryColor: '#1890ff',
        theme: 'light',
        layout: 'grid',
        watermark: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.get(`/rooms/${userId}`);
      // return response.data;
    } catch (error) {
      console.error('Get room settings error:', error);
      throw error;
    }
  },
  
  async update(userId: string, data: UpdateRoomData): Promise<RoomSettings> {
    try {
      // Get current settings first
      const currentSettings = await this.get(userId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock update response with merged data
      const mockData: RoomSettings = {
        ...currentSettings,
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.put(`/rooms/${userId}`, data);
      // return response.data;
    } catch (error) {
      console.error('Update room settings error:', error);
      throw error;
    }
  },
  
  async createInitial(userId: string): Promise<RoomSettings> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock creation response
      const mockData: RoomSettings = {
        id: '1',
        userId,
        title: 'My Meeting Room',
        welcomeMessage: 'Welcome to my virtual meeting room!',
        backgroundType: 'color',
        backgroundColor: '#f0f2f5',
        primaryColor: '#1890ff',
        theme: 'light',
        layout: 'grid',
        watermark: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return mockData;
      
      // Real implementation would be:
      // const response = await api.post('/rooms', { userId });
      // return response.data;
    } catch (error) {
      console.error('Create room settings error:', error);
      throw error;
    }
  }
};

export default RoomSettingsService;
