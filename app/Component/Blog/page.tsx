"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import p3 from "@/public/img/Blog/p3.jpg";
import p12 from "@/public/img/Blog/p12.png";
import blog_cover1 from "@/public/img/Blog/blog_cover1.png";
import blog_cover2 from "@/public/img/Blog/blog_cover2.png";
import xmast8 from "@/public/img/Blog/xmast8.jpg";
import xmast6 from "@/public/img/Blog/xmast6.jpg";
import xmast7 from "@/public/img/Blog/xmast7.jpg";
import xmast4 from "@/public/img/Blog/xmast4.jpg";
import xmast5 from "@/public/img/Blog/xmast5.jpg";


import Footer from "../../Component/Footer/Footer";
import Link from "next/link";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

  // Pagination state for news
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  // Calculate the news to display on the current page
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Calculate total pages
  const totalPages = Math.ceil(news.length / newsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pageNumbers;
  };

  const filteredNews = currentNews.filter((news) => {
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
        const sortedNews = response.data.news.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setNews(sortedNews);

        // setNews(response.data.news);
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

  return (
    <div className="container mx-auto p-4">
      <Header />
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
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredNews.map((item, index) => (
                <li
                  key={index}
                  className="mb-4 p-4 border rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 "
                  onClick={() => window.location.href = `/Component/Blog/${item._id}`}
                >
                  <div className="p-4 border rounded-md shadow-sm bg-white flex flex-col items-start space-y-4 hover:bg-blue-100 transition-colors duration-300 max-w-[455px]">
                    <img
                      src={item.image.url}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </p>
                    <div
                      className="text-sm text-gray-800 line-clamp-1"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="pagination flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
            className={`px-3 py-1 mx-1 ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            disabled={typeof pageNumber !== 'number'}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default NewsPage;