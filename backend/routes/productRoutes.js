import express from 'express';
import { 
  getProducts, 
  getProductByIdOrSlug, 
  getCategoriesSummary 
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/categories/summary', getCategoriesSummary);
router.get('/:id', getProductByIdOrSlug);

export default router;
