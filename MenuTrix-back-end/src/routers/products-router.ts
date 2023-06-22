import {
  alterAvailableProduct,
  alterProduct,
  createProduct,
  getAllProducts,
  getProductsByName,
} from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import {
  AvailableProductSchema,
  CreateProductSchema,
  updateProductSchema,
} from '@/schemas/products-schemas';
import { Router } from 'express';

const productsRouter = Router();

productsRouter
  .all('/*', authenticateToken)
  .get('/', getAllProducts)
  .get('/search', getProductsByName)
  .post('/', validateBody(CreateProductSchema), createProduct)
  .put('/available/:idProduct', validateBody(AvailableProductSchema), alterAvailableProduct)
  .put('/:idProduct', validateBody(updateProductSchema), alterProduct);

export { productsRouter };
