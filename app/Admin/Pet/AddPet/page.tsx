'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
function PetAdd() {
  const handleSaveClick = () => {
    console.log('Save button clicked');
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
            Thêm thú cưng
          </div>
          <form className="w-full mx-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className='flex w-full'>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="ProductName">
                  Tên thú cưng
                </label>
                <input className=" block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="ProductName" type="text" placeholder="" />
              </div>
              <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Gender">
                    Giới tính
                  </label>
                  <select className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Gender">
                    <option value="">Chọn giới tính</option>
                    <option value="male">Đực</option>
                    <option value="female">Cái</option>
                  </select>
                </div>
              </div>
              
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="ImageUpload">
                  Tải hình ảnh
                </label>
                <input type="file" id="ImageUpload" name="image" accept="image/*" className="block w-full text-sm text-gray-500
  file:mr-4 file:py-2 file:px-4
  file:rounded-full file:border-0
  file:text-sm file:font-semibold
  file:bg-violet-50 file:text-violet-700
  hover:file:bg-violet-100"/>
              </div>
              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Weight">
                    Cân nặng (kg)
                  </label>
                  <input className=" block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Weight" type="text" placeholder="" />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Age">
                    Tuổi
                  </label>
                  <input className=" block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Age" type="text" placeholder="" />
                </div>
              </div>
              <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Age">
                    Ngày nhận nuôi
                  </label>
                  <input className=" block w-3/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Age" type="date" placeholder="" />
                </div>
              <div className='w-full flex'>
              <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Category">
                    Loại Pet
                  </label>
                  <select className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Category">
                    <option value="">Chọn loài</option>
                    <option value="Dog">Chó</option>
                    <option value="Cat">Mèo</option>
                  </select>
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="trietsan">
                    Triệt Sản
                  </label>
                  <select className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="trietsan">
                    <option value="">Chọn</option>
                    <option value="Yes">Rồi</option>
                    <option value="No">Chưa</option>
                    <option value="Unknown">Không rõ</option>
                  </select>
                </div>
              </div>
              
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Description">
                  Mô tả (Ngoại hình, tình trạng sức khỏe, tính cách, ...)
                </label>
                <textarea className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Description" placeholder="Nhập mô tả"></textarea>              </div>
            </div>
          </form>
          <div className=' flex items-center justify-center w-full'>
            <button onClick={handleSaveClick} className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Lưu
            </button>
          </div>

        </div>
      </div>
    </div>

  )
}

export default PetAdd