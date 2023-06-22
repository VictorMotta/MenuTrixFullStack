import { AuthenticatedRequest } from '@/middlewares';
import { RestaurantBodyType } from '@/schemas/restaurants-schemas';
import restaurantsService from '@/services/restaurants-service';
import { NextFunction, Response } from 'express';

export async function getRestaurant(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  try {
    const response = await restaurantsService.getRestaurant(userId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function createOrUpdateRestaurant(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const body = req.body as RestaurantBodyType;
  try {
    const response = await restaurantsService.createOrUpdateRestaurant(body, userId);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
}
