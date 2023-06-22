import { createOrUpdateRestaurant, getRestaurant } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { restaurantSchema } from '@/schemas';
import { Router } from 'express';

const restaurantsRouter = Router();

restaurantsRouter
  .all('/*', authenticateToken)
  .get('/', getRestaurant)
  .post('/', validateBody(restaurantSchema), createOrUpdateRestaurant);

export { restaurantsRouter };
