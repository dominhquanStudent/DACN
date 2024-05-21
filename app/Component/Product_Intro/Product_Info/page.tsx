"use client";
import React from "react";
import Header from "../../Header/Header";
import Foto from "../../../../public/img/Product_Main/foto.png";
import { useState } from "react";
import StarRating from "../Product/star_rating";
import Comment from "./comment";
export default function ProductDetailPage() {
  const [selectedVolume, setSelectedVolume] = useState(null);

  const handleButtonClick = (volume: any) => {
    setSelectedVolume(volume);
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-4 gap-4 font-montserrat ">
        {/* Left column */}
        <div className="col-span-3">
          {/* Product details */}
          <div className="flex border-b-2 mb-4">
            <img src={Foto.src} alt="Product" className="ml-32 mr-8 mb-16" />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">
                Cát vệ sinh cho mèo Me-O hương táo
              </h2>
              <div className="flex">
                {/* Replace with your star rating component */}
                <span>⭐⭐⭐⭐⭐</span>
                <div className="text-yellow-400 mb-8">Lượt đánh giá (340)</div>
              </div>
              <p className="">
                This is a detailed description of the product. It includes
                information about the product's features, benefits, and usage
                instructions.
              </p>
              <p className="">
                This is a detailed description of the product. It includes
                information about the product's features, benefits, and usage
                instructions.
              </p>
            </div>
          </div>

          {/* Comment box */}

          <div className="mt-4 flex flex-col items-end border-b-2 ">
            <div className="w-11/12 flex items-center text-lg font-semibold ">
              Đánh giá sản phẩm {<StarRating />}
            </div>
            <textarea
              className="w-11/12 h-20 border border-gray-300 rounded mb-3"
              placeholder="Nhập bình luận"
            ></textarea>
            <button
              className="w-2/12 rounded-md bg-blue-500 py-2 px-6 font-kd2 text-xs font-bold 
                        uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 
                        focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                        disabled:opacity-50 disabled:shadow-none mb-4"
              data-ripple-light="true"
            >
              Gửi
            </button>
          </div>

          {/* Comments */}
          <Comment />
          <Comment />
        </div>

        {/* Right column */}
        <div className="col-span-1">
          {/* Volume */}
          <div className="font-light mb-3">Dung Tích</div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleButtonClick("100ml")}
              className={`border-2 border-blue-300 transform transition duration-150 ease-in-out px-4 py-2 rounded shadow ${
                selectedVolume === "100ml"
                  ? " scale-110 bg-blue-100"
                  : "hover:scale-110 hover:bg-blue-100"
              }`}
            >
              100ml
            </button>
            <button
              onClick={() => handleButtonClick("200ml")}
              className={`border-2 border-blue-300 transform transition duration-150 ease-in-out px-4 py-2 rounded shadow ${
                selectedVolume === "200ml"
                  ? "  scale-110 bg-blue-100"
                  : "hover:scale-110 hover:bg-blue-100"
              }`}
            >
              200ml
            </button>
            <button
              onClick={() => handleButtonClick("300ml")}
              className={`border-2 border-blue-300 transform transition duration-150 ease-in-out px-4 py-2 rounded shadow ${
                selectedVolume === "300ml"
                  ? "  scale-110 bg-blue-100"
                  : "hover:scale-110 hover:bg-blue-100"
              }`}
            >
              300ml
            </button>
          </div>

          {/* Price and buy button */}
          <div className="mt-4">
            <div className="flex items-center">
              <p className="text-2xl ">38.000đ</p>
              <div className="bg-blue-500 text-white px-2 py-1 ml-2 font-bold">
                40% off
              </div>
            </div>
            <p className="text-red-500 line-through mb-3">60.000đ</p>
            <button
              className="w-9/12 rounded-md bg-blue-500 py-2 px-6 font-kd2 text-xs font-bold 
                        uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 
                        focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                        disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
