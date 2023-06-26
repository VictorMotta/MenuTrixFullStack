import { AuthenticatedRequest } from '@/middlewares';
import { BodyUser, SignInUser } from '@/protocols/types';
import usersService from '@/services/users-service';
import { NextFunction, Request, Response } from 'express';

export async function getUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  try {
    const user = await usersService.getUser(userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, cpf } = req.body as BodyUser;
  try {
    await usersService.createUser({ name, email, password, cpf });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function signInUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as SignInUser;
  try {
    const result = await usersService.signIn({ email, password });
    console.log(result);
    res.send(result);
  } catch (error) {
    next(error);
  }
}

export async function alterInfos(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const query = req.query as ReqQuerys;
  const userId = req.userId;
  const body = req.body as ReqBody;
  try {
    const response = await usersService.alterInfos(query, userId, body);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export interface ReqQuerys {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
}
export interface ReqBody {
  newName?: string;
  mainEmail?: string;
  newEmail?: string;
  repeatEmail?: string;
  mainPassword?: string;
  newPassword?: string;
  repeatPassword?: string;
  mainCpf?: string;
  newCpf?: string;
  repeatCpf?: string;
}
