'use client';
import React from 'react';
import Header from "@/app/Component/Header/Header";
import NotificationList from "@/app/Component/Notification/NotificationList";
function page() {
    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Thông báo người dùng</h1>
                <NotificationList />
            </div>
        </>
    );
}

export default page