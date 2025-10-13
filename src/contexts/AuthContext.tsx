'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  role: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  loginWithMicrosoft: () => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (_e) {
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);

    try {
      // Call real login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Important: includes cookies
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Nesprávné přihlašovací údaje');
        setIsLoading(false);
        return false;
      }

      // Login successful
      const userData: User = {
        username: data.user.username,
        role: data.user.role,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        displayName: data.user.displayName,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError('Chyba při přihlašování. Zkuste to prosím později.');
      setIsLoading(false);
      return false;
    }
  };

  const loginWithMicrosoft = async (): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      // TODO: Implement Microsoft OAuth flow
      // Placeholder for future API integration
      alert('Microsoft přihlášení bude implementováno s API klíčem');
      setIsLoading(false);
    } catch (_err) {
      setError('Chyba při přihlašování přes Microsoft');
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithMicrosoft,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
