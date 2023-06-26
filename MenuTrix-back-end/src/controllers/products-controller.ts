import { AuthenticatedRequest } from '@/middlewares';
import { AvailableProductBody, ProductBody } from '@/schemas';
import productsService from '@/services/products-service';
import { NextFunction, Response } from 'express';
import { UpdateProductBody } from '../schemas/products-schemas';

export async function getAllProducts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  try {
    const response = await productsService.getAllProducts(userId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function getProductsByName(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const { name } = req.query as { name: string };
  try {
    const response = await productsService.getProductsByName(name, userId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function getAllProductsAvailable(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;

  try {
    const response = await productsService.getAllProductsAvailable(userId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function getAllProductsAvailableByName(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const { name } = req.query as { name: string };
  try {
    const response = await productsService.getAllProductsAvailableByName(name, userId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const body = req.body as ProductBody;

  try {
    const response = await productsService.createProduct(body, userId);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function alterAvailableProduct(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const { isAvailable } = req.body as AvailableProductBody;
  const { idProduct } = req.params;
  try {
    const response = await productsService.alterAvailableProduct(isAvailable, +idProduct, userId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function alterProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const body = req.body as UpdateProductBody;
  const { idProduct } = req.params;

  try {
    const response = await productsService.alterProduct(body, +idProduct, userId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}
