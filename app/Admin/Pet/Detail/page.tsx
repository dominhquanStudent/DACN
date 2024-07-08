'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
function PetDetail() {
  const requests =
    { id: '001', date: '2023-04-01', customerName: 'Nguyễn Trường Sơn', status: 'Đang tiến hành', 
      sdt: '0123456789',diachi:"123 đường ABC, quận EF",message: "Một bé chó mắc kẹt cửa sổ",  image:"/img/rescue_1.png" } ;
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      {/* //Header */}
      <Header></Header>
      <div className='flex w-full'>
        <Sidebar></Sidebar>
        <div className='w-3/4 border-l-2 border-gray-200'>
          {/* content */}
          <div className={'flex font-nunito text-xl font-bold w-full justify-center'}>
            Thông tin thú cưng
          </div>
          <div className='p-4 flex-col items-center w-full mx-auto ml-4'>
            <div className='flex pb-2'>
              <div className='w-1/2'><strong>Mã lịch hẹn:</strong></div> <span>{requests.id}</span>
            </div>
            <div className='flex pb-2'>
              <div className='w-1/2'><strong>Ngày gửi yêu cầu:</strong></div> <span>{requests.date}</span>
            </div>
            <div className='flex pb-2'>
              <div className='w-1/2'><strong>Tên người gửi:</strong></div> <span>{requests.customerName}</span>
            </div>
            <div className='flex pb-2'>
              <div className='w-1/2'><strong>Hình ảnh:</strong></div> <img src={requests.image} className='h-32'></img>
            </div>
            <div className='flex pb-2'>
              <div className='w-1/2'><strong>Địa chỉ:</strong></div> <span>{requests.diachi}</span>
            </div>
            <div className='flex pb-2'>
              <div className='w-1/2'><strong>Lời nhắn:</strong></div> <span>{requests.message}</span>
            </div>
            <div className='flex justify-center space-x-2 mt-4'>
              <button className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Giải quyết yêu cầu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default PetDetail