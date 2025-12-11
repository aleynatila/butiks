import Order from '../models/Order.js';
import User from '../models/User.js';
import { sendOrderConfirmationEmail } from '../services/email.js';
import {
    confirmPayment,
    createCustomer,
    createPaymentIntent,
    createRefund,
    verifyWebhook
} from '../services/stripe.js';

// @desc    Create payment intent
// @route   POST /api/v1/payments/create-intent
// @access  Private
export const createIntent = async (req, res, next) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: true,
        message: 'Valid amount is required'
      });
    }

    // Create payment intent
    const result = await createPaymentIntent(amount, 'try', {
      orderId: orderId || 'pending',
      customerId: req.user._id.toString()
    });

    if (!result.success) {
      return res.status(400).json({
        error: true,
        message: result.error
      });
    }

    res.status(200).json({
      error: false,
      clientSecret: result.clientSecret,
      paymentIntentId: result.paymentIntentId
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Confirm payment and create order
// @route   POST /api/v1/payments/confirm
// @access  Private
export const confirmPaymentAndCreateOrder = async (req, res, next) => {
  try {
    const { paymentIntentId, orderData } = req.body;

    // Confirm payment with Stripe
    const paymentResult = await confirmPayment(paymentIntentId);

    if (!paymentResult.success || paymentResult.status !== 'succeeded') {
      return res.status(400).json({
        error: true,
        message: 'Payment not confirmed'
      });
    }

    // Create order with payment information
    const order = await Order.create({
      ...orderData,
      customerId: req.user._id,
      payment: {
        method: 'credit_card',
        status: 'paid',
        transactionId: paymentIntentId,
        paidAt: new Date()
      },
      status: 'processing'
    });

    // Populate order details
    const populatedOrder = await Order.findById(order._id)
      .populate('customerId', 'firstName lastName email phone')
      .populate('vendorOrders.vendorId', 'shopName email phone')
      .populate('vendorOrders.items.productId', 'name slug images price');

    // Send order confirmation email
    try {
      await sendOrderConfirmationEmail(
        req.user.email,
        req.user.firstName,
        populatedOrder
      );
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      error: false,
      message: 'Payment successful and order created',
      order: populatedOrder
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Stripe webhook handler
// @route   POST /api/v1/payments/webhook
// @access  Public (but verified)
export const handleWebhook = async (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  try {
    const event = verifyWebhook(req.body, signature);

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('✅ Payment succeeded:', paymentIntent.id);
        
        // Update order status if needed
        if (paymentIntent.metadata.orderId && paymentIntent.metadata.orderId !== 'pending') {
          await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
            'payment.status': 'paid',
            'payment.paidAt': new Date()
          });
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('❌ Payment failed:', failedPayment.id);
        
        // Update order status
        if (failedPayment.metadata.orderId && failedPayment.metadata.orderId !== 'pending') {
          await Order.findByIdAndUpdate(failedPayment.metadata.orderId, {
            'payment.status': 'failed'
          });
        }
        break;

      case 'charge.refunded':
        const refund = event.data.object;
        console.log('💰 Refund processed:', refund.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(400).json({
      error: true,
      message: 'Webhook verification failed'
    });
  }
};

// @desc    Request refund
// @route   POST /api/v1/payments/refund
// @access  Private/Admin
export const requestRefund = async (req, res, next) => {
  try {
    const { orderId, amount, reason } = req.body;

    // Get order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        error: true,
        message: 'Order not found'
      });
    }

    // Check if payment was made via Stripe
    if (!order.payment.transactionId) {
      return res.status(400).json({
        error: true,
        message: 'No payment transaction found for this order'
      });
    }

    // Create refund
    const refundResult = await createRefund(
      order.payment.transactionId,
      amount || order.totalAmount
    );

    if (!refundResult.success) {
      return res.status(400).json({
        error: true,
        message: refundResult.error
      });
    }

    // Update order status
    order.payment.status = amount >= order.totalAmount ? 'refunded' : 'partially_refunded';
    order.status = 'refunded';
    order.cancelledAt = new Date();
    order.cancellationReason = reason || 'Refund requested';
    
    await order.save();

    res.status(200).json({
      error: false,
      message: 'Refund processed successfully',
      refund: refundResult.refund,
      order
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get payment status
// @route   GET /api/v1/payments/status/:paymentIntentId
// @access  Private
export const getPaymentStatus = async (req, res, next) => {
  try {
    const { paymentIntentId } = req.params;

    const result = await confirmPayment(paymentIntentId);

    if (!result.success) {
      return res.status(400).json({
        error: true,
        message: result.error
      });
    }

    res.status(200).json({
      error: false,
      status: result.status,
      paymentIntent: result.paymentIntent
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Create Stripe customer
// @route   POST /api/v1/payments/customer
// @access  Private
export const createStripeCustomer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    // Check if user already has Stripe customer ID
    if (user.stripeCustomerId) {
      return res.status(200).json({
        error: false,
        message: 'Customer already exists',
        customerId: user.stripeCustomerId
      });
    }

    // Create Stripe customer
    const result = await createCustomer({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      userId: user._id.toString()
    });

    if (!result.success) {
      return res.status(400).json({
        error: true,
        message: result.error
      });
    }

    // Save customer ID to user
    user.stripeCustomerId = result.customerId;
    await user.save();

    res.status(200).json({
      error: false,
      message: 'Stripe customer created',
      customerId: result.customerId
    });

  } catch (error) {
    next(error);
  }
};
