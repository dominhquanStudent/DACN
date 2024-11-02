'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { useRouter } from 'next/navigation';
import axios from '@/api/axios';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Notification {
  _id: string;
  user_id: string;
  category: string;
  Title: string;
  content: string;
  status: string;
}

interface User {
  _id: string;
  userName: string;
  email: string;
}

function NotificationPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [mode, setMode] = useState<'input' | 'watch'>('input');

  const fetchNotifications = async (id: string) => {
    try {
      const response = await axios.get(`/notification/list/${id}`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    // Fetch user accounts from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/account/listUser');
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/notification/add', {
        user_id: selectedUserId,
        Title: title,
        content: content,
        category: category,
        status: "Chưa đọc",
      });
      setNotifications([...notifications, response.data]);
      setSelectedUserId('');
      setTitle('');
      setContent('');
      setCategory('');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleDeleteClick = async (id: string) => {
    try {
      await axios.delete(`/notification/${id}`);
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <Header />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-3/4 border-l-2 border-gray-200 px-4'>
          <div className={'flex font-nunito text-xl font-bold w-full justify-center mb-4'}>
            Thông báo người dùng
          </div>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setMode('input')}
              className={`mr-2 p-2 rounded ${mode === 'input' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Gửi thông báo
            </button>
            <button
              onClick={() => setMode('watch')}
              className={`p-2 rounded ${mode === 'watch' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Xem thông báo
            </button>
          </div>
          {mode === 'input' ? (
            <form onSubmit={handleSendNotification} className="mb-4">
              <div className="mb-2">
                <label className="block text-gray-700">Người dùng</label>
                <select
                  value={selectedUserId}
                  onChange={(e) => { setSelectedUserId(e.target.value); fetchNotifications(e.target.value); }}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Chọn người dùng</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.userName || user.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Tiêu đề</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Loại</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Chọn loại thông báo</option>
                  <option value="Đơn hàng">Đơn hàng</option>
                  <option value="Lịch hẹn">Lịch hẹn</option>
                  <option value="Nhận nuôi">Nhận nuôi</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Nội dung</label>
                <div style={{ height: '300px' }} className="w-full p-2 border border-gray-300 rounded">
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    style={{ height: '85%' }}
                  />
                </div>
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Gửi thông báo
              </button>
            </form>
          ) : (
            <div className="w-full">
              <div className="mb-2">
                <label className="block text-gray-700">Người dùng</label>
                <select
                  value={selectedUserId}
                  onChange={(e) => { setSelectedUserId(e.target.value); fetchNotifications(e.target.value); }}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Chọn người dùng</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.userName || user.email}
                    </option>
                  ))}
                </select>
              </div>
              {notifications.map((notification) => (
                <div key={notification._id} className="border border-gray-300 p-4 mb-2 rounded">
                  <h2 className="text-xl font-semibold mb-2">{notification.Title}</h2>
                  <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: notification.content }} />
                  <p className="text-sm text-gray-500 mt-2">Phân loại {notification.category}</p>
                  <button
                    onClick={() => handleDeleteClick(notification._id)}
                    className="bg-red-500 text-white p-2 rounded mt-2"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;