'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { useRouter } from 'next/navigation';
import axios from '@/api/axios';
import Link from 'next/link';

interface Voucher {
  _id: string;
  name: string;
  quantity: number;
  UsedTime: number;
  beginDate: string;
  endDate: string;
  code: string;
  discount_type: string;
  discount_value: {
    value: number;
    min_require: number;
    max_discount: number;
  }
  description: string;
  employee_id: string;
  status: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function VoucherList() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  
  const router = useRouter();

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get('/voucher/list');
        setVouchers(response.data);
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      }
    };
    fetchVouchers();
  }, []);

  const handleDetailClick = (voucherId: string) => {
    console.log(`Details for voucher ${voucherId}`);
    router.push(`/Admin/Voucher/${voucherId}`);
  };

  const handleDeleteClick = async (voucherId: string) => {
    console.log(`Delete for voucher ${voucherId}`);
    try {
      await axios.delete(`/voucher/${voucherId}`);
      const newVouchers = vouchers.filter((voucher) => voucher._id !== voucherId);
      setVouchers(newVouchers);
    } catch (error) {
      console.error('Error deleting voucher:', error);
    }
  };

  const handleAddClick = () => {
    console.log(`Add new voucher`);
    router.push('/Admin/Voucher/AddVoucher');
  };
  const [currentPage, setCurrentPage] = useState(1);
  const vouchersPerPage = 10;
  // Calculate the vouchers to display on the current page
  const indexOfLastVoucher = currentPage * vouchersPerPage;
  const indexOfFirstVoucher = indexOfLastVoucher - vouchersPerPage;
  const currentVouchers = vouchers.slice(indexOfFirstVoucher, indexOfLastVoucher);

  // Calculate total pages
  const totalPages = Math.ceil(vouchers.length / vouchersPerPage);

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
      <Header />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-3/4 border-l-2 border-gray-200 px-4'>
          <div className={'flex font-nunito text-xl font-bold w-full justify-center mb-4'}>
            Quản lý voucher
          </div>
          <div className='flex w-full space-x-2 mt-4'>
            <button onClick={handleAddClick} className="bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2">
              Thêm mới
            </button>
          </div>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã Voucher
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Số lượng còn lại
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Loại giảm
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Giá trị giảm
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Từ ngày
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Đến ngày
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
              {Array.isArray(currentVouchers) && currentVouchers.map((voucher: Voucher) => (
                <tr key={voucher._id}>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {voucher.name}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {voucher.code}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {voucher.quantity - voucher.UsedTime}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {voucher.discount_type}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {voucher.discount_value.value} {voucher.discount_type === 'Giảm theo phần trăm' ? '%' : 'đồng'}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {formatDate(voucher.beginDate)}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {formatDate(voucher.endDate)}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleDetailClick(voucher._id)} className="text-blue-500 hover:text-blue-700">Chi tiết</button>
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleDeleteClick(voucher._id)} className="text-red-500 hover:text-red-700">Xóa</button>
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

export default VoucherList;