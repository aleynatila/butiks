import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Vendor from '../models/Vendor.js';

// @desc    Create product review
// @route   POST /api/v1/reviews
// @access  Private
export const createReview = async (req, res, next) => {
  try {
    const { productId, orderId, rating, title, comment, images } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        error: true,
        message: 'Product not found'
      });
    }

    // Check if order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order || order.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: true,
        message: 'Order not found or unauthorized'
      });
    }

    // Check if product is in the order
    const orderHasProduct = order.vendorOrders.some(vo =>
      vo.items.some(item => item.productId.toString() === productId)
    );

    if (!orderHasProduct) {
      return res.status(400).json({
        error: true,
        message: 'You can only review products you have purchased'
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      productId,
      customerId: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({
        error: true,
        message: 'You have already reviewed this product'
      });
    }

    // Create review
    const review = await Review.create({
      productId,
      vendorId: product.vendorId,
      customerId: req.user._id,
      orderId,
      rating,
      title,
      comment,
      images: images || [],
      isVerifiedPurchase: true
    });

    // Populate review
    const populatedReview = await Review.findById(review._id)
      .populate('customerId', 'firstName lastName avatar')
      .populate('productId', 'name slug images');

    res.status(201).json({
      error: false,
      message: 'Review created successfully',
      review: populatedReview
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get product reviews
// @route   GET /api/v1/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, rating, sort = '-createdAt' } = req.query;

    const query = {
      productId,
      status: 'approved'
    };

    if (rating) {
      query.rating = parseInt(rating);
    }

    const skip = (page - 1) * limit;
    const total = await Review.countDocuments(query);

    const reviews = await Review.find(query)
      .populate('customerId', 'firstName lastName avatar')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get rating distribution
    const ratingDistribution = await Review.aggregate([
      { $match: { productId: mongoose.Types.ObjectId(productId), status: 'approved' } },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    res.status(200).json({
      error: false,
      reviews,
      ratingDistribution,
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

// @desc    Get vendor reviews
// @route   GET /api/v1/reviews/vendor/:vendorId
// @access  Public
export const getVendorReviews = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;
    const total = await Review.countDocuments({
      vendorId,
      status: 'approved'
    });

    const reviews = await Review.find({
      vendorId,
      status: 'approved'
    })
      .populate('customerId', 'firstName lastName avatar')
      .populate('productId', 'name slug images')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      error: false,
      reviews,
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

// @desc    Update review
// @route   PUT /api/v1/reviews/:id
// @access  Private
export const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        error: true,
        message: 'Review not found'
      });
    }

    // Check ownership
    if (review.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: true,
        message: 'Not authorized to update this review'
      });
    }

    const { rating, title, comment, images } = req.body;

    if (rating) review.rating = rating;
    if (title) review.title = title;
    if (comment) review.comment = comment;
    if (images) review.images = images;

    await review.save();

    res.status(200).json({
      error: false,
      message: 'Review updated successfully',
      review
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        error: true,
        message: 'Review not found'
      });
    }

    // Check ownership (or admin)
    if (review.customerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        error: true,
        message: 'Not authorized to delete this review'
      });
    }

    await review.deleteOne();

    res.status(200).json({
      error: false,
      message: 'Review deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Mark review as helpful
// @route   POST /api/v1/reviews/:id/helpful
// @access  Private
export const markReviewHelpful = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        error: true,
        message: 'Review not found'
      });
    }

    // Check if already marked helpful
    if (review.helpfulBy.includes(req.user._id)) {
      // Remove from helpful
      review.helpfulBy = review.helpfulBy.filter(
        id => id.toString() !== req.user._id.toString()
      );
      review.helpfulCount = Math.max(0, review.helpfulCount - 1);
    } else {
      // Add to helpful
      review.helpfulBy.push(req.user._id);
      review.helpfulCount += 1;
    }

    await review.save();

    res.status(200).json({
      error: false,
      message: 'Review marked as helpful',
      helpfulCount: review.helpfulCount
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Vendor response to review
// @route   POST /api/v1/reviews/:id/response
// @access  Private/Vendor
export const vendorResponse = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        error: true,
        message: 'Review not found'
      });
    }

    // Get vendor
    const vendor = await Vendor.findOne({ userId: req.user._id });

    // Check if review belongs to vendor's product
    if (review.vendorId.toString() !== vendor._id.toString()) {
      return res.status(403).json({
        error: true,
        message: 'Not authorized to respond to this review'
      });
    }

    review.vendorResponse = {
      comment,
      respondedAt: new Date()
    };

    await review.save();

    res.status(200).json({
      error: false,
      message: 'Response added successfully',
      review
    });

  } catch (error) {
    next(error);
  }
};
