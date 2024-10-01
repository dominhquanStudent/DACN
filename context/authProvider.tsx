'use client';
import { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  Auth: {
    email: string;
    accessToken: string;
    role: string;
    id: string;
  };
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [Auth, setAuth] = useState<any>({
    email: '',
    accessToken: '',
    role: '',
    id: '',
  });

  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;