'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    { name: 'Dash Board', path: '/Doctor/DashBoard', icon: '/img/icon/dashboard_hl.svg', iconhl: '/img/icon/dashboard.svg' },
    { name: 'Quản lý lịch hẹn', path: '/Doctor/Appointment', icon: '/img/icon/appointment.svg', iconhl: '/img/icon/appointment_hl.svg' },
    { name: 'Bản tin', path: '/Doctor/Blog', icon: '/img/icon/order.svg', iconhl: '/img/icon/order_hl.svg' },
    { name: 'Thông báo bệnh nhân', path: '/Doctor/Notification', icon: '/img/icon/Allert.svg', iconhl: '/img/icon/Allert_hl.svg'},
    { name: 'Hồ sơ', path: '/Doctor/Profile', icon: '/img/icon/admin.svg', iconhl: '/img/icon/admin_hl.svg' },
];

function Sidebar() {
    const pathname = usePathname();
    return (
        <div className='flex flex-col w-1/5 mt-12 space-y-6'>
            {menuItems.map((item) => (
                <div key={item.path} className='flex items-center ml-12 font-nunito text-md text-[#B1B1B1]'>
                    <Link href={item.path} className='flex items-center'>
                        <div>
                            <img src={(pathname.includes(item.path)) ? item.iconhl : item.icon} className={`h-6 w-6`}></img>
                        </div>
                        <div className={`ml-4 ${pathname.includes(item.path) ? "text-[#EDB24E] font-bold" : ""}`}>
                            {item.name}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Sidebar;