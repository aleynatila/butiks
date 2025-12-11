import express from 'express';
import {
    confirmPaymentAndCreateOrder,
    createIntent,
    createStripeCustomer,
    getPaymentStatus,
    handleWebhook,
    requestRefund
} from '../controllers/paymentController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

// Webhook route (must be before express.json() middleware)
// This route is handled separately in server.js with raw body
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.post('/create-intent', protect, createIntent);
router.post('/confirm', protect, confirmPaymentAndCreateOrder);
router.get('/status/:paymentIntentId', protect, getPaymentStatus);
router.post('/customer', protect, createStripeCustomer);

// Admin routes
router.post('/refund', protect, authorize('admin'), requestRefund);

export default router;
