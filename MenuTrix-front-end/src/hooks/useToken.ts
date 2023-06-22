import { useContext } from 'react';

import { AuthContext } from '../contexts/authContext';

export default function useToken() {
  const { user } = useContext(AuthContext);

  return user?.token;
}
