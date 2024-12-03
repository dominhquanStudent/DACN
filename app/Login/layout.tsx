'use client';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import LoadingModal from '../Component/Loading';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth, setAuth, loading } = useAuth();
  const router = useRouter();
  const jwt = getCookie('jwt');

  useEffect(() => {
    if (auth && jwt) {
      switch (auth.role) {
        case 'admin':
          router.push('/Admin');
          break;
        case 'user':
          router.push('/Main');
          break;
        case 'doctor':
          router.push('/Doctor');
          break;
      }
    } else if (!jwt) {
      setAuth(null);
    }
  }, [auth, jwt, router, setAuth]);

  if (loading) {
    return <LoadingModal />;
  }

  return <>{children}</>;
}