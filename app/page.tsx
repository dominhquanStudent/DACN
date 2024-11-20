'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const RootPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/Main');
  }, [router]); // Add router to dependency array

  return <></>;
};

export default RootPage;