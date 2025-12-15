import express from 'express';
import {
    changePassword,
    getProfile,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
    updateProfile
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { loginLimiter, passwordResetLimiter } from '../middleware/rateLimiter.js';
import { loginValidation, registerValidation } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginLimiter, loginValidation, login);
router.post('/password-reset', passwordResetLimiter, requestPasswordReset);
router.post('/password-reset/confirm', passwordResetLimiter, resetPassword);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, changePassword);
router.post('/logout', protect, logout);

export default router;
