import Product from '../models/Product.js';
import User from '../models/User.js';
import Vendor from '../models/Vendor.js';

// @desc    Get all vendors
// @route   GET /api/v1/vendors
// @access  Public
export const getVendors = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, status = 'active' } = req.query;

    const query = { status };
    const skip = (page - 1) * limit;
    const total = await Vendor.countDocuments(query);

    const vendors = await Vendor.find(query)
      .populate('userId', 'firstName lastName email')
      .sort('-stats.rating -stats.totalSales')
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      error: false,
      vendors,
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

// @desc    Get vendor by slug
// @route   GET /api/v1/vendors/:slug
// @access  Public
export const getVendorBySlug = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ slug: req.params.slug })
      .populate('userId', 'firstName lastName');

    if (!vendor) {
      return res.status(404).json({
        error: true,
        message: 'Vendor not found'
      });
    }

    // Get vendor's product count by category
    const productsByCategory = await Product.aggregate([
      {
        $match: {
          vendorId: vendor._id,
          status: 'active',
          isPublished: true
        }
      },
      {
        $group: {
          _id: '$categoryId',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      {
        $project: {
          categoryName: '$category.name',
          count: 1
        }
      }
    ]);

    res.status(200).json({
      error: false,
      vendor,
      productsByCategory
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Apply to become a vendor
// @route   POST /api/v1/vendors/apply
// @access  Private
export const applyVendor = async (req, res, next) => {
  try {
    // Check if user already has a vendor account
    const existingVendor = await Vendor.findOne({ userId: req.user._id });

    if (existingVendor) {
      return res.status(400).json({
        error: true,
        message: 'You already have a vendor account'
      });
    }

    // Check if shop name is taken
    const shopNameExists = await Vendor.findOne({ shopName: req.body.shopName });
    if (shopNameExists) {
      return res.status(400).json({
        error: true,
        message: 'Shop name already taken'
      });
    }

    // Create vendor
    const vendor = await Vendor.create({
      userId: req.user._id,
      ...req.body,
      status: 'pending'
    });

    // Update user role to vendor
    await User.findByIdAndUpdate(req.user._id, { role: 'vendor' });

    res.status(201).json({
      error: false,
      message: 'Vendor application submitted successfully. Awaiting approval.',
      vendor
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get current vendor profile
// @route   GET /api/v1/vendors/me
// @access  Private/Vendor
export const getMyVendorProfile = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id })
      .populate('userId', 'firstName lastName email');

    if (!vendor) {
      return res.status(404).json({
        error: true,
        message: 'Vendor profile not found'
      });
    }

    res.status(200).json({
      error: false,
      vendor
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Update vendor profile
// @route   PUT /api/v1/vendors/me
// @access  Private/Vendor
export const updateMyVendorProfile = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });

    if (!vendor) {
      return res.status(404).json({
        error: true,
        message: 'Vendor profile not found'
      });
    }

    // Fields that can be updated
    const allowedFields = [
      'description',
      'logo',
      'banner',
      'email',
      'phone',
      'website',
      'address',
      'social',
      'bankAccount'
    ];

    // Update only allowed fields
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        vendor[field] = req.body[field];
      }
    });

    await vendor.save();

    res.status(200).json({
      error: false,
      message: 'Vendor profile updated successfully',
      vendor
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get vendor dashboard stats
// @route   GET /api/v1/vendors/me/stats
// @access  Private/Vendor
export const getVendorStats = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });

    if (!vendor) {
      return res.status(404).json({
        error: true,
        message: 'Vendor profile not found'
      });
    }

    // Get low stock products
    const lowStockProducts = await Product.find({
      vendorId: vendor._id,
      stock: { $lte: '$lowStockThreshold' },
      trackInventory: true
    }).limit(10);

    // Get recent products
    const recentProducts = await Product.find({
      vendorId: vendor._id
    })
      .sort('-createdAt')
      .limit(5)
      .select('name price stock status createdAt');

    res.status(200).json({
      error: false,
      stats: vendor.stats,
      lowStockProducts,
      recentProducts
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Approve vendor application (Admin only)
// @route   PATCH /api/v1/vendors/:id/approve
// @access  Private/Admin
export const approveVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        error: true,
        message: 'Vendor not found'
      });
    }

    vendor.status = 'active';
    vendor.isVerified = true;
    vendor.verifiedAt = new Date();
    await vendor.save();

    res.status(200).json({
      error: false,
      message: 'Vendor approved successfully',
      vendor
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Reject vendor application (Admin only)
// @route   PATCH /api/v1/vendors/:id/reject
// @access  Private/Admin
export const rejectVendor = async (req, res, next) => {
  try {
    const { reason } = req.body;

    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        error: true,
        message: 'Vendor not found'
      });
    }

    vendor.status = 'rejected';
    vendor.rejectionReason = reason;
    await vendor.save();

    res.status(200).json({
      error: false,
      message: 'Vendor application rejected',
      vendor
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Suspend vendor (Admin only)
// @route   PATCH /api/v1/vendors/:id/suspend
// @access  Private/Admin
export const suspendVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        error: true,
        message: 'Vendor not found'
      });
    }

    vendor.status = 'suspended';
    await vendor.save();

    res.status(200).json({
      error: false,
      message: 'Vendor suspended successfully',
      vendor
    });

  } catch (error) {
    next(error);
  }
};
