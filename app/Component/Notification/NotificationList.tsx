import React, { useEffect, useState } from 'react';
import Notification from '@/app/Component/Notification/Notification';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";
interface NotificationData {
  _id: string;
  user_id: string;
  category: string;
  Title: string;
  content: string;
  status: string;
}

const NotificationList: React.FC = () => {
      //Handle loading and complete
      const [isLoading, setIsLoading] = useState(false);
      const [isComplete, setIsComplete] = useState(false);
      const [loadWhat, setLoadWhat] = useState("");
      const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  useEffect(() => {
    // Fetch notifications from an API or use static data
    const fetchNotifications = async () => {
      // Replace with your API call
      setIsLoading(true);
      setLoadWhat("GET_NOTIFICATION");
      const response = await axios.get('/notification/user');
      setNotifications(response.data);
      setIsLoading(false);
    };
    fetchNotifications();
  }, []);

  const handleNotificationClick = (id: string) => {
    router.push(`/Profile/Notification/${id}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  const filteredNotifications = selectedCategory === 'Tất cả'
    ? notifications
    : notifications.filter(notification => notification.category === selectedCategory);

  // Calculate the notifications to display on the current page
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);

  // Calculate total pages
  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="notification-list space-y-4">
      <ErrorModal error={error} setError={setError} />
            <LoadingModal
                isLoading={isLoading}
                isComplete={isComplete}
                setIsComplete={setIsComplete}
                loadWhat={loadWhat}
            />
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => handleCategoryChange('Tất cả')}
          className={`px-4 py-2 rounded ${selectedCategory === 'Tất cả' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Tất cả
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
      {currentNotifications.map((notification) => (
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
      {/* Pagination Controls */}
      <div className="pagination flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
            className={`px-3 py-1 mx-1 ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            disabled={typeof pageNumber !== 'number'}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default NotificationList;