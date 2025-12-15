import Product from '../models/Product.js';
import Review from '../models/Review.js';

/**
 * Recalculate and update product rating
 */
export const updateProductRating = async (productId) => {
  try {
    const reviews = await Review.find({ productId, status: 'approved' });

    if (reviews.length === 0) {
      await Product.findByIdAndUpdate(productId, {
        'stats.rating': 0,
        'stats.reviewCount': 0
      });
      return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = totalRating / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      'stats.rating': avgRating,
      'stats.reviewCount': reviews.length
    });

    console.log(`Updated product ${productId} rating: ${avgRating.toFixed(2)}`);
  } catch (error) {
    console.error('Error updating product rating:', error);
  }
};

/**
 * Update vendor statistics
 */
export const updateVendorStats = async (vendorId) => {
  try {
    const Vendor = (await import('../models/Vendor.js')).default;
    const Order = (await import('../models/Order.js')).default;

    // Get completed orders
    const orders = await Order.find({
      'vendorOrders.vendorId': vendorId,
      'payment.status': 'paid'
    });

    // Calculate total sales
    let totalSales = 0;
    let totalOrders = 0;

    orders.forEach(order => {
      const vendorOrder = order.vendorOrders.find(
        vo => vo.vendorId.toString() === vendorId.toString()
      );
      if (vendorOrder && vendorOrder.status === 'delivered') {
        totalSales += vendorOrder.total;
        totalOrders++;
      }
    });

    // Get product count
    const productCount = await Product.countDocuments({
      vendorId,
      status: 'active'
    });

    // Calculate average rating from products
    const products = await Product.find({ vendorId, status: 'active' });
    const avgRating = products.length > 0
      ? products.reduce((sum, p) => sum + (p.stats?.rating || 0), 0) / products.length
      : 0;

    // Update vendor stats
    await Vendor.findByIdAndUpdate(vendorId, {
      'stats.totalSales': totalSales,
      'stats.totalOrders': totalOrders,
      'stats.productCount': productCount,
      'stats.rating': avgRating
    });

    console.log(`Updated vendor ${vendorId} stats`);
  } catch (error) {
    console.error('Error updating vendor stats:', error);
  }
};

/**
 * Check and update stock status
 */
export const checkStockStatus = async (productId) => {
  try {
    const product = await Product.findById(productId);

    if (!product) return;

    // Update status based on stock
    if (product.stock === 0 && product.status === 'active') {
      product.status = 'outOfStock';
      await product.save();
      console.log(`Product ${productId} marked as out of stock`);
    } else if (product.stock > 0 && product.status === 'outOfStock') {
      product.status = 'active';
      await product.save();
      console.log(`Product ${productId} back in stock`);
    }

    // Check low stock threshold
    if (product.stock <= product.lowStockThreshold && product.stock > 0) {
      console.log(`Warning: Product ${productId} is running low on stock (${product.stock} left)`);
      // Here you could trigger an email notification to the vendor
    }
  } catch (error) {
    console.error('Error checking stock status:', error);
  }
};

/**
 * Calculate order totals
 */
export const calculateOrderTotals = (items, shippingCost = 0) => {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const total = subtotal + shippingCost;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping: parseFloat(shippingCost.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
};

/**
 * Group order items by vendor
 */
export const groupItemsByVendor = async (items) => {
  const vendorGroups = {};

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) continue;

    const vendorId = product.vendorId.toString();

    if (!vendorGroups[vendorId]) {
      vendorGroups[vendorId] = {
        vendorId: product.vendorId,
        items: []
      };
    }

    vendorGroups[vendorId].items.push({
      productId: product._id,
      name: product.name,
      image: product.images?.[0]?.url || '',
      price: product.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor
    });
  }

  return Object.values(vendorGroups);
};

/**
 * Validate order items availability
 */
export const validateOrderItems = async (items) => {
  const errors = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);

    if (!product) {
      errors.push(`Product ${item.productId} not found`);
      continue;
    }

    if (product.status !== 'active') {
      errors.push(`Product "${product.name}" is not available`);
      continue;
    }

    if (product.trackInventory && product.stock < item.quantity) {
      errors.push(`Not enough stock for "${product.name}". Available: ${product.stock}`);
      continue;
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Update product stock after order
 */
export const updateProductStock = async (items, operation = 'decrease') => {
  try {
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product || !product.trackInventory) continue;

      if (operation === 'decrease') {
        product.stock = Math.max(0, product.stock - item.quantity);
        product.stats.soldCount = (product.stats.soldCount || 0) + item.quantity;
      } else if (operation === 'increase') {
        product.stock += item.quantity;
        product.stats.soldCount = Math.max(0, (product.stats.soldCount || 0) - item.quantity);
      }

      await product.save();
      await checkStockStatus(product._id);
    }
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
};

/**
 * Send low stock alerts
 */
export const checkLowStockAlerts = async () => {
  try {
    const lowStockProducts = await Product.find({
      status: 'active',
      trackInventory: true,
      $expr: { $lte: ['$stock', '$lowStockThreshold'] }
    }).populate('vendorId', 'shopName email');

    // Here you would send email notifications to vendors
    console.log(`Found ${lowStockProducts.length} products with low stock`);

    return lowStockProducts;
  } catch (error) {
    console.error('Error checking low stock alerts:', error);
  }
};

export default {
  updateProductRating,
  updateVendorStats,
  checkStockStatus,
  calculateOrderTotals,
  groupItemsByVendor,
  validateOrderItems,
  updateProductStock,
  checkLowStockAlerts
};
