"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Calendar from "react-calendar";
import logo from "../../../public/img/Booking/petcare.png";
import logoname from "../../../public/img/Booking/pc.jpg";
import Doggo1 from "../../../public/img/Greet page/Doggo1.png";
// import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/Admin/sidebar';
// import Header from '@/app/Admin/Header';
import axios from '@/api/axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";

import "react-calendar/dist/Calendar.css"; // Import the calendar CSS

export default function Booking() {
  const router = useRouter();
  const [user_name, setUser_name] = useState("");
  const [contactPhone, setContact_phone] = useState(""); // State for phone number
  const [image, setImage] = useState({public_id: '', url: ''});
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState(""); // State for boss name
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSaveClick = async () => {
    // if (!user_name || !contactPhone || !location || !message) {
    //   setError("Vui lòng nhập đầy đủ thông tin.");
    //   return;
    // }

    try {
      const data = {
        user_name,
        contactPhone,
        image,
        location,
        message,

      };
      const phoneRegex = /^[0-9]{10}$/;

      if (
        !(user_name && contactPhone && image.url && location && message)
      ) {
        setError("NO_RESCUE_INFO");
        return;
      }

      if (!phoneRegex.test(contactPhone)) {
        setError("INVALID_PHONENUMBER");
        return;
      }
      setLoadWhat("SEND_RESCUE_REQUEST");
      setIsLoading(true);
      const response = await axios.post('/rescueRequest/add', data);
      setIsLoading(false);
      setIsComplete(true);

    } catch (error) {
      // toast.error('Error saving product!');
      // console.error('Error saving product:', error);
      // setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  }


  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
    setImage({public_id: 'null', url: reader.result as string});
    }
  }







  // JSX code with random content in each cell
  return (
    // Global container
    <>
      <Header />
      <ErrorModal error={error} setError={setError} />
      <LoadingModal
        isLoading={isLoading}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
        loadWhat={loadWhat}
      />

      <div className="flex gap-4 p-4 bg-background-blue">
        <div className="relative left-28">
          <div className="p-3">
            <img src={logo.src} alt="Logo" className="w-60" />
          </div>
          <div className="p-3">
            <img src={logoname.src} alt="Logo" className="w-60" />
          </div>
          <h2 className="text-4xl text-center text-white font">
            Gửi yêu cầu cứu hộ
          </h2>

        </div>
        <div className="bg-white rounded-lg shadow-md p-8 w-1/2 mx-auto">
          <h2 className="text-lg font-semibold mb-4">
            Dịch vụ chăm sóc thú cưng
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-8 ">
              <label className="flex-1">Tên người gửi</label>
              <input
                type="text"
                value={user_name}
                onChange={(e) => setUser_name(e.target.value)}
                placeholder="Nhập tên khách hàng"
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              />
            </div>
            <div className="flex items-center space-x-8">
              <label className="flex-1">SĐT liên hệ</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContact_phone(e.target.value)}
                placeholder="Nhập số điện thoại"
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              />
            </div>
            <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="ImageUpload">
                  Tải hình ảnh
                </label>
                <input
                  type="file"
                  id="ImageUpload"
                  name="image"
                  accept="image/*"
                  onChange={handleImage}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                />
              </div>

            <div className="flex items-center space-x-8">
              <label className="flex-1">Địa điểm cần cứu hộ</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Nhập địa chỉ."
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              />
            </div>
            <div className="flex items-center space-x-8">
              <label className="flex-1">Lời nhắn</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập lời nhắn của bạn"
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              />
            </div>
          </div>
          <div className="flex justify-center">
          <button onClick={handleSaveClick}
            className="mt-8 w-1/2 middle none center rounded-lg bg-yellow-400 py-3 px-6 font-sans text-xs font-bold 
            uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 
            focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
            disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Đăng ký
          </button>
        </div> 

        {isSaved && (
                <div className="mt-4 text-center text-green-500 font-bold">
                  Cảm ơn quý khách đã đăng kí dịch vụ!
                </div>
        )}


        </div>
      </div>
      <Footer />
    </>
  );
}
