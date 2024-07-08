'use client';
import React from 'react';
import Link from 'next/link';
import Avatar from '@/app/Admin/Avatar';
function Header() {
    return (
        <div className='flex justify-between items-center w-full'>
        <Link href="/Admin" className='flex w-1/4'>
            <img src="/img/Header/logo.png" alt="Logo" className="w-60 ml-8  " />
        </Link>
        <Avatar></Avatar>
    </div>
    )
}

export default Header