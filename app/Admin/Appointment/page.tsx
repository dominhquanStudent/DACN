'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { useRouter } from 'next/navigation';
function Appointment() {
  const orders = [
    { id: '001', date: '2023-04-01', appointdate: '2023-05-01', customerName: 'Nguyễn Trường Sơn', service: 'Khám bệnh' },
    { id: '002', date: '2023-07-01', appointdate: '2023-08-01', customerName: 'Nguyễn Trường Sơn', service: 'Thẩm mĩ' },
  ];
  const Router = useRouter();
  const handleDetailClick = (orderId: any) => {
    console.log(`Details for order ${orderId}`);
    Router.push('/Admin/Appointment/Detail');
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
            Quản lý lịch hẹn
          </div>
          {/* Filter */}
          <div className="flex justify-end">
            <label htmlFor="filter" className="mr-2">Filter:</label>
            <select id="filter" className="border border-gray-300 rounded p-2">
              <option value="all">All</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          {/* table */}

          <table className="min-w-full leading-normal mt-4 mx-2">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày đặt lịch
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày hẹn
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên khách hàng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Loại dịch vụ
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Xem chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.id}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.date}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.appointdate}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.customerName}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.service}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleDetailClick(order.id)}
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

export default Appointment