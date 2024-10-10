'use client';
import React from 'react';
import Link from 'next/link';
import Avatar from '@/app/Admin/Avatar';
function Header(avatar: any) {
    console.log(avatar);
    return (
        <div className='flex justify-between items-center w-full'>
            <Link href="/Admin" className='flex w-1/4'>
                <img src="/img/Header/logo.png" alt="Logo" className="w-60 ml-8  " />
            </Link>
            <div className='flex w-1/4 justify-center'>
                 {/* Chưa làm avatar dynamic được */}
                <img loading="lazy" src={avatar != "" ? "https://res.cloudinary.com/dzm879qpm/image/upload/v1728563694/accounts/anbnf64hq86flwly20od.webp" : 'https://res.cloudinary.com/dzm879qpm/image/upload/v1724509562/defautProduct_mlmwsw.png'}
                    alt="Avatar" className="w-12 h-12" />
            </div>

        </div>
    )
}

export default Header