/**
 * API Service Layer
 * Central place for all API calls - ready for backend integration
 * 
 * Usage: Replace BASE_URL with your backend API endpoint
 * Example: const BASE_URL = 'https://api.butiks.com/v1';
 */

const BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

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
  const token = localStorage.getItem('authToken');
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, defaultOptions);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Product API calls
export const productAPI = {
  // Get all products with optional filters
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return fetchAPI(`/products?${queryParams}`);
  },

  // Get single product by ID
  getById: async (id) => {
    return fetchAPI(`/products/${id}`);
  },

  // Get featured products
  getFeatured: async () => {
    return fetchAPI('/products/featured');
  },

  // Search products
  search: async (query) => {
    return fetchAPI(`/products/search?q=${encodeURIComponent(query)}`);
  },

  // Get related products
  getRelated: async (productId) => {
    return fetchAPI(`/products/${productId}/related`);
  },

  // Get product reviews
  getReviews: async (productId, page = 1) => {
    return fetchAPI(`/products/${productId}/reviews?page=${page}`);
  },

  // Add product review
  addReview: async (productId, reviewData) => {
    return fetchAPI(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },
};

// User/Auth API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    return fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    const response = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store auth token
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response;
  },

  // Logout user
  logout: async () => {
    localStorage.removeItem('authToken');
    return fetchAPI('/auth/logout', { method: 'POST' });
  },

  // Get current user profile
  getProfile: async () => {
    return fetchAPI('/auth/profile');
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return fetchAPI('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    return fetchAPI('/auth/password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    return fetchAPI('/auth/password-reset/confirm', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  },
};

// Cart API calls
export const cartAPI = {
  // Get user's cart
  getCart: async () => {
    return fetchAPI('/cart');
  },

  // Add item to cart
  addItem: async (productId, quantity = 1, options = {}) => {
    return fetchAPI('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, options }),
    });
  },

  // Update cart item quantity
  updateItem: async (itemId, quantity) => {
    return fetchAPI(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  // Remove item from cart
  removeItem: async (itemId) => {
    return fetchAPI(`/cart/items/${itemId}`, {
      method: 'DELETE',
    });
  },

  // Clear entire cart
  clearCart: async () => {
    return fetchAPI('/cart', {
      method: 'DELETE',
    });
  },

  // Apply promo code
  applyPromoCode: async (code) => {
    return fetchAPI('/cart/promo', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },
};

// Order API calls
export const orderAPI = {
  // Get user's orders
  getOrders: async (page = 1, limit = 10) => {
    return fetchAPI(`/orders?page=${page}&limit=${limit}`);
  },

  // Get single order by ID
  getOrderById: async (orderId) => {
    return fetchAPI(`/orders/${orderId}`);
  },

  // Create new order (checkout)
  createOrder: async (orderData) => {
    return fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    return fetchAPI(`/orders/${orderId}/cancel`, {
      method: 'POST',
    });
  },

  // Track order
  trackOrder: async (orderId) => {
    return fetchAPI(`/orders/${orderId}/tracking`);
  },
};

// Wishlist/Favorites API calls
export const wishlistAPI = {
  // Get user's wishlist
  getWishlist: async () => {
    return fetchAPI('/wishlist');
  },

  // Add item to wishlist
  addItem: async (productId) => {
    return fetchAPI('/wishlist/items', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  },

  // Remove item from wishlist
  removeItem: async (productId) => {
    return fetchAPI(`/wishlist/items/${productId}`, {
      method: 'DELETE',
    });
  },

  // Move item from wishlist to cart
  moveToCart: async (productId) => {
    return fetchAPI(`/wishlist/items/${productId}/move-to-cart`, {
      method: 'POST',
    });
  },
};

// Address API calls
export const addressAPI = {
  // Get user's addresses
  getAddresses: async () => {
    return fetchAPI('/addresses');
  },

  // Add new address
  addAddress: async (addressData) => {
    return fetchAPI('/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  },

  // Update address
  updateAddress: async (addressId, addressData) => {
    return fetchAPI(`/addresses/${addressId}`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
  },

  // Delete address
  deleteAddress: async (addressId) => {
    return fetchAPI(`/addresses/${addressId}`, {
      method: 'DELETE',
    });
  },

  // Set default address
  setDefaultAddress: async (addressId) => {
    return fetchAPI(`/addresses/${addressId}/default`, {
      method: 'POST',
    });
  },
};

// Newsletter API calls
export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: async (email) => {
    return fetchAPI('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email) => {
    return fetchAPI('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

export default {
  productAPI,
  authAPI,
  cartAPI,
  orderAPI,
  wishlistAPI,
  addressAPI,
  newsletterAPI,
};
