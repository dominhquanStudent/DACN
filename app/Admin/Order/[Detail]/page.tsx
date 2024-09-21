'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';

function OrderDetail({ params }: { params: { Detail: string } }) {
  const orderId = params.Detail;
  const [data, setData] = useState<any>({ product_list: [] });
  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderData = async (id: any) => {
      try {
        const response = await axios.get(`/order/${orderId}`);
        const orderData = response.data;
        setData(orderData.order);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
    if (orderId) {
      fetchOrderData(orderId);
    }
  }, [orderId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData({ ...data, image: reader.result as string });
    };
  };

  const handleSaveClick = () => {
    const updateOrderData = async (id: any) => {
      try {
        await axios.put(`/order/${orderId}`, data);
      } catch (error) {
        console.error('Error updating order data:', error);
      }
    };
    updateOrderData(data);
    router.push('/Admin/Order');
  };

  const handleChangeClick = async () => {
    setIsEditable(true);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <Header />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-3/4 border-l-2 border-gray-200'>
          <div className={'flex font-nunito text-xl font-bold w-full justify-center'}>
            Chi tiết đơn hàng
          </div>
          <div className="w-full mx-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="user_id">
                  Mã khách hàng
                </label>
                <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                  {data.user_id}
                </div>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="phone_number">
                  Số điện thoại
                </label>
                <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                  {data.phone_number}
                </div>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="order_date">
                  Ngày đặt hàng
                </label>
                <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                  {new Date(data.order_date).toLocaleDateString()}
                </div>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="delivery_date">
                  Ngày giao hàng
                </label>
                <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                  {data.delivery_date ? new Date(data.delivery_date).toLocaleDateString() : 'Chưa giao'}
                </div>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="order_status">
                  Trạng thái đơn hàng
                </label>
                <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="order_status"
                    value={data.order_status}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="Chưa xử lý">Chưa xử lý</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã xử lý">Đã xử lý</option>

                  </select>

              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="order_address">
                  Địa chỉ giao hàng
                </label>
                <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                  {data.order_address}
                </div>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="payment_method">
                  Phương thức thanh toán
                </label>
                <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                  {data.payment_method}
                </div>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="employee_id">
                  Mã nhân viên
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="employee_id"
                  type="text"
                  value={data.employee_id}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />

              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="productQuantity">
                  Số lượng sản phẩm
                </label>
                <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                  {data.product_list?.reduce((acc: number, product: { quantity: number }) => acc + product.quantity, 0)}
                </div>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="total_price">
                  Tổng giá
                </label>
                <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                  {data.total_price}
                </div>
              </div>
              <div className="block w-full border border-gray-200 rounded-lg py-2 px-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số lượng
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giá
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giảm giá
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.product_list?.map((product: { product_id: string; quantity: number; price: number; discount_price: number }, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.product_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.discount_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
          <div className='flex items-center justify-center w-full space-x-4'>
            <button onClick={handleChangeClick} className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sửa
            </button>
            <button onClick={handleSaveClick} className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;