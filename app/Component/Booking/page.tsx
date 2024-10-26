"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Calendar from "react-calendar";
import logo from "../../../public/img/Booking/petcare.png";
import logoname from "../../../public/img/Booking/pc.jpg";
import Doggo1 from "../../../public/img/Greet page/Doggo1.png";
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";
// import React, { useState } from 'react';
import Link from "next/link";
import Sidebar from "@/app/Admin/sidebar";
// import Header from '@/app/Admin/Header';
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import "react-calendar/dist/Calendar.css"; // Import the calendar CSS

function Booking() {
  const router = useRouter();

  // const [activeContainer, setActiveContainer] = useState(1);
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState(""); // State for phone number
  const [address, setAddress] = useState(""); // State for address
  const [petAge, setPetAge] = useState("");
  const [petGender, setPetGender] = useState("");
  const [weight, setWeight] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState(new Date()); // State for selected date
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  // const [error, setError] = useState("");
  //Handle loading and complete
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSaveClick = async () => {
    try {
      const data = {
        userName,
        phone,
        address,
        petAge,
        petGender,
        service,
        date,
        time,
        note,
        weight,
      };
      const phoneRegex = /^[0-9]{10}$/;

      if (
        !(userName && phone && address && petAge && petGender && weight && service) 
      ) {
        setError("NO_BOOKING_INFO");
        return;
      }

      if (!phoneRegex.test(phone)) {
        setError("INVALID_PHONENUMBER");
        return;
      }
      const selectedDate = new Date(date);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set current date to start of the day

      if (selectedDate <= currentDate) {
        setError("INVALID_DATE");
        return;
      }


      setLoadWhat("SEND_BOOKING_REQUEST");
      setIsLoading(true);
      const response = await axios.post("/appointment/add", data);
      setIsLoading(false);
      setIsComplete(true);
      setLoadWhat("SEND_BOOKING_REQUEST");

    } catch (error) {
      // toast.error('Error saving product!');
      console.error("Error saving product:", error);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
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
      // setImage({public_id: 'null', url: reader.result as string});
    };
  };
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
          <h2 className="text-4xl text-center text-white font">Đặt lịch hẹn</h2>
          <div className="p-3 mt-7 ">
            <img src={Doggo1.src} alt="Doggo1" className="w-60" />
          </div>
        </div>
        <form className="bg-white rounded-lg shadow-md p-8 w-1/2 mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Dịch vụ chăm sóc thú cưng
          </h2>
          <h2 className="text-lg font-semibold mb-4 ">Thông tin khách hàng</h2>
          <div className="flex items-center space-x-8">
            <label className="flex-1">Họ tên <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            />
          </div>

          <div className="flex items-center space-x-8">
            <label className="flex-1">SĐT <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0123456789"
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            />
          </div>
          <div className="flex items-center space-x-8">
            <label className="flex-1">Địa chỉ <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="247 Lý Thường Kiệt, Quận 10, TP.HCM"
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            />
          </div>
          <h2 className="text-lg font-semibold mb-4 ">Thông tin thú cưng</h2>
          <div className="flex items-center mt-4 space-x-8">
            <label className="flex-1">Tuổi</label>
            <select
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            >
              <option value="">Chọn độ tuổi</option>
              <option value="Dưới 6 tháng">Dưới 6 tháng</option>
              <option value="6 tháng - 12 tháng">6 tháng - 12 tháng</option>
              <option value="12 tháng - 24 tháng">12 tháng - 24 tháng</option>
              <option value="Trên 24 tháng">Trên 24 tháng</option>
            </select>
          </div>
          <div className="flex items-center mt-4 space-x-8">
            <label className="flex-1">Giới tính</label>
            <div className="flex flex-[4]">
              <div className="">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Đực"
                  onChange={(e) => setPetGender(e.target.value)}
                />
                <label htmlFor="male">Đực</label>
              </div>
              <div className="ml-4">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Cái"
                  onChange={(e) => setPetGender(e.target.value)}
                />
                <label htmlFor="female">Cái</label>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4 space-x-8">
            <label className="flex-1">Cân nặng</label>
            <select
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            >
              <option value="">Chọn cân nặng</option>
              <option value="Dưới 2kg">Dưới 2kg</option>
              <option value="2kg-4kg">2kg-4kg</option>
              <option value="Trên 4kg">Trên 4kg</option>
            </select>
          </div>

          <div className="flex items-center mt-4 space-x-8">
            <label className="flex-1">Chọn dịch vụ</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            >
              <option value="">Chọn dịch vụ</option>
              <option value="Kiểm tra sức khỏe">Kiểm tra sức khỏe</option>
              <option value="Tắm rửa">Tắm rửa</option>
              <option value="Tỉa lông">Tỉa lông</option>
              <option value="Tiêm vắc-xin">Tiêm vắc-xin</option>
            </select>
          </div>
          <div className="flex items-center mt-4 space-x-8">
            <label className="flex-1">Ngày hẹn</label>
            <input
              type="date"
              value={date.toISOString().split("T")[0]}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            />
          </div>
          <div className="flex items-center mt-4 space-x-8">
            <label className="flex-1">Thời gian</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            />
          </div>
          <div className="flex items-center mt-4 space-x-8">
            <label className="flex-1">Để lại lời nhắn</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSaveClick}
              className="mt-8 w-1/2 middle none center rounded-lg bg-yellow-400 py-3 px-6 font-sans text-xs font-bold 
            uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 
            focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
            disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              Đăng ký
            </button>
          </div>

          {/* {isSaved && (
                <div className="mt-4 text-center text-green-500 font-bold">
                  Cảm ơn quý khách đã đăng kí dịch vụ!
                </div>
        )} */}

          {/* <div className='flex items-center justify-center w-full'>
            <button onClick={handleSaveClick} className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Lưu
            </button>
        </div> */}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Booking;
