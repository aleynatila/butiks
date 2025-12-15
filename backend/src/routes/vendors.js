import express from 'express';
import {
    applyVendor,
    approveVendor,
    getMyVendorProfile,
    getVendorBySlug,
    getVendors,
    getVendorStats,
    rejectVendor,
    suspendVendor,
    updateMyVendorProfile
} from '../controllers/vendorController.js';
import { authorize, protect } from '../middleware/auth.js';
import { applyVendorValidation, mongoIdValidation, paginationValidation } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', paginationValidation, getVendors);
router.get('/:slug', getVendorBySlug);

// Protected routes
router.post('/apply', protect, applyVendorValidation, applyVendor);
router.get('/me/profile', protect, authorize('vendor', 'admin'), getMyVendorProfile);
router.put('/me/profile', protect, authorize('vendor', 'admin'), updateMyVendorProfile);
router.get('/me/stats', protect, authorize('vendor', 'admin'), getVendorStats);

// Admin only routes
router.patch('/:id/approve', protect, authorize('admin'), mongoIdValidation, approveVendor);
router.patch('/:id/reject', protect, authorize('admin'), mongoIdValidation, rejectVendor);
router.patch('/:id/suspend', protect, authorize('admin'), mongoIdValidation, suspendVendor);

export default router;
