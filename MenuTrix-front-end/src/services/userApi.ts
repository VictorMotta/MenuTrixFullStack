import api from './api';

export async function signUp(body: signUp) {
  const response = await api.post('/sign-up', body);
  return response.data;
}

export async function signIn(
  body: Pick<signUp, 'email' | 'password'>
): Promise<{ user: User; token: string }> {
  const response = await api.post('/sign-in', body);
  return response.data;
}

export async function getUser(token: string | undefined): Promise<User> {
  const response = await api.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function alterUser(
  token: string | undefined,
  query: string,
  body: object
): Promise<User> {
  const response = await api.put(`/user?${query}=true`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export interface User {
  id: number;
  name: string;
  cpf: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

type signUp = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  repeatPassword: string;
};
