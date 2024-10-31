import React, { useEffect, useState } from 'react';
import Notification from '@/app/Component/Notification/Notification';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';

interface NotificationData {
  _id: string;
  user_id: string;
  category: string;
  Title: string;
  content: string;
  status: string;
}

const NotificationList: React.FC = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

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
    router.push(`/Profile/Notification/${id}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredNotifications = selectedCategory === 'Tất cả'
    ? notifications
    : notifications.filter(notification => notification.category === selectedCategory);

  return (
    <div className="notification-list space-y-4">
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => handleCategoryChange('All')}
          className={`px-4 py-2 rounded ${selectedCategory === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => handleCategoryChange('Đơn hàng')}
          className={`px-4 py-2 rounded ${selectedCategory === 'Đơn hàng' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Đơn hàng
        </button>
        <button
          onClick={() => handleCategoryChange('Thú cưng')}
          className={`px-4 py-2 rounded ${selectedCategory === 'Thú cưng' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Thú cưng
        </button>
        <button
          onClick={() => handleCategoryChange('Khám bệnh')}
          className={`px-4 py-2 rounded ${selectedCategory === 'Khám bệnh' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Khám bệnh
        </button>
      </div>
      {filteredNotifications.map((notification) => (
        <Notification
          _id={notification._id}
          key={notification._id}
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