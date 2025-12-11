import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import Category from '../models/Category.js';

const router = express.Router();

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true, parentId: null })
      .populate('subcategories')
      .sort('order')
      .lean();

    res.status(200).json({
      error: false,
      categories
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get category by slug
// @route   GET /api/v1/categories/:slug
// @access  Public
router.get('/:slug', async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true })
      .populate('subcategories')
      .lean();

    if (!category) {
      return res.status(404).json({
        error: true,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      error: false,
      category
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      error: false,
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        error: true,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      error: false,
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        error: true,
        message: 'Category not found'
      });
    }

    await category.deleteOne();

    res.status(200).json({
      error: false,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
