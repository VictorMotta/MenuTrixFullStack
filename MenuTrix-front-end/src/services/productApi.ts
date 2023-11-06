import { ProductBody } from '../components/CreateProduct';
import { ProductRes } from '../pages';
import api, { createHeaderToken } from './api';

type AvailableProductBoolean = Pick<ProductRes, 'isAvailable'>;

export async function createProduct(token: string | undefined, body: ProductBody) {
  const response = await api.post('/product', body, createHeaderToken(token));

  return response.data;
}

export async function getAllProducts(token: string | undefined) {
  const response = await api.get('/product', createHeaderToken(token));
  return response.data;
}

export async function getAllProductsAvailable(token: string | undefined) {
  const response = await api.get(`/product/available`, createHeaderToken(token));

  return response.data;
}

export async function getAllProductsAvailableSearch(token: string | undefined, name: string) {
  const response = await api.get(
    `/product/available/search?name=${name}`,
    createHeaderToken(token)
  );

  return response.data;
}

export async function getProductSearch(token: string | undefined, name: string) {
  const response = await api.get(`/product/search?name=${name}`, createHeaderToken(token));

  return response.data;
}

export async function alterAvailableProduct(
  token: string | undefined,
  idAdditional: number | undefined,
  body: AvailableProductBoolean
): Promise<ProductRes> {
  const response = await api.put(
    `/product/available/${idAdditional}`,
    body,
    createHeaderToken(token)
  );

  return response.data;
}

export async function alterProduct(
  token: string | undefined,
  idAdditional: number | undefined,
  body: Pick<ProductRes, 'name' | 'price' | 'photoProduct' | 'description' | 'ProductAdditional'>
): Promise<ProductRes> {
  const response = await api.put(`/product/${idAdditional}`, body, createHeaderToken(token));

  return response.data;
}
