'use client';
import useAuth from '../../hooks/useAuth';
import ErrorModal from '../Component/Error';
import LoadingModal from '../Component/Loading';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth, loading } = useAuth();

  if (loading) {
    return <LoadingModal loading="LOADING_PAGE"/>
  }

  if (!auth || (auth && auth.role !== 'doctor')) {
    return <ErrorModal error="PAGE_UNAUTHORIZED" />;
  } else {
    return <>{children}</>;
  }
}