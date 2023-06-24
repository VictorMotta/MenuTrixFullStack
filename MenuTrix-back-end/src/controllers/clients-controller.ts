import { NextFunction, Response, response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authentication-middleware';
import { CreateClientSystemType } from '@/schemas';
import clientsService from '@/services/clients-service';

export async function getAllClients(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;

  try {
    const response = await clientsService.getAllClients(userId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function createClient(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const body = req.body as CreateClientSystemType;

  try {
    const response = await clientsService.createClient(body, userId);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
