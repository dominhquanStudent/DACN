'use client';
import React, { useEffect, useState } from 'react';
import Header from "@/app/Component/Header/Header";
import axios from '@/api/axios';
import ProfileNav from "@/app/Component/ProfileNav/ProfileNav";
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
      <div className="flex flex-col w-full ">
      <Header />
      <div className="flex bg-[#DFF3FF] w-full " style={{ minHeight: '80vh' }}>
          <ProfileNav />
            <div className="container w-full bg-white py-4 px-12 my-8 mr-12 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center ">Thông báo người dùng</h1>
                {notification ? (
                    <div className="notification border border-gray-300 p-4 bg-white shadow-md rounded-md">
                        <h2 className="text-xl font-semibold mb-2">{notification.Title}</h2>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: notification.content }} />
                        {/* <p className="text-sm text-gray-500 mt-2">Status: {notification.status}</p> */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            </div>
            </div>
    );
}

export default Page;