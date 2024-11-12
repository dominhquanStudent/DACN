"use client";
import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import xmast8 from "@/public/img/Blog/xmast8.jpg";
import xmast6 from "@/public/img/Blog/xmast6.jpg";
import xmast7 from "@/public/img/Blog/xmast7.jpg";
import xmast4 from "@/public/img/Blog/xmast4.jpg";
import xmast5 from "@/public/img/Blog/xmast5.jpg";
import Footer from "@/app/Component/Footer/Footer";

// import React, { useState } from 'react';
import Link from "next/link";
// import Header from '@/app/Admin/Header';
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { internalMutate } from "swr/_internal";
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

function NewsPage({ params }: { params: { Details: string } }) {
  const newsID = params.Details;
  const router = useRouter();
  const [news, setNews] = useState({
    image: {
      public_id: ["news/py5hawk9pkg6rxdtg6qq"],
      url: [
        "https://res.cloudinary.com/dzm879qpm/image/upload/v1729676466/news/py5hawk9pkg6rxdtg6qq.png",
      ],
    },
    _id: "6718c4b2dba74a700014f963",
    doctorId: "12323",
    title: "Thông báo",
    content: "Hello world",
    date: "2024-10-23T09:41:06.867Z",
    createdAt: "2024-10-23T09:41:06.867Z",
    updatedAt: "2024-10-23T09:41:06.867Z",
    __v: 0,
  }); // State for the list of news

  const [image, setImage] = useState({ public_id: "", url: "" });
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`/news/${newsID}`);
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
  const handleAddButton = () => {
    router.push("/Doctor/Blog/AddNews");
  };
  console.log(news);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex w-full h-full">
        <div className="container mx-auto p-4">
          <div className="container mx-auto p-4">
            <Carousel
              showThumbs={false}
              showStatus={false}
              autoPlay
              infiniteLoop
              interval={1000}
              transitionTime={500}
            >
              <div>
                <img src={xmast6.src} className=" h-[350px]" alt="Poster 2" />
              </div>
              <div>
                <img src={xmast7.src} className=" h-[350px]" alt="Poster 1" />
              </div>
              <div>
                <img src={xmast8.src} className=" h-[350px]" alt="Poster 1" />
              </div>

              <div>
                <img src={xmast4.src} className=" h-[350px]" alt="Poster 2" />
              </div>
            </Carousel>
          </div>
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-5/6 bg-white p-8 shadow-lg">
              <div className="text-3xl font-bold text-center mb-4">
                {news.title}
              </div>
              <div
                className="text-sm text-gray-800"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NewsPage;
