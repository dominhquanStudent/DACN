'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { useRouter } from 'next/navigation';
function Pet() {
  const requests = [
    { id: '001', date: '2023-04-01', customerName: 'Nguyễn Trường Sơn', status: 'Đang tiến hành', sdt: '0123456789' },
    { id: '002', date: '2023-04-01', customerName: 'Nguyễn Trường Sơn', status: 'Đã cứu hộ', sdt: '0213456789' },
  ];
  const Router = useRouter();
  const handleDetailClick = (orderId: any) => {
    console.log(`Details for order ${orderId}`);
    Router.push('/Admin/Rescue/Detail');
    // Here you can navigate to a detail page or open a modal
  };
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      {/* //Header */}
      <Header></Header>
      <div className='flex w-full'>
        <Sidebar></Sidebar>
        <div className='w-3/4 border-l-2 border-gray-200'>
          {/* content */}
          <div className={'flex font-nunito text-xl font-bold w-full justify-center'}>
            Quản lý thú cưng
          </div>
          <table className="min-w-full leading-normal mt-4 mx-2">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã yêu cầu
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày gửi
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên khách hàng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Xem chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((requests) => (
                <tr key={requests.id}>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {requests.id}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {requests.date}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {requests.customerName}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {requests.status}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {requests.sdt}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleDetailClick(requests.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default Pet