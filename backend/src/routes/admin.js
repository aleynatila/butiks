import express from 'express';
import {
    getCustomerAnalytics,
    getDashboardOverview,
    getProductAnalytics,
    getRevenueReport,
    getSalesAnalytics,
    getVendorAnalytics
} from '../controllers/adminController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin authentication
router.use(protect, authorize('admin'));

// Dashboard
router.get('/dashboard/overview', getDashboardOverview);

// Analytics
router.get('/analytics/sales', getSalesAnalytics);
router.get('/analytics/vendors', getVendorAnalytics);
router.get('/analytics/customers', getCustomerAnalytics);
router.get('/analytics/products', getProductAnalytics);

// Reports
router.get('/reports/revenue', getRevenueReport);

export default router;
