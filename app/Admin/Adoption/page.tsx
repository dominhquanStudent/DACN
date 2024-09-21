'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { useRouter } from 'next/navigation';
import axios from '@/api/axios';
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
function Adopt() {
  const [adopts, setAdopts] = useState<any[]>([]);
  const Router = useRouter();

  useEffect(() => {
    const fetchAdopts = async () => {
      try {
        const response = await axios.get('/adopt/list');
        setAdopts(response.data.adopts);
      } catch (error) {
        console.error('Error fetching adopts:', error);
      }
    };
    fetchAdopts();
  }, []);

  const handleChangeClick = (adoptId: any) => {
    console.log(`Details for adopt ${adoptId}`);
    Router.push(`/Admin/Adoption/${adoptId}`);
    
  };
  const handleDeleteClick = async (adoptId: any) => {
    console.log(`Delete for adopt ${adoptId}`);
    try {
      await axios.delete(`/adopt/${adoptId}`);
      const newProducts = adopts.filter((adopt) => adopt._id !== adoptId);
      setAdopts(newProducts);
    } catch (error) {
      console.error('Error deleting adopt:', error);
  }
};
  // const handleAddClick = () => {
  //   console.log(`Add for order`);
  //   Router.push('/Admin/Adopt/AddAdopt');
  //   // Here you can  navigate to a detail page or open a modal
  // };

  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <Header></Header>
      <div className='flex w-full'>
        <Sidebar></Sidebar>
        <div className='w-3/4 border-l-2 border-gray-200 px-4'>
          <div className={'flex font-nunito text-xl font-bold w-full justify-center mb-4'}>
            Yêu cầu nhận nuôi thú cưng
          </div>
          {/* Table */}
          {/* <div className='flex w-full space-x-2 mt-4'>
            <button onClick={handleAddClick} className="bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2">
              Thêm
            </button>
          </div> */}
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên khách hàng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SĐT
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Địa chỉ
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên thú cưng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã số
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạn thái
                </th>


              </tr>
            </thead>
            <tbody>
              {Array.isArray(adopts) && adopts.map((adopt: any) => (
                <tr key={adopt._id}>
 
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {adopt.userName}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {adopt.phoneNumber}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {adopt.address}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {adopt.petName}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {adopt.petId}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {adopt.adoptStatus}
                  </td> 


                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleChangeClick(adopt._id)} className="text-blue-500 hover:text-blue-700">Xem chi tiết</button>
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleDeleteClick(adopt._id)} className="text-red-500 hover:text-red-700">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Adopt;