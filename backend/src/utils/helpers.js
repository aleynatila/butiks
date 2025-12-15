import crypto from 'crypto';

/**
 * Generate a unique slug from text
 */
export const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with -
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing -
};

/**
 * Generate unique order number
 */
export const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

/**
 * Generate unique SKU
 */
export const generateSKU = (prefix = 'PRD') => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
};

/**
 * Format currency (Turkish Lira)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(amount);
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  if (originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

/**
 * Sanitize HTML to prevent XSS
 */
export const sanitizeHTML = (text) => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Generate random token
 */
export const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Parse pagination parameters
 */
export const parsePagination = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 24, 100);
  const skip = (page - 1) * limit;
  
  return { page, limit, skip };
};

/**
 * Build pagination response
 */
export const buildPaginationResponse = (total, page, limit) => {
  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    limit,
    hasNext: page < Math.ceil(total / limit),
    hasPrev: page > 1
  };
};

/**
 * Calculate shipping cost based on weight and distance
 */
export const calculateShipping = (weight, distance = 0) => {
  const baseRate = 15; // Base shipping rate in TRY
  const weightRate = 2; // Per kg rate
  const distanceRate = 0.5; // Per km rate (if distance-based shipping is used)
  
  let cost = baseRate;
  
  if (weight > 1) {
    cost += (weight - 1) * weightRate;
  }
  
  if (distance > 50) {
    cost += (distance - 50) * distanceRate;
  }
  
  return Math.max(cost, 15); // Minimum shipping cost
};

/**
 * Validate Turkish phone number
 */
export const validateTurkishPhone = (phone) => {
  const phoneRegex = /^(\+90|0)?5\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate Turkish ID number
 */
export const validateTurkishIDNumber = (idNumber) => {
  if (!/^\d{11}$/.test(idNumber)) return false;
  
  const digits = idNumber.split('').map(Number);
  const sum1 = (digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7;
  const sum2 = digits[1] + digits[3] + digits[5] + digits[7];
  const digit10 = (sum1 - sum2) % 10;
  
  if (digit10 !== digits[9]) return false;
  
  const sumAll = digits.slice(0, 10).reduce((a, b) => a + b, 0);
  const digit11 = sumAll % 10;
  
  return digit11 === digits[10];
};

/**
 * Format date to Turkish locale
 */
export const formatDate = (date, format = 'full') => {
  const d = new Date(date);
  
  if (format === 'full') {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  }
  
  return new Intl.DateTimeFormat('tr-TR').format(d);
};

/**
 * Calculate platform commission
 */
export const calculateCommission = (amount, rate = null) => {
  const commissionRate = rate || parseFloat(process.env.PLATFORM_COMMISSION_RATE) || 15;
  return (amount * commissionRate) / 100;
};

/**
 * Generate invoice number
 */
export const generateInvoiceNumber = (prefix = 'INV') => {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${year}-${timestamp}-${random}`;
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Remove undefined/null values from object
 */
export const cleanObject = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

/**
 * Sleep/delay function
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

/**
 * Validate file type for upload
 */
export const isValidImageType = (mimetype) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  return validTypes.includes(mimetype);
};

export default {
  generateSlug,
  generateOrderNumber,
  generateSKU,
  calculatePercentage,
  formatCurrency,
  calculateDiscount,
  sanitizeHTML,
  generateToken,
  parsePagination,
  buildPaginationResponse,
  calculateShipping,
  validateTurkishPhone,
  validateTurkishIDNumber,
  formatDate,
  calculateCommission,
  generateInvoiceNumber,
  deepClone,
  cleanObject,
  sleep,
  truncate,
  getFileExtension,
  isValidImageType
};
