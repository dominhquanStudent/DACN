import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BKPetCare',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
