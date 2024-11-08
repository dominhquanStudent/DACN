"use client";
import React from "react";
import Header from "@/app/Component/Header/Header";
import { mutate } from "swr";
import Foto from "@/public/img/Product_Main/foto.png";
import { useState, useEffect, useCallback } from "react";
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
  const router = useRouter();
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
  const [data, setData] = useState<any>({
    name: "",
    description: "",
    price: 0,
    image: { url: [""] },
    rating: 0,
  });
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const [topRatedProductsSimilar, setTopRatedProductsSimilar] = useState<any[]>(
    []
  );

  // Pagination state for comments
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  // Calculate the comments to display on the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = reviews.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

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
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
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
        setPrice(productData.product.price);

        // Fetch similar products
        const similarResponse = await axios.get(`${baseURL}/product/list`);
        const similarProducts = similarResponse.data.products.filter(
          (product: any) =>
            product.category === productData.product.category &&
            product._id !== productId
        );
        setSimilarProducts(similarProducts);
        const topRatedProductsSimilar = similarProducts
          .sort((a: any, b: any) => b.rating - a.rating)
          .slice(0, 5);
        setTopRatedProductsSimilar(topRatedProductsSimilar);
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
      if (jwt) {
        fetchData();
      }
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
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
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
    } else if (!selectedRating) {
      setError("EMPTY RATING");
      return;
    } else if (!accountData) {
      setError("NOT_LOGGED_IN_COMMENT");
      return;
    }
    //check if user already rated
    const userAlreadyRated = reviews.some(
      (review) => review.user_id === accountData._id
    );
    if (userAlreadyRated) {
      setError("USER_ALREADY_RATED");
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
      setReviews([newReview, ...reviews]);
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
  const [price, setPrice] = useState(0);
  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(price);
  };

  const handleAmountChange = (Amount: number) => {
    if (Amount > 0 && Amount <= data.stock) {
      setAmount(Amount);
      setTotalPrice(Amount * data.discount_price);
      setPrice(Amount * data.price);
    }
    else if (Amount > data.stock) {
      setAmount(data.stock);
  };
}

  //handle add to cart
  const [cartData, setCartData] = useState({
    cart: {
      _id: "",
      user_id: "",
      product_list: [],
      createdAt: "2024-09-14T12:22:23.395Z",
      updatedAt: "2024-09-29T17:01:07.043Z",
      __v: 5,
    },
  });
  const [currentCartAmount, setCurrentCartAmount] = useState(0);

  const fetchCartData = async () => {
    const response = await axios.get(`/cart`);
    const productIndex = response.data.cart.product_list.findIndex(
      (product: any) => product.product_id === productId
    );
    setCartData(response.data);
    setCurrentCartAmount(
      productIndex === -1
        ? 0
        : response.data.cart.product_list[productIndex].quantity
    );
  };
  useEffect(() => {
    if (jwt) {
      fetchCartData();
    }
  }, [jwt]);

  const handleAddToCart = useCallback(
    async (e: any) => {
      e.preventDefault();

      // Check if the product is already in the cart and if the quantity exceeds the stock
      if (
        cartData.cart.product_list.some(
          (product: any) =>
            product.product_id === productId &&
            amount + currentCartAmount > data.stock
        )
      ) {
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
        const response = await axios.post(
          `${baseURL}/cart/addProduct`,
          cartItem
        );

        console.log("Response data:", response.data);
        console.log(
          "Response data cart product list:",
          response.data.cart.product_list
        );

        // Find product with the same product_id
        const productIndex = response.data.cart.product_list.findIndex(
          (product: any) => product.product_id === productId
        );

        console.log("Product index:", productIndex);

        // Update its quantity in currentCartAmount
        const newCartAmount =
          productIndex === -1
            ? amount
            : response.data.cart.product_list[productIndex].quantity;

        // Log the new cart amount directly from the response
        console.log("New cart amount:", newCartAmount);

        // Update the state with the new cart amount
        setCurrentCartAmount(newCartAmount);

        // Log the state value after setting it (this will show the previous state value due to async nature)
        console.log("Current cart amount (state):", currentCartAmount);

        setIsComplete(true);
        mutate("/cart");

        // Fetch the cart data again after adding to cart
        fetchCartData();
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cartData, currentCartAmount, amount, data.stock, accountData, productId]
  );
  return (
    <>
      <Header />
      <ErrorModal error={error} setError={setError} />
      <LoadingModal
        isLoading={isLoading}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
        loadWhat={loadWhat}
      />
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="grid grid-cols-4 gap-4 font-montserrat ">
          {/* Left column */}
          <div className="col-span-3">
            {/* Product details */}
            <div className="flex border-b-2 mb-4 ">
              <img
                loading="lazy"
                src={data.image.url[0]}
                alt="Product"
                className="ml-20 mr-8 mb-16 w-80 h-80 "
              />
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">{data.name}</h2>
                <div className="mb-2 text-gray-500">{data.category}</div>

                <div className="mb-4 text-[#f79a36] text-xl">{data.brand}</div>


                <div className="flex">
                  {/* Replace with your star rating component */}
                  {productRating.toFixed(1)}&nbsp;
                  <RenderStars rating={productRating}></RenderStars>
                  <span className="text-yellow-500 text-ellipsis ml-4">|</span>
                  <div className="text-yellow-500 text-ellipsis ml-4">
                    Lượt đánh giá: {ratingTimes}
                  </div>
                </div>
                <div className="text-gray-500 mb-2">
                  Còn lại: {data.stock} sản phẩm
                </div>

                <p className="mt-6">{data.description}</p>
              </div>
            </div>
          </div>
          {/* Right column */}
          <div className="col-span-1 p-8 justify-between">
            {/* Volume */}
            <div className="font-light mb-4">Số lượng</div>
            <div className="flex items-center max-[500px]:justify-center max-md:mt-3">
              <div className="flex items-center h-full">
                <button
                  className="group rounded-l-md px-3 py-2 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                  onClick={() => handleAmountChange(amount - 1)}
                >
                  <svg
                    className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(parseInt(e.target.value))}
                  min="1"
                  max={data.stock}
                  className="border-y border-gray-200 outline-none text-gray-900 font-semibold   max-w-[60px] min-w-[50px] placeholder:text-gray-900 py-2 text-center bg-transparent"
                  placeholder="1"
                />
                <button
                  className="group rounded-r-md px-3 py-2 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                  onClick={() => handleAmountChange(amount + 1)}
                >
                  <svg
                    className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke=""
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Price and buy button */}
            <div className="mt-4">
              <table className="min-w-full divide-y">
                <tbody className="bg-white divide-y ">
                  <tr>
                    
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Tổng tiền
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-end w-50">
                          <span className="text-xs underline">đ</span> {formatPrice(price)}
                        </td>
                    
                  </tr>
                  <tr>
                    {price !== totalPrice && (
                      <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Giảm giá
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 text-end w-50">
                      -<span className="text-xs underline">đ</span>{" "}
                        {formatPrice(Math.floor((data.discount * price) / 100))}
                    </td>
                    </>
                    )}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Tạm tính
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-bold text-sm text-end w-50">
                      <span className="text-xs underline">đ</span>{" "}
                      {formatPrice(totalPrice)}
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <p className="text-red-500 line-through mb-3">60.000đ</p> */}
              {data.status === "inactive" || data.stock === 0 ? (
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
                  className="w-9/12 rounded-md bg-yellow-500 py-2 px-6 font-kd2 text-xs font-bold 
                          uppercase text-white shadow-md shadow-yellow-500/20 transition-all hover:shadow-lg hover:shadow-yellow-500/40 
                          focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                          disabled:opacity-50 disabled:shadow-none mt-8 justify-center"
                  data-ripple-light="true"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="flex-row grid-row items-center justify-center p-8">
          <h2 className="font-montserrat text-2xl font-semibold ml-16 ">
            Sản phẩm tương tự
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 ml-8 mr-8">
            {topRatedProductsSimilar.map((product) => (
              <div
                key={product._id}
                className="flex flex-col rounded-lg overflow-hidden max-w-full h-70 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg active:scale-95 border-[#EDB24E] 
                  p-4 border-2 mt-4 mb-2 ml-1 mr-1 cursor-pointer"
                onClick={() => router.push(`/Product_Info/${product._id}`)}
              >
                {/* Product Image */}
                <div className="w-full h-36 flex justify-center  items-start">
                  <img
                    src={product.image.url || Foto}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-2 flex flex-col justify-between flex-grow">
                  {/* Product Name */}
                  <h2
                    className="font-nunito text-sm mb-1 line-clamp-2 product-name min-h-[2rem]"
                    style={{ whiteSpace: "pre-wrap" }} // Ensure the height is enough for 2 lines
                  >
                    {product.name}
                  </h2>

                  {/* Product Brand */}
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extralight text-xs text-[#f79a36]">
                      {product.brand}
                    </span>
                  </div>

  

                  <div className="flex justify-between items-center mt-2">
                    {/* Rating */}
                    <div className="flex">
                      {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                          <FaStar
                            key={i}
                            color={
                              ratingValue <= product.rating ? "yellow" : "gray"
                            }
                            size={20}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Price */}
                  <div className={`flex justify-between mt-3`}>
                    <span className="text-sm font-semibold">
                      <span className="text-xs underline">đ</span>{" "}
                      {formatPrice(product.discount_price)}
                    </span>
                    {product.discount_price !== product.price && (
                      <span className="text-sm font-semibold text-red-500 line-through ml-2">
                        <span className="text-xs underline">đ</span>{" "}
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment box */}
        <div className="flex flex-col justify-items-center ml-24">
          <hr className="border-t-2 border-gray-300 my-4" />

          <div className="mt-4 border-b-2  w-full ">
            <div className="w-full flex items-center text-lg font-semibold mb-2">
              <span className="mr-8"> Đánh giá sản phẩm </span>
              <StarRating handleRatingChange={handleRatingChange} />
            </div>
            <textarea
              className="w-full h-24 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Nhập bình luận"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="flex justify-center">
              <button
                className="w-1/4 rounded-md bg-yellow-500 py-2 px-6 font-kd2 text-xs font-bold 
              uppercase text-white shadow-md shadow-yellow-500/20 transition-all hover:shadow-lg hover:shadow-yellow-500/40 
              focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
              disabled:opacity-50 disabled:shadow-none mb-4 mt-4"
                data-ripple-light="true"
                onClick={handleSubmit}
              >
                Gửi
              </button>
            </div>
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
                onClick={() =>
                  typeof pageNumber === "number" && handlePageChange(pageNumber)
                }
                className={`px-3 py-1 mx-1 ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                disabled={typeof pageNumber !== "number"}
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
      </div>

      <Footer />
    </>
  );
}
