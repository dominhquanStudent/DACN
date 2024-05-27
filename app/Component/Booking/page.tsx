"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Calendar from "react-calendar";
import logo from "../../../public/img/Booking/petcare.png";
import logoname from "../../../public/img/Booking/pc.jpg";
import Doggo1 from "../../../public/img/Greet page/Doggo1.png";

import "react-calendar/dist/Calendar.css"; // Import the calendar CSS

export default function Booking() {
  const [activeContainer, setActiveContainer] = useState(1);
  const [date, setDate] = useState(new Date()); // State for selected date
  const [customerName, setCustomerName] = useState(""); // State for customer name
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
  const [email, setEmail] = useState(""); // State for email
  const [bossName, setBossName] = useState(""); // State for boss name
  const [numnber, setNumber] = useState(""); // State for number
  const [weight, setWeight] = useState("");
  const [time, setTime] = useState("");
  const [age, setAge] = useState("");
  const [service, setService] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    // You can add any side-effects or data fetching logic here if needed
  }, []);

  // JSX code with random content in each cell
  return (
    // Global container
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
          <h2 className="text-4xl text-center text-white font">Đặt lịch hẹn</h2>
          <div className="p-3 mt-7 ">
            <img src={Doggo1.src} alt="Doggo1" className="w-60" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 w-1/2 mx-auto">
          <h2 className="text-lg font-semibold mb-4">
            Dịch vụ chăm sóc thú cưng
          </h2>
          <div className="flex items-center space-x-8">
            <label className="flex-1">Tên khách hàng</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nhập tên khách hàng"
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            />
          </div>
          <div className="flex items-center space-x-8">
            <label className="flex-1">SĐT</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            />
          </div>
          <div className="flex items-center space-x-8">
            <label className="flex-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            />
          </div>
          <div className="flex items-center space-x-8">
            <label className="flex-1">Tên của Boss</label>
            <input
              type="text"
              value={bossName}
              onChange={(e) => setBossName(e.target.value)}
              placeholder="Nhập tên cua Boss"
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            />
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
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male">Đực</label>
              </div>
              <div className="ml-4">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Cái"
                  onChange={(e) => setGender(e.target.value)}
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
              <option value="light">Dưới 2kg</option>
              <option value="medium">2kg-4kg</option>
              <option value="heavy">Trên 4kg</option>
            </select>
          </div>
          <div className="flex items-center mt-4 space-x-8">
            <label className="flex-1">Tuổi</label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
            >
              <option value="">Chọn độ tuổi</option>
              <option value="age1">Dưới 6 tháng</option>
              <option value="age2">6 tháng - 12 tháng</option>
              <option value="age3">12 tháng - 24 tháng</option>
              <option value="age4">Trên 24 tháng</option>
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
              <option value="dv1">Kiểm tra sức khỏe</option>
              <option value="dv2">Tắm rửa</option>
              <option value="dv3">Tỉa lông</option>
              <option value="dv4">Tiêm vắc-xin</option>
            </select>
          </div>
          <div className="flex items-center mt-4 space-x-8">
            <label className="flex-1">Ngày hẹn</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
          <div className="flex justify-center">
            <button
              className="mt-8 w-1/2 middle none center rounded-lg bg-yellow-400 py-3 px-6 font-sans text-xs font-bold 
              uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 
              focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
              disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
