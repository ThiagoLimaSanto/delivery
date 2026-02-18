import { createContext } from 'react';

type User = {
  email: string;
  password: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: User) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
