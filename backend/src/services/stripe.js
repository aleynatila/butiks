import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create Stripe payment intent
 * @param {number} amount - Amount in TRY (will be converted to kuruş)
 * @param {string} currency - Currency code (default: try)
 * @param {object} metadata - Additional metadata
 * @returns {Promise<object>} Payment intent object
 */
export const createPaymentIntent = async (amount, currency = 'try', metadata = {}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to kuruş
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    };
  } catch (error) {
    console.error('Stripe payment intent error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Confirm payment
 * @param {string} paymentIntentId - Payment intent ID
 * @returns {Promise<object>} Payment confirmation
 */
export const confirmPayment = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    return {
      success: true,
      status: paymentIntent.status,
      paymentIntent
    };
  } catch (error) {
    console.error('Stripe payment confirmation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Create refund
 * @param {string} paymentIntentId - Payment intent ID
 * @param {number} amount - Amount to refund (optional, full refund if not specified)
 * @returns {Promise<object>} Refund object
 */
export const createRefund = async (paymentIntentId, amount = null) => {
  try {
    const refundData = {
      payment_intent: paymentIntentId
    };

    if (amount) {
      refundData.amount = Math.round(amount * 100);
    }

    const refund = await stripe.refunds.create(refundData);

    return {
      success: true,
      refund
    };
  } catch (error) {
    console.error('Stripe refund error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Verify webhook signature
 * @param {string} payload - Request body
 * @param {string} signature - Stripe signature header
 * @returns {object} Webhook event
 */
export const verifyWebhook = (payload, signature) => {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    return event;
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw new Error('Invalid webhook signature');
  }
};

/**
 * Create Stripe customer
 * @param {object} customerData - Customer information
 * @returns {Promise<object>} Stripe customer
 */
export const createCustomer = async (customerData) => {
  try {
    const customer = await stripe.customers.create({
      email: customerData.email,
      name: `${customerData.firstName} ${customerData.lastName}`,
      phone: customerData.phone,
      metadata: {
        userId: customerData.userId
      }
    });

    return {
      success: true,
      customerId: customer.id
    };
  } catch (error) {
    console.error('Stripe customer creation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Create payment method
 * @param {object} paymentMethodData - Payment method details
 * @returns {Promise<object>} Payment method
 */
export const createPaymentMethod = async (paymentMethodData) => {
  try {
    const paymentMethod = await stripe.paymentMethods.create(paymentMethodData);

    return {
      success: true,
      paymentMethod
    };
  } catch (error) {
    console.error('Stripe payment method error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Transfer funds to vendor (Connect account)
 * @param {string} amount - Amount in TRY
 * @param {string} destination - Stripe Connect account ID
 * @param {string} transferGroup - Transfer group identifier
 * @returns {Promise<object>} Transfer object
 */
export const createTransfer = async (amount, destination, transferGroup) => {
  try {
    const transfer = await stripe.transfers.create({
      amount: Math.round(amount * 100),
      currency: 'try',
      destination,
      transfer_group: transferGroup
    });

    return {
      success: true,
      transfer
    };
  } catch (error) {
    console.error('Stripe transfer error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default stripe;
