
import logo from "../../../public/img/Header/logo.png";
import SearchBar from "./searchbar";
import { useState } from "react";
import notification from "../../../public/img/Header/notification.png";
import ShoppingCart from "../../../public/img/Header/Shopping Cart.png";
import User from "../../../public/img/Header/User.png";
export default function Header(props: any) {
  const [showSublist1, setShowSublist1] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    // global container
    <div className="flex flex-col m-8 ">
      {/* top part */}
      <div className="flex items-center justify-between border-b-[1px] border-gray-300">
        {/* image */}
        <img src={logo.src} alt="Logo" className="w-60 " />
        <SearchBar />
        {!isLoggedIn ? (
          <div>
            <button
              className="middle none center mr-4 rounded-lg bg-blue-500 py-2 px-6 font-sans text-xs font-bold 
                        uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 
                        focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                        disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              Đăng nhập
            </button>
            <button
              className="middle none center rounded-lg bg-yellow-400 py-2 px-6 font-sans text-xs font-bold 
                        uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 
                        focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                        disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              Đăng ký
            </button>
          </div>
        ) : (
          <div className="flex space-x-4 items-center">
            <img className="w-7 h-7" src={notification.src} alt="" />
            <img className="w-7 h-7" src={ShoppingCart.src} alt="" />
            <img className="w-7 h-7" src={User.src} alt="" />
            <div className="self-center text-3xl font-semibold text-yellow-500">
              {">"}
            </div>
          </div>
        )}
      </div>
      {/* dropdown list */}
      <div className="mb-4">
        {/* main list */}
        <ul className="flex justify-between font-k2d text-lg font-bold ">
          {/* main list item 1 */}
          <li
            onMouseEnter={() => setShowSublist1(true)}
            onMouseLeave={() => setShowSublist1(false)}
            className={` ${showSublist1 ? "text-yellow-400 " : ""}`}
          >
            Sản phẩm thú cưng
            {/* sub list 1 */}
            {showSublist1 && (
              <ul className="absolute  p-2 text-black text-base flex justify-center w-[100%] font-normal ">
                <li className="px-10">Thức ăn thú cưng</li>
                <li className="px-10">Phụ kiện & Đồ chơi</li>
                <li className="px-10">Đồ dùng vệ sinh</li>
                <li className="px-10">Nhà thú cưng</li>
                <li className="px-10">Đồ dùng thú y </li>
              </ul>
            )}
          </li>
          <li>Đặt lịch hẹn</li>
          <li>Nhận nuôi thú cưng</li>
          <li>Yêu cầu cứu hộ</li>
          <li>Về chúng tôi</li>
        </ul>
      </div>
    </div>
  );
}
