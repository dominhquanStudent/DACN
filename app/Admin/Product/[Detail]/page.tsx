"use client";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";
function ProductDetail({ params }: { params: { Detail: string } }) {
  const productId = params.Detail;
  const [data, setData] = useState<any>({});
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchProductData = async (id: any) => {
      try {
        const response = await axios.get(`/product/${productId}`);
        const productData = response.data;
        setData(productData.product);
        // const log = await axios.post(`/test`, productData.product);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    if (productId) {
      fetchProductData(productId);
    }
  }, [productId]);

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
    console.log(file);
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
  const handleSaveClick = async (e: any) => {
    e.preventDefault();
    if (!data.name) {
      setError("LACK_PRODUCTNAME");
      return;
    }
    if (!data.brand) {
      setError("LACK_PRODUCTBRAND");
      return;
    }
    if (!data.stock) {
      setError("LACK_PRODUCTSTOCK");
      return;
    }
    if (!data.category) {
      setError("LACK_PRODUCTCATEGORY");
      return;
    }
    if (!data.price) {
      setError("LACK_PRODUCTPRICE");
      return;
    }
    if (!data.status) {
      setError("LACK_PRODUCTSTATUS");
      return;
    }
    if (!data.description) {
      setError("LACK_PRODUCTDESCRIPTION");
      return;
    }
    if (!data.image.url) {
      setError("LACK_PRODUCTIMAGE");
      return;
    }
    setLoadWhat("SEND_UPDATEPRODUCT_REQUEST");
    setIsLoading(true);

    try {
      const response = await axios.put(`/product/${productId}`, data);
      mutate(`/product/${productId}`);
      setIsLoading(false);
      setIsComplete(true);
      // router.push("/Admin/Product");
    } catch (error) {}
  };

  const handleChangeClick = async () => {
    setIsEditable(true);
    // const log = await axios.post(`/test`, data);
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
            Chi tiết sản phẩm
          </div>
          <form className="w-full mx-4" key={data._id}>
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="name">
                  Tên sản phẩm
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
                <label className="text-xs font-bold mb-2" htmlFor="brand">
                  Nhãn hiệu
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="brand"
                  type="text"
                  value={data.brand}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="discount">
                  Giảm giá
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="discount"
                  type="text"
                  value={data.discount}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
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
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="price">
                    Giá sản phẩm
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="price"
                    type="text"
                    value={data.price}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="quantity">
                    Số lượng
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="stock"
                    type="text"
                    value={data.stock}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="category">
                    Phân loại
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="category"
                    value={data.category}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  >
                    <option value="">Select Status</option>
                    <option value="Thức ăn thú cưng">Thức ăn thú cưng</option>
                    <option value="Phụ kiện & Đồ chơi">
                      Phụ kiện & Đồ chơi
                    </option>
                    <option value="Đồ dùng vệ sinh">Đồ dùng vệ sinh</option>
                    <option value="Nhà thú cưng">Nhà thú cưng</option>
                    <option value="Đồ dùng thú y">Đồ dùng thú y</option>
                  </select>
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="status">
                    Trạng thái
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="status"
                    value={data.status}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  >
                    <option value="">Select Status</option>
                    <option value="inactive">Private</option>
                    <option value="active">Public</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="description">
                  Mô tả
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  placeholder="Nhập mô tả sản phẩm"
                  value={data.description}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center w-full space-x-4">
            <button
              onClick={handleChangeClick}
              className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sửa
            </button>
            <button
              onClick={handleSaveClick}
              className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
