import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showMessage } from '../../adapters/ShowMessage';
import type { UserLogin, UserRegister } from '../../types/User';
import { api } from '../../utils/api';
import { AuthContext, type User } from './AuthContext';

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const isAuthenticated = !!user;

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await api.get('/user/my');

        if (response.data?.data) {
          setUser(response.data.data);
        } else {
          setUser(undefined);
        }
      } catch {
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (data: UserLogin) => {
    try {
      const response = await api.post('/user/login', data);
      setUser(response.data.data);

      navigate('/');
      showMessage.success('Logado com sucesso!');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        showMessage.error(err.response?.data?.message);
      } else if (err instanceof Error) {
        showMessage.error(err.message);
      } else {
        showMessage.error('Erro desconhecido');
      }
    }
  };

  const registerUser = async (data: UserRegister) => {
    try {
      await api.post('/user/cadastrar', data);
      navigate('/login');
      showMessage.success('Conta criada!');
    } catch (error) {
      if (error instanceof AxiosError) {
        showMessage.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        showMessage.error(error.message);
      } else {
        showMessage.error('Erro desconhecido');
      }
    }
  };

  const logout = async () => {
    try {
      await api.post('/user/logout');
      showMessage.success('Saiu!');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        showMessage.error(err.response?.data?.message);
      } else if (err instanceof Error) {
        showMessage.error(err.message);
      } else {
        showMessage.error('Error do servidor, Tente novamente mais tarde!');
      }
    } finally {
      setUser(undefined);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, user, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
