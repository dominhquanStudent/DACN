'use client';
import React, { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashCan, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import ConfirmModal from '@/app/Component/ConfirmModal';

library.add(faTrashCan, faPen, faPlus, faPenToSquare);
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
  const [pets, setPets] = useState<any[]>([]);
  const [selectedAdoption, setSelectedAdoption] = useState<any | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('/pet/list');
        // Filter out pets with userName "anonymous"
        const filteredPets = response.data.pets.filter((pet: any) => (pet.userName !== 'anonymous' && pet.userName !== '' && pet.adoptStatus === 'Đang được yêu cầu'));
        setPets(filteredPets);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPets();
  }, []);

  const handleChangeClick = (petId: any) => {
    console.log(`Details for pet ${petId}`);
    router.push(`/Admin/Adoption/${petId}`);
  };

  const handleDeleteClick = (adoption: any) => {
    setSelectedAdoption(adoption);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedAdoption) {
      try {
        const updatedData = {
          ...selectedAdoption,
          adoptStatus: "Chưa có chủ",
          arriveDay: null,
          message: "Chưa có lời nhắn",
          method: "Chưa có phương thức",
        };

        await axios.put(`/pet/${selectedAdoption._id}`, updatedData);
        const newPets = pets.filter(
          (pet) => pet._id !== selectedAdoption._id
        );
        setPets(newPets);
        setIsConfirmModalOpen(false);
      } catch (error) {
        console.error("Error updating pet data:", error);
      }
    }
  };

  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <Header />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-3/4 border-l-2 border-gray-200 px-4'>
          <div className={'flex font-nunito text-xl font-bold w-full justify-center mb-4'}>
            Yêu cầu nhận nuôi thú cưng
          </div>
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
                  Trạng thái
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Chi tiết
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Xóa
                </th>

              </tr>
            </thead>
            <tbody>
              {Array.isArray(pets) && pets.map((pet: any) => (
                <tr key={pet._id}>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {pet.userName}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {pet.phoneNumber}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {pet.address}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {pet.petName}
                  </td>

                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {pet.adoptStatus}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleChangeClick(pet._id)} className="text-blue-500 hover:text-blue-700">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleDeleteClick(pet)} className="text-red-500 hover:text-red-700">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleConfirmDelete}
            message={`Bạn có muốn xóa yêu cầu của ${selectedAdoption?.userName} không?`}
          />
        </div>
      </div>
    </div>
  );
}

export default Adopt;