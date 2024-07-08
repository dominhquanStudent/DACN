'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
function AdoptDetail() {
  const requests =
  {
    id: '001', date: '2023-04-01', customerName: 'Nguyễn Quang Dinh', status: 'Đang tiến hành', email: "dinh.nguyen@gmail.com",
    sdt: '0123456789', diachi: "123 đường ABC, quận EF", message: "Một bé chó mắc kẹt cửa sổ", image: "/img/pet/bull.png",
    tenpet: "Bull", masopet: "001"
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
            Yêu cầu cứu hộ
          </div>
          <div className='p-4 flex-col items-center w-full mx-auto ml-4'>
            <div className='flex w-full'>
              <div className='flex w-1/4 pb-2 items-center justify-between'>
                <div className=''><strong>Mã yêu cầu:</strong></div> <span className='border border-gray-200 rounded-lg py-1 px-4'>{requests.id}</span>
              </div>
              <div className='flex w-full pb-2 items-center justify-center'>
                <div className=''><strong>Ngày gửi :</strong></div> <span className='border border-gray-200 rounded-lg py-1 px-4 ml-4'>{requests.date}</span>
              </div>
            </div>

            <div className='flex items-center pb-2'>
              <div className=''><strong>Tên người gửi:</strong></div> 
              <span className='border border-gray-200 rounded-lg py-1 px-4 ml-8'>{requests.customerName}</span>
            </div>
            <div className='flex w-full'>
              <div className='flex pb-2 items-center justify-center'>
                <div className=''><strong>Địa chỉ:</strong></div> <span className='border border-gray-200 rounded-lg py-1 px-4 ml-20'>{requests.diachi}</span>
              </div>
              <div className='flex pb-2 items-center justify-center ml-8'>
                <div className=''><strong>Email:</strong></div> <span className='border border-gray-200 rounded-lg py-1 px-4 ml-4'>{requests.email}</span>
              </div>
            </div>
            <div className='flex w-full'>
              <div className='flex w-1/4 pb-2 items-center justify-between'>
                <div className=''><strong>Tên thú cưng:</strong></div> <span className='border border-gray-200 rounded-lg py-1 px-4 ml-4'>{requests.tenpet}</span>
              </div>
              <div className='flex w-full pb-2 items-center justify-center'>
                <div className=''><strong>Mã số bé:</strong></div> <span className='border border-gray-200 rounded-lg py-1 px-4 ml-4'>{requests.masopet}</span>
              </div>
            </div>
            <div className='flex pb-2 items-center'>
              <div className='w-1/2'><strong>Hình ảnh:</strong></div> <img src={requests.image} className='h-32'></img>
            </div>
            <div className='flex space-x-2 mt-4'>
              <div>
                <label htmlFor="status-select" className="block text-sm font-bold text-gray-700">Cập nhật trạng thái:</label>
                <select id="status-select" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Chưa xử lý</option>
                  <option>Đã xử lý</option>
                  <option>Đang xử lý</option>
                </select>
              </div>
            </div>
            <div className='flex justify-center space-x-2 mt-4'>
              <button className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                Cập nhật đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AdoptDetail