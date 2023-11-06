import { RestaurantType } from '../pages';
import api from './api';

export async function getRestaurantConfig(token: string | undefined) {
  const response = await api.get('/restaurant', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function restaurantConfig(token: string | undefined, body: RestaurantType) {
  const response = await api.post('/restaurant', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
