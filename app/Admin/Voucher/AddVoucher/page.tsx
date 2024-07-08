'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
function VoucherAdd() {
  const voucher = { id: '001', vouchercode:"XINCHAO", startdate: '2023-04-01', enddate:"2023-10-01", 
    Category: 'Giảm theo %', amount: "20%" , condition:"Tối thiểu 100.000đ", Description:"Mã giảm chào mừng khai trương" }
  const handleSaveClick = () => {
    console.log('Change button clicked');
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
            Thêm Voucher
          </div>
          <form className="w-full mx-4 mt-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className='flex w-full'>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="text-xs font-bold mb-2" htmlFor="VoucherCode">
                    Mã Voucher
                  </label>
                  <input className=" block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="VoucherCode" type="text" placeholder='Nhập Code Voucher' />
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="text-xs font-bold mb-2" htmlFor="ID">
                    VoucherID
                  </label>
                  <input readOnly className=" block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="ID" type="text" placeholder='Không nhập giá trị này' />
                </div>
              </div>
              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="start">
                    Ngày bắt đầu
                  </label>
                  <input className=" block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="start" type="date" placeholder='Nhập ngày bắt đầu' />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="end">
                    Ngày kết thúc
                  </label>
                  <input className=" block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="end" type="date" placeholder='Nhập ngày kết thức' />
                </div>
              </div>
              <div className='w-full flex'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Category">
                    Loại Voucher
                  </label>
                  <select className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Category">
                    <option value="">Chọn loại</option>
                    <option value="Giảm theo %">Giảm theo %</option>
                    <option value="Giảm trực tiếp">Giảm trực tiếp</option>
                  </select>
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="text-xs font-bold mb-2" htmlFor="amount">
                    Giá trị giảm
                  </label>
                  <input className=" block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="amount" type="text" placeholder='Nhập lượng giảm giá' />
                </div>
              </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Description">
                  Mô tả 
                </label>
                <textarea className="block w-full h-16 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Description" placeholder='Mô tả cho Voucher này'></textarea>              </div>
            </div>
          </form>
          <div className=' flex items-center justify-center w-full'>
            <button onClick={handleSaveClick} className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              Lưu
            </button>
          </div>

        </div>
      </div>
    </div>

  )
}

export default VoucherAdd