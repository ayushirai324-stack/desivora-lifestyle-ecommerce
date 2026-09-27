import express from 'express';
import { registerUser, loginUser, getMe, updateWishlist } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/wishlist', protect, updateWishlist);

export default router;
