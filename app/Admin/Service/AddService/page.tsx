"use client";
import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";

interface Service {
  name: String;
  category: String;
  price: Number;
  description: String;
  status: String;
  image: {
    public_id: [String];
    url: [String];
  };
}

function ServiceAdd() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState({ public_id: "", url: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSaveClick = async () => {
    try {
      const data = {
        name,
        category,
        price: Number(price.replace(/,/g, "")), // Convert formatted price to number
        description,
        status,
        image,
      };
      setLoadWhat("SEND_ADDSERVICE_REQUEST");
      setIsLoading(true);
      const response = await axios.post("/service/add", data);
      setIsLoading(false);
      setIsComplete(true);
    } catch (error) {
      toast.error("Error saving service!");
      console.error("Error saving service:", error);
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

  const formatCurrency = (value: string) => {
    const numberValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    return new Intl.NumberFormat("vi-VN").format(Number(numberValue));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numberValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    setPrice(numberValue);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <ErrorModal error={error} setError={setError} />
      <LoadingModal
        isLoading={isLoading}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
        loadWhat={loadWhat}
      />
      <Header />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-3/4 border-l-2 border-gray-200">
          <div className="flex font-nunito text-xl font-bold w-full justify-center">
            Thêm dịch vụ
          </div>
          <form className="w-full mx-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="ServiceName">
                  Tên dịch vụ
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="ServiceName"
                  type="text"
                  placeholder="Nhập tên dịch vụ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="Category">
                  Phân loại
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Category"
                  type="text"
                  placeholder="Nhập phân loại dịch vụ"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="ImageUpload">
                  Tải hình ảnh
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
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Price">
                  Giá dịch vụ (đ)
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="ServicePrice"
                  type="text"
                  placeholder="100,000"
                  value={formatCurrency(price)}
                  onChange={handlePriceChange}
                />
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Status">
                  Trạng thái
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Status"
                  type="text"
                  placeholder="Nhập trạng thái dịch vụ"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Description">
                  Mô tả
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Description"
                  placeholder="Nhập mô tả dịch vụ"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center w-full mb-4">
            <button
              onClick={handleSaveClick}
              className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceAdd;