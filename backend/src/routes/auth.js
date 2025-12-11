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

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/password-reset', requestPasswordReset);
router.post('/password-reset/confirm', resetPassword);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, changePassword);
router.post('/logout', protect, logout);

export default router;
