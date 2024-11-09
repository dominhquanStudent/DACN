"use client";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import Product_Frame from "./Product_Frame";
import ZaloPay from "@/public/img/ZaloPay.png";
import axios from "@/api/axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import _ from 'lodash'; // Import lodash for debouncing
import LoadingModal from "@/app/Component/Loading";
import ErrorModal from "@/app/Component/Error";
import { useRouter } from "next/navigation";
import { sendNotifications } from "@/ultis/notificationUtils";
import { mutate } from "swr";
export default function Cart() {
  //Handle loading and complete
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState(null);
  // Get account data
  const [accountData, setAccountData] = useState("");
  // Get account data upon access
  const jwt = getCookie("jwt");

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(price);
  };

  // Get cart data
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
    fetchCartData();
  }, []);


  // Calculate total price
  const [totalPrice, setTotalPrice] = useState(0);
  const calculateTotalPrice = (products) => {
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
    }, 0); // Adjust the debounce delay as needed


    if (cartData.cart && cartData.cart.product_list) {
      debouncedCalculateTotalPrice(cartData.cart.product_list);
    }


    // Cleanup function to cancel the debounce if the component unmounts
    return () => {
      debouncedCalculateTotalPrice.cancel();
    };
  }, [cartData]);


  // Update product status in cart data
  const updateProductStatus = (productId, selected) => {
    const updatedProductList = cartData.cart.product_list.map(product => {
      if (product.product_id === productId) {
        return { ...product, selected };
      }
      return product;
    });


    setCartData(prevState => ({
      ...prevState,
      cart: {
        ...prevState.cart,
        product_list: updatedProductList
      }
    }));


    // Recalculate total price after updating product status
    const total = calculateTotalPrice(updatedProductList);
    setTotalPrice(total);
    // Reapply voucher if already applied
    if (alreadyApplied) {
      applyVoucher(voucher, total);
    } else {
      setTotalPriceafterDiscount(total);
    }
  };


  // Apply voucher
  const [voucher, setVoucher] = useState("");
  const [voucherInfo, setVoucherInfo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [voucherError, setVoucherError] = useState("");
  const [totalPriceafterDiscount, setTotalPriceafterDiscount] = useState(0);
  const applyVoucher = async (voucherCode, total) => {
    try {
      const response = await axios.get(`/voucher/code/${voucherCode}`);
      const voucherData = response.data.voucher;
      setVoucherInfo(voucherData);


      if (voucherData.discount_type === "Giảm theo phần trăm") {
        if (total >= voucherData.discount_value.min_require) {
          let discountValue = Math.floor(total * voucherData.discount_value.value / 100);
          if (discountValue > voucherData.discount_value.max_discount) {
            discountValue = voucherData.discount_value.max_discount;
          }


          setDiscount(discountValue);
          setTotalPriceafterDiscount(total - discountValue);
        } else {
          setVoucherError("MIN_REQUIRE_NOT_MET");
          return;
        }
      } else if (voucherData.discount_type === "value") {
        if (total >= voucherData.discount_value.min_require) {
          let discountValue = voucherData.discount_value.value;
          setDiscount(discountValue);
          setTotalPriceafterDiscount(total - discountValue);
        }
      }
      setAlreadyApplied(true);
      setVoucherError("None");
    } catch (error) {
      if (error.response.status === 404) {
        setVoucherError("NOT_FOUND");
      } else {
        console.error("Error applying voucher:", error);
      }
    }
  };


  const handleApplyVoucher = async () => {
    if (alreadyApplied) {
      setVoucherError("ALREADY_APPLIED");
      return;
    }
    if (voucher === "") {
      setVoucherError("EMPTY");
      return;
    }
    applyVoucher(voucher, totalPrice);
  };

  // Order
  const [paymentMethod, setPaymentMethod] = useState("Trực tiếp");
  const [failedProducts, setFailedProducts] = useState("45545");
  const handleOrder = async () => {
    const order = {
      user_id: cartData.cart.user_id,
      product_list: cartData.cart.product_list.filter(product => product.selected),
      payment_method: paymentMethod,
      voucher_id: voucherInfo._id,
      total_price: totalPriceafterDiscount
    }
    //if order.product_list has product that its quantity is higher than stock then return
    for (let i = 0; i < order.product_list.length; i++) {
      if (order.product_list[i].quantity > order.product_list[i].stock) {
        setError("NOT_ENOUGH_STOCK");
        setFailedProducts(order.product_list[i].product_name);
        return;
      }
    }
    try {
      setIsLoading(true);
      setLoadWhat("ORDERING");
      const response = await axios.post("order/cartToOrder", order);
      console.log(response.data);
      setIsLoading(false);
      if (paymentMethod != "Trực tiếp") {
        const payment_data = {
          order_id: response.data.order._id,
          total_price: totalPriceafterDiscount,
          payment_id: response.data.order.payment_id,
        }
        const payment = await axios.post("payment/ZALO", payment_data);
        if (payment.data.order_url) {
          window.open(payment.data.order_url, '_blank');
        }
      }
      setIsComplete(true);
      mutate('/cart');
      // router.push("/Cart");
      fetchCartData();
      const productDetails = cartData.cart.product_list.filter(product => product.selected).map((product, productIndex) => (
        `<div key="${productIndex}" class="flex flex-col w-full items-center my-2">
          <div class="border border-[#C5C5CF] w-11/12"></div>
          <div class="flex w-11/12 justify-between py-2">
            <div class="flex w-10/12">
              <img src="${product.product_image}" class="h-20 w-auto" alt="${product.product_name}" />
              <div class="flex flex-col ml-4">
                <div class="text-lg font-semibold">${product.product_name}</div>
                <div class="text-sm text-gray-600">x ${product.quantity}</div>
              </div>
            </div>
            <div class="flex items-center justify-center w-1/6">
              <div class="text-lg font-bold text-gray-800">${(product.discount_price * product.quantity).toLocaleString('vi-VN')}đ</div>
            </div>
          </div>
        </div>`
      )).join('');

      const totalPrice = response.data.order.product_list.reduce((total, product) => total + product.discount_price * product.quantity, 0);
      const discount = totalPrice - response.data.order.total_price;
      const finalPrice = response.data.order.total_price;

      const notificationContent = `
        <div style="padding: 16px; font-family: Arial, sans-serif;">
          <div style="margin-bottom: 16px;">
            <strong style="font-size: 18px;">Đơn hàng ${response.data.order._id} đã được đặt thành công.</strong>
          </div>
          <div style="margin-bottom: 16px;">
            <strong style="font-size: 16px;">Chi tiết đơn hàng:</strong>
          </div>
          <div class="flex justify-between">
            <div class="flex-grow">
              ${productDetails}
            </div>
            <div class="flex-grow flex-col text-lg ml-4 mt-4 w-1/2">
              <div class="flex w-full mb-2">
                <div class="w-full font-semibold">Tổng cộng:</div>
                <div class="font-bold">${totalPrice.toLocaleString('vi-VN')} đ</div>
              </div>
              <div class="flex w-full mb-2">
                <div class="w-full font-semibold">Giảm giá:</div>
                <div class="font-bold text-red-600">- ${discount.toLocaleString('vi-VN')} đ</div>
              </div>
              <div class="flex w-full">
                <div class="w-full font-semibold">Thành tiền:</div>
                <div class="text-[#ff0000] font-bold">${finalPrice.toLocaleString('vi-VN')} đ</div>
              </div>
            </div>
          </div>
        </div>
      `;

      sendNotifications({
        user_id: cartData.cart.user_id,
        category: 'Đơn hàng',
        Title: 'Đặt đơn hàng thành công',
        content: notificationContent,
        status: 'Chưa đọc'
      });

    } catch (error) {
      console.error("Error placing order:", error);
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
          setVoucherError("MIN_REQUIRE_NOT_MET");
          setDiscount(0);
        }
      }
    }
  }, [totalPrice, voucherInfo]);

  return (
    <>
      <Header />
      <ErrorModal error={error} setError={setError} product={failedProducts}/>
      <LoadingModal isLoading={isLoading} isComplete={isComplete} setIsComplete={setIsComplete} loadWhat={loadWhat} />
      <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        {/* Whole cart */}
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            {/* Left side */}
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-2 pb-4 lg:py-4 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                  Giỏ Hàng
                </h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                  {cartData.cart.product_list.length} sản phẩm
                </h2>
              </div>
              <div className="grid grid-cols-12 mt-4 max-md:hidden pb-4 border-b border-gray-200">
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
              <div className="overflow-y-auto h-96 snap-y snap-mandatory hide-scrollbar">
                {cartData && cartData.cart && cartData.cart.product_list.map((product, index) => (
                  <div key={product.product_id} className="snap-start">
                    <Product_Frame product={product} fetchCartData={fetchCartData}
                      onSelectChange={(selected) => updateProductStatus(product.product_id, selected)} />
                  </div>
                ))}
              </div>
            </div>
            {/* Right side */}
            <div className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-2 lg:py-4">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-4 border-b border-gray-300 text-center">
                Đặt hàng
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
                      value="Trực tiếp"
                      className="mr-2 leading-tight"
                      onChange={() => setPaymentMethod("Trực tiếp")}
                      defaultChecked
                    />
                    <span className="text-base">Thanh toán khi nhận hàng</span>
                  </label>
                  <label className="mt-2 flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="ZaloPay"
                      className="mr-2 leading-tight"
                      onChange={() => setPaymentMethod("ZaloPay")}
                    />
                    <img src={ZaloPay.src} alt="ZaloPay" className="text-base w-12 h-12" />
                  </label>
                </div>
              </div>
              {/* Discount Coupon */}
              <div className="border-gray-300 border-t-2">
                <p className="font-normal text-lg leading-8 text-black">
                  Mã giảm giá
                </p>
                <div className="mt-2 flex">
                  <input
                    type="text"
                    name="redemption_code"
                    className="mr-2 flex-grow border-gray-300 p-2 rounded-md"
                    placeholder="Nhập mã"
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
                {voucherError == "None" && <p className="text-center text-green-500">Áp dụng thành công</p>}
                {voucherError == "ALREADY_APPLIED" && <p className="text-center text-red-500">Bạn đã dùng voucher rồi</p>}
                {voucherError == "MIN_REQUIRE_NOT_MET" && <p className="text-center text-red-500">Cart không đủ giá trị tối thiểu</p>}
                {voucherError == "NOT_FOUND" && <p className="text-center text-red-500">Voucher không tồn tại</p>}
                {voucherError == "EMPTY" && <p className="text-center text-red-500">Voucher không thể trống</p>}
              </div>
              {/* Total */}
              <div className="mt-4">
                <div className="flex justify-between">
                  <p className="font-normal text-lg leading-8 text-black">
                    Tổng Đơn hàng
                  </p>
                  <p className="font-normal text-lg leading-8 text-black">
                    {formatPrice(totalPrice)}đ
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-normal text-lg leading-8 text-black">
                    Giảm giá
                  </p>
                  <p className="font-normal text-lg leading-8 text-black">
                    -{formatPrice(discount)}đ
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-normal text-lg leading-8 text-black">
                    Phí vận chuyển
                  </p>
                  <p className="font-normal text-lg leading-8 text-black">0đ</p>
                </div>
                {/* Total price */}
                <div className="flex justify-between mt-4">
                  <p className="font-normal text-lg leading-8 text-black">
                    Tổng cộng
                  </p>
                  <p className="font-normal text-lg leading-8 text-black">
                    {formatPrice(totalPriceafterDiscount)}đ
                  </p>
                </div>
                {/* Purchase button */}
                <div className="mt-4 border-t border-gray-300 pt-4">
                  <button
                    className={`w-full p-2 rounded-md ${cartData.cart.product_list.length === 0 ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
                    onClick={handleOrder}
                    disabled={cartData.cart.product_list.length === 0}
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
