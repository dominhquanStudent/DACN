"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import logo from "../../../public/img/Booking/petcare.png";
import logoname from "../../../public/img/Logo2.svg";
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";
import "react-calendar/dist/Calendar.css"; // Import the calendar CSS
import { getCookie } from "cookies-next";
import getInfo from "@/hooks/getInfo";

export default function Booking() {
  const router = useRouter();
  const [user_name, setUser_name] = useState("");
  const [contactPhone, setContact_phone] = useState(""); // State for phone number
  const [image, setImage] = useState({ public_id: '', url: '' });
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState(""); // State for boss name
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  //get account data
  const jwt = getCookie("jwt");
  const [accountData, setAccountData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = getCookie("jwt");
        if (jwt) {
          const getaccountData = await getInfo();
          setAccountData(getaccountData);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchData();
  }, []);
  const handleSaveClick = async () => {
    try {
      const data = {
        user_name: accountData?.userName || user_name,
        contactPhone: accountData?.phone || contactPhone,
        image,
        location,
        message,
      };
      const phoneRegex = /^[0-9]{10}$/;


      if (!user_name && !jwt) {
        setError("NO_ADOPT_USER_NAME");
        return;
      }
      if (!contactPhone && !jwt) {
        setError("NO_ADOPT_PHONE");
        return;
      }
      if (!image.url) {
        setError("NO_ADOPT_IMAGE");
        return;
      }
      if (!location) {
        setError("NO_ADOPT_LOCATION");
        return;
      }
      if (!message) {
        setError("NO_ADOPT_MESSAGE");
        return;
      }

      if (!phoneRegex.test(accountData?.phone || contactPhone)) {
        setError("INVALID_PHONENUMBER");
        return;
      }
      setLoadWhat("SEND_RESCUE_REQUEST");
      setIsLoading(true);
      const response = await axios.post('/rescueRequest/add', data);
      setIsLoading(false);
      setIsComplete(true);
    } catch (error) {
      console.error('Error saving product:', error);
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
      setImage({ public_id: 'null', url: reader.result as string });
    }
  }
  console.log(accountData);
  return (
    <>
      <Header />
      <ErrorModal error={error} setError={setError} />
      <LoadingModal
        isLoading={isLoading}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
        loadWhat={loadWhat}
      />

      <div className="flex flex-col items-center gap-4 py-4 justify-center font-nunito bg-gradient-to-br from-[#3c8ce7] to-[#00eaff] min-h-screen">
        <div className="bg-white rounded-lg shadow-md px-8 py-4 w-full lg:w-1/2 mx-auto">
          <div className="flex flex-col items-center space-y-4">
            <img src={logoname.src} alt="Logo" className="w-40 lg:w-60" />
            <h2 className="text-xl lg:text-3xl text-center text-gray-800 font-bold">
              Dịch vụ cứu hộ thú cưng
            </h2>
          </div>
          <div className="mt-4 space-y-4">
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                <label className="flex-1">Tên người gửi <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={accountData?.userName || user_name}
                  onChange={(e) => setUser_name(e.target.value)}
                  placeholder="Nhập tên khách hàng"
                  className="block w-full mt-2 p-2 border rounded lg:ml-2 flex-[4] disabled:bg-gray-300"
                  disabled={accountData?.userName ? true : false}
                />
              </div>
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                <label className="flex-1">SĐT liên hệ <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={accountData?.phone || contactPhone}
                  onChange={(e) => setContact_phone(e.target.value)}
                  placeholder="Nhập số điện thoại"
                  className="block w-full mt-2 p-2 border rounded lg:ml-2 flex-[4] disabled:bg-gray-300"
                  disabled={accountData?.userName ? true : false}
                />
              </div>
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                <label className="flex-1 text-xs font-bold mb-2" htmlFor="ImageUpload">
                  Tải hình ảnh <span className="text-red-500">*</span>
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
                  hover:file:bg-violet-100 lg:ml-2 flex-[4]"
                />
              </div>
              {image.url && (
                <div className="flex justify-center">
                  <img src={image.url} alt="Uploaded" className="w-24 h-24 rounded-full" />
                </div>
              )}
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                <label className="flex-1">Địa điểm cần cứu hộ <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Nhập địa chỉ."
                  className="block w-full mt-2 p-2 border rounded lg:ml-2 flex-[4]"
                />
              </div>
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                <label className="flex-1">Lời nhắn <span className="text-red-500">*</span></label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập lời nhắn của bạn"
                  className="block w-full mt-2 p-2 border rounded lg:ml-2 flex-[4]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <button onClick={handleSaveClick}
              className="mt-8 w-full lg:w-1/2 middle none center rounded-lg bg-yellow-400 py-3 px-6 font-sans text-xs font-bold 
              uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 
              focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
              disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              Gửi cứu hộ
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