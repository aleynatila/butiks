import rateLimit from 'express-rate-limit';

const isDevelopment = process.env.NODE_ENV === 'development';

// Dummy limiter for development (no limits)
const noLimit = (req, res, next) => next();

// General API rate limiter
export const apiLimiter = isDevelopment ? noLimit : rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});

// Auth routes rate limiter (stricter)
export const authLimiter = isDevelopment ? noLimit : rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later',
  skipSuccessfulRequests: true
});

// Login rate limiter (DISABLED IN DEVELOPMENT)
export const loginLimiter = isDevelopment ? noLimit : rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // 50 attempts per minute
  message: 'Çok fazla giriş denemesi yaptınız. Lütfen 1 dakika sonra tekrar deneyin.',
  skipSuccessfulRequests: true
});

// Password reset rate limiter
export const passwordResetLimiter = isDevelopment ? noLimit : rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: 'Too many password reset attempts, please try again later'
});

// Create product rate limiter
export const createProductLimiter = isDevelopment ? noLimit : rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 products per hour
  message: 'Product creation limit reached, please try again later'
});

// File upload rate limiter
export const uploadLimiter = isDevelopment ? noLimit : rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 uploads per 15 minutes
  message: 'Too many file uploads, please try again later'
});

// Order creation rate limiter
export const orderLimiter = isDevelopment ? noLimit : rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many orders, please try again later'
});

// Review creation rate limiter
export const reviewLimiter = isDevelopment ? noLimit : rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'Too many reviews submitted, please try again later'
});

// Search rate limiter
export const searchLimiter = isDevelopment ? noLimit : rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: 'Too many search requests, please try again later'
});

export default {
  apiLimiter,
  authLimiter,
  loginLimiter,
  passwordResetLimiter,
  createProductLimiter,
  uploadLimiter,
  orderLimiter,
  reviewLimiter,
  searchLimiter
};
