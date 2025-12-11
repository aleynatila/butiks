import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
    index: true
  },
  
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  
  images: [String],
  
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved' // Auto-approve for now
  },
  
  isVerifiedPurchase: {
    type: Boolean,
    default: true
  },
  
  vendorResponse: {
    comment: String,
    respondedAt: Date
  },
  
  helpfulCount: {
    type: Number,
    default: 0
  },
  
  helpfulBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
reviewSchema.index({ productId: 1, customerId: 1 }, { unique: true });
reviewSchema.index({ vendorId: 1, status: 1 });
reviewSchema.index({ rating: -1 });

// Update product and vendor stats after review
reviewSchema.post('save', async function() {
  const Review = this.constructor;
  const Product = mongoose.model('Product');
  const Vendor = mongoose.model('Vendor');

  // Calculate product stats
  const productStats = await Review.aggregate([
    { $match: { productId: this.productId, status: 'approved' } },
    {
      $group: {
        _id: '$productId',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);

  if (productStats.length > 0) {
    await Product.findByIdAndUpdate(this.productId, {
      'stats.rating': Math.round(productStats[0].avgRating * 10) / 10,
      'stats.reviewCount': productStats[0].count
    });
  }

  // Calculate vendor stats
  const vendorStats = await Review.aggregate([
    { $match: { vendorId: this.vendorId, status: 'approved' } },
    {
      $group: {
        _id: '$vendorId',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);

  if (vendorStats.length > 0) {
    await Vendor.findByIdAndUpdate(this.vendorId, {
      'stats.rating': Math.round(vendorStats[0].avgRating * 10) / 10,
      'stats.reviewCount': vendorStats[0].count
    });
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
