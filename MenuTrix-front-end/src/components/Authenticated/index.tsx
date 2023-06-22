import { AuthContext } from '../../contexts/authContext';
import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';

interface ChildrenPrivate {
  children: ReactNode;
}

export const Private: React.FC<ChildrenPrivate> = ({ children }) => {
  const { authenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!authenticated) {
    return <Navigate to='/' />;
  }

  return children;
};
