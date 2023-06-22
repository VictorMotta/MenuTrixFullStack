import { AdditionalRes } from '../pages/Additional';
import api, { createHeaderToken } from './api';

export interface AdditionalReq {
  nameAdditional: string;
  priceAdditional: number;
  isAvailable?: boolean;
}

export interface AdditionalDB {
  id: number;
  name: string;
  isAvailable: boolean;
  price: number;
  restaurantId?: number;
  createdAt?: string;
  updatedAt?: string;
}

type AvailableAdditionalBoolean = Pick<AdditionalReq, 'isAvailable'>;

export async function getAllAdditionals(token: string | undefined): Promise<AdditionalRes[]> {
  const response = await api.get('/additional', createHeaderToken(token));

  return response.data;
}

export async function getAllAdditionalsAvailable(
  token: string | undefined
): Promise<AdditionalDB[]> {
  const response = await api.get('/additional/available', createHeaderToken(token));

  return response.data;
}

export async function getAdditionalSearch(token: string | undefined, name: string) {
  const response = await api.get(`/additional/search?name=${name}`, createHeaderToken(token));

  return response.data;
}

export async function createAdditional(token: string | undefined, body: AdditionalReq) {
  const response = await api.post('/additional', body, createHeaderToken(token));

  return response.data;
}

export async function alterAvailableAdditional(
  token: string | undefined,
  idAdditional: number | undefined,
  body: AvailableAdditionalBoolean
): Promise<AdditionalRes> {
  const response = await api.put(
    `/additional/available/${idAdditional}`,
    body,
    createHeaderToken(token)
  );

  return response.data;
}
