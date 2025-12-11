import express from 'express';
import {
    createProduct,
    deleteProduct,
    getFeaturedProducts,
    getProduct,
    getProducts,
    getRelatedProducts,
    getVendorProducts,
    updateProduct
} from '../controllers/productController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/vendor/:vendorId', getVendorProducts);
router.get('/:id', getProduct);
router.get('/:id/related', getRelatedProducts);

// Protected routes (Vendor only)
router.post('/', protect, authorize('vendor', 'admin'), createProduct);
router.put('/:id', protect, authorize('vendor', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('vendor', 'admin'), deleteProduct);

export default router;
