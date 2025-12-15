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
import { reviewLimiter } from '../middleware/rateLimiter.js';
import { createReviewValidation, mongoIdValidation, paginationValidation } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/product/:productId', mongoIdValidation, paginationValidation, getProductReviews);
router.get('/vendor/:vendorId', mongoIdValidation, paginationValidation, getVendorReviews);

// Protected routes
router.post('/', protect, reviewLimiter, createReviewValidation, createReview);
router.put('/:id', protect, mongoIdValidation, createReviewValidation, updateReview);
router.delete('/:id', protect, mongoIdValidation, deleteReview);
router.post('/:id/helpful', protect, markReviewHelpful);

// Vendor routes
router.post('/:id/response', protect, authorize('vendor', 'admin'), vendorResponse);

export default router;
