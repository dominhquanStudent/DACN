"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/Admin/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "@/app/Component/Footer/Footer";
import Sidebar from "@/app/Doctor/sidebarDoctor";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css"; // Import the styles
import dynamic from "next/dynamic";
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";
import ConfimModal from "@/app/Component/ConfirmModal";
import ConfirmModal from "@/app/Component/ConfirmModal";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
  const id = params.Details; // Assuming the news item ID is passed as a query parameter
  // const [news, setNews] = useState<NewsItem | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  ///

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        try {
          const response = await axios.get(`/news/${id}`);
          const newsItem = response.data.news;
          setNews(newsItem);
          setTitle(newsItem.title);
          setContent(newsItem.content);
          setImage(newsItem.image);
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      };

      fetchNews();
    }
  }, [id]);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage({ public_id: "null", url: reader.result as string });
    };
  };

  const handleSaveClick = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        title,
        content,
        image,
      };
      if (!title) {
        setError("LACK_TITLE");
        return;
      }
      if (!content || content === "<p><br></p>") {
        setError("LACK_CONTENT");
        return;
      }

      setLoadWhat("SEND_UPDATENEW_REQUEST");
      setIsLoading(true);
      await axios.put(`/news/${id}`, data);
      setIsLoading(false);
      setIsComplete(true);
      router.push("../Blog"); // Redirect to the news list page after updating
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };
  const handleDeleteClick = async () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/news/${id}`);
      router.push("../Blog"); // Redirect to the news list page after deleting
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Header />
      <ErrorModal error={error} setError={setError} />
      <LoadingModal
        isLoading={isLoading}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
        loadWhat={loadWhat}
      />
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="container mx-auto w-full h-full relative">
          <h1 className="text-2xl font-bold mb-4">Bài viết</h1>

          <form onSubmit={handleSaveClick} className="mb-4">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Tiêu đề
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Nội dung
              </label>
              <ReactQuill
                value={content}
                onChange={setContent}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image", "video"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                  "video",
                ]}
              />
            </div>
            <div className="w-full px-3">
              <label className="text-xs font-bold mb-2" htmlFor="ImageUpload">
                Tải ảnh lên
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
                    hover:file:bg-violet-100"
              />
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Lưu thay đổi
              </button>
              <button
                type="button"
                onClick={handleDeleteClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Xóa bài viết
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Bạn có chắc chắn muốn xóa bài viết này không?"
      />
    </div>
  );
}
export default NewsPage;
