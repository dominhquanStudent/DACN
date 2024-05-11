'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const RootPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/user');
  }, []);

  return <></>;
};

export default RootPage;
