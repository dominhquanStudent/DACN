"use client";
import React, { useState, useEffect } from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import Calendar from "react-calendar";
import logo from "../../../public/img/Booking/petcare.png";
import logoname from "../../../public/img/Booking/pc.jpg";
import Doggo1 from "../../../public/img/Greet page/Doggo1.png";
// import React, { useState } from 'react';
import Link from "next/link";
import Sidebar from "../../Doctor/sidebarDoctor";
// import Header from '@/app/Admin/Header';
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function NewsPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // State for phone number
  const [image, setImage] = useState({ public_id: "", url: "" });

  const handleSaveClick = async () => {
    // if (!user_name || !contactPhone || !location || !message) {
    //   setError("Vui lòng nhập đầy đủ thông tin.");
    //   return;
    // }

    try {
      const data = {
        title,
        content,
        image,
      };
      const response = await axios.post("/news/add", data);
      alert("Đã gửi yêu cầu thành công!");
      router.push("/Main");
      // toast.success('Product saved successfully!');
      // setIsSaved(true);
      // setError("");
      // router.push('/Admin/Appointment');
    } catch (error) {
      toast.error("Error saving product!");
      console.error("Error saving product:", error);
      // setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
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
      setImage({ public_id: "null", url: reader.result as string });
    };
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="w-full h-full relative">
          <h1 className="text-2xl font-bold mb-4">Daily News for Doctors</h1>

          <form onSubmit={handleSaveClick} className="mb-4">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Post News
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <div>
        {/* <h2 className="text-xl font-bold mb-2">News Feed</h2>
        {news.length === 0 ? (
          <p>No news posted yet.</p>
        ) : (
          <ul>
            {news.map((item, index) => (
              <li key={index} className="mb-4 p-4 border rounded-md shadow-sm">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.date}</p>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
}

export default NewsPage;
