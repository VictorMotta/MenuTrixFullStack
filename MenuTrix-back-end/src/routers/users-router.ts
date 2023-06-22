import { alterInfos, createUser, getUser, signInUser } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createUserSchema, signInUserSchema } from '@/schemas';
import { Router } from 'express';

const usersRouter = Router();

usersRouter
  .post('/sign-up', validateBody(createUserSchema), createUser)
  .post('/sign-in', validateBody(signInUserSchema), signInUser)
  .all('/*', authenticateToken)
  .get('/user', getUser)
  .put('/user', alterInfos);

export { usersRouter };
