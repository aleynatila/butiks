/**
 * Vendor API Service
 * All vendor-specific API calls
 */

import storage from '../utils/storage';

const BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Generic fetch wrapper with error handling
const fetchAPI = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = storage.getItem('authToken');
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, defaultOptions);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'API request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Vendor API Error:', error);
    throw error;
  }
};

// Vendor Dashboard API
export const vendorDashboardAPI = {
  // Get dashboard overview stats
  getOverview: async () => {
    return fetchAPI('/vendors/dashboard/overview');
  },

  // Get recent orders
  getRecentOrders: async (limit = 10) => {
    return fetchAPI(`/vendors/dashboard/recent-orders?limit=${limit}`);
  },
};

// Vendor Products API
export const vendorProductAPI = {
  // Get all vendor products
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return fetchAPI(`/vendors/products?${queryParams}`);
  },

  // Get single product
  getById: async (id) => {
    return fetchAPI(`/vendors/products/${id}`);
  },

  // Create new product
  create: async (productData) => {
    return fetchAPI('/vendors/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Update product
  update: async (id, productData) => {
    return fetchAPI(`/vendors/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  // Delete product
  delete: async (id) => {
    return fetchAPI(`/vendors/products/${id}`, {
      method: 'DELETE',
    });
  },

  // Bulk operations
  bulkUpdate: async (productIds, updateData) => {
    return fetchAPI('/vendors/products/bulk', {
      method: 'PATCH',
      body: JSON.stringify({ productIds, updateData }),
    });
  },

  bulkDelete: async (productIds) => {
    return fetchAPI('/vendors/products/bulk', {
      method: 'DELETE',
      body: JSON.stringify({ productIds }),
    });
  },

  // Upload product images
  uploadImages: async (productId, images) => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    const token = storage.getItem('authToken');
    return fetch(`${BASE_URL}/vendors/products/${productId}/images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(res => res.json());
  },

  // Delete product image
  deleteImage: async (productId, imageId) => {
    return fetchAPI(`/vendors/products/${productId}/images/${imageId}`, {
      method: 'DELETE',
    });
  },
};

// Vendor Orders API
export const vendorOrderAPI = {
  // Get all vendor orders
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return fetchAPI(`/vendors/orders?${queryParams}`);
  },

  // Get single order
  getById: async (id) => {
    return fetchAPI(`/vendors/orders/${id}`);
  },

  // Update order status
  updateStatus: async (id, status, note = '') => {
    return fetchAPI(`/vendors/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note }),
    });
  },

  // Add tracking number
  addTracking: async (id, trackingData) => {
    return fetchAPI(`/vendors/orders/${id}/tracking`, {
      method: 'POST',
      body: JSON.stringify(trackingData),
    });
  },

  // Add order note
  addNote: async (id, note) => {
    return fetchAPI(`/vendors/orders/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ note }),
    });
  },
};

// Vendor Analytics API
export const vendorAnalyticsAPI = {
  // Get analytics overview
  getOverview: async (dateRange = '30days') => {
    return fetchAPI(`/vendors/analytics/overview?range=${dateRange}`);
  },

  // Get revenue data
  getRevenue: async (period = 'monthly') => {
    return fetchAPI(`/vendors/analytics/revenue?period=${period}`);
  },

  // Get top products
  getTopProducts: async (limit = 10) => {
    return fetchAPI(`/vendors/analytics/top-products?limit=${limit}`);
  },

  // Get category performance
  getCategoryPerformance: async () => {
    return fetchAPI('/vendors/analytics/categories');
  },
};

// Vendor Finance API
export const vendorFinanceAPI = {
  // Get balance
  getBalance: async () => {
    return fetchAPI('/vendors/finance/balance');
  },

  // Get transactions
  getTransactions: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return fetchAPI(`/vendors/finance/transactions?${queryParams}`);
  },

  // Request withdrawal
  requestWithdrawal: async (amount, method = 'bank_transfer') => {
    return fetchAPI('/vendors/finance/withdrawal', {
      method: 'POST',
      body: JSON.stringify({ amount, method }),
    });
  },

  // Get withdrawal requests
  getWithdrawals: async () => {
    return fetchAPI('/vendors/finance/withdrawals');
  },

  // Get invoices
  getInvoices: async () => {
    return fetchAPI('/vendors/finance/invoices');
  },

  // Download invoice
  downloadInvoice: async (invoiceId) => {
    const token = storage.getItem('authToken');
    return fetch(`${BASE_URL}/vendors/finance/invoices/${invoiceId}/download`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(res => res.blob());
  },
};

// Vendor Customers API
export const vendorCustomerAPI = {
  // Get all customers
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return fetchAPI(`/vendors/customers?${queryParams}`);
  },

  // Get customer details
  getById: async (id) => {
    return fetchAPI(`/vendors/customers/${id}`);
  },

  // Get customer orders
  getCustomerOrders: async (customerId) => {
    return fetchAPI(`/vendors/customers/${customerId}/orders`);
  },
};

// Vendor Messages API
export const vendorMessageAPI = {
  // Get all conversations
  getConversations: async () => {
    return fetchAPI('/vendors/messages/conversations');
  },

  // Get conversation messages
  getMessages: async (conversationId) => {
    return fetchAPI(`/vendors/messages/conversations/${conversationId}`);
  },

  // Send message
  send: async (conversationId, message, attachments = []) => {
    const formData = new FormData();
    formData.append('message', message);
    attachments.forEach((file) => {
      formData.append('attachments', file);
    });

    const token = storage.getItem('authToken');
    return fetch(`${BASE_URL}/vendors/messages/conversations/${conversationId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(res => res.json());
  },

  // Mark as read
  markAsRead: async (conversationId) => {
    return fetchAPI(`/vendors/messages/conversations/${conversationId}/read`, {
      method: 'PATCH',
    });
  },
};

// Vendor Profile API
export const vendorProfileAPI = {
  // Get profile
  get: async () => {
    return fetchAPI('/vendors/profile');
  },

  // Update profile
  update: async (profileData) => {
    return fetchAPI('/vendors/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Update password
  updatePassword: async (currentPassword, newPassword) => {
    return fetchAPI('/vendors/profile/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  // Upload logo
  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append('logo', file);

    const token = storage.getItem('authToken');
    return fetch(`${BASE_URL}/vendors/profile/logo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(res => res.json());
  },

  // Upload banner
  uploadBanner: async (file) => {
    const formData = new FormData();
    formData.append('banner', file);

    const token = storage.getItem('authToken');
    return fetch(`${BASE_URL}/vendors/profile/banner`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(res => res.json());
  },

  // Get notifications settings
  getNotifications: async () => {
    return fetchAPI('/vendors/profile/notifications');
  },

  // Update notifications settings
  updateNotifications: async (settings) => {
    return fetchAPI('/vendors/profile/notifications', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

// Export all vendor APIs
export default {
  dashboard: vendorDashboardAPI,
  products: vendorProductAPI,
  orders: vendorOrderAPI,
  analytics: vendorAnalyticsAPI,
  finance: vendorFinanceAPI,
  customers: vendorCustomerAPI,
  messages: vendorMessageAPI,
  profile: vendorProfileAPI,
};
