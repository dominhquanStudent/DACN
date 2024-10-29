'use client';
import React, { useEffect, useState } from 'react';
import Header from "@/app/Component/Header/Header";
import axios from '@/api/axios';
interface NotificationData {
    id: string;
    user_id: string;
    category: string;
    Title: string;
    content: string;
    status: string;
}
function page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [notifications, setNotifications] = useState<NotificationData>();
    useEffect(() => {
        // Fetch notifications from an API or use static data
        const fetchNotifications = async () => {
            // Replace with your API call
            const response = await axios.get(`/notification/${id}`);
            setNotifications(response.data);
        };

        fetchNotifications();
    }, []);
    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Thông báo người dùng</h1>
                <div className="notification border border-gray-300 p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-2">{notifications?.Title}</h2>
                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: notifications?.content || '' }} />
                    <p className="text-sm text-gray-500 mt-2">Status: {notifications?.status}</p>
                </div>
            </div>
        </>
    );
}

export default page