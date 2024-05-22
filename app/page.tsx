'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const RootPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/Main');
  }, []);

  return <></>;
};

export default RootPage;
