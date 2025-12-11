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

const router = express.Router();

// All routes are protected
router.post('/', protect, createOrder);
router.get('/', protect, getMyOrders);
router.get('/vendor/my-orders', protect, authorize('vendor', 'admin'), getVendorOrders);
router.get('/:id', protect, getOrder);
router.patch('/:id/vendor-status', protect, authorize('vendor', 'admin'), updateVendorOrderStatus);
router.post('/:id/cancel', protect, cancelOrder);

export default router;
