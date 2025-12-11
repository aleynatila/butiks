import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  shopName: {
    type: String,
    required: [true, 'Shop name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Shop name cannot exceed 100 characters']
  },
  
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  description: {
    type: String,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  logo: {
    type: String,
    default: null
  },
  
  banner: {
    type: String,
    default: null
  },
  
  // Contact Information
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  
  phone: {
    type: String,
    required: true,
    trim: true
  },
  
  website: {
    type: String,
    trim: true
  },
  
  // Address
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'Turkey'
    }
  },
  
  // Social Media
  social: {
    instagram: String,
    facebook: String,
    twitter: String
  },
  
  // Business Information
  taxId: {
    type: String,
    required: true,
    unique: true
  },
  
  bankAccount: {
    bankName: String,
    accountNumber: String,
    iban: String,
    accountHolderName: String
  },
  
  // Platform Settings
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'rejected'],
    default: 'pending'
  },
  
  commissionRate: {
    type: Number,
    default: parseFloat(process.env.PLATFORM_COMMISSION_RATE) || 15,
    min: 0,
    max: 100
  },
  
  isVerified: {
    type: Boolean,
    default: false
  },
  
  verifiedAt: {
    type: Date,
    default: null
  },
  
  rejectionReason: {
    type: String,
    default: null
  },
  
  // Statistics
  stats: {
    totalProducts: {
      type: Number,
      default: 0
    },
    totalSales: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    followerCount: {
      type: Number,
      default: 0
    }
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate slug from shop name before saving
vendorSchema.pre('save', function(next) {
  if (this.isModified('shopName')) {
    this.slug = this.shopName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Virtual populate products
vendorSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'vendorId'
});

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;
