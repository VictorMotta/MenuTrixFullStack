import {
  availableAdditional,
  createAdditionals,
  getAdditionalsByName,
  getAllAdditionals,
  getAllAdditionalsAvailable,
} from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import {
  additionalSchema,
  availableAdditionalSchema,
  getAdditionalByNameSchema,
} from '@/schemas/additionals-schemas';
import { Router } from 'express';

const additionalsRouter = Router();

additionalsRouter
  .all('/*', authenticateToken)
  .get('/', getAllAdditionals)
  .get('/search', getAdditionalsByName)
  .get('/available', getAllAdditionalsAvailable)
  .post('/', validateBody(additionalSchema), createAdditionals)
  .put('/available/:idAdditional', validateBody(availableAdditionalSchema), availableAdditional);

export { additionalsRouter };
