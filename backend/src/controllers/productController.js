import Product from '../models/Product.js';
import Vendor from '../models/Vendor.js';

// @desc    Get all products with filters
// @route   GET /api/v1/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      inStock,
      isNew,
      isFeatured,
      vendorId,
      search,
      sort = '-createdAt',
      page = 1,
      limit = 24
    } = req.query;

    // Build query
    const query = { status: 'active', isPublished: true };
    console.log('📦 getProducts query:', query);

    if (category) query.categoryId = category;
    if (vendorId) query.vendorId = vendorId;
    if (inStock === 'true') query.stock = { $gt: 0 };
    if (isFeatured === 'true') query.isFeatured = true;

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // New products (last 30 days)
    if (isNew === 'true') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      query.createdAt = { $gte: thirtyDaysAgo };
    }

    // Pagination
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(query);

    // Execute query
    const products = await Product.find(query)
      .populate('vendorId', 'shopName slug logo stats.rating')
      .populate('categoryId', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    console.log('📦 getProducts found:', products.length, 'products');

    res.status(200).json({
      error: false,
      products,
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

// @desc    Get single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('vendorId', 'shopName slug logo description stats address social')
      .populate('categoryId', 'name slug')
      .populate('subcategoryId', 'name slug');

    if (!product) {
      return res.status(404).json({
        error: true,
        message: 'Product not found'
      });
    }

    // Increment view count
    product.stats.viewCount += 1;
    await product.save();

    res.status(200).json({
      error: false,
      product
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID or slug
// @route   GET /api/v1/products/slug/:idOrSlug
// @access  Public
export const getProductByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    let product;

    // Check if it's a valid MongoDB ObjectId
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(idOrSlug)
        .populate('vendorId', 'shopName slug logo description stats address social')
        .populate('categoryId', 'name slug')
        .populate('subcategoryId', 'name slug');
    } else {
      // Try to find by slug
      product = await Product.findOne({ slug: idOrSlug, status: 'active', isPublished: true })
        .populate('vendorId', 'shopName slug logo description stats address social')
        .populate('categoryId', 'name slug')
        .populate('subcategoryId', 'name slug');
    }

    if (!product) {
      return res.status(404).json({
        error: true,
        message: 'Product not found'
      });
    }

    // Increment view count
    product.stats.viewCount += 1;
    await product.save();

    res.status(200).json({
      error: false,
      product
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/Vendor
export const createProduct = async (req, res, next) => {
  try {
    // Get vendor from authenticated user
    const vendor = await Vendor.findOne({ userId: req.user._id });

    if (!vendor) {
      return res.status(403).json({
        error: true,
        message: 'You must be a vendor to create products'
      });
    }

    if (vendor.status !== 'active') {
      return res.status(403).json({
        error: true,
        message: 'Your vendor account is not active'
      });
    }

    // Add vendorId to product data
    const productData = {
      ...req.body,
      vendorId: vendor._id
    };

    const product = await Product.create(productData);

    // Update vendor product count
    vendor.stats.totalProducts += 1;
    await vendor.save();

    res.status(201).json({
      error: false,
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private/Vendor
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: 'Product not found'
      });
    }

    // Get vendor
    const vendor = await Vendor.findOne({ userId: req.user._id });

    // Check ownership (unless admin)
    if (req.user.role !== 'admin' && product.vendorId.toString() !== vendor._id.toString()) {
      return res.status(403).json({
        error: true,
        message: 'Not authorized to update this product'
      });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      error: false,
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private/Vendor
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: 'Product not found'
      });
    }

    // Get vendor
    const vendor = await Vendor.findOne({ userId: req.user._id });

    // Check ownership (unless admin)
    if (req.user.role !== 'admin' && product.vendorId.toString() !== vendor._id.toString()) {
      return res.status(403).json({
        error: true,
        message: 'Not authorized to delete this product'
      });
    }

    await product.deleteOne();

    // Update vendor product count
    if (vendor) {
      vendor.stats.totalProducts = Math.max(0, vendor.stats.totalProducts - 1);
      await vendor.save();
    }

    res.status(200).json({
      error: false,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/v1/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 12;

    // First, try to get products with high ratings
    let products = await Product.find({
      status: 'active',
      isPublished: true,
      'stats.rating': { $gte: 4 }
    })
      .populate('vendorId', 'shopName slug logo')
      .sort('-stats.rating -stats.soldCount')
      .limit(limit)
      .lean();

    // If no high-rated products found, get any active published products
    if (products.length === 0) {
      products = await Product.find({
        status: 'active',
        isPublished: true
      })
        .populate('vendorId', 'shopName slug logo')
        .sort('-createdAt')
        .limit(limit)
        .lean();
    }

    console.log('📦 Featured products found:', products.length);

    res.status(200).json({
      error: false,
      products
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get vendor's products
// @route   GET /api/v1/products/vendor/:vendorId
// @access  Public
export const getVendorProducts = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const { page = 1, limit = 24, sort = '-createdAt' } = req.query;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        error: true,
        message: 'Vendor not found'
      });
    }

    const skip = (page - 1) * limit;
    const total = await Product.countDocuments({
      vendorId,
      status: 'active',
      isPublished: true
    });

    const products = await Product.find({
      vendorId,
      status: 'active',
      isPublished: true
    })
      .populate('categoryId', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      error: false,
      vendor: {
        id: vendor._id,
        shopName: vendor.shopName,
        slug: vendor.slug,
        logo: vendor.logo,
        stats: vendor.stats
      },
      products,
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

// @desc    Get related products
// @route   GET /api/v1/products/:id/related
// @access  Public
export const getRelatedProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: 'Product not found'
      });
    }

    const limit = parseInt(req.query.limit) || 8;

    // Find products in same category, exclude current product
    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      categoryId: product.categoryId,
      status: 'active',
      isPublished: true
    })
      .populate('vendorId', 'shopName slug logo')
      .limit(limit)
      .lean();

    res.status(200).json({
      error: false,
      products: relatedProducts
    });

  } catch (error) {
    next(error);
  }
};
