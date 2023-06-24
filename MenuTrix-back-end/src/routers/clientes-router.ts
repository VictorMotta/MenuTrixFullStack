import { getAllClients } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { CreateClientSystemSchema } from '@/schemas';
import { Router } from 'express';
import { createClient } from '@/controllers';

const clientesRouter = Router();

clientesRouter
  .all('/*', authenticateToken)
  .get('/', getAllClients)
  .post('/', validateBody(CreateClientSystemSchema), createClient);

export { clientesRouter };
