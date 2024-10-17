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
import RenderStars from "@/app/Product_Info/[product_id]/renderStars";
import LoadingModal from "@/app/Component/Loading";
import ErrorModal from "@/app/Component/Error";
export default function ProductDetailPage({
  params,
}: {
  params: { product_id: string };
}) {
  //Handle loading and complete
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  //get account data
  const jwt = getCookie("jwt");
  const [accountData, setAccountData] = useState<any>(null);

  const fetchData = async () => {
   const getaccountData = await getInfo();
    setAccountData(getaccountData);
    
  };
  
  
  const productId = params.product_id;
  const [data, setData] = useState<any>({"name":"", "description":"", "price":0, "image":{"url":[""]}, "rating":0});
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
        setTotalPrice(productData.product.discount_price);
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
    //Automatically update current product rating
    const [ratingTimes, setRatingTimes] = useState<number >(0);
    const [productRating, setProductRating] = useState<number >(0);
    useEffect(() => {
      
      const calculateAverageRating = () => {
          if (reviews.length === 0) return 0;
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          return totalRating / reviews.length;
      };
      const averageRating = calculateAverageRating();
      setProductRating(averageRating);
      setRatingTimes(reviews.length);
      
      
  }, [reviews]);


  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };


  //Error handling for empty comment and rating
  
    ///////post review to db
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("EMPTY COMMENT");
      return;
    }
    else if (!selectedRating) {
      setError("EMPTY RATING");
      return;
      
    }
    else if (!accountData) {
      setError("NOT_LOGGED_IN_COMMENT");
      return;
    }
    setIsLoading(true);
    setLoadWhat("ADD_COMMENT");
     try {
      const reviewInfo = {
        user_id: accountData._id, // Replace with actual user ID
        user_name: accountData.userName, // Replace with actual user name
        product_id: productId, // Replace with actual product ID
        rating: selectedRating,
        content: comment,
        image: [], // Add image URLs if any
        user_avatar: accountData.avatar.url,
      };
      
      const response = await axios.post('/review/add', reviewInfo);
      const newReview = {
        ...response.data.review,
        user_name: accountData.userName, // Ensure user name is included
      };
      setReviews([...reviews, newReview]);
      setIsComplete(true);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  //handle amount and total price of product

  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleAmountChange = (Amount: number) => {

    if (Amount > 0) {
      setAmount(Amount);
      setTotalPrice(Amount * data.discount_price);
    }
  };
  //handle add to cart
  
  const handleAddToCart = async(e: any) => {
    e.preventDefault();
    if (!accountData) {
      setError("NOT_LOGGED_IN_CART");
      return;}
    setIsLoading(true);
    setLoadWhat("ADD_TO_CART");
    try {
      const cartItem = {
        user_id: accountData._id, // Replace with actual user ID
        product_id: productId,
        quantity: amount,
       
      };
      const response = await axios.post('/cart/addProduct', cartItem);
    
      setIsComplete(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }finally {
      setIsLoading(false);
    }
      
  };
  return (
    <>
      <Header />
      <ErrorModal error={error} setError={setError} />
      <LoadingModal isLoading={isLoading} isComplete={isComplete} setIsComplete={setIsComplete} loadWhat={loadWhat} />
      <div className="grid grid-cols-4 gap-4 font-montserrat ">
        {/* Left column */}
        <div className="col-span-3">
          {/* Product details */}
          <div className="flex border-b-2 mb-4">
            <img loading="lazy" src={data.image.url[0]} alt="Product" className="ml-32 mr-8 mb-16 w-40 h-40 rounded-full" />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <div className="flex">
                {/* Replace with your star rating component */}
                <RenderStars rating={productRating}></RenderStars>
                <div className="text-yellow-400 mb-8 ml-3">
                  Lượt đánh giá {ratingTimes}
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
          <div className="font-light mb-3">Số lượng</div>
          <div className="flex items-center max-[500px]:justify-center  max-md:mt-3">
                <div className="flex items-center h-full">
                    <button
                        className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300" onClick={() => handleAmountChange(amount - 1)}>
                        <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                            xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                            viewBox="0 0 22 22" fill="none">
                            <path d="M16.5 11H5.5" stroke="" stroke-width="1.6"
                                stroke-linecap="round" />
                            <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                stroke-linecap="round" />
                            <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                stroke-linecap="round" />
                        </svg>
                    </button>
                    <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} min="1"
                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                        placeholder="1"/>
                    <button
                        className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300" onClick={() => handleAmountChange(amount + 1)}>
                        <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                            xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                            viewBox="0 0 22 22" fill="none">
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                                stroke-linecap="round" />
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                stroke-width="1.6" stroke-linecap="round" />
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
            </div>

          {/* Price and buy button */}
          <div className="mt-4">
            <div className="flex items-center">
              <p className="text-2xl ">{totalPrice}đ</p>
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
              onClick={handleAddToCart}
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
