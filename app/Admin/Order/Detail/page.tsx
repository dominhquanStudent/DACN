'use client';
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
function OrderDetail() {
  const orderDetails = {
    name: 'Nguyễn Trường Sơn',
    phone: '0988776655',
    email: 'son@gmail.com',
    address: '123 Main St, Anytown, AN 12345',
    productQuantity: 3,
    shipping: '$5.00',
    discount: '$10.00',
    totalAmount: '$115.00',
    Amount: '$100.00',
    orderID: '001',
    status: 'Đã giao hàng',
  };
  const products = [
    { name: 'Ganador thịt bò', quantity: 1, price: 35 },
    { name: 'Dầu cá hồi King’s Pet', quantity: 1, price: 35 },
    { name: 'Thức chó chó Nature Core', quantity: 1, price: 45 },
    // Add more products as needed
  ];
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      {/* //Header */}
      <Header></Header>
      <div className='flex w-full'>
        <Sidebar></Sidebar>
        <div className='w-3/4 border-l-2 border-gray-200'>
          {/* content */}
          <div className={'flex font-nunito text-xl font-bold w-full justify-center'}>
            Chi tiết đơn hàng
          </div>
          <div className='flex border-2 border-gray-300 ml-4 mt-4'>
            <div className='flex-col border-r-2 border-gray-300 p-4 space-y-2'>
              <div className='flex pb-2'>
                <div className='w-32'><strong>Tên:</strong></div> <span>{orderDetails.name}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-32'><strong>SĐT:</strong></div> <span>{orderDetails.phone}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-32'><strong>Email:</strong></div> <span>{orderDetails.email}</span>
              </div>
              <div className='flex border-b-2 border-gray-300 pb-2'>
                <div className='w-32'><strong>Địa chỉ:</strong></div> <span>{orderDetails.address}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-32'><strong>SL sản phẩm:</strong></div> <span>{orderDetails.productQuantity}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-32'><strong>Tạm tính:</strong></div> <span>{orderDetails.totalAmount}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-32'><strong>Vận chuyển:</strong></div> <span>{orderDetails.shipping}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-32'><strong>Giảm giá:</strong></div> <span>{orderDetails.discount}</span>
              </div>
              <div className='flex pb-2'>
                <div className='w-32'><strong>Tổng tiền:</strong></div> <span>{orderDetails.Amount}</span>
              </div>
            </div>
            <div className='p-4 flex-col items-center w-full mx-auto'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                      Sản phẩm
                    </th>
                    <th className='px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                      Số lượng
                    </th>
                    <th className='px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                      Giá tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className='px-5 py-2 border-b border-gray-200 bg-white text-sm'>
                        <div className='flex items-center'>
                          <div className='ml-3'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-5 py-2 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>{product.quantity}</p>
                      </td>
                      <td className='px-5 py-2 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>${product.price.toFixed(2)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* bottom table */}
              <div className="flex justify-center w-full mt-4">
                <div className="w-10/12">
                  <div className='flex pb-2 justify-between'>
                    <div><strong>Mã đơn hàng:</strong></div> <span>{orderDetails.orderID}</span>
                  </div>
                  <div className='flex pb-2 justify-between'>
                    <div><strong>Trạng thái đơn hàng:</strong></div> <span>{orderDetails.status}</span>
                  </div>
                  {/* Buttons */}
                  <div className='flex justify-center space-x-2 mt-4'>
                    <button className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Xác nhận
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Hủy đơn hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default OrderDetail