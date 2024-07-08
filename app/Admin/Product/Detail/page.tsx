'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
{/* //Người nào làm sau hãy làm cái sửa được data */}
function ProductDetail() {
  const data = {
    name: 'Ganador thịt bò',
    id: '001',
    image: 'https://via.placeholder.com/150',
    price: 35,
    quantity: 10,
    category: 'Thức ăn cho chó',
    status: 'active',
    description: 'Thức ăn cho chó Ganador thịt bò',
  };
  const handleSaveClick = () => {};
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      {/* //Header */}
      <Header></Header>
      <div className='flex w-full'>
        <Sidebar></Sidebar>
        <div className='w-3/4 border-l-2 border-gray-200'>
          {/* content */}
          <div className={'flex font-nunito text-xl font-bold w-full justify-center'}>
            Chi tiết sản phẩm
          </div>
          <form className="w-full mx-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="ProductName">
                  Tên sản phẩm
                </label>
                <input className=" block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="ProductName" type="text" value={data.name} />
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="ProductID">
                  Mã sản phẩm
                </label>
                <input className=" block w-3/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="ProductName" type="text" value={data.id} />
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
                  <label className="text-xs font-bold mb-2" htmlFor="Price">
                    Giá sản phẩm
                  </label>
                  <input className=" block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="ProductPrice" type="text" value={data.price} />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Quantity">
                    Số lượng
                  </label>
                  <input className=" block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Quantity" type="text" value={data.quantity} />
                </div>
              </div>
              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Category">
                    Phân loại
                  </label>
                  <input className=" block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Category" type="text" value={data.category} />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Status">
                    Trạng thái
                  </label>
                  <select className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Status" value={data.status}>
                    <option value="">Select Status</option>
                    <option value="inactive">Private</option>
                    <option value="active">Public</option>
                  </select>
                </div>
              </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Description">
                  Mô tả
                </label>
                <textarea className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="Description" placeholder="Enter Description" value={data.description}></textarea>              </div>
            </div>
          </form>
          <div className='flex items-center justify-center w-full'>
            <button onClick={handleSaveClick} className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProductDetail