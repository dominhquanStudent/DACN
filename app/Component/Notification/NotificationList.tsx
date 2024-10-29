import React, { useEffect, useState } from 'react';
import Notification from '@/app/Component/Notification/Notification';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
interface NotificationData {
  id: string;
  user_id: string;
  category: string;
  Title: string;
  content: string;
  status: string;
}

const NotificationList: React.FC = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    // Fetch notifications from an API or use static data
    const fetchNotifications = async () => {
      // Replace with your API call
      const response = await axios.get('/notification/user');
      setNotifications(response.data);
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = (id: string) => {
    router.push(`/Notification/${id}`);
  };

  return (
    <div className="notification-list space-y-4">
      {notifications.map((notification) => (
        <Notification
          id = {notification.id}
          key={notification.id}
          user_id={notification.user_id}
          category={notification.category}
           Title={notification.Title}
          content={notification.content}
          status={notification.status}
          onClick={handleNotificationClick}
        />
      ))}
    </div>
  );
};

export default NotificationList;