'use client';
import React from 'react';
import Header from "@/app/Component/Header/Header";
import NotificationList from "@/app/Component/Notification/NotificationList";
import ProfileNav from "@/app/Component/ProfileNav/ProfileNav";
function page() {
    return (
        <div className="flex flex-col w-full ">
            <Header />
            <div className="flex bg-[#DFF3FF] w-full " style={{ minHeight: '80vh' }}>
                <ProfileNav />
                <div className="container w-full bg-white py-4 px-12 my-8 mr-12 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4 text-center">Thông báo người dùng</h1>
                    <NotificationList />
                </div>
            </div>
        </div>
    );
}

export default page