import React from 'react';
import Link from 'next/link';
interface NotificationProps {
  _id: string;
  user_id: string;
  Title: string;
  category: string;
  content: string;
  status: string;
  onClick: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({ _id, Title, content, status, onClick }) => {
  return (
    <Link href={`/Profile/Notification/${_id}`}>
      <div className="notification border border-gray-300 p-4 bg-white shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold mb-2">{Title}</h2>
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
        {/* <p className="text-sm text-gray-500 mt-2">Status: {status}</p> */}
      </div>
    </Link>
  );
};

export default Notification;