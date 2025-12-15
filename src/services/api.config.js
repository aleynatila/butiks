// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const API_ENDPOINTS = {
  // Auth
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/password',
  REQUEST_PASSWORD_RESET: '/auth/password-reset',
  RESET_PASSWORD: '/auth/password-reset/confirm',

  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_SLUG: (slug) => `/products/slug/${slug}`,
  FEATURED_PRODUCTS: '/products/featured',
  VENDOR_PRODUCTS: (vendorId) => `/products/vendor/${vendorId}`,
  CATEGORY_PRODUCTS: (slug) => `/products/category/${slug}`,

  // Vendors
  VENDORS: '/vendors',
  VENDOR_BY_SLUG: (slug) => `/vendors/${slug}`,
  VENDOR_APPLY: '/vendors/apply',
  VENDOR_PROFILE: '/vendors/me/profile',
  VENDOR_STATS: '/vendors/me/stats',

  // Orders
  ORDERS: '/orders',
  MY_ORDERS: '/orders/my-orders',
  ORDER_BY_ID: (id) => `/orders/${id}`,
  VENDOR_ORDERS: '/orders/vendor/orders',
  UPDATE_ORDER_STATUS: (id) => `/orders/${id}/vendor-status`,
  CANCEL_ORDER: (id) => `/orders/${id}/cancel`,

  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_SLUG: (slug) => `/categories/${slug}`,

  // Reviews
  REVIEWS: '/reviews',
  PRODUCT_REVIEWS: (productId) => `/reviews/product/${productId}`,
  VENDOR_REVIEWS: (vendorId) => `/reviews/vendor/${vendorId}`,
  REVIEW_BY_ID: (id) => `/reviews/${id}`,
  MARK_HELPFUL: (id) => `/reviews/${id}/helpful`,
  VENDOR_RESPONSE: (id) => `/reviews/${id}/response`,

  // Wishlist
  WISHLIST: '/wishlist',
  ADD_TO_WISHLIST: (productId) => `/wishlist/${productId}`,
  REMOVE_FROM_WISHLIST: (productId) => `/wishlist/${productId}`,
  CHECK_WISHLIST: (productId) => `/wishlist/check/${productId}`,

  // Upload
  UPLOAD_IMAGE: '/upload/image',
  UPLOAD_IMAGES: '/upload/images',
  UPLOAD_PRODUCT_IMAGES: '/upload/product-images',
  DELETE_IMAGE: (publicId) => `/upload/image/${publicId}`,

  // Payments
  CREATE_PAYMENT_INTENT: '/payments/create-intent',
  CONFIRM_PAYMENT: '/payments/confirm',
  PAYMENT_STATUS: (id) => `/payments/status/${id}`,
  CREATE_STRIPE_CUSTOMER: '/payments/customer',
  REQUEST_REFUND: '/payments/refund',

  // Admin
  ADMIN_OVERVIEW: '/admin/dashboard/overview',
  ADMIN_SALES: '/admin/analytics/sales',
  ADMIN_VENDORS: '/admin/analytics/vendors',
  ADMIN_CUSTOMERS: '/admin/analytics/customers',
  ADMIN_PRODUCTS: '/admin/analytics/products',
  ADMIN_REVENUE: '/admin/reports/revenue',
};

export default API_BASE_URL;
