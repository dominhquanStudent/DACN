'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import App from 'next/app';
function Appointment() {
  const AppointDetails = {
    name: 'Quách Bảo Ngọc',
    phone: '0123456789',
    email: 'longxuyen@gmail.com',
    address: '07 Lý Tự Trọng, Mỹ Long, TP Long Xuyên, An Giang',
    appointID: '112232',
    date: '2023-04-01',
    appointdate: '2023-05-01',
    service: 'Khám bệnh',
    message: 'Em có con chó Puddle tên Milk, bữa nay có bị sổ mũi với biếng ăn, nhờ bác sĩ giúp giùm',
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
            Chi tiết lịch hẹn
          </div>
          <div className='flex border-2 border-gray-300 ml-4 mt-4'>
            <div className='flex-col border-r-2 border-gray-300 p-4 space-y-2'>
              <div className='flex pb-2'>
                <div className='w-32'><strong>Tên:</strong></div> <span>{AppointDetails.name}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-32'><strong>SĐT:</strong></div> <span>{AppointDetails.phone}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-32'><strong>Email:</strong></div> <span>{AppointDetails.email}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-32'><strong>Địa chỉ:</strong></div> <span>{AppointDetails.address}</span>
              </div>
            </div>
            <div className='p-4 flex-col items-center w-full mx-auto'>
              <div className='flex pb-2'>
                <div className='w-1/2'><strong>Mã lịch hẹn:</strong></div> <span>{AppointDetails.appointID}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-1/2'><strong>Ngày đặt hẹn:</strong></div> <span>{AppointDetails.date}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-1/2'><strong>Ngày hẹn khám:</strong></div> <span>{AppointDetails.appointdate}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-1/2'><strong>Dịch vụ:</strong></div> <span>{AppointDetails.service}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-1/2'><strong>Lời nhắn:</strong></div> <span>{AppointDetails.message}</span>
              </div>
              <div className='flex justify-center space-x-2 mt-4'>
                    <button className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Liên hệ khách hàng
                    </button>
                  </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default Appointment