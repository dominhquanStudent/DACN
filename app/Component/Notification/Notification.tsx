import React from 'react';

interface NotificationProps {
  id: string;
  user_id: string;
  Title: string;
  category: string;
  content: string;
  status: string;
  onClick: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({ Title, content, status }) => {
  return (
    <div className="notification border border-gray-300 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-2">{Title}</h2>
      <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
      <p className="text-sm text-gray-500 mt-2">Status: {status}</p>
    </div>
  );
};

export default Notification;