import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: String,
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  selectedSize: String,
  selectedColor: String
}, { _id: false });

const vendorOrderSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  items: [orderItemSchema],
  subtotal: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  trackingNumber: String,
  shippedAt: Date,
  deliveredAt: Date,
  cancelledAt: Date
}, { _id: true });

const addressSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  phone: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Multiple vendors in one order
  vendorOrders: [vendorOrderSchema],
  
  // Customer info
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String
  },
  
  // Addresses
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  
  // Payment
  payment: {
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date,
    gateway: String
  },
  
  // Totals
  subtotal: {
    type: Number,
    required: true
  },
  shippingTotal: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  
  // Platform commission
  platformCommission: {
    type: Number,
    default: 0
  },
  
  // Vendor payouts
  vendorPayouts: [{
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor'
    },
    amount: Number,
    commission: Number,
    netAmount: Number,
    status: {
      type: String,
      enum: ['pending', 'processing', 'paid'],
      default: 'pending'
    },
    paidAt: Date
  }],
  
  // Notes
  customerNote: String,
  adminNote: String,
  
  // Tracking
  ipAddress: String,
  userAgent: String

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    // Generate format: BT-YYYYMMDD-XXXX
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    
    // Get count of orders today
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const count = await this.constructor.countDocuments({
      createdAt: { $gte: startOfDay }
    });
    
    const orderNum = String(count + 1).padStart(4, '0');
    this.orderNumber = `BT-${dateStr}-${orderNum}`;
  }
  next();
});

// Index for faster queries
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ customerId: 1, createdAt: -1 });
orderSchema.index({ 'vendorOrders.vendorId': 1 });
orderSchema.index({ 'payment.status': 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
