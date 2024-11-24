'use client';
import {useEffect} from 'react';
import { useRouter } from 'next/navigation';
function DashBoard() {
    const router = useRouter();
    useEffect(() => {
      router.replace('/Admin/DashBoard');
    }, []);
    return <></>
}

export default DashBoard