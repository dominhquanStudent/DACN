"use client";
import Footer from "../Component/Footer/Footer";
import Logo from "../../public/img/logo";
import Link from "next/link";
import React, { useState } from "react";
import axios from "@/api/axios";
function Page() {
  const [isPopup, setIsPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const validateEmail = (email: String) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const handleSubmit = () => {
    if (validateEmail(email)) {
      setEmailError("");
      setIsPopup(true);
      try{
        const response = axios.post("/otp/create", { email: email, job: "register" });
        console.log(response);
      } catch (error) {
        console.error('Error sending email:', error);
        if (error instanceof Error) {
          setEmailError(error.message);
        } else {
          setEmailError("Có vấn đề xảy ra, vui lòng thử lại sau");  
        }
      }
    } else {
      setEmailError("Email không hợp lệ");
    }
  };
  return (
    <>
  <div
    className="flex flex-col w-full"
    style={{ opacity: isPopup ? "0.5" : "1" }}
  >
    <div className="flex items-center">
      <img src={"./img/logo.png"} alt="Logo" className="w-20 ml-8" />
      <Link href="/Main">
        <button>
          <div className="ml-4 font-nunito text-4xl text-[#1286CE] font-bold">
            BK
          </div>
        </button>
      </Link>
      <Link href="/Main">
        <button>
          <div className="font-nunito text-4xl text-[#EDB24E] font-bold">
            Petcare
          </div>
        </button>
      </Link>
      <div className="ml-8 font-nunito text-3xl font-bold">Đăng ký</div>
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
        style={{ height: "60vh" }}
      >
        <div className="text-2xl font-bold mb-6">Đăng ký </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 pl-4 font-nunito rounded border border-gray-300 w-full text-lg"
            placeholder="Email"
          />
          {emailError && (
            <div className="text-[#ff0000] my-2 ml-4">{emailError}</div>
          )}
          <button
            type="submit"
            className={`bg-[#296EB6] text-white font-nunito p-2 text-xl rounded w-full ${
              emailError ? "" : "mt-6"
            }`}
          >
            Đăng ký
          </button>
        </form>
        <div className="mt-6 font-k2d text-lg text-center">
          Đã có tài khoản,
          <Link href="/Login">
            <button className=" text-[#FC0E0E] rounded-md p-2 font-bold">
              Đăng nhập
            </button>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  {isPopup && (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 999,
        }}
      ></div>
      <div
        style={{
          opacity: 1,
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          border: "1px solid black",
          borderRadius: "10px",
          zIndex: 1000,
        }}
        className="p-4 text-center text-black"
      >
        Tiếp theo chúng tôi sẽ gửi mã OTP đến email <br />{" "}
        <div className="font-bold">{email}</div> <br />
        <Link href={{ pathname: "Sigup/next", query: { email: email } }}>
          <button
            type="submit"
            className="bg-[#296EB6] text-white font-nunito text-xl rounded w-1/3 mt-2"
          >
            Tiếp tục
          </button>
        </Link>
      </div>
    </>
  )}
</>
  );
}

export default Page;
