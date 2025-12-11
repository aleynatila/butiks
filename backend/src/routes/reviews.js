import express from 'express';
import {
    createReview,
    deleteReview,
    getProductReviews,
    getVendorReviews,
    markReviewHelpful,
    updateReview,
    vendorResponse
} from '../controllers/reviewController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/product/:productId', getProductReviews);
router.get('/vendor/:vendorId', getVendorReviews);

// Protected routes
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.post('/:id/helpful', protect, markReviewHelpful);

// Vendor routes
router.post('/:id/response', protect, authorize('vendor', 'admin'), vendorResponse);

export default router;
