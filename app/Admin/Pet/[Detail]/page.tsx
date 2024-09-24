'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
function PetDetail({ params }: { params: { Detail: string } }) {
  const petId = params.Detail;
  const [data, setData] = useState<any>({});
  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchPetData = async (id: any) => {
      try {
        const response = await axios.get(`/pet/${petId}`);
        const petData = response.data;
        setData(petData.pet);
        // const log = await axios.post(`/test`, petData.pet);
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };
    if (petId) {
      fetchPetData(petId);
    }
  }, [petId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleImage = (e: any) =>{
    const file = e.target.files[0];
    setFileToBase(file);
}

const setFileToBase = (file: any) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
    setData( {...data, image: {public_id: "null", url: reader.result as string}});
    }
}
  const handleSaveClick = () => {
    const updatePetData = async (id: any) => {
      try {
        const response = await axios.put(`/pet/${petId}`,data);
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };
      updatePetData(data);
    
    router.push('/Admin/Pet');
  };

  const handleChangeClick = async () => {
    setIsEditable(true);
    // const log = await axios.post(`/test`, data);
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
            Chi tiết voucher
          </div>
          <form className="w-full mx-4" key={data._id}>
          {/* <form className="w-full mx-4" > */}
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="petName">
                  Tên thú cưng
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="petName"
                  type="text"
                  value={data.petName}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="image">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImage}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  disabled={!isEditable}
                />
              </div>

              <div className='flex w-full'>
                <div className="w-full px-3">
                    <label className="text-xs font-bold mb-2" htmlFor="gender">
                      Giới tính
                    </label>
                    <select
                      className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                      id="gender"
                      value={data.gender}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Đực">Đực</option>
                      <option value="Cái">Cái</option>

                    </select>
                  </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="age">
                    Tuổi
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="age"
                    type="text"
                    value={data.age}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
              </div>
              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="race">
                    Giống
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="race"
                    type="text"
                    value={data.race}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="species">
                    Loài
                  </label>
                  <select
                      className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                      id="species"
                      value={data.species}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    >
                      <option value="">Chọn loài</option>
                      <option value="Chó">Chó</option>
                      <option value="Mèo">Mèo</option>

                    </select>
                </div>
 

              </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="AdoptStatus">
                  Tình trạng nhận nuôi
                </label>
                <select
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="adoptStatus"
                  value={data.adoptStatus}
                  onChange={handleInputChange}
                  disabled={!isEditable}
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
                  id="eecieveDay"
                  type="date"
                  value={data.recieveDay}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>
                

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Description">
                  Mô tả
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  value={data.description}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                ></textarea>
              </div>
            </div>
          </form>
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
      {/* <ToastContainer /> */}
    </div>
  );
}

export default PetDetail;