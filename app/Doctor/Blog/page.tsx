"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/Admin/Header";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import p1 from "@/public/img/Blog/p1.jpg";
import p2 from "@/public/img/Blog/p2.jpg";
import p3 from "@/public/img/Blog/p3.jpg";
import p4 from "@/public/img/Blog/p4.jpg";
import p5 from "@/public/img/Blog/p5.jpg";
import p11 from "@/public/img/Blog/p11.jpg";
import p12 from "@/public/img/Blog/p12.png";
import p13 from "@/public/img/Blog/p13.png";
import p111 from "@/public/img/Blog/p111.png";

import Footer from "../../Component/Footer/Footer";

// import React, { useState } from 'react';
import Link from "next/link";
import Sidebar from "../../Doctor/sidebarDoctor";
// import Header from '@/app/Admin/Header';
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
// import { Router } from "next/router";
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
function isToday(dateString: string): boolean {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isThisWeek(dateString: string): boolean {
  const today = new Date();
  const date = new Date(dateString);
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 6)
  );
  return date >= startOfWeek && date <= endOfWeek;
}

function isThisMonth(dateString: string): boolean {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function NewsPage() {
  const router = useRouter();
  const [news, setNews] = useState<any[]>([]); // State for the list of news
  const [filter, setFilter] = useState<string>("all");
  const filteredNews = news.filter((news) => {
    if (filter === "all") return true;
    if (filter === "today") return isToday(news.date);
    if (filter === "week") return isThisWeek(news.date);
    if (filter === "month") return isThisMonth(news.date);
  });

  const [image, setImage] = useState({ public_id: "", url: "" });
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/news/list");
        console.log(response.data); // Log response để kiểm tra cấu trúc dữ liệu

        setNews(response.data.news);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage({ public_id: "null", url: reader.result as string });
    };
  };
  const handleAddButton =  () => {
    router.push("/Doctor/Blog/AddNews");
  };

    

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="container mx-auto">
          <div className="flex w-full justify-start space-x-2 mt-4">
          <button 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 justify-self-start"
            onClick={handleAddButton}
          >
            Thêm tin
          </button>

          </div>

          <div className="flex w-full justify-center space-x-2 mt-4">

            <button
              onClick={() => setFilter("all")}
              className={`py-1 px-4 rounded-xl mb-2 font-bold ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent border border-[#CCCCCC] text-black"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter("today")}
              className={`py-1 px-4 rounded-xl mb-2 font-bold ${
                filter === "today"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent border border-[#CCCCCC] text-black"
              }`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => setFilter("week")}
              className={`py-1 px-4 rounded-xl mb-2 font-bold ${
                filter === "week"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent border border-[#CCCCCC] text-black"
              }`}
            >
              Trong tuần
            </button>
            <button
              onClick={() => setFilter("month")}
              className={`py-1 px-4 rounded-xl mb-2 font-bold ${
                filter === "month"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent border border-[#CCCCCC] text-black"
              }`}
            >
              Trong tháng
            </button>
          </div>

          <div className="p-4 border rounded-md shadow-sm bg-white flex flex-row items-start space-x-4">
            <div className="flex w-full h-full justify-center">
              {news.length === 0 ? (
                <p>No news posted yet.</p>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredNews.map((item, index) => (
                    <li
                      key={index}
                      className="mb-4 p-4 border rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="p-4 border rounded-md shadow-sm bg-white flex flex-col items-start space-y-4 hover:bg-blue-100 transition-colors duration-300">
                        <img
                          src={item.image.url}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(item.date)}
                        </p>
                        <p className="text-sm text-gray-800">{item.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewsPage;
