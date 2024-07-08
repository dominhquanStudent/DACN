'use client';
import React from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
function DashBoard() {
    const sections = [
        { icon: '/img/icon/order.svg', title: 'Số đơn hàng', value: 123 },
        { icon: '/img/icon/product.svg', title: 'Cuộc hẹn hiện tại', value: 12 },
        { icon: '/img/icon/rescue.svg', title: 'Yêu cầu cứu hộ', value: 12 },
        { icon: '/img/icon/product.svg', title: 'Số đơn nhận nuôi', value: 12 },
    ];
    const placeholder = {
        hoten: 'Giang Ngọc Hiền',
        sdt: '0988776655',
        email: 'hienkienzan@gmail.com',
    }
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            {/* //Header */}
            <Header></Header>
            <div className='flex w-full'>
                <Sidebar></Sidebar>
                <div className='w-3/4 border-l-2 border-gray-200'>
                    <div className='flex flex-col ml-8'>
                        <div className={'flex font-nunito text-xl font-bold w-full justify-center'}>
                            Dash Board
                        </div>
                        <div className='font-nunito text-lg font-bold mb-4'>
                            Việc cần làm
                        </div>
                        <div className='flex space-x-10 mb-4'>
                            {sections.map((section, index) => (
                                <div key={index} className='flex items-center justify-center space-x-4'>
                                    <img src={section.icon} className='h-2/3'></img>
                                    <div className='flex flex-col'>
                                        <div>{section.title}</div>
                                        <div>{section.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='font-nunito text-lg font-bold'>
                            Thông tin nhân viên
                        </div>
                        <div className='flex items-center'> {/* Ensure this container is a flex container aligning items vertically */}
                            <div className='flex-col w-1/3 mt-4'>
                                <div className='mb-4'>
                                    <label htmlFor="fullName" className='block text-sm font-medium text-gray-700'>Họ tên</label>
                                    <input type="text" id="fullName" name="fullName" placeholder={placeholder.hoten} className='mt-2 p-2 pl-4 block w-full rounded-md border border-black shadow-sm sm:text-sm' />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="phoneNumber" className='block text-sm font-medium text-gray-700'>Số điện thoại</label>
                                    <input type="tel" id="phoneNumber" name="phoneNumber" placeholder={placeholder.sdt} className='mt-2 p-2 pl-4 block w-full rounded-md border border-black sm:text-sm' pattern="[0-9]{10}" />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                                    <input type="email" id="email" name="email" placeholder={placeholder.email} className='mt-2 p-2 pl-4 block w-full rounded-md border border-black' />
                                </div>
                            </div>
                            <div className='flex justify-center ml-12'>
            <img src="/img/Avatar_vinh.png" alt="Avatar" className="w-20 h-20" />
        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DashBoard