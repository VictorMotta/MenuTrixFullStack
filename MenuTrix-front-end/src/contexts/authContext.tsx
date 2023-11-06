import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  children: ReactNode;
}

export type UserState =
  | undefined
  | {
    user: {
      id: number;
      name: string;
      cpf: string;
      email: string;
      password?: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };

type AuthContextData = {
  user: UserState;
  setUser: Dispatch<SetStateAction<UserState>>;
  login: (data: UserState) => void;
  logout: () => void;
  authenticated: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserState>(undefined);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = (data: UserState) => {
    const loggedUser = data;

    localStorage.setItem('user', JSON.stringify(loggedUser));

    setUser(loggedUser);

    navigate('/produtos');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(undefined);
    navigate('/');
  };

  const contextData: AuthContextData = {
    user,
    setUser,
    login,
    logout,
    authenticated: !!user,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
