"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Calendar from "react-calendar";
import logo from "../../../public/img/Booking/petcare.png";
import logoname from "../../../public/img/Booking/pc.jpg";
import Doggo1 from "../../../public/img/Greet page/Doggo1.png";
import 'react-calendar/dist/Calendar.css'; // Import the calendar CSS

export default function Booking() {
  const [activeContainer, setActiveContainer] = useState(1);
  const [date, setDate] = useState(new Date()); // State for selected date
  const [customerName, setCustomerName] = useState(""); // State for customer name
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
  const [email, setEmail] = useState(""); // State for email
  const [massage, setMassage] = useState(""); // State for boss name
  const [numnber, setNumber] = useState(""); // State for number
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [age, setAge] = useState("");
  const [service, setService] = useState("");
  const [imageSrc, setImageSrc] = useState("");

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
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nhập tên khách hàng"
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              />
            </div>
            <div className="flex items-center space-x-8">
              <label className="flex-1">SĐT liên hệ</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại"
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              />
            </div>
            <div className="flex items-center space-x-8">
              <label className="flex-1">Hình ảnh</label>
              <div className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader();
                      reader.onload = (event) =>
                        setImageSrc(event.target.result as string);
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Chosen"
                    style={{ height: "200px" }}
                  />
                )}
              </div>
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
                value={massage}
                onChange={(e) => setMassage(e.target.value)}
                placeholder="Nhập lời nhắn của bạn"
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              />
            </div>
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
