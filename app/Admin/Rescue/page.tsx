'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { useRouter } from 'next/navigation';
import axios from '@/api/axios';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function Rescue() {
  const [rescues, setRescues] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rescuesPerPage = 12;
  const Router = useRouter();

  useEffect(() => {
    const fetchRescues = async () => {
      try {
        const response = await axios.get('/rescueRequest/list');
        setRescues(response.data.rescues);
      } catch (error) {
        console.error('Error fetching rescues:', error);
      }
    };
    fetchRescues();
  }, []);

  const handleChangeClick = (rescueId: any) => {
    console.log(`Details for rescue ${rescueId}`);
    Router.push(`/Admin/Rescue/${rescueId}`);
  };

  const handleDeleteClick = async (rescueId: any) => {
    console.log(`Delete for rescue ${rescueId}`);
    try {
      await axios.delete(`/rescueRequest/${rescueId}`);
      const newRescues = rescues.filter((rescue) => rescue._id !== rescueId);
      setRescues(newRescues);
    } catch (error) {
      console.error('Error deleting rescue:', error);
    }
  };

  const handleAddClick = () => {
    console.log(`Add for order`);
    Router.push('/Admin/Rescue/AddRescue');
    // Here you can navigate to a detail page or open a modal
  };

  // Calculate the rescues to display on the current page
  const indexOfLastRescue = currentPage * rescuesPerPage;
  const indexOfFirstRescue = indexOfLastRescue - rescuesPerPage;
  const currentRescues = rescues.slice(indexOfFirstRescue, indexOfLastRescue);

  // Calculate total pages
  const totalPages = Math.ceil(rescues.length / rescuesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber:any) => {
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
    <div className='flex flex-col w-full justify-center items-center'>
      <Header></Header>
      <div className='flex w-full'>
        <Sidebar></Sidebar>
        <div className='w-3/4 border-l-2 border-gray-200 px-4'>
          <div className={'flex font-nunito text-xl font-bold w-full justify-center mb-4'}>
            Yêu cầu cứu hộ
          </div>
          {/* Table */}
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày yêu cầu
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Địa điểm cứu hộ
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SĐT
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Lời nhắn
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Xem 
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentRescues) && currentRescues
                .sort((a: any, b: any) => {
                  const statusOrder = ["Chưa xử lý", "Đang xử lý", "Đã xử lý"];
                  return statusOrder.indexOf(a.requestStatus) - statusOrder.indexOf(b.requestStatus);
                })
              .map((rescue: any) => (
                <tr key={rescue._id}>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {formatDate(rescue.RequestTime)}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {rescue.location}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {rescue.contactPhone}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {rescue.message}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {rescue.requestStatus}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleChangeClick(rescue._id)} className="text-blue-500 hover:text-blue-700">Chi tiết</button>
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleDeleteClick(rescue._id)} className="text-red-500 hover:text-red-700">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                className={`px-3 py-1 mx-1 ${
                  currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
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
      </div>
    </div>
  );
}

export default Rescue;