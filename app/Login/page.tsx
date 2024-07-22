"use client";
import Footer from "../Component/Footer/Footer";
import Logo from "../../public/img/logo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie,setCookie } from "cookies-next";
function Page() {
  const router = useRouter();
  const [hidepass, sethidepass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (event:any) => {
    event.preventDefault();
    try {
      const data = {
        email: email, // Example username
        password: password  // Example password
      };
      const response = await axios.post("http://localhost:8080/auth/login", data);
      setCookie("jwt", response.data.jwt, { maxAge: 60 * 6 * 24 });
      router.push("/Main");
    } catch (error) {
      console.error(error); // Handle error 
    }
  };
  const handleValidation = async () => {
    try {
      const jwt = getCookie("jwt"); // Use getCookie to retrieve the JWT token
      console.log(jwt);
      const response = await axios.get("http://localhost:8080/auth/post", {
        headers: { Authorization: `Bearer ${jwt}` } // Assuming the API expects a Bearer token
      });
      console.log(response);
      // router.push("/Main");
    } catch (error) {
      console.error(error); // Handle error 
    }
  }
  return (
    <div className="flex flex-col w-full ">
      <div className="flex items-center">
        <img src={"./img/logo.png"} alt="Logo" className=" w-20  ml-8" />
        <button onClick={() => router.push("/Main")}>
          <div className="ml-4 font-nunito text-4xl text-[#1286CE] font-bold">
            BK
          </div>
        </button>
        <button onClick={() => router.push("/Main")}>
          <div className="font-nunito text-4xl text-[#EDB24E] font-bold">
            Petcare
          </div>
        </button>
        <div className="ml-8 font-nunito text-3xl font-bold">Đăng nhập</div>
      </div>
      <div
        className="w-full bg-[#296EB6] flex pt-16"
        style={{ height: "90vh" }}
      >
        <div className="flex flex-col items-center w-1/2 mt-8">
          <Logo />
          <div className="flex items-center mt-8">
            <div className="font-nunito text-5xl text-[#1286CE] font-bold">
              BK
            </div>
            <div className="font-nunito text-5xl text-[#EDB24E] font-bold">
              Petcare
            </div>
          </div>
          <div className="mx-32 mt-12 font-nunito text-3xl text-[#ffffff] text-center ">
            Cửa hàng dịch vụ chăm sóc thú cưng hàng đầu TP.HCM
          </div>
        </div>
        <div
          className="bg-white w-2/6 rounded-xl ml-16 px-12 pt-8 flex flex-col "
          style={{ height: "70vh" }}
        >
          <div className="text-2xl font-bold mb-6">Đăng nhập </div>
          <input
            type="text"
            className="p-2 pl-4 mb-6 font-nunito rounded border border-gray-300 w-full text-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <div className="mb-2 font-nunito rounded border border-gray-300 w-full text-lg">
            <div className="relative flex items-center font-nunito w-full text-lg">
              <input
                type={hidepass ? "text" : "password"}
                className="p-2 pl-4 w-full"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button onClick={() => sethidepass(!hidepass)}>
                <img
                  src={hidepass ? "./img/showIcon.png" : "./img/hideIcon.png"}
                  alt="eye"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 scale-75"
                />
              </button>
            </div>
          </div>
          <div className="text-md text-[#C5C5CF] mb-2">
            <Link href="/Login/Getpass">Quên mật khẩu ?</Link>{" "}
          </div>
          <button
            type="submit"
            className="bg-[#296EB6] text-white font-nunito p-2 text-xl rounded w-full"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
          <div className="mt-6 text-[16px] font-bold flex flex-row items-center justify-center">
            <div className="border border-[#C5C5CF] w-36 mr-5"></div>
            <div className="text-[#C5C5CF]">Hoặc </div>
            <div className="border border-[#C5C5CF] w-36 ml-5"></div>
          </div>
          <div className="flex justify-center mt-6 w-full">
            <button className="flex items-center justify-center border-2 border-blue-600 text-blue-600 rounded-md p-2 mr-4 w-1/2">
              <img
                src="./img/facebook.png"
                alt="Facebook logo"
                className="mr-2"
              />
              Facebook
            </button>
            <button className="flex items-center justify-center border-2 border-red-600 text-red-600 rounded-md p-2 ml-4 w-1/2">
              <img src="./img/google.png" alt="Google logo" className="mr-2" />
              Google
            </button>
          </div>
          <div className="mt-4 font-k2d text-lg text-center">
            Chưa có tài khoản,
            <button
              className=" text-[#FC0E0E] rounded-md p-2 font-bold"
              onClick={() => router.push("/Sigup")}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
