'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { deleteCookie } from "cookies-next";
import Logout from "@/public/img/logouthl.svg";
import axios from "@/api/axios";
import useAuth from '@/hooks/useAuth';
function Header() {
    const { setAuth } = useAuth();
    const [avatar, setAvatar] = useState("");
    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await axios.get('/account/info');
                setAvatar(response.data.account.avatar.url);
            } catch (error) {
                console.error('Error fetching avatar:', error);
            }
        };
        fetchAvatar();
    }, []);
    const handleLogout = async () => {
        try {
            const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
            await axios.post(`${baseURL}/auth/logout`);
            deleteCookie("jwt");
            deleteCookie("refreshToken", { httpOnly: true, sameSite: 'none', secure: true, path: '/' });
            // Clear the auth state
            setAuth(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
        window.location.href = '/Login';
    };
    return (
        <div className='flex justify-between items-center w-full'>
            <Link href="/Admin/DashBoard" className='flex w-1/4'>
                <img src="/img/Header/logo.png" alt="Logo" className="w-60 ml-8  " />
            </Link>
            <div className='flex w-1/4 justify-center'>
                {/* Chưa làm avatar dynamic được */}
                <img loading="lazy" src={avatar}
                    alt="Avatar" className="w-12 h-12" />
                <button onClick={handleLogout}>
                    <img className="ml-4 w-7 h-7" src={Logout.src} alt="" />
                </button>
            </div>
        </div>
    )
}

export default Header