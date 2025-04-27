
import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication token to requests
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('virtucalls_user');
  if (user) {
    const parsedUser = JSON.parse(user);
    config.headers['Authorization'] = `Bearer ${parsedUser.token || ''}`;
  }
  return config;
});

export default api;
