import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]

}, {
  timestamps: true
});

// Indexes
wishlistSchema.index({ 'items.productId': 1 });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
