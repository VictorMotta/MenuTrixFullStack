import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

export default instance;

export function createHeaderToken(token: string | undefined): Header {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

interface Header {
  headers: {
    Authorization: string;
  };
}
