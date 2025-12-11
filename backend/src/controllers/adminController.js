import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import Vendor from '../models/Vendor.js';

// @desc    Get dashboard overview stats
// @route   GET /api/v1/admin/dashboard/overview
// @access  Private/Admin
export const getDashboardOverview = async (req, res, next) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    // Total counts
    const [
      totalUsers,
      totalVendors,
      totalProducts,
      totalOrders,
      activeVendors,
      pendingVendors
    ] = await Promise.all([
      User.countDocuments(),
      Vendor.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Vendor.countDocuments({ status: 'active' }),
      Vendor.countDocuments({ status: 'pending' })
    ]);

    // Revenue stats
    const revenueStats = await Order.aggregate([
      { $match: { status: { $in: ['processing', 'shipped', 'delivered'] } } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalCommission: { $sum: '$commission.amount' }
        }
      }
    ]);

    const revenue = revenueStats[0] || { totalRevenue: 0, totalCommission: 0 };

    // Last month stats
    const lastMonthOrders = await Order.countDocuments({
      createdAt: { $gte: lastMonth }
    });

    const lastMonthRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth },
          status: { $in: ['processing', 'shipped', 'delivered'] }
        }
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    res.status(200).json({
      error: false,
      stats: {
        users: {
          total: totalUsers,
          lastMonth: await User.countDocuments({ createdAt: { $gte: lastMonth } })
        },
        vendors: {
          total: totalVendors,
          active: activeVendors,
          pending: pendingVendors
        },
        products: {
          total: totalProducts,
          lastMonth: await Product.countDocuments({ createdAt: { $gte: lastMonth } })
        },
        orders: {
          total: totalOrders,
          lastMonth: lastMonthOrders
        },
        revenue: {
          total: revenue.totalRevenue,
          commission: revenue.totalCommission,
          lastMonth: lastMonthRevenue[0]?.revenue || 0
        }
      }
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get sales analytics
// @route   GET /api/v1/admin/analytics/sales
// @access  Private/Admin
export const getSalesAnalytics = async (req, res, next) => {
  try {
    const { period = 'month', startDate, endDate } = req.query;

    let groupFormat;
    let matchDate = {};

    if (startDate && endDate) {
      matchDate = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    } else {
      const now = new Date();
      if (period === 'week') {
        matchDate = {
          createdAt: {
            $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          }
        };
        groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
      } else if (period === 'year') {
        matchDate = {
          createdAt: {
            $gte: new Date(now.getFullYear(), 0, 1)
          }
        };
        groupFormat = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
      } else { // month
        matchDate = {
          createdAt: {
            $gte: new Date(now.getFullYear(), now.getMonth(), 1)
          }
        };
        groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
      }
    }

    const salesData = await Order.aggregate([
      {
        $match: {
          ...matchDate,
          status: { $in: ['processing', 'shipped', 'delivered'] }
        }
      },
      {
        $group: {
          _id: groupFormat,
          orders: { $sum: 1 },
          revenue: { $sum: '$totalAmount' },
          commission: { $sum: '$commission.amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Top products
    const topProducts = await Order.aggregate([
      { $match: matchDate },
      { $unwind: '$vendorOrders' },
      { $unwind: '$vendorOrders.items' },
      {
        $group: {
          _id: '$vendorOrders.items.productId',
          totalSold: { $sum: '$vendorOrders.items.quantity' },
          totalRevenue: {
            $sum: {
              $multiply: ['$vendorOrders.items.quantity', '$vendorOrders.items.price']
            }
          }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          name: '$product.name',
          slug: '$product.slug',
          image: { $arrayElemAt: ['$product.images', 0] },
          totalSold: 1,
          totalRevenue: 1
        }
      }
    ]);

    res.status(200).json({
      error: false,
      salesData,
      topProducts
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get vendor analytics
// @route   GET /api/v1/admin/analytics/vendors
// @access  Private/Admin
export const getVendorAnalytics = async (req, res, next) => {
  try {
    // Top vendors by revenue
    const topVendorsByRevenue = await Order.aggregate([
      { $match: { status: { $in: ['processing', 'shipped', 'delivered'] } } },
      { $unwind: '$vendorOrders' },
      {
        $group: {
          _id: '$vendorOrders.vendorId',
          totalRevenue: { $sum: '$vendorOrders.subtotal' },
          totalOrders: { $sum: 1 },
          commission: { $sum: '$vendorOrders.commission' }
        }
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'vendors',
          localField: '_id',
          foreignField: '_id',
          as: 'vendor'
        }
      },
      { $unwind: '$vendor' },
      {
        $project: {
          shopName: '$vendor.shopName',
          slug: '$vendor.slug',
          logo: '$vendor.logo',
          totalRevenue: 1,
          totalOrders: 1,
          commission: 1
        }
      }
    ]);

    // Vendor performance metrics
    const vendorMetrics = await Vendor.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'vendorId',
          as: 'products'
        }
      },
      {
        $project: {
          shopName: 1,
          status: 1,
          productCount: { $size: '$products' },
          rating: '$stats.rating',
          reviewCount: '$stats.reviewCount'
        }
      },
      { $sort: { productCount: -1 } }
    ]);

    res.status(200).json({
      error: false,
      topVendorsByRevenue,
      vendorMetrics
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get customer analytics
// @route   GET /api/v1/admin/analytics/customers
// @access  Private/Admin
export const getCustomerAnalytics = async (req, res, next) => {
  try {
    // Top customers by spending
    const topCustomers = await Order.aggregate([
      { $match: { status: { $in: ['processing', 'shipped', 'delivered'] } } },
      {
        $group: {
          _id: '$customerId',
          totalSpent: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      { $unwind: '$customer' },
      {
        $project: {
          name: {
            $concat: ['$customer.firstName', ' ', '$customer.lastName']
          },
          email: '$customer.email',
          totalSpent: 1,
          totalOrders: 1,
          avgOrderValue: { $divide: ['$totalSpent', '$totalOrders'] }
        }
      }
    ]);

    // Customer registration trends
    const registrationTrends = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      error: false,
      topCustomers,
      registrationTrends
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get product analytics
// @route   GET /api/v1/admin/analytics/products
// @access  Private/Admin
export const getProductAnalytics = async (req, res, next) => {
  try {
    // Products by category
    const productsByCategory = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$categoryId',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $project: {
          category: '$category.name',
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Low stock products
    const lowStockProducts = await Product.find({
      isActive: true,
      stock: { $lt: 10, $gt: 0 }
    })
      .select('name slug stock images vendorId')
      .populate('vendorId', 'shopName')
      .limit(20)
      .lean();

    // Out of stock products
    const outOfStockCount = await Product.countDocuments({
      isActive: true,
      stock: 0
    });

    // Most reviewed products
    const mostReviewedProducts = await Review.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: '$productId',
          reviewCount: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      },
      { $sort: { reviewCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          name: '$product.name',
          slug: '$product.slug',
          image: { $arrayElemAt: ['$product.images', 0] },
          reviewCount: 1,
          avgRating: 1
        }
      }
    ]);

    res.status(200).json({
      error: false,
      productsByCategory,
      lowStockProducts,
      outOfStockCount,
      mostReviewedProducts
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get revenue report
// @route   GET /api/v1/admin/reports/revenue
// @access  Private/Admin
export const getRevenueReport = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const matchQuery = {
      status: { $in: ['processing', 'shipped', 'delivered'] }
    };

    if (startDate && endDate) {
      matchQuery.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const report = await Order.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalCommission: { $sum: '$commission.amount' },
          totalOrders: { $sum: 1 },
          avgOrderValue: { $avg: '$totalAmount' }
        }
      }
    ]);

    // Revenue by payment method
    const revenueByPaymentMethod = await Order.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$payment.method',
          revenue: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Revenue by vendor
    const revenueByVendor = await Order.aggregate([
      { $match: matchQuery },
      { $unwind: '$vendorOrders' },
      {
        $group: {
          _id: '$vendorOrders.vendorId',
          revenue: { $sum: '$vendorOrders.subtotal' },
          commission: { $sum: '$vendorOrders.commission' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 20 },
      {
        $lookup: {
          from: 'vendors',
          localField: '_id',
          foreignField: '_id',
          as: 'vendor'
        }
      },
      { $unwind: '$vendor' },
      {
        $project: {
          shopName: '$vendor.shopName',
          revenue: 1,
          commission: 1,
          orders: 1
        }
      }
    ]);

    res.status(200).json({
      error: false,
      summary: report[0] || {
        totalRevenue: 0,
        totalCommission: 0,
        totalOrders: 0,
        avgOrderValue: 0
      },
      revenueByPaymentMethod,
      revenueByVendor
    });

  } catch (error) {
    next(error);
  }
};
