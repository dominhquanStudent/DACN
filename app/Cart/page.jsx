"use client";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import Product_Frame from "./Product_Frame";
import Momo from "@/public/img/Momo.png";
import axios from "@/api/axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import getInfo from "@/hooks/getInfo";
import _ from 'lodash'; // Import lodash for debouncing

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
    const calculateTotalPrice = (products) => {
      fetchCartData();
      if (!Array.isArray(products)) {
        return 0; // Return 0 if products is not an array
      }
      return products
        .filter(product => product.selected)
        .reduce((total, product) => {
          return total + (product.discount_price * product.quantity);
        }, 0);
    };
    useEffect(() => {

      const debouncedCalculateTotalPrice = _.debounce((products) => {
        const total = calculateTotalPrice(products);
        setTotalPrice(total);
        setTotalPriceafterDiscount(total);
      }, 500); // Adjust the debounce delay as needed
    
      if (cartData.cart && cartData.cart.product_list) {
        debouncedCalculateTotalPrice(cartData.cart.product_list);
      }
    
      // Cleanup function to cancel the debounce if the component unmounts
      return () => {
        debouncedCalculateTotalPrice.cancel();
      };
    }, [cartData]);
    //console.log("Cart Data:", cartData.cart.product_list);

    //apply voucher
    const [voucher, setVoucher] = useState("");
    const [voucherInfo, setVoucherInfo] = useState("");
    const [discount, setDiscount] = useState(0);
    const [alreadyApplied, setAlreadyApplied] = useState(false);
    const [voucherError, setVoucherError] = useState("");
    const [totalPriceafterDiscount, setTotalPriceafterDiscount] = useState(0);
    const handleApplyVoucher = async () => {
          if (alreadyApplied) {
            console.log("Voucher already applied");
            setVoucherError("ALREADY_APPLIED");
            return;
          }
          if (voucher === "") {
            setVoucherError("EMPTY");
            return;
          }
      try {
        const response = await axios.get(`/voucher/code/${voucher}`);
        const voucherData = response.data.voucher;
        setVoucherInfo(voucherData);
    
        if (voucherData.discount_type === "Giảm theo phần trăm") {
          if (totalPrice >= voucherData.discount_value.min_require) {
            console.log("Total price meets the minimum requirement for the voucher.");
            let discountValue = Math.floor(totalPrice * voucherData.discount_value.value / 100);
    
            if (discountValue > voucherData.discount_value.max_discount) {
              discountValue = voucherData.discount_value.max_discount;
            }
    
            setDiscount(discountValue);
            setTotalPriceafterDiscount(totalPrice - discountValue);
          } else {
            setVoucherError("MIN_REQUIRE_NOT_MET");
            return;
          }
        }
        else if (voucherData.discount_type === "value") {
          if (totalPrice >= voucherData.discount_value.min_require){
            let discountValue = voucherData.discount_value.value;
            setDiscount(discountValue);
            setTotalPriceafterDiscount(totalPrice - discountValue);
          }
        }
        
        setAlreadyApplied(true);
        setVoucherError("None");
      } catch (error) {
        //if error 404 then set error message
        if (error.response.status === 404) {
          console.log("Voucher not found");
          setVoucherError("NOT_FOUND");
        } else {
          console.log("Error applying voucher:", error);
        }
        
      }
    };
        useEffect(() => {
      if (voucherInfo) {
        if (voucherInfo.discount_type === "Giảm theo phần trăm") {
          if (totalPrice >= voucherInfo.discount_value.min_require) {
            let discountValue = Math.floor(totalPrice * voucherInfo.discount_value.value / 100);
    
            if (discountValue > voucherInfo.discount_value.max_discount) {
              discountValue = voucherInfo.discount_value.max_discount;
            }
    
            setDiscount(discountValue);
            setTotalPriceafterDiscount(totalPrice - discountValue);
            setVoucherError("None");
          } else {
            setVoucherError("MIN_REQUIRE_NOT_MET");
            setDiscount(0);
          }
        } else if (voucherInfo.discount_type === "value") {
          if (totalPrice >= voucherInfo.discount_value.min_require) {
            let discountValue = voucherInfo.discount_value.value;
    
            if (discountValue > voucherInfo.discount_value.max_discount) {
              discountValue = voucherInfo.discount_value.max_discount;
            }
    
            setDiscount(discountValue);
            setTotalPriceafterDiscount(totalPrice - discountValue);
            setVoucherError("None");
          } else {
            console.log("Total price does not meet the minimum requirement for the voucher.");
            setVoucherError("MIN_REQUIRE_NOT_MET");
            setDiscount(0);
          }
        }
      }
    }, [totalPrice, voucherInfo]);
    useEffect(() => {
      console.log("Discount updated:", voucherInfo);
      // Perform any additional actions needed after discount is updated
    }, [voucherInfo]);

    //Order
    const handleOrder = async () => {
      const response = await axios.get(`/cart/${accountData._id}`);
      const order={
        user_id: cartData.cart.user_id,
        product_list: response.data.cart.product_list.filter(product => product.selected),
        payment_method: "Momo",
        voucher_id: voucherInfo._id,
        total_price: totalPriceafterDiscount
      }
      console.log(order.product_list);
      try {
        const response = await axios.post("order/cartToOrder", order);
        fetchCartData();
        // deleteAllItemFromCart();
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }
    // const deleteAllItemFromCart = async () => {
    //   try {
    //     const response = await axios.post(`/cart/delete/${accountData._id}`);
    //     console.log("Delete all items response:", response.data);
    //     fetchCartData();
    //   } catch (error) {
    //     console.error("Error deleting cart:", error);
    //   }
    // };
    // console.log("Cart Data:", cartData);
  return (
    <>
      <Header></Header>
      <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        {/* Whole cart */}
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            {/* Left side */}
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                  Giỏ Hàng
                </h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                  {cartData.cart.product_list.length} sản phẩm
                </h2>
              </div>
              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                    Thông tin sản phẩm
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Số lượng
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Tổng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {cartData && cartData.cart && cartData.cart.product_list.map((product, index) => (
                <Product_Frame key={product.product_id} product={product} AccountID={AccountID} fetchCartData={fetchCartData} 
                onSelectChange={()=>{
                  calculateTotalPrice(cartData.cart.product_list);
                }}/>
              ))}
            </div>
            {/* Right side */}
            <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Thanh toán
              </h2>

              {/* Payment method */}
              <div className="mt-4 mb-4">
                <p className="font-normal text-lg leading-8 text-black">
                  Hình thức thanh toán
                </p>
                <div className="mt-4">
                  <label className="block">
                    <input
                      type="radio"
                      name="payment"
                      value="on_delivery"
                      className="mr-2 leading-tight"
                    />
                    <span className="text-base">Thanh toán khi nhận hàng</span>
                  </label>
                  <label className=" mt-2 flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="momo"
                      className="mr-2 leading-tight"
                    />
                    <img src={Momo.src} alt="Momo" className="text-base" />
                  </label>
                </div>
              </div>
              {/* Discount Coupon */}
              <div className=" border-gray-300 border-t-2">
                <p className="font-normal text-lg leading-8 text-black ">
                  Mã giảm giá
                </p>
                <div className="mt-2 flex ">
                  <input
                    type="text"
                    name="redemption_code"
                    className="mr-2 flex-grow border-gray-300 p-2 rounded-md"
                    placeholder="Enter code"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                  />
                  <button
                    className="middle none center mr-4 rounded-lg bg-blue-500 py-2 px-4 font-sans text-xs font-bold 
                        uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 
                        focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                        disabled:opacity-50 disabled:shadow-none"
                        onClick={handleApplyVoucher}
                  >
                    Áp dụng
                  </button>
                </div>
                {voucherError=="None" &&<p className="text-center text-green-500">Áp dụng thành công</p>}
                {voucherError=="ALREADY_APPLIED" &&<p className="text-center text-red-500">Bạn đã dùng voucher rồi</p>}
                {voucherError=="MIN_REQUIRE_NOT_MET" &&<p className="text-center text-red-500">Cart không đủ giá trị tối thiểu</p>}
                {voucherError=="NOT_FOUND" &&<p classNameName="text-center text-red-500">Voucher không tồn tại</p>}
                {voucherError=="EMPTY" &&<p className="text-center text-red-500">Voucher không thể trống</p>}
              </div>
              {/* Total */}
              <div className="mt-4">
                <div className="flex justify-between">
                  <p className="font-normal text-lg leading-8 text-black">
                    Tổng Đơn hàng
                  </p>
                  <p className="font-normal text-lg leading-8 text-black">
                    {totalPrice}đ
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-normal text-lg leading-8 text-black">
                    Giảm giá
                  </p>
                  <p className="font-normal text-lg leading-8 text-black">
                    -{discount}đ
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-normal text-lg leading-8 text-black">
                    Phí vận chuyển
                  </p>
                  <p className="font-normal text-lg leading-8 text-black">0đ</p>
                </div>
                {/* total price */}
                <div className="flex justify-between mt-4">
                  <p className="font-normal text-lg leading-8 text-black">
                    Tổng cộng
                  </p>
                  <p className="font-normal text-lg leading-8 text-black">
                    {totalPriceafterDiscount}đ
                  </p>
                </div>
                {/* Purchase button */}
                <div className="mt-4 border-t border-gray-300 pt-4">
                <button
                      className={`w-full p-2 rounded-md ${cartData.cart.product_list.length === 0 ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
                      onClick={handleOrder}
                      disabled={cartData.cart.product_list.length === 0}
                    >
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
