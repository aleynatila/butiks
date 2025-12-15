import storage from '../utils/storage';
import { API_ENDPOINTS } from './api.config';
import apiClient from './apiClient';

/**
 * Authentication Service
 */
export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
    if (response.data.token) {
      storage.setItem('authToken', response.data.token);
      storage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
    if (response.data.token) {
      storage.setItem('authToken', response.data.token);
      storage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout user
  logout: async () => {
    try {
      await apiClient.post(API_ENDPOINTS.LOGOUT);
    } finally {
      storage.removeItem('authToken');
      storage.removeItem('user');
    }
  },

  // Get user profile
  getProfile: async () => {
    const response = await apiClient.get(API_ENDPOINTS.PROFILE);
    if (response.data.user) {
      storage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Get current user (alias for getProfile)
  getMe: async () => {
    return await authService.getProfile();
  },

  // Update profile
  updateProfile: async (userData) => {
    const response = await apiClient.put(API_ENDPOINTS.PROFILE, userData);
    if (response.data.user) {
      storage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Change password
  changePassword: async (passwords) => {
    const response = await apiClient.put(API_ENDPOINTS.CHANGE_PASSWORD, passwords);
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    const response = await apiClient.post(API_ENDPOINTS.REQUEST_PASSWORD_RESET, { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, {
      token,
      newPassword,
    });
    return response.data;
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const userStr = storage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!storage.getItem('authToken');
  },

  // Get auth token
  getToken: () => {
    return storage.getItem('authToken');
  },
};

/**
 * Product Service
 */
export const productService = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS, { params });
    return response.data;
  },

  // Get product by slug
  getProductBySlug: async (slug) => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCT_BY_SLUG(slug));
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await apiClient.get(API_ENDPOINTS.FEATURED_PRODUCTS);
    return response.data;
  },

  // Get vendor products
  getVendorProducts: async (vendorId) => {
    const response = await apiClient.get(API_ENDPOINTS.VENDOR_PRODUCTS(vendorId));
    return response.data;
  },

  // Get category products
  getCategoryProducts: async (slug) => {
    const response = await apiClient.get(API_ENDPOINTS.CATEGORY_PRODUCTS(slug));
    return response.data;
  },

  // Create product (vendor only)
  createProduct: async (productData) => {
    const response = await apiClient.post(API_ENDPOINTS.PRODUCTS, productData);
    return response.data;
  },

  // Update product (vendor only)
  updateProduct: async (productId, productData) => {
    const response = await apiClient.put(`${API_ENDPOINTS.PRODUCTS}/${productId}`, productData);
    return response.data;
  },

  // Delete product (vendor only)
  deleteProduct: async (productId) => {
    const response = await apiClient.delete(`${API_ENDPOINTS.PRODUCTS}/${productId}`);
    return response.data;
  },
};

/**
 * Category Service
 */
export const categoryService = {
  // Get all categories
  getCategories: async () => {
    const response = await apiClient.get(API_ENDPOINTS.CATEGORIES);
    return response.data;
  },

  // Get category by slug
  getCategoryBySlug: async (slug) => {
    const response = await apiClient.get(API_ENDPOINTS.CATEGORY_BY_SLUG(slug));
    return response.data;
  },
};

/**
 * Vendor Service
 */
export const vendorService = {
  // Get all vendors
  getVendors: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.VENDORS, { params });
    return response.data;
  },

  // Get vendor by slug
  getVendorBySlug: async (slug) => {
    const response = await apiClient.get(API_ENDPOINTS.VENDOR_BY_SLUG(slug));
    return response.data;
  },

  // Apply to become vendor
  applyVendor: async (vendorData) => {
    const response = await apiClient.post(API_ENDPOINTS.VENDOR_APPLY, vendorData);
    return response.data;
  },

  // Get vendor profile
  getVendorProfile: async () => {
    const response = await apiClient.get(API_ENDPOINTS.VENDOR_PROFILE);
    return response.data;
  },

  // Update vendor profile
  updateVendorProfile: async (vendorData) => {
    const response = await apiClient.put(API_ENDPOINTS.VENDOR_PROFILE, vendorData);
    return response.data;
  },

  // Get vendor stats
  getVendorStats: async () => {
    const response = await apiClient.get(API_ENDPOINTS.VENDOR_STATS);
    return response.data;
  },
};

/**
 * Order Service
 */
export const orderService = {
  // Create order
  createOrder: async (orderData) => {
    const response = await apiClient.post(API_ENDPOINTS.ORDERS, orderData);
    return response.data;
  },

  // Get my orders
  getMyOrders: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.MY_ORDERS, { params });
    return response.data;
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    const response = await apiClient.get(API_ENDPOINTS.ORDER_BY_ID(orderId));
    return response.data;
  },

  // Get vendor orders
  getVendorOrders: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.VENDOR_ORDERS, { params });
    return response.data;
  },

  // Update order status (vendor)
  updateOrderStatus: async (orderId, status) => {
    const response = await apiClient.patch(API_ENDPOINTS.UPDATE_ORDER_STATUS(orderId), {
      status,
    });
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId, reason) => {
    const response = await apiClient.patch(API_ENDPOINTS.CANCEL_ORDER(orderId), { reason });
    return response.data;
  },
};

/**
 * Review Service
 */
export const reviewService = {
  // Create review
  createReview: async (reviewData) => {
    const response = await apiClient.post(API_ENDPOINTS.REVIEWS, reviewData);
    return response.data;
  },

  // Get product reviews
  getProductReviews: async (productId, params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCT_REVIEWS(productId), { params });
    return response.data;
  },

  // Get vendor reviews
  getVendorReviews: async (vendorId, params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.VENDOR_REVIEWS(vendorId), { params });
    return response.data;
  },

  // Update review
  updateReview: async (reviewId, reviewData) => {
    const response = await apiClient.put(API_ENDPOINTS.REVIEW_BY_ID(reviewId), reviewData);
    return response.data;
  },

  // Delete review
  deleteReview: async (reviewId) => {
    const response = await apiClient.delete(API_ENDPOINTS.REVIEW_BY_ID(reviewId));
    return response.data;
  },

  // Mark review as helpful
  markHelpful: async (reviewId) => {
    const response = await apiClient.post(API_ENDPOINTS.MARK_HELPFUL(reviewId));
    return response.data;
  },

  // Vendor response to review
  vendorResponse: async (reviewId, comment) => {
    const response = await apiClient.post(API_ENDPOINTS.VENDOR_RESPONSE(reviewId), { comment });
    return response.data;
  },
};

/**
 * Wishlist Service
 */
export const wishlistService = {
  // Get wishlist
  getWishlist: async () => {
    const response = await apiClient.get(API_ENDPOINTS.WISHLIST);
    return response.data;
  },

  // Add to wishlist
  addToWishlist: async (productId) => {
    const response = await apiClient.post(API_ENDPOINTS.ADD_TO_WISHLIST(productId));
    return response.data;
  },

  // Remove from wishlist
  removeFromWishlist: async (productId) => {
    const response = await apiClient.delete(API_ENDPOINTS.REMOVE_FROM_WISHLIST(productId));
    return response.data;
  },

  // Clear wishlist
  clearWishlist: async () => {
    const response = await apiClient.delete(API_ENDPOINTS.WISHLIST);
    return response.data;
  },

  // Check if product in wishlist
  checkWishlist: async (productId) => {
    const response = await apiClient.get(API_ENDPOINTS.CHECK_WISHLIST(productId));
    return response.data;
  },
};

/**
 * Upload Service
 */
export const uploadService = {
  // Upload single image
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await apiClient.post(API_ENDPOINTS.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Upload multiple images
  uploadImages: async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await apiClient.post(API_ENDPOINTS.UPLOAD_IMAGES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Upload product images (vendor only)
  uploadProductImages: async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await apiClient.post(API_ENDPOINTS.UPLOAD_PRODUCT_IMAGES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete image
  deleteImage: async (publicId) => {
    const response = await apiClient.delete(API_ENDPOINTS.DELETE_IMAGE(publicId));
    return response.data;
  },
};

/**
 * Payment Service
 */
export const paymentService = {
  // Create payment intent
  createPaymentIntent: async (amount, orderId) => {
    const response = await apiClient.post(API_ENDPOINTS.CREATE_PAYMENT_INTENT, {
      amount,
      orderId,
    });
    return response.data;
  },

  // Confirm payment and create order
  confirmPayment: async (paymentIntentId, orderData) => {
    const response = await apiClient.post(API_ENDPOINTS.CONFIRM_PAYMENT, {
      paymentIntentId,
      orderData,
    });
    return response.data;
  },

  // Get payment status
  getPaymentStatus: async (paymentIntentId) => {
    const response = await apiClient.get(API_ENDPOINTS.PAYMENT_STATUS(paymentIntentId));
    return response.data;
  },

  // Create Stripe customer
  createStripeCustomer: async () => {
    const response = await apiClient.post(API_ENDPOINTS.CREATE_STRIPE_CUSTOMER);
    return response.data;
  },

  // Request refund (admin)
  requestRefund: async (orderId, amount, reason) => {
    const response = await apiClient.post(API_ENDPOINTS.REQUEST_REFUND, {
      orderId,
      amount,
      reason,
    });
    return response.data;
  },
};

/**
 * Admin Service
 */
export const adminService = {
  // Get dashboard overview
  getDashboardOverview: async () => {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN_OVERVIEW);
    return response.data;
  },

  // Get sales analytics
  getSalesAnalytics: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN_SALES, { params });
    return response.data;
  },

  // Get vendor analytics
  getVendorAnalytics: async () => {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN_VENDORS);
    return response.data;
  },

  // Get customer analytics
  getCustomerAnalytics: async () => {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN_CUSTOMERS);
    return response.data;
  },

  // Get product analytics
  getProductAnalytics: async () => {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN_PRODUCTS);
    return response.data;
  },

  // Get revenue report
  getRevenueReport: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN_REVENUE, { params });
    return response.data;
  },
};
