"use client";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";

interface Service {
  name: string;
  category: string;
  price: number;
  description: string;
  status: string;
  image: {
    public_id: [string];
    url: [string];
  };
}

function ServiceDetail({ params }: { params: { Detail: string } }) {
  const serviceId = params.Detail;
  const [data, setData] = useState<Service>({
    name: "",
    category: "",
    price: 0,
    description: "",
    status: "",
    image: { public_id: [""], url: [""] },
  });
  const [price, setPrice] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchServiceData = async (id: any) => {
      try {
        const response = await axios.get(`/service/${serviceId}`);
        const serviceData = response.data;
        setData(serviceData.service);
        setPrice(serviceData.service.price.toString());
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };
    if (serviceId) {
      fetchServiceData(serviceId);
    }
  }, [serviceId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const numberValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    return new Intl.NumberFormat("vi-VN").format(Number(numberValue));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numberValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    setPrice(numberValue);
    setData((prevData) => ({
      ...prevData,
      price: Number(numberValue),
    }));
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData((prevData) => ({
        ...prevData,
        image: { public_id: ["null"], url: [reader.result as string] },
      }));
    };
  };

  const handleSaveClick = async (e: any) => {
    e.preventDefault();
    if (!data.name) {
      setError("LACK_SERVICENAME");
      return;
    }
    if (!data.category) {
      setError("LACK_SERVICECATEGORY");
      return;
    }
    if (!data.price) {
      setError("LACK_SERVICEPRICE");
      return;
    }
    if (!data.status) {
      setError("LACK_SERVICESTATUS");
      return;
    }
    if (!data.description) {
      setError("LACK_SERVICEDESCRIPTION");
      return;
    }
    if (!data.image.url[0]) {
      setError("LACK_SERVICEIMAGE");
      return;
    }
    setLoadWhat("SEND_UPDATESERVICE_REQUEST");
    setIsLoading(true);

    try {
      const response = await axios.put(`/service/${serviceId}`, data);
      mutate(`/service/${serviceId}`);
      setIsLoading(false);
      setIsComplete(true);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleChangeClick = async () => {
    setIsEditable(true);
    setShowButton(true);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

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
          <div
            className={
              "flex font-nunito text-xl font-bold w-full justify-center"
            }
          >
            Chi tiết dịch vụ
          </div>
          <form className="w-full mx-4" key={serviceId}>
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="name">
                  Tên dịch vụ
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="category">
                  Phân loại
                </label>

                <select
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="category"
                  value={data.category}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                >
                  <option value="">Chọn phân loại dịch vụ</option>
                  <option value="Sức khỏe">Kiểm tra sức khỏe</option>
                  <option value="Spa">Spa và Glooming</option>
                </select>
              </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="image">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImage}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  disabled={!isEditable}
                />
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="price">
                  Giá dịch vụ (đ)
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="price"
                  type="text"
                  value={formatCurrency(price)}
                  onChange={handlePriceChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="status">
                  Trạng thái
                </label>
                <select
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="status"
                  value={data.status}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="description">
                  Mô tả
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  placeholder="Nhập mô tả dịch vụ"
                  value={data.description}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center w-full space-x-4 mb-4">
            <button
              onClick={() => router.push("/Admin/Service")}
              className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-3xl"
            >
              Quay lại
            </button>
            {!showButton && (
              <button
                onClick={handleChangeClick}
                className="bg-yellow-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded-3xl"
              >
                Sửa
              </button>
            )}
            {showButton && (
              <button
                onClick={handleSaveClick}
                className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
              >
                Lưu
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;