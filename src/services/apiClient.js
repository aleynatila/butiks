import axios from 'axios';
import storage from '../utils/storage';
import API_BASE_URL from './api.config';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = storage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - only clear and redirect if not on auth pages
          const isAuthPage = ['/auth', '/login', '/register'].includes(window.location.pathname);
          const isLoginRequest = error.config?.url?.includes('/auth/login');
          
          // Don't clear tokens if this is a login attempt that failed
          if (!isAuthPage && !isLoginRequest) {
            storage.removeItem('authToken');
            storage.removeItem('user');
            window.location.href = '/auth';
          }
          break;

        case 403:
          // Forbidden
          console.error('Access forbidden:', data.message);
          break;

        case 404:
          // Not found
          console.error('Resource not found:', data.message);
          break;

        case 429:
          // Too many requests - add friendly message to error
          data.message = 'Çok fazla deneme yaptınız. Lütfen birkaç dakika sonra tekrar deneyin.';
          break;

        case 500:
          // Server error
          console.error('Server error:', data.message);
          break;

        default:
          console.error('API Error:', data.message || 'Unknown error');
      }

      return Promise.reject(data || error);
    } else if (error.request) {
      // Request made but no response
      console.error('Network error: No response from server');
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

// Helper function to handle API errors consistently
export const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  } else if (error.message) {
    return error.message;
  } else {
    return 'An unexpected error occurred';
  }
};

export default apiClient;
