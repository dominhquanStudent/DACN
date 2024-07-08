'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { Description } from '@mui/icons-material';
function VoucherDetail() {
  const voucher = { id: '001', vouchercode:"XINCHAO", startdate: '2023-04-01', enddate:"2023-10-01", 
    Category: 'Giảm theo %', amount: "20%" , condition:"Tối thiểu 100.000đ", Description:"Mã giảm chào mừng khai trương" }
  const handleChangeClick = () => {
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
            Thông tin Voucher
          </div>
          <form className="w-full mx-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className='flex w-full'>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="text-xs font-bold mb-2" htmlFor="VoucherCode">
                    Mã Voucher
                  </label>
                  <input readOnly className=" block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="VoucherCode" type="text" value={voucher.vouchercode} />
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="text-xs font-bold mb-2" htmlFor="ID">
                    VoucherID
                  </label>
                  <input readOnly className=" block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="ID" type="text" value={voucher.id} />
                </div>
              </div>
              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="start">
                    Ngày bắt đầu
                  </label>
                  <input readOnly className=" block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="start" type="date" value={voucher.startdate} />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="end">
                    Ngày kết thúc
                  </label>
                  <input readOnly className=" block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="end" type="date" value={voucher.enddate} />
                </div>
              </div>
              <div className='w-full flex'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Category">
                    Loại Voucher
                  </label>
                  <select disabled className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Category" value={voucher.Category}>
                    <option value="">Chọn loại</option>
                    <option value="Giảm theo %">Giảm theo %</option>
                    <option value="Giảm trực tiếp">Giảm trực tiếp</option>
                  </select>
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="text-xs font-bold mb-2" htmlFor="amount">
                    Giá trị giảm
                  </label>
                  <input readOnly className=" block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="amount" type="text" value={voucher.amount} />
                </div>
              </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Description">
                  Mô tả (Ngoại hình, tình trạng sức khỏe, tính cách, ...)
                </label>
                <textarea readOnly className="block w-full h-16 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Description" value={voucher.Description}></textarea>              </div>
            </div>
          </form>
          <div className=' flex items-center justify-center w-full'>
            <button onClick={handleChangeClick} className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              Sửa
            </button>
          </div>

        </div>
      </div>
    </div>

  )
}

export default VoucherDetail