import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  attributes: {
    color: String,
    size: String,
    // Other dynamic attributes
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  image: String
}, { _id: true });

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  alt: String,
  order: {
    type: Number,
    default: 0
  },
  isMain: {
    type: Boolean,
    default: false
  }
}, { _id: true });

const productSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
    index: true
  },
  
  // Basic Information
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  
  slug: {
    type: String,
    lowercase: true,
    trim: true,
    index: true
  },
  
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  
  shortDescription: {
    type: String,
    maxlength: [160, 'Short description cannot exceed 160 characters']
  },
  
  // Category & Tags
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    index: true
  },
  
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  
  tags: [String],
  
  // Pricing
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  
  compareAtPrice: {
    type: Number,
    default: null,
    min: [0, 'Compare price cannot be negative']
  },
  
  costPrice: {
    type: Number,
    default: null,
    min: [0, 'Cost price cannot be negative']
  },
  
  // Stock
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true
  },
  
  barcode: {
    type: String,
    trim: true
  },
  
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  
  lowStockThreshold: {
    type: Number,
    default: 5
  },
  
  trackInventory: {
    type: Boolean,
    default: true
  },
  
  allowBackorder: {
    type: Boolean,
    default: false
  },
  
  // Variants
  hasVariants: {
    type: Boolean,
    default: false
  },
  
  variants: [variantSchema],
  
  // Product Attributes (Dynamic based on category)
  attributes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Images
  images: [imageSchema],
  
  // Dimensions & Weight (for shipping)
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'inch'],
      default: 'cm'
    }
  },
  
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'lb'],
      default: 'kg'
    }
  },
  
  // SEO
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'active', 'outOfStock', 'archived'],
    default: 'draft'
  },
  
  isPublished: {
    type: Boolean,
    default: false
  },
  
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  publishedAt: {
    type: Date,
    default: null
  },
  
  // Statistics
  stats: {
    viewCount: {
      type: Number,
      default: 0
    },
    favoriteCount: {
      type: Number,
      default: 0
    },
    soldCount: {
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
    }
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ 'stats.rating': -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ vendorId: 1, status: 1 });

// Generate slug from name and vendorId before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    const baseSlug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    this.slug = `${baseSlug}-${Date.now()}`;
  }
  
  // Update stock status
  if (this.trackInventory && this.stock === 0 && !this.allowBackorder) {
    this.status = 'outOfStock';
  }
  
  next();
});

// Virtual for inStock
productSchema.virtual('inStock').get(function() {
  if (!this.trackInventory) return true;
  return this.stock > 0 || this.allowBackorder;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (!this.compareAtPrice || this.compareAtPrice <= this.price) return 0;
  return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
});

// Virtual for isNew (products added in last 30 days)
productSchema.virtual('isNew').get(function() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return this.createdAt > thirtyDaysAgo;
});

// Virtual for isActive (combination of status and isPublished)
productSchema.virtual('isActive').get(function() {
  return this.status === 'active' && this.isPublished;
});

const Product = mongoose.model('Product', productSchema);

export default Product;
