'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import axios from '@/api/axios';
import { ToastContainer, toast } from 'react-toastify';

function PetAdd() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [race, setRace] = useState('');
  const [species, setSpecies] = useState('');
  const [description, setDescription] = useState('');
  const [adoptStatus, setAdoptStatus] = useState('');
  const [recieveDay, setRecieveDay] = useState('');
  


  const handleSaveClick = async () => {
    try {
      const data = {
        name,
        gender,
        age,
        race,
        species,
        description,
        adoptStatus,
        recieveDay,
      };
      const response = await axios.post('/pet/add', data);
      toast.success('Pet saved successfully!');
      console.log('Pet saved:', response.data);
    } catch (error) {
      toast.error('Error saving pet!');
      console.error('Error saving pet:', error);
    }
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
            Thêm sản phẩm
          </div>
          <form className="w-full mx-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="ProductName">
                  Tên thú cưng
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="PetName"
                  type="text"
                  placeholder="Enter Pet Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="ImageUpload">
                  Tải hình ảnh
                </label>
                <input
                  type="file"
                  id="ImageUpload"
                  name="image"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                />
              </div> */}
              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Price">
                    Giới tính
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Status"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="inactive">Đực</option>
                    <option value="active">Cái</option>
                  </select>
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Quantity">
                    Tuổi
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Age"
                    type="text"
                    placeholder="Enter Quantity"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>
              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Category">
                    Giống
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Race"
                    type="text"
                    placeholder="Enter Category"
                    value={race}
                    onChange={(e) => setRace(e.target.value)}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Status">
                    Loài
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Species"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                  >
                    <option value="">Select Species</option>
                    <option value="inactive">Chó</option>
                    <option value="active">Mèo</option>
                  </select>
                </div>
 

              </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Status">
                  Tình trạng nhận nuôi
                </label>
                <select
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="AdoptStatus"
                  value={adoptStatus}
                  onChange={(e) => setAdoptStatus(e.target.value)}
                >
                  <option value="">Select Species</option>
                  <option value="Rồi">Rồi</option>
                  <option value="Chưa">Chưa</option>
                </select>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="RecieveDay">
                  Ngày nhận nuôi
                </label>
                <input
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="RecieveDay"
                  type="date"
                  value={recieveDay}
                  onChange={(e) => setRecieveDay(e.target.value)}
                />
              </div>
                

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Description">
                  Mô tả
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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

export default PetAdd;