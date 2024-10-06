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
"use client";
import React, { useEffect, useState, use } from "react";

import { mutate } from "swr";
import Sidebar from "@/app/Admin/sidebar";
import Header from "../../../Component/Header/Header";
import Footer from "../../../Component/Footer/Footer";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import getInfo from "@/hooks/getInfo";
import logo from "../../../../public/img/Booking/petcare.png";
import logoname from "../../../../public/img/Booking/pc.jpg";
import Doggo1 from "../../../../public/img/Greet page/Doggo1.png";
import { current } from "@reduxjs/toolkit";
import { request } from "http";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function SendRequest({ params }: { params: { Detail: string } }) {
  const petId = params.Detail;
  // const [data, setData] = useState<any>({});
  const [data, setData] = useState<any>({ image: { url: [""] } });

  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();
  const [account, setAccount] = useState({
    userName: "",
    phone: "",
    address: "",
  });
  const jtw = getCookie("jwt");

  const fetchData = async () => {
    const getAccount = await getInfo();
    setAccount(getAccount);
  };

  useEffect(() => {
    const fetchPetData = async (id: any) => {
      try {
        const response = await axios.get(`/pet/${petId}`);
        const petData = response.data;
        console.log("API Response:", petData); // Log the API response
        setData(petData.pet);
      } catch (error) {
        console.error("Error fetching pet data:", error);
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
    console.log("Pet Data:", data); // Log the state
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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
      setData({
        ...data,
        image: { public_id: "null", url: reader.result as string },
      });
    };
  };

  const handleChangeClick = async () => {
    setIsEditable(true);
  };

  const handleAdoptClick = async () => {
    try {
      const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

      const updatedData = {
        ...data,
        userName: account.userName,
        phoneNumber: account.phone,
        address: account.address,
        requestDay: currentDate,
        adoptStatus: "Đang được yêu cầu",
      };

      const response = await axios.put(`/pet/${petId}`, updatedData);
      // Revalidate the data
      mutate(`/pet/${petId}`);
      router.push(`/Adopt`);

      alert("Đăng kí nhận nuôi thành công!");
    } catch (error) {
      console.error("Error updating pet data:", error);
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
          <h2 className="text-4xl text-center text-white font">
            Nhận nuôi thú cưng
          </h2>
          <div className="p-3 mt-7 ">
            <img src={Doggo1.src} alt="Doggo1" className="w-60" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 w-1/2 mx-auto">
          <form className="w-full mx-4" key={data._id}>
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="userName">
                  Tên của bạn
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="userName"
                  type="text"
                  value={account.userName}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="address">
                  Địa chỉ
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="address"
                  type="text"
                  value={account.address}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="phoneNumber">
                  SĐT
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="phoneNumber"
                  type="text"
                  value={account.phone}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="method">
                    Chọn phương thực nhận thú cưng
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="method"
                    // value={data.method}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn phương thức</option>
                    <option value="Trực tiếp">Trực tiếp</option>
                    <option value="Đơn vị vận chuyển">Đơn vị vận chuyển</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="arriveDay">
                  Chọn ngày nhận thú cưng
                </label>
                <input
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="arriveDay"
                  type="date"
                  value={data.arriveDay}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="message">
                  Lời nhắn
                </label>
                <textarea
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="message"
                  // type="text"

                  // value={data.message}
                  placeholder="Gửi lời nhắn đến cửa hàng"
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            {data.adoptStatus === "Chưa có chủ" && (
              <button
                onClick={() => handleAdoptClick()} // Pass the petId here
                className="bg-[hsl(56,86%,56%)] hover:bg-blue-700 text-white font-bold py-2 px-4"
                style={{ borderRadius: "30px" }}
              >
                {/* <button onClick={handleSendRequestClick} className="bg-[hsl(56,86%,56%)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " style={{ borderRadius: '30px' }}> */}
                Gửi yêu cầu
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SendRequest;
