import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { AuthContext } from './AuthContext';

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        await api.get('/user/my');
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const authUser = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      await api.post('/user/login', data);
      authUser();
    } catch {
      console.log('Erro');
    }
  };

  const logout = async () => {
    try {
      await api.post('/user/logout');
    } finally {
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
          navigate('/login');
        }
        return Promise.reject(error);
      },
    );
    return () => api.interceptors.response.eject(interceptor);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
