'use client';
import React from 'react';
import GreetPage from '../Component/GreetPage/GreetPage';
import { useAuth } from '@/context/authProvider';
function page() {
    const {Auth, setAuth} = useAuth();
    return (
        <GreetPage/>
    )
}

export default page