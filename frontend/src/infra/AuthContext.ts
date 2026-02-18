import { createContext } from 'react';
import type { UserLogin, UserRegister } from '../types/User';

export type User = {
  name: string;
  email: string;
  phone: string;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: UserLogin) => Promise<void>;
  registerUser: (data: UserRegister) => Promise<void>;
  logout: () => Promise<void>;
  user?: User;
};

export const AuthContext = createContext<AuthContextType | null>(null);
