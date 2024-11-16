"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/Admin/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus, faFilter);

import Footer from "../../Component/Footer/Footer";

import Sidebar from "../../Doctor/sidebarDoctor";
import axios from "@/api/axios";
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
        // Sắp xếp các bài viết theo thứ tự mới nhất đầu tiên
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
  const handleAddButton = () => {
    router.push("/Doctor/Blog/AddNews");
  };
  console.log(news);
  return (
    <div className="w-full container ">
      <Header />
      <div className="flex w-full h-full ">
        <Sidebar />
        <div className="w-3/4 container mx-4">
          <div
            className={
              "flex font-nunito text-xl font-bold w-full justify-center"
            }
          >
            Quản lý bài viết
          </div>{" "}
          <div className="flex w-full space-x-2 mt-4">
            <button
              onClick={handleAddButton}
              className="bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2 hover:bg-blue-500 hover:border-blue-600 hover:text-white"
            >
              <FontAwesomeIcon icon={faPlus} className="" />
            </button>
            <div className="flex w-full mt-4 mb-4 justify-end">
              <label className="text-lg font-nunito font-bold text-gray-400">
                <FontAwesomeIcon icon={faFilter} className="" />
              </label>

              <select
                className="border border-gray-300 rounded-md ml-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="today">Hôm nay</option>

                <option value="week">Trong tuần</option>
                <option value="month">Trong tháng</option>
              </select>
            </div>
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
                      <div
                        className="p-4 border rounded-md shadow-sm bg-white flex flex-col items-start space-y-4 hover:bg-blue-100 transition-colors duration-300"
                        onClick={() =>
                          (window.location.href = `/Doctor/Blog/${item._id}`)
                        }
                      >
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewsPage;
