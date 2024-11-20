'use client';
import {useEffect} from 'react';
import { useRouter } from 'next/navigation';
function DashBoard() {
    const router = useRouter();
    useEffect(() => {
      router.replace('/Doctor/DashBoard');
    }, [router]);
    return <></>
}

export default DashBoard