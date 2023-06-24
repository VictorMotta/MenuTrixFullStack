import { ClientBody } from '../components/CreateClient';
import { ClientRes } from '../pages/Client';
import api, { createHeaderToken } from './api';

export async function createClient(
  token: string | undefined,
  body: ClientBody
): Promise<ClientRes> {
  const response = await api.post('/client', body, createHeaderToken(token));

  console.log(response);

  return response.data;
}

export async function getAllClients(token: string | undefined): Promise<ClientRes[]> {
  const response = await api.get('/client', createHeaderToken(token));

  console.log(response);

  return response.data;
}
