import express from 'express';
import {
    createProduct,
    deleteProduct,
    getFeaturedProducts,
    getProduct,
    getProductByIdOrSlug,
    getProducts,
    getRelatedProducts,
    getVendorProducts,
    updateProduct
} from '../controllers/productController.js';
import { authorize, protect } from '../middleware/auth.js';
import { createProductLimiter, searchLimiter } from '../middleware/rateLimiter.js';
import { createProductValidation, mongoIdValidation, paginationValidation, updateProductValidation } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', paginationValidation, searchLimiter, getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/vendor/:vendorId', mongoIdValidation, getVendorProducts);
router.get('/slug/:idOrSlug', getProductByIdOrSlug); // New route for slug or ID
router.get('/:id/related', mongoIdValidation, getRelatedProducts);
router.get('/:id', mongoIdValidation, getProduct);

// Protected routes (Vendor only)
router.post('/', protect, authorize('vendor', 'admin'), createProductLimiter, createProductValidation, createProduct);
router.put('/:id', protect, authorize('vendor', 'admin'), mongoIdValidation, updateProductValidation, updateProduct);
router.delete('/:id', protect, authorize('vendor', 'admin'), mongoIdValidation, deleteProduct);

export default router;
