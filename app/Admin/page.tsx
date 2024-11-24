'use client';
import {useEffect} from 'react';
import { useRouter } from 'next/navigation';
function DashBoard() {
    const router = useRouter();
    useEffect(() => {
      router.replace('/Admin/Dashboard');
    }, []);
    return <></>
}

export default DashBoard