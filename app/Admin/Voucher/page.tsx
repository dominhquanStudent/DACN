'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { useRouter } from 'next/navigation'
function Voucher() {
  const voucher = [
    { id: '001', vouchercode:"XINCHAO", startdate: '2023-04-01', enddate:"2023-10-01", Category: 'Giảm theo %', amount: "20%" , condition:"Tối thiểu 100.000đ" },
    { id: '002', vouchercode:"TAMBIET", startdate: '2023-04-02', enddate:"2023-10-02", Category: 'Giảm trực tiếp', amount: "20.000" ,condition:"Tối thiểu 100.000đ"},
  ];
  const Router = useRouter();
  const handleDetailClick = (orderId: any) => {
    console.log(`Details for order ${orderId}`);
    Router.push('/Admin/Voucher/VoucherDetail');
    // Here you can navigate to a detail page or open a modal
  };
  const handleAddClick = () => {
    console.log(`Add for order`);
    Router.push('/Admin/Voucher/AddVoucher');
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
            Quản lý voucher
          </div>
          {/* table */}
          <div className='flex w-full space-x-2 mt-4'>
                    <button onClick={handleAddClick} className="bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2">
                      Thêm
                    </button>
                  </div>

          <table className="min-w-full leading-normal mt-4 mx-2">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Voucher ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã voucher
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày bắt đầu
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày kết thúc
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Loại giảm giá
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Giá trị giảm
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Điều kiện
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Xem chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              {voucher.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.id}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.vouchercode}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.startdate}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.enddate}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.Category}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.amount}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {order.condition}
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

export default Voucher