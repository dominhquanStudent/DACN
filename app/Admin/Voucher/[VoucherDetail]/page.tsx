'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from '@/api/axios';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { ToastContainer, toast } from 'react-toastify';

interface Voucher {
  _id: string;
  employee_id: string;
  name: string;
  quantity: number;
  UsedTime: number;
  beginDate: string;
  endDate: string;
  code: string;
  discount_type: string;
  discount_value: number;
  description: string;
  status: string;
}

function VoucherDetail() {
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await axios.get(`/voucher/list/${id}`);
        setVoucher(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching voucher:', error);
        setLoading(false);
      }
    };
    fetchVoucher();
  }, [id]);

  const handleSaveClick = async () => {
    if (!voucher) return;
    try {
      console.log('Updating voucher with data:', voucher);
      const response = await axios.put(`/api/vouchers/${voucher._id}`, voucher);
      toast.success('Voucher updated successfully!');
      console.log('Voucher updated:', response.data);
    } catch (error) {
      toast.error('Error updating voucher!');
      console.error('Error updating voucher:', error.response ? error.response.data : error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setVoucher((prevVoucher) => prevVoucher ? { ...prevVoucher, [id]: value } : null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!voucher) {
    return <div>Voucher not found</div>;
  }

  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <Header />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-3/4 border-l-2 border-gray-200'>
          <div className={'flex font-nunito text-xl font-bold w-full justify-center'}>
            Sửa voucher
          </div>
          <form className="w-full mx-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="name">
                  Tên voucher
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  placeholder="Nhập tên voucher"
                  value={voucher.name}
                  onChange={handleChange}
                />
              </div>
              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="quantity">
                    Số lượng
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="quantity"
                    type="text"
                    placeholder="Nhập số lượng"
                    value={voucher.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="UsedTime">
                    Số lần sử dụng
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="UsedTime"
                    type="text"
                    placeholder="Nhập số lần sử dụng"
                    value={voucher.UsedTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="beginDate">
                    Ngày bắt đầu
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="beginDate"
                    type="date"
                    value={voucher.beginDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="endDate">
                    Ngày kết thúc
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="endDate"
                    type="date"
                    value={voucher.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="code">
                    Mã voucher
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="code"
                    type="text"
                    placeholder="Nhập mã voucher"
                    value={voucher.code}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="discount_type">
                    Loại giảm giá
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="discount_type"
                    type="text"
                    placeholder="Nhập loại giảm giá"
                    value={voucher.discount_type}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="discount_value">
                    Giá trị giảm giá
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="discount_value"
                    type="text"
                    placeholder="Nhập giá trị giảm giá"
                    value={voucher.discount_value}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="status">
                    Trạng thái
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="status"
                    value={voucher.status}
                    onChange={handleChange}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="description">
                  Mô tả
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  placeholder="Nhập mô tả"
                  value={voucher.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </form>
          <div className='flex items-center justify-center w-full'>
            <button onClick={handleSaveClick} className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Lưu
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default VoucherDetail;