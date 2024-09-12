'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { useRouter } from 'next/navigation';
import axios from '@/api/axios';
import Link from 'next/link';

interface Voucher {
  _id: string;
  employee_id: string;
  name: string;
  quantity: number;
  UsedTime: number;
  beginDate: string;
  endDate: string;
  code: string;
  discount_type: string;
  discount_value: number;
  description: string;
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
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã Voucher
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Used Time
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Discount Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Discount Value
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Begin Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(vouchers) && vouchers.map((voucher: Voucher) => (
                <tr key={voucher._id}>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {voucher.name}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {voucher.code}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {voucher.quantity}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {voucher.UsedTime}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {voucher.discount_type}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {voucher.discount_value}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {formatDate(voucher.beginDate)}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                  {formatDate(voucher.endDate)}

                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleDetailClick(voucher._id)} className="text-blue-500 hover:text-blue-700">Sửa</button>
                    <button onClick={() => handleDeleteClick(voucher._id)} className="text-red-500 hover:text-red-700 ml-2">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VoucherList;