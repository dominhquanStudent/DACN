"use client";
import React from "react";
import Header from "@/app/Component/Header/Header";
import Foto from "@/public/img/Product_Main/foto.png";
import { useState, useEffect } from "react";
import StarRating from "@/app/Component/Product_Intro/Product/star_rating";
import Comment from "@/app/Component/Product_Intro/Product_Info/comment";
import Footer from "@/app/Component/Footer/Footer";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";
import { FaStar } from "react-icons/fa";
import { getCookie } from "cookies-next";
import getInfo from "@/hooks/getInfo";
export default function ProductDetailPage({
  params,
}: {
  params: { product_id: string };
}) {
  //get account data
  const jwt = getCookie("jwt");
  const [accountData, setAccountData] = useState<any>(null);
  const fetchData = async () => {
    
   const getaccountData = await getInfo();
   console.log(getaccountData);
    setAccountData(getaccountData);
    
  };
  
  
  const productId = params.product_id;
  const [data, setData] = useState<any>({});
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  //get comments from server

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        
        const response = await axios.get(`/product/${productId}`);
        const productData = response.data;
        setData(productData.product);
        const log = await axios.post(`/test`, productData.product);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    const fetchReviews = async () => {
      try {
        
        const response = await axios.get(`/review/${productId}`);
        setReviews(response.data.review);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
      if(jwt){fetchData();}
    };
    if (productId) {
      fetchReviews();
      fetchProductData();
    }
  }, [productId]);
  

  const handleButtonClick = (volume: any) => {
    setSelectedVolume(volume);
  };
  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };


  //Error handling for empty comment and rating
  const [error, setError] = useState<string | null>(null);
    ///////post review to db
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("EMPTY COMMENT");
      
    }
    else if (!selectedRating) {
      setError("EMPTY RATING");
      
    }
    else try {
      const reviewInfo = {
        user_id: accountData._id, // Replace with actual user ID
        user_name: accountData.userName, // Replace with actual user name
        product_id: productId, // Replace with actual product ID
        rating: selectedRating,
        content: comment,
        image: [], // Add image URLs if any
      };
      const response = await axios.post('/review/add', reviewInfo);
      console.log("Review submitted:", response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
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
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <div className="flex">
                {/* Replace with your star rating component */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < data.rating ? "yellow" : "gray"}
                      size={20}
                    />
                  ))}
                </div>
                <div className="text-yellow-400 mb-8 ml-3">
                  Lượt đánh giá (340)
                </div>
              </div>
              <p className="">{data.description}</p>
            </div>
          </div>

          {/* Comment box */}

    
            <div className="mt-4 flex flex-col items-end border-b-2 ">
              <div className="w-11/12 flex items-center text-lg font-semibold ">
                Đánh giá sản phẩm <StarRating handleRatingChange={handleRatingChange} />
              </div>
              <textarea
                className="w-11/12 h-20 border border-gray-300 rounded mb-3"
                placeholder="Nhập bình luận"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              {error && (
                <div className="text-red-500 w-11/12">
                  {error === "EMPTY COMMENT" ? "Ủa vào review rồi k nhập review là sao vậy má ?" : error === "EMPTY RATING" ? "Ủa review mà không có đánh giá * thì có ý nghĩa gì k má ?" : error}
                </div>
              )}
              <button
                className="w-2/12 rounded-md bg-blue-500 py-2 px-6 font-kd2 text-xs font-bold 
                    uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 
                    focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                    disabled:opacity-50 disabled:shadow-none mb-4"
                data-ripple-light="true"
                onClick={handleSubmit}
              >
                Gửi
              </button>
            </div>
          

          {/* Comments */}
          {reviews.map((review) => (
            <Comment
              key={review._id}
              user_name={review.user_name}
              rating={review.rating}
              content={review.content}
              createdAt={review.createdAt}
            />
          ))}
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
              <p className="text-2xl ">{data.price}đ</p>
              {/* <div className="bg-blue-500 text-white px-2 py-1 ml-2 font-bold">
                40% off
              </div> */}
            </div>
            {/* <p className="text-red-500 line-through mb-3">60.000đ</p> */}
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
      <Footer />
    </>
  );
}