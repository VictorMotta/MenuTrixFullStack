import { AuthenticatedRequest } from '@/middlewares';
import { AdditionalType } from '@/schemas/additionals-schemas';
import additionalsService from '@/services/additionals-service';
import { NextFunction, Response } from 'express';

export async function getAllAdditionals(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  try {
    const response = await additionalsService.getAllAdditionals(userId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function getAllAdditionalsAvailable(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  try {
    const response = await additionalsService.getAllAdditionalsAvailable(userId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function getAdditionalsByName(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const { name } = req.query as { name: string };
  try {
    const response = await additionalsService.getAdditionalsByName(name, userId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function createAdditionals(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const body = req.body as AdditionalType;
  try {
    const response = await additionalsService.createAdditional(body, userId);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
}

export async function availableAdditional(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const { isAvailable } = req.body as AdditionalType;
  const { idAdditional } = req.params;

  try {
    const response = await additionalsService.availableAdditional(
      isAvailable,
      +idAdditional,
      userId
    );
    res.send(response);
  } catch (error) {
    next(error);
  }
}
