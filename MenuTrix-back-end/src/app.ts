import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { connectDb, disconnectDB } from '@/config';
import {
  additionalsRouter,
  clientesRouter,
  productsRouter,
  restaurantsRouter,
  usersRouter,
} from '@/routers';
import { handleApplicationErrors } from '@/middlewares';
import { loadEnv } from '@/config';

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/', usersRouter)
  .use('/restaurant', restaurantsRouter)
  .use('/product', productsRouter)
  .use('/additional', additionalsRouter)
  .use('/product', productsRouter)
  .use('/client', clientesRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
