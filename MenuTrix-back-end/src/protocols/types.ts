import { Session, User } from '@prisma/client';

export type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type BodyUser = CreateUser & { repeatPassword: string };

export type SignInUser = Omit<CreateUser, 'name' | 'cpf'>;

export type CreateSessionUser = Omit<Session, 'id' | 'createdAt' | 'updatedAt'>;

export type ApplicationError = {
  name: string;
  message: string;
};
