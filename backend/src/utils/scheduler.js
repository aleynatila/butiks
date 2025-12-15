import cron from 'node-cron';
import logger from '../middleware/logger.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Vendor from '../models/Vendor.js';
import { checkLowStockAlerts } from './businessLogic.js';

/**
 * Initialize all scheduled tasks
 */
export const initScheduledTasks = () => {
  // Check low stock alerts every day at 9 AM
  cron.schedule('0 9 * * *', async () => {
    logger.info('Running low stock alerts check');
    try {
      await checkLowStockAlerts();
      logger.info('Low stock alerts check completed');
    } catch (error) {
      logger.error('Low stock alerts check failed', { error: error.message });
    }
  });

  // Clean up old draft products every week (Sunday at midnight)
  cron.schedule('0 0 * * 0', async () => {
    logger.info('Cleaning up old draft products');
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const result = await Product.deleteMany({
        status: 'draft',
        createdAt: { $lt: thirtyDaysAgo }
      });

      logger.info(`Deleted ${result.deletedCount} old draft products`);
    } catch (error) {
      logger.error('Draft products cleanup failed', { error: error.message });
    }
  });

  // Auto-cancel pending orders after 24 hours
  cron.schedule('0 * * * *', async () => {
    logger.info('Checking for expired pending orders');
    try {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      const expiredOrders = await Order.find({
        'payment.status': 'pending',
        createdAt: { $lt: twentyFourHoursAgo }
      });

      for (const order of expiredOrders) {
        order.payment.status = 'cancelled';
        order.vendorOrders.forEach(vo => {
          vo.status = 'cancelled';
        });
        await order.save();
        logger.info(`Auto-cancelled expired order: ${order.orderNumber}`);
      }

      logger.info(`Auto-cancelled ${expiredOrders.length} expired orders`);
    } catch (error) {
      logger.error('Auto-cancel orders failed', { error: error.message });
    }
  });

  // Update vendor statistics every day at midnight
  cron.schedule('0 0 * * *', async () => {
    logger.info('Updating vendor statistics');
    try {
      const vendors = await Vendor.find({ status: 'active' });

      for (const vendor of vendors) {
        // Calculate statistics
        const productCount = await Product.countDocuments({
          vendorId: vendor._id,
          status: 'active'
        });

        const orders = await Order.find({
          'vendorOrders.vendorId': vendor._id,
          'payment.status': 'paid'
        });

        let totalSales = 0;
        let totalOrders = 0;

        orders.forEach(order => {
          const vendorOrder = order.vendorOrders.find(
            vo => vo.vendorId.toString() === vendor._id.toString()
          );
          if (vendorOrder && vendorOrder.status === 'delivered') {
            totalSales += vendorOrder.total;
            totalOrders++;
          }
        });

        // Update vendor stats
        vendor.stats = {
          ...vendor.stats,
          totalSales,
          totalOrders,
          productCount
        };

        await vendor.save();
      }

      logger.info('Vendor statistics updated successfully');
    } catch (error) {
      logger.error('Vendor statistics update failed', { error: error.message });
    }
  });

  // Archive completed orders older than 90 days
  cron.schedule('0 3 * * 0', async () => {
    logger.info('Archiving old completed orders');
    try {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      const result = await Order.updateMany(
        {
          'vendorOrders.status': 'delivered',
          updatedAt: { $lt: ninetyDaysAgo },
          isArchived: { $ne: true }
        },
        {
          $set: { isArchived: true }
        }
      );

      logger.info(`Archived ${result.modifiedCount} old completed orders`);
    } catch (error) {
      logger.error('Order archiving failed', { error: error.message });
    }
  });

  // Clean up expired sessions (if using session storage)
  cron.schedule('0 4 * * *', async () => {
    logger.info('Cleaning up expired sessions');
    try {
      // Add session cleanup logic if needed
      logger.info('Session cleanup completed');
    } catch (error) {
      logger.error('Session cleanup failed', { error: error.message });
    }
  });

  logger.info('Scheduled tasks initialized');
};

/**
 * Stop all scheduled tasks (useful for testing or graceful shutdown)
 */
export const stopScheduledTasks = () => {
  cron.getTasks().forEach(task => task.stop());
  logger.info('All scheduled tasks stopped');
};

export default {
  initScheduledTasks,
  stopScheduledTasks
};
