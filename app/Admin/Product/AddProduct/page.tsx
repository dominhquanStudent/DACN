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

function ProductAdd() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({ public_id: "", url: "" });

  ///////
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  //////

  const handleSaveClick = async () => {
    try {
      const data = {
        name,
        brand,
        stock,
        discount,
        category,
        price: Number(price.replace(/,/g, "")), // Convert formatted price to number
        description,
        image,
      };

      if (!name) {
        setError("LACK_PRODUCTNAME");
        return;
      }
      if (!brand) {
        setError("LACK_PRODUCTBRAND");
        return;
      }
      if (!stock) {
        setError("LACK_PRODUCTQUANTITY");
        return;
      }
      if (!category) {
        setError("LACK_PRODUCTCATEGORY");
        return;
      }
      if (!price) {
        setError("LACK_PRODUCTPRICE");
        return;
      }
      if (!discount) {
        setError("LACK_PRODUCTDISCOUNT");
        return;
      }

      if (!description) {
        setError("LACK_PRODUCTDESCRIPTION");
        return;
      }
      if (!image.url) {
        setError("LACK_PRODUCTIMAGE");
        return;
      }
      setLoadWhat("SEND_ADDPRODUCT_REQUEST");
      setIsLoading(true);
      const response = await axios.post("/product/add", data);
      setIsLoading(false);
      setIsComplete(true);
      // const response = await axios.post('/product/add', data);
    } catch (error) {
      toast.error("Error saving product!");
      console.error("Error saving product:", error);
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
      {/* //Header */}
      <Header></Header>
      <div className="flex w-full">
        <Sidebar></Sidebar>
        <div className="w-3/4 border-l-2 border-gray-200">
          {/* content */}
          <div
            className={
              "flex font-nunito text-xl font-bold w-full justify-center"
            }
          >
            Thêm sản phẩm
          </div>
          <form className="w-full mx-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="ProductName">
                  Tên sản phẩm
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="ProductName"
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="Brand">
                  Thương hiệu
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Brand"
                  type="text"
                  placeholder="Nhập tên thương hiệu"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
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
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Price">
                    Giá sản phẩm (đ)
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="ProductPrice"
                    type="text"
                    placeholder="100,000"
                    value={formatCurrency(price)}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Quantity">
                    Số lượng
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Quantity"
                    type="text"
                    placeholder="Nhập số lượng sản phẩm"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Discount">
                  Giảm giá (%)
                </label>
                <input
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="discount"
                  type="text"
                  placeholder="0"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Category">
                    Phân loại
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Chọn</option>
                    <option value="Thức ăn thú cưng">Thức ăn thú cưng</option>
                    <option value="Quần áo & Phụ kiện"> Quần áo & Phụ kiện</option>
                    <option value="Đồ chơi cho thú cưng">Đồ chơi cho thú cưng</option>
                    <option value="Đồ dùng tắm gội">Đồ dùng tắm gội</option>
                    <option value="Đồ dùng vệ sinh">Đồ dùng vệ sinh</option>
                    <option value="Nhà thú cưng">Nhà thú cưng</option>
                    <option value="Đồ dùng thú y">Đồ dùng thú y</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Description">
                  Mô tả
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Description"
                  placeholder="Nhập mô tả sản phẩm"
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

export default ProductAdd;