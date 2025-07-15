import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

// Cart
router.get('/cart', userController.getCart);
router.post('/cart/add', userController.addToCart);
router.post('/cart/remove', userController.removeFromCart);

// Wishlist
router.get('/wishlist', userController.getWishlist);
router.post('/wishlist/add', userController.addToWishlist);
router.post('/wishlist/remove', userController.removeFromWishlist);

export default router;
