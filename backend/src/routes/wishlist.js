import express from 'express';
import {
    addToWishlist,
    checkWishlist,
    clearWishlist,
    getWishlist,
    removeFromWishlist
} from '../controllers/wishlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/', getWishlist);
router.post('/:productId', addToWishlist);
router.delete('/:productId', removeFromWishlist);
router.delete('/', clearWishlist);
router.get('/check/:productId', checkWishlist);

export default router;
