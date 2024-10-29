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

function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [notification, setNotification] = useState<NotificationData | null>(null);

    useEffect(() => {
        // Fetch notification from the API
        const fetchNotification = async () => {
            try {
                const response = await axios.get(`/notification/${id}`);
                setNotification(response.data);
            } catch (error) {
                console.error('Error fetching notification:', error);
            }
        };

        fetchNotification();
    }, [id]);

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Thông báo người dùng</h1>
                {notification ? (
                    <div className="notification border border-gray-300 p-4 bg-white shadow-md rounded-md">
                        <h2 className="text-xl font-semibold mb-2">{notification.Title}</h2>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: notification.content }} />
                        <p className="text-sm text-gray-500 mt-2">Status: {notification.status}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}

export default Page;