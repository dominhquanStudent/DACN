"use client";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import Product_Frame from "./Product_Frame";
import Momo from "@/public/img/Momo.png";
import axios from "@/api/axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import getInfo from "@/hooks/getInfo";

export default function Cart() {
  //get account data
  const jwt = getCookie("jwt");
  const [accountData, setAccountData] = useState("");
  const fetchData = async () => {
    const getaccountData = await getInfo();
     setAccountData(getaccountData); 
     
   };
   //get account data upon access
    useEffect(() => {
      if(jwt){fetchData();}
    }, []);
    const AccountID=accountData._id;
    //get cart data
    const [cartData, setCartData] = useState({
      "cart": {
          "_id": "",
          "user_id": "",
          "product_list": [],
          "createdAt": "2024-09-14T12:22:23.395Z",
          "updatedAt": "2024-09-29T17:01:07.043Z",
          "__v": 5
      }
  });
    const fetchCartData = async () => {
      const response = await axios.get(`/cart/${accountData._id}`);
 
      setCartData(response.data);
      
    };
    useEffect(() => {
      if (accountData) {
        fetchCartData();
      }
    }, [accountData]);
    //caculate total price
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
      const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => {
          return total + (product.discount_price * product.quantity);
        }, 0);
      };
  
      const total = calculateTotalPrice(cartData.cart.product_list);
      setTotalPrice(total);
    }, [cartData.cart.product_list]);
    console.log("Cart Data:", cartData.cart.product_list);
  return (
    <>
      <Header></Header>
      <section class=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        {/* Whole cart */}
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div class="grid grid-cols-12">
            {/* Left side */}
            <div class="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div class="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 class="font-manrope font-bold text-3xl leading-10 text-black">
                  Giỏ Hàng
                </h2>
                <h2 class="font-manrope font-bold text-xl leading-8 text-gray-600">
                  {cartData.cart.product_list.length} sản phẩm
                </h2>
              </div>
              <div class="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div class="col-span-12 md:col-span-7">
                  <p class="font-normal text-lg leading-8 text-gray-400">
                    Thông tin sản phẩm
                  </p>
                </div>
                <div class="col-span-12 md:col-span-5">
                  <div class="grid grid-cols-5">
                    <div class="col-span-3">
                      <p class="font-normal text-lg leading-8 text-gray-400 text-center">
                        Số lượng
                      </p>
                    </div>
                    <div class="col-span-2">
                      <p class="font-normal text-lg leading-8 text-gray-400 text-center">
                        Tổng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {cartData && cartData.cart && cartData.cart.product_list.map((product, index) => (
                <Product_Frame key={index} product={product} AccountID={AccountID}/>
              ))}
            </div>
            {/* Right side */}
            <div class=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
              <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Thanh toán
              </h2>

              {/* Payment method */}
              <div class="mt-4 mb-4">
                <p class="font-normal text-lg leading-8 text-black">
                  Hình thức thanh toán
                </p>
                <div class="mt-4">
                  <label class="block">
                    <input
                      type="radio"
                      name="payment"
                      value="on_delivery"
                      class="mr-2 leading-tight"
                    />
                    <span class="text-base">Thanh toán khi nhận hàng</span>
                  </label>
                  <label class=" mt-2 flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="momo"
                      class="mr-2 leading-tight"
                    />
                    <img src={Momo.src} alt="Momo" class="text-base" />
                  </label>
                </div>
              </div>
              {/* Discount Coupon */}
              <div class=" border-gray-300 border-t-2">
                <p class="font-normal text-lg leading-8 text-black ">
                  Mã giảm giá
                </p>
                <div class="mt-2 flex ">
                  <input
                    type="text"
                    name="redemption_code"
                    class="mr-2 flex-grow border-gray-300 p-2 rounded-md"
                    placeholder="Enter code"
                  />
                  <button
                    class="middle none center mr-4 rounded-lg bg-blue-500 py-2 px-4 font-sans text-xs font-bold 
                        uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 
                        focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                        disabled:opacity-50 disabled:shadow-none"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
              {/* Total */}
              <div class="mt-4">
                <div class="flex justify-between">
                  <p class="font-normal text-lg leading-8 text-black">
                    Tổng Đơn hàng
                  </p>
                  <p class="font-normal text-lg leading-8 text-black">
                    {totalPrice}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="font-normal text-lg leading-8 text-black">
                    Giảm giá
                  </p>
                  <p class="font-normal text-lg leading-8 text-black">
                    -36.000đ
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="font-normal text-lg leading-8 text-black">
                    Phí vận chuyển
                  </p>
                  <p class="font-normal text-lg leading-8 text-black">0đ</p>
                </div>
                {/* total price */}
                <div class="flex justify-between mt-4">
                  <p class="font-normal text-lg leading-8 text-black">
                    Tổng cộng
                  </p>
                  <p class="font-normal text-lg leading-8 text-black">
                    364.000đ
                  </p>
                </div>
                {/* Purchase button */}
                <div class="mt-4 border-t border-gray-300 pt-4">
                  <button class="w-full bg-blue-500 text-white p-2 rounded-md">
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}
