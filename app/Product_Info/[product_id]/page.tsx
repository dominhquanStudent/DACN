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
  const [data, setData] = useState<any>({ "name": "", "description": "", "price": 0, "image": { "url": [""] }, "rating": 0 });
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  // Pagination state for comments
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  // Calculate the comments to display on the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = reviews.slice(indexOfFirstComment, indexOfLastComment);

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / commentsPerPage);

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

  //get comments from server
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get(`${baseURL}/product/${productId}`);
        const productData = response.data;
        setData(productData.product);
        setTotalPrice(productData.product.discount_price);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    const fetchReviews = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get(`${baseURL}/review/${productId}`);
        setReviews(response.data.review);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
      if (jwt) { fetchData(); }
    };
    if (productId) {
      fetchReviews();
      fetchProductData();
    }
  }, [productId]);

  //Automatically update current product rating
  const [ratingTimes, setRatingTimes] = useState<number>(0);
  const [productRating, setProductRating] = useState<number>(0);
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
      };
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.post(`${baseURL}/review/add`, reviewInfo);
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
  const formatPrice = (price:any) => {
    return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(price);
  };

  const handleAmountChange = (Amount: number) => {
    if (Amount > 0 && Amount <= data.stock) {
      setAmount(Amount);
      setTotalPrice(Amount * data.discount_price);
    }
  };

  //handle add to cart
  const [cartData, setCartData] = useState({
    cart: {
      _id: "",
      user_id: "",
      product_list: [],
      createdAt: "2024-09-14T12:22:23.395Z",
      updatedAt: "2024-09-29T17:01:07.043Z",
      __v: 5
    }
  });
  const fetchCartData = async () => {
    const response = await axios.get(`/cart`);
    setCartData(response.data);
  };
  useEffect(() => {
    if (jwt) {
      fetchCartData();
    }
  }, [jwt]);

  const handleAddToCart = async (e: any) => {
    e.preventDefault();
    
    // if there is a product with the same id and its quantity is equal to the amount, return
     if (cartData.cart.product_list.some((product: any) => product.product_id === productId && product.quantity+amount >= data.stock)) {
      setError("MAX_QUANTITY_ALLOWED");
      return;
    }
    
    if (!accountData) {
      setError("NOT_LOGGED_IN_CART");
      return;
    }
    setIsLoading(true);
    setLoadWhat("ADD_TO_CART");
    try {
      const cartItem = {
        user_id: accountData._id, // Replace with actual user ID
        product_id: productId,
        quantity: amount,
      };
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.post(`${baseURL}/cart/addProduct`, cartItem);
      setIsComplete(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
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
                <div className="text-yellow-400 mb-2 ml-3">
                  Lượt đánh giá {ratingTimes}
                </div>
              </div>
              <div className="text-gray-500 mb-2">Còn lại: {data.stock} sản phẩm</div>

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
          {currentComments.map((review) => (
            <Comment
              key={review._id}
              user_name={review.user_name}
              rating={review.rating}
              content={review.content}
              createdAt={review.createdAt}
              avatar={review.user_avatar}
              accountData={accountData}
            />
          ))}

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
                  <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6"
                    strokeLinecap="round" />
                  <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                    strokeLinecap="round" />
                  <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                    strokeLinecap="round" />
                </svg>
              </button>
              <input type="number" value={amount} onChange={(e) => handleAmountChange(parseInt(e.target.value))} min="1" max={data.stock}
                className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                placeholder="1" />
              <button
                className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300" onClick={() => handleAmountChange(amount + 1)}>
                <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                  xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                  viewBox="0 0 22 22" fill="none">
                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                    strokeLinecap="round" />
                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                    strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                    strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Price and buy button */}
          <div className="mt-4">
            <div className="flex items-center">
              <p className="text-2xl "><span className="text-base underline" >đ</span> {formatPrice(totalPrice)}</p>
              {/* <div className="bg-blue-500 text-white px-2 py-1 ml-2 font-bold">
                40% off
              </div> */}
            </div>
            {/* <p className="text-red-500 line-through mb-3">60.000đ</p> */}
            {(data.status === "inactive" || data.stock===0) ? (
              <button
                className="w-9/12 rounded-md bg-gray-500 py-2 px-6 font-kd2 text-xs font-bold 
                          uppercase text-white shadow-md shadow-gray-500/20 transition-all 
                          cursor-not-allowed opacity-50"
                disabled
              >
                Sản phẩm tạm hết hàng
              </button>
            ) : (
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
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}