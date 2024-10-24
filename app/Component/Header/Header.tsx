"use client";
import logo from "@/public/img/Header/logo.png";
import SearchBar from "./searchbar";
import { useState, useEffect } from "react";
import notification from "@/public/img/Header/notification.png";
import ShoppingCart from "@/public/img/Header/Shopping Cart.png";
import Logout from "@/public/img/logouthl.svg";
import User from "@/public/img/Header/User.png";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { usePathname } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

import axios from "@/api/axios";
export default function Header(props: any) {
  const pathname = usePathname();
  const { auth, isAuthenticated } = useAuth();
  const [showSublist1, setShowSublist1] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = async () => {

    // Call the logout endpoint
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      await axios.post(`${baseURL}/auth/logout`);
    } catch (error) {
      console.error('Error logging out:', error);
    }
    // Redirect to login page
    window.location.reload();
  };
  const checkLogin = async () => {
    try {
      if (isAuthenticated) {
        setIsLoggedIn(true);
      } else {
        deleteCookie("jwt");
        setIsLoggedIn(false);
      }

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    // global container
    <div className="flex flex-col mx-8 mb-10">
      {/* top part */}
      <div className="flex items-center justify-center space-x-11 border-b-[1px] border-gray-300">
        {/* image */}
        <Link href="/Product_Intro">
          <img src={logo.src} alt="Logo" className="w-60 " />
        </Link>
        <SearchBar />
        {!isLoggedIn ? (
          <div>
            <Link href="/Login">
              <button
                className="middle none center mr-4 rounded-lg bg-blue-500 py-2 px-6 font-sans text-xs font-bold 
                        uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 
                        focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                        disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Đăng nhập
              </button>
            </Link>
            <Link href="/Sigup">
              <button
                className="middle none center rounded-lg bg-yellow-400 py-2 px-6 font-sans text-xs font-bold 
                        uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 
                        focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                        disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Đăng ký
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex space-x-4 items-center">
            <img className="w-7 h-7" src={notification.src} alt="" />
            <Link href="/Cart">
              <img className="w-7 h-7" src={ShoppingCart.src} alt="" />
            </Link>
            <Link href="/Profile">
              <img className="w-7 h-7" src={User.src} alt="" />
            </Link>
            <button onClick={handleLogout}>
              <img className="w-7 h-7" src={Logout.src} alt="" />
            </button>
            <div className="self-center text-3xl font-semibold text-yellow-500">
              {">"}
            </div>
          </div>
        )}
      </div>
      {/* dropdown list */}
      <div className="mb-4">
        {/* main list */}
        <ul className="flex justify-center space-x-20 font-k2d text-lg font-bold ">
          {/* main list item 1 */}
          <li
            onMouseEnter={() => setShowSublist1(true)}
            onMouseLeave={() => setShowSublist1(false)}
            className={` ${showSublist1 ? "text-yellow-400 " : ""} ${pathname === '/Product' ? "text-yellow-500" : ""}`}
          >
            <Link href="/Product">Sản phẩm thú cưng</Link>
            {/* sub list 1 */}
            <ul
              className={`absolute left-48 p-2 text-black text-base flex justify-center w-[75%] font-normal transition-all duration-300 ease-in-out ${
                showSublist1 ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
              }`}
            >
              <li className="px-10 transition-transform duration-300 hover:scale-125 hover:text-yellow-500 hover:font-semibold active:scale-95">
                <Link href={{ pathname: '/Product', query: { filterMode: 1 } }}>Thức ăn thú cưng</Link>
              </li>
              <li className="px-10 transition-transform duration-300 hover:scale-125 hover:text-yellow-500 hover:font-semibold active:scale-95">
              <Link href={{ pathname: '/Product', query: { filterMode: 2 } }}>Phụ kiện & Đồ chơi</Link>
              </li>
              <li className="px-10 transition-transform duration-300 hover:scale-125 hover:text-yellow-500 hover:font-semibold active:scale-95">
                <Link href={{ pathname: '/Product', query: { filterMode: 3 } }}>Đồ dùng vệ sinh</Link>
              </li>
              <li className="px-10 transition-transform duration-300 hover:scale-125 hover:text-yellow-500 hover:font-semibold active:scale-95">
                <Link href={{ pathname: '/Product', query: { filterMode: 4 } }}>Nhà thú cưng</Link>
              </li>
              <li className="px-10 transition-transform duration-300 hover:scale-125 hover:text-yellow-500 hover:font-semibold active:scale-95">
                <Link href={{ pathname: '/Product', query: { filterMode: 5 } }}>Đồ dùng thú y</Link>
              </li>
            </ul>
          </li>
          <li className={`transition-transform duration-300 hover:scale-105 hover:rotate-3 active:scale-95 ${pathname === '/Price_Table' ? "text-yellow-500" : ""}`}>
            <Link className="hover:text-yellow-500" href="/Price_Table">
              Đặt lịch hẹn
            </Link>
          </li>
          <li className={`transition-transform duration-300 hover:scale-105 hover:rotate-3 active:scale-95 ${pathname === '/Adopt' ? "text-yellow-500" : ""}`}>
            <Link className="hover:text-yellow-500" href="/Adopt">
              Nhận nuôi thú cưng
            </Link>
          </li>
          <li className={`transition-transform duration-300 hover:scale-105 hover:rotate-3 active:scale-95 ${pathname === '/Rescue' ? "text-yellow-500" : ""}`}>
            <Link className="hover:text-yellow-500" href="/Rescue">
              Yêu cầu cứu hộ
            </Link>
          </li>
          <li className={`transition-transform duration-300 hover:scale-105 hover:rotate-3 active:scale-95 ${pathname === '/Main' ? "text-yellow-500" : ""}`}>
            <Link className="hover:text-yellow-500" href="/Main">
              Về chúng tôi
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
