// 'use client';
// import { getCookie } from "cookies-next";
// import getInfo from "@/hooks/getInfo";
// import { useState, useEffect, use } from "react";
// export default function Adopt_Detail() 
// {
//     const jtw = getCookie("jwt");
//     const [account, setAccount] = useState<any>();
//     const fetchData = async () => {
//         const getAccount = await getInfo();
//         setAccount(getAccount);
//     }
//     useEffect(() => {
//         if (jtw) {
//             fetchData();
//         }
//     }, []);
//     console.log(account);
//     console.log(account.email);


//     return (
//         <div>Hello Dinh So</div>
//     )
       
// }
'use client';
import React, { useEffect, useState, use } from 'react';


import { mutate } from 'swr';
import Sidebar from '@/app/Admin/sidebar';
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";
import getInfo from "@/hooks/getInfo";
import logo from "../../../public/img/Booking/petcare.png";
import logoname from "../../../public/img/Booking/pc.jpg";
import Doggo1 from "../../../public/img/Greet page/Doggo1.png";
import { current } from '@reduxjs/toolkit';
import { request } from 'http';


function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function PetDetail({ params }: { params: { Detail: string } }) {
  const petId = params.Detail;
  // const [data, setData] = useState<any>({});
  const [data, setData] = useState<any>({ "image":{"url":[""]}, });  

  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();
    const jtw = getCookie("jwt");
    const [account, setAccount] = useState<any>();
    const fetchData = async () => {
        const getAccount = await getInfo();
        setAccount(getAccount);
    }

  useEffect(() => {
    const fetchPetData = async (id: any) => {
      try {
        const response = await axios.get(`/pet/${petId}`);
        const petData = response.data;
        console.log('API Response:', petData); // Log the API response
        setData(petData.pet);
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };
    if (petId) {
      fetchPetData(petId);
    }
        if (jtw) {
            fetchData();
        }
  }, [petId]);

  useEffect(() => {
    console.log('Pet Data:', data); // Log the state
  }, [data]);

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
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData({ ...data, image: { public_id: "null", url: reader.result as string } });
    };
  };

  const handleSaveClick = () => {
    const updatePetData = async (id: any) => {
      try {
        const response = await axios.put(`/pet/${petId}`, data);
        mutate(`/pet/${petId}`);
        router.push('/Admin/Pet');
      } catch (error) {
        console.error('Error updating pet data:', error);
      }
    };
    updatePetData(data);
  };

  const handleChangeClick = async () => {
    setIsEditable(true);
  };

  const handleAdoptClick = async () => {
    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

      const updatedData = { ...data, 
        userName: account.userName, 
        phoneNumber : account.phone, 
        address: account.address,
        requestDay: currentDate,
        adoptStatus: 'Đang được yêu cầu'
       };
      const response = await axios.put(`/pet/${petId}`, updatedData)
      // Revalidate the data
      mutate(`/pet/${petId}`);
      alert('Đăng kí nhận nuôi thành công!');
    } catch (error) {
      console.error('Error updating pet data:', error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }
//   console.log(account);


  return (
    <>
    <Header />
    <div className="flex gap-4 p-4 bg-background-blue">
      <div className="relative left-28">
        <div className="p-3">
          <img src={logo.src} alt="Logo" className="w-60" />
        </div>
        <div className="p-3">
          <img src={logoname.src} alt="Logo" className="w-60" />
        </div>
        <h2 className="text-4xl text-center text-white font">Nhận nuôi thú cưng</h2>
        <div className="p-3 mt-7 ">
          <img src={Doggo1.src} alt="Doggo1" className="w-60" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8 w-1/2 mx-auto">
      <form className="w-full mx-4" key={data._id}>
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="petName">
                  Tên thú cưng
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="petName"
                  type="text"
                  value={data.petName || ''}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="image">
                  Hình ảnh
                </label>
                <div className="w-[150px] h-[150px] bg-gray-300 rounded-md">
                    <img src={data.image.url} alt="" className="w-full h-full object-cover"/>
                </div>


              </div>

              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="gender">
                    Giới tính
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="gender"
                    type="text"
                    value={data.gender}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />

                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="age">
                    Tuổi
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="age"
                    type="text"
                    value={data.age || ''}
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
                    value={data.race || ''}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="species">
                    Loài
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="age"
                    type="text"
                    value={data.species}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
              </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="adoptStatus">
                  Tình trạng nhận nuôi
                </label>
                <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    
                    id="age"
                    type="text"
                    value={data.adoptStatus}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />

              </div>
              {data.adoptStatus === 'Đã có chủ' && (
                  <div className="w-full px-3">
                    <label className="text-xs font-bold mb-2" htmlFor="adoptDay">
                      Ngày được nhận nuôi
                    </label>
                    <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                      {formatDate(data.adoptDay)}
                    </div>
                  </div>
                )}
              


              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="description">
                  Mô tả
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  value={data.description || ''}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                ></textarea>
              </div>


            </div>
          </form>
          <div className="flex justify-center">
            {data.adoptStatus === 'Chưa có chủ' && (
              <button onClick={handleAdoptClick} className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Đăng kí nhận nuôi
              </button>
            )}
          </div>


      </div>
    </div>
    <Footer />
  </>

  );
    
}


export default PetDetail;