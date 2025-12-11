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

const router = express.Router();

// Public routes
router.get('/', getVendors);
router.get('/:slug', getVendorBySlug);

// Protected routes
router.post('/apply', protect, applyVendor);
router.get('/me/profile', protect, authorize('vendor', 'admin'), getMyVendorProfile);
router.put('/me/profile', protect, authorize('vendor', 'admin'), updateMyVendorProfile);
router.get('/me/stats', protect, authorize('vendor', 'admin'), getVendorStats);

// Admin only routes
router.patch('/:id/approve', protect, authorize('admin'), approveVendor);
router.patch('/:id/reject', protect, authorize('admin'), rejectVendor);
router.patch('/:id/suspend', protect, authorize('admin'), suspendVendor);

export default router;
