import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { uploadMultiple, uploadSingle } from '../middleware/upload.js';
import { deleteFromCloudinary, uploadMultipleToCloudinary, uploadToCloudinary } from '../services/cloudinary.js';

const router = express.Router();

// @desc    Upload single image
// @route   POST /api/v1/upload/image
// @access  Private
router.post('/image', protect, uploadSingle, async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: 'No file uploaded'
      });
    }

    const result = await uploadToCloudinary(req.file.buffer, 'butiks/general');

    res.status(200).json({
      error: false,
      message: 'Image uploaded successfully',
      image: {
        url: result.url,
        publicId: result.publicId
      }
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Upload multiple images
// @route   POST /api/v1/upload/images
// @access  Private
router.post('/images', protect, uploadMultiple, async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: true,
        message: 'No files uploaded'
      });
    }

    const results = await uploadMultipleToCloudinary(req.files, 'butiks/products');

    const images = results.map(result => ({
      url: result.url,
      publicId: result.publicId
    }));

    res.status(200).json({
      error: false,
      message: 'Images uploaded successfully',
      images
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Upload product images
// @route   POST /api/v1/upload/product-images
// @access  Private/Vendor
router.post('/product-images', protect, authorize('vendor', 'admin'), uploadMultiple, async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: true,
        message: 'No files uploaded'
      });
    }

    const results = await uploadMultipleToCloudinary(req.files, 'butiks/products');

    const images = results.map((result, index) => ({
      url: result.url,
      publicId: result.publicId,
      alt: `Product image ${index + 1}`,
      order: index,
      isMain: index === 0
    }));

    res.status(200).json({
      error: false,
      message: 'Product images uploaded successfully',
      images
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Delete image
// @route   DELETE /api/v1/upload/image/:publicId
// @access  Private
router.delete('/image/:publicId', protect, async (req, res, next) => {
  try {
    const publicId = req.params.publicId.replace(/_/g, '/');
    const result = await deleteFromCloudinary(publicId);

    res.status(200).json({
      error: false,
      message: 'Image deleted successfully',
      result
    });

  } catch (error) {
    next(error);
  }
});

export default router;
