'use client';
import { redirect } from 'next/dist/server/api-utils';
import useAuth from '../../hooks/useAuth';
import ErrorModal from '../Component/Error';
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
  if (loading) {
    return <LoadingModal loading="LOADING_PAGE" />
  }
  if (!getCookie("jwt")){
    setAuth(null);
  }
  if (auth) {
    if (auth.role == 'admin') {
      router.push('/Admin');
    } else if (auth.role == 'user') {
      router.push('/Main');
    } else if (auth.role == 'doctor') {
      router.push('/Doctor');
    }
  } else {
    return <>{children}</>;
  }
}