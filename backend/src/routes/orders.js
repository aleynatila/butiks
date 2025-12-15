import express from 'express';
import {
    cancelOrder,
    createOrder,
    getMyOrders,
    getOrder,
    getVendorOrders,
    updateVendorOrderStatus
} from '../controllers/orderController.js';
import { authorize, protect } from '../middleware/auth.js';
import { orderLimiter } from '../middleware/rateLimiter.js';
import { createOrderValidation, mongoIdValidation, paginationValidation } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.post('/', protect, orderLimiter, createOrderValidation, createOrder);
router.get('/', protect, paginationValidation, getMyOrders);
router.get('/vendor/my-orders', protect, authorize('vendor', 'admin'), paginationValidation, getVendorOrders);
router.get('/:id', protect, mongoIdValidation, getOrder);
router.patch('/:id/vendor-status', protect, authorize('vendor', 'admin'), mongoIdValidation, updateVendorOrderStatus);
router.post('/:id/cancel', protect, mongoIdValidation, cancelOrder);

export default router;
