import express from 'express';
import {
    addToWishlist,
    checkWishlist,
    clearWishlist,
    getWishlist,
    removeFromWishlist
} from '../controllers/wishlistController.js';
import { protect } from '../middleware/auth.js';
import { mongoIdValidation } from '../middleware/validation.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/', getWishlist);
router.post('/:productId', mongoIdValidation, addToWishlist);
router.delete('/:productId', mongoIdValidation, removeFromWishlist);
router.delete('/', clearWishlist);
router.get('/check/:productId', mongoIdValidation, checkWishlist);

export default router;
