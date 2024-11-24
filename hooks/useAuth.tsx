'use client';
import { useState, useEffect } from 'react';
import authService from './authService';

interface Auth {
  email: string;
  role: string;
  id: string;
  accessToken: string;
}

const useAuth = () => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }
  }, [auth]);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password);
      setAuth(data);
      return data;
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  const isAuthenticated = authService.isAuthenticated();
  const getID = auth?.id;
  
  return { auth, setAuth, login, logout, isAuthenticated, getID, loading };
};

export default useAuth;