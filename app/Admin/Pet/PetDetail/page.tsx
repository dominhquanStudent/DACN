'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { describe } from 'node:test';
function PetDetail() {
  const pet = {
    id: 1, image: '/img/Pet/bull.png', name: 'Bull', date: "2023-04-01", gender:"male", category: "Dog", weight: "2kg",
    age: "2 tuổi", tiemphong: "Chưa", status: "Được nhận nuôi", description: "Một bé chó dễ thương và biếng ăn"
  };
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
            Thông tin thú cưng
          </div>
          <form className="w-full mx-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className='flex w-full'>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="text-xs font-bold mb-2" htmlFor="ProductName">
                    Tên thú cưng
                  </label>
                  <input readOnly className=" block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="ProductName" type="text" value={pet.name} />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Gender">
                    Giới tính
                  </label>
                  <select disabled className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Gender" value={pet.gender}>
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
                  <input readOnly className=" block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Weight" type="text" value={pet.weight} />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Age">
                    Tuổi
                  </label>
                  <input readOnly className=" block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Age" type="text" value={pet.age} />
                </div>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Date">
                  Ngày nhận nuôi
                </label>
                <input readOnly className=" block w-3/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Date" type="date" value={pet.date} />
              </div>
              <div className='w-full flex'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Category">
                    Loại Pet
                  </label>
                  <select disabled className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Category" value={pet.category}>
                    <option value="">Chọn loài</option>
                    <option value="Dog">Chó</option>
                    <option value="Cat">Mèo</option>
                  </select>
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="trietsan">
                    Triệt Sản
                  </label>
                  <select disabled className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="trietsan" value={pet.tiemphong}>
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
                <textarea readOnly className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Description" value={pet.description}></textarea>              </div>
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

export default PetDetail