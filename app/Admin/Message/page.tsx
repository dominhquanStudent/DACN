'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
function Message() {
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            {/* //Header */}
            <Header></Header>
            <div className='flex w-full'>
                <Sidebar></Sidebar>
                <div className='w-3/4 border-l-2 border-gray-200'>
                    {/* content */}
                </div>
            </div>
        </div>

    )
}

export default Message