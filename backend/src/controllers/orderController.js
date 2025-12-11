import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Vendor from '../models/Vendor.js';

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      customerNote
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        error: true,
        message: 'No items in order'
      });
    }

    // Group items by vendor
    const vendorOrdersMap = new Map();
    let subtotal = 0;

    for (const item of items) {
      // Get product details
      const product = await Product.findById(item.productId)
        .populate('vendorId');

      if (!product) {
        return res.status(404).json({
          error: true,
          message: `Product ${item.productId} not found`
        });
      }

      // Check stock
      if (product.trackInventory && product.stock < item.quantity) {
        return res.status(400).json({
          error: true,
          message: `Insufficient stock for ${product.name}`
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      const vendorId = product.vendorId._id.toString();

      if (!vendorOrdersMap.has(vendorId)) {
        vendorOrdersMap.set(vendorId, {
          vendorId: product.vendorId._id,
          items: [],
          subtotal: 0,
          shipping: 30, // Fixed shipping per vendor for now
          total: 0,
          status: 'pending'
        });
      }

      const vendorOrder = vendorOrdersMap.get(vendorId);
      vendorOrder.items.push({
        productId: product._id,
        name: product.name,
        image: product.images[0]?.url || '',
        price: product.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor
      });
      vendorOrder.subtotal += itemTotal;
    }

    // Calculate totals for each vendor order
    const vendorOrders = Array.from(vendorOrdersMap.values()).map(vo => {
      vo.total = vo.subtotal + vo.shipping;
      return vo;
    });

    const shippingTotal = vendorOrders.reduce((sum, vo) => sum + vo.shipping, 0);
    const tax = subtotal * 0.18; // 18% KDV
    const total = subtotal + shippingTotal + tax;

    // Calculate platform commission
    const commissionRate = parseFloat(process.env.PLATFORM_COMMISSION_RATE) || 15;
    const platformCommission = (subtotal * commissionRate) / 100;

    // Create vendor payouts
    const vendorPayouts = vendorOrders.map(vo => ({
      vendorId: vo.vendorId,
      amount: vo.total,
      commission: (vo.subtotal * commissionRate) / 100,
      netAmount: vo.total - ((vo.subtotal * commissionRate) / 100),
      status: 'pending'
    }));

    // Create order
    const order = await Order.create({
      customerId: req.user._id,
      vendorOrders,
      customer: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        phone: req.user.phone
      },
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      payment: {
        method: paymentMethod,
        status: 'pending',
        gateway: 'stripe' // Default
      },
      subtotal,
      shippingTotal,
      tax,
      discount: 0,
      total,
      platformCommission,
      vendorPayouts,
      customerNote,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    // Update product stock and stats
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (product.trackInventory) {
        product.stock -= item.quantity;
      }
      product.stats.soldCount += item.quantity;
      await product.save();
    }

    // TODO: Process payment with Stripe
    // For now, mark as paid
    order.payment.status = 'paid';
    order.payment.paidAt = new Date();
    await order.save();

    // Populate order
    const populatedOrder = await Order.findById(order._id)
      .populate('customerId', 'firstName lastName email')
      .populate('vendorOrders.vendorId', 'shopName email phone');

    res.status(201).json({
      error: false,
      message: 'Order created successfully',
      order: populatedOrder
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get user's orders
// @route   GET /api/v1/orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments({ customerId: req.user._id });

    const orders = await Order.find({ customerId: req.user._id })
      .populate('vendorOrders.vendorId', 'shopName logo')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      error: false,
      orders,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/v1/orders/:id
// @access  Private
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId', 'firstName lastName email phone')
      .populate('vendorOrders.vendorId', 'shopName logo email phone address')
      .populate('vendorOrders.items.productId', 'name slug images');

    if (!order) {
      return res.status(404).json({
        error: true,
        message: 'Order not found'
      });
    }

    // Check ownership (unless admin or vendor)
    if (req.user.role === 'customer' && order.customerId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: true,
        message: 'Not authorized to view this order'
      });
    }

    res.status(200).json({
      error: false,
      order
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get vendor's orders
// @route   GET /api/v1/orders/vendor/my-orders
// @access  Private/Vendor
export const getVendorOrders = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });

    if (!vendor) {
      return res.status(404).json({
        error: true,
        message: 'Vendor profile not found'
      });
    }

    const { page = 1, limit = 20, status } = req.query;
    const skip = (page - 1) * limit;

    // Build query to find orders containing this vendor
    const query = {
      'vendorOrders.vendorId': vendor._id
    };

    if (status) {
      query['vendorOrders.status'] = status;
    }

    const total = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .populate('customerId', 'firstName lastName email phone')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Filter vendor orders to only show this vendor's portion
    const vendorOrders = orders.map(order => {
      const vendorOrder = order.vendorOrders.find(
        vo => vo.vendorId.toString() === vendor._id.toString()
      );

      return {
        orderId: order._id,
        orderNumber: order.orderNumber,
        customer: order.customer,
        shippingAddress: order.shippingAddress,
        vendorOrder,
        createdAt: order.createdAt
      };
    });

    res.status(200).json({
      error: false,
      orders: vendorOrders,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Update vendor order status
// @route   PATCH /api/v1/orders/:id/vendor-status
// @access  Private/Vendor
export const updateVendorOrderStatus = async (req, res, next) => {
  try {
    const { status, trackingNumber } = req.body;

    const vendor = await Vendor.findOne({ userId: req.user._id });

    if (!vendor) {
      return res.status(404).json({
        error: true,
        message: 'Vendor profile not found'
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: true,
        message: 'Order not found'
      });
    }

    // Find vendor's order portion
    const vendorOrder = order.vendorOrders.find(
      vo => vo.vendorId.toString() === vendor._id.toString()
    );

    if (!vendorOrder) {
      return res.status(404).json({
        error: true,
        message: 'Vendor order not found'
      });
    }

    // Update status
    vendorOrder.status = status;

    if (trackingNumber) {
      vendorOrder.trackingNumber = trackingNumber;
    }

    if (status === 'shipped' && !vendorOrder.shippedAt) {
      vendorOrder.shippedAt = new Date();
    }

    if (status === 'delivered' && !vendorOrder.deliveredAt) {
      vendorOrder.deliveredAt = new Date();
    }

    if (status === 'cancelled' && !vendorOrder.cancelledAt) {
      vendorOrder.cancelledAt = new Date();
    }

    await order.save();

    res.status(200).json({
      error: false,
      message: 'Order status updated successfully',
      vendorOrder
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order
// @route   POST /api/v1/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: true,
        message: 'Order not found'
      });
    }

    // Check ownership
    if (order.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: true,
        message: 'Not authorized to cancel this order'
      });
    }

    // Check if order can be cancelled
    const canCancel = order.vendorOrders.every(
      vo => vo.status === 'pending' || vo.status === 'confirmed'
    );

    if (!canCancel) {
      return res.status(400).json({
        error: true,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    // Cancel all vendor orders
    order.vendorOrders.forEach(vo => {
      vo.status = 'cancelled';
      vo.cancelledAt = new Date();
    });

    order.payment.status = 'refunded';

    await order.save();

    // Restore product stock
    for (const vendorOrder of order.vendorOrders) {
      for (const item of vendorOrder.items) {
        const product = await Product.findById(item.productId);
        if (product && product.trackInventory) {
          product.stock += item.quantity;
          product.stats.soldCount = Math.max(0, product.stats.soldCount - item.quantity);
          await product.save();
        }
      }
    }

    res.status(200).json({
      error: false,
      message: 'Order cancelled successfully',
      order
    });

  } catch (error) {
    next(error);
  }
};
