import Product from '../models/Product.js';
import Wishlist from '../models/Wishlist.js';

// @desc    Get user wishlist
// @route   GET /api/v1/wishlist
// @access  Private
export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ customerId: req.user._id })
      .populate({
        path: 'items.productId',
        select: 'name slug price compareAtPrice images status isPublished stock',
        populate: {
          path: 'vendorId',
          select: 'shopName slug'
        }
      })
      .lean();

    if (!wishlist) {
      wishlist = { items: [] };
    }

    // Filter out inactive products
    wishlist.items = wishlist.items.filter(item => 
      item.productId && 
      item.productId.status === 'active' && 
      item.productId.isPublished
    );

    res.status(200).json({
      error: false,
      wishlist
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist/:productId
// @access  Private
export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product || product.status !== 'active' || !product.isPublished) {
      return res.status(404).json({
        error: true,
        message: 'Product not found or unavailable'
      });
    }

    let wishlist = await Wishlist.findOne({ customerId: req.user._id });

    if (!wishlist) {
      // Create new wishlist
      wishlist = await Wishlist.create({
        customerId: req.user._id,
        items: [{ productId }]
      });
    } else {
      // Check if product already in wishlist
      const exists = wishlist.items.some(
        item => item.productId.toString() === productId
      );

      if (exists) {
        return res.status(400).json({
          error: true,
          message: 'Product already in wishlist'
        });
      }

      // Add to wishlist
      wishlist.items.push({ productId });
      await wishlist.save();
    }

    // Populate and return
    wishlist = await Wishlist.findById(wishlist._id)
      .populate({
        path: 'items.productId',
        select: 'name slug price compareAtPrice images',
        populate: {
          path: 'vendorId',
          select: 'shopName slug'
        }
      });

    res.status(200).json({
      error: false,
      message: 'Product added to wishlist',
      wishlist
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/v1/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ customerId: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        error: true,
        message: 'Wishlist not found'
      });
    }

    // Remove product
    wishlist.items = wishlist.items.filter(
      item => item.productId.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({
      error: false,
      message: 'Product removed from wishlist',
      wishlist
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Clear wishlist
// @route   DELETE /api/v1/wishlist
// @access  Private
export const clearWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ customerId: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        error: true,
        message: 'Wishlist not found'
      });
    }

    wishlist.items = [];
    await wishlist.save();

    res.status(200).json({
      error: false,
      message: 'Wishlist cleared successfully',
      wishlist
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Check if product is in wishlist
// @route   GET /api/v1/wishlist/check/:productId
// @access  Private
export const checkWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ customerId: req.user._id });

    if (!wishlist) {
      return res.status(200).json({
        error: false,
        inWishlist: false
      });
    }

    const inWishlist = wishlist.items.some(
      item => item.productId.toString() === productId
    );

    res.status(200).json({
      error: false,
      inWishlist
    });

  } catch (error) {
    next(error);
  }
};
