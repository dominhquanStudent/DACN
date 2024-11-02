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

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const data = await authService.refreshToken();
        setAuth(data);
      } catch (error) {
        console.error('Failed to refresh token', error);
      }
    };

    fetchAccessToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password);
      setAuth(data);
      return data;
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  const isAuthenticated = authService.isAuthenticated();
  const getID = auth?.id;
  
  return { auth, setAuth, login, isAuthenticated, getID };
};

export default useAuth;