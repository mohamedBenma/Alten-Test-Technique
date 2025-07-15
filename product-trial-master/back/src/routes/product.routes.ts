import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/isAdmin';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', authenticate, isAdmin, createProduct);
router.patch('/:id', authenticate, isAdmin, updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;
