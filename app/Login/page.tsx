"use client";
import Footer from "../Component/Footer/Footer";
import Logo from "../../public/img/logo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import useAuth from '@/hooks/useAuth';
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";
function Page() {
  const router = useRouter();
  const { auth, login, isAuthenticated } = useAuth();
  const [hidepass, sethidepass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //Handle loading and complete
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadWhat("LOGIN");
      setIsLoading(true);
      const response = await login(email, password);
  
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.role === "admin") {
        router.push("/Admin");
      } else if (response.role === "doctor") {
        router.push("/Doctor");
      } else if (response.role === "user") {
        router.push("/Main");
      } else {
        throw new Error("Invalid role");
      }
    } catch (error) {
      setIsLoading(false);
      setError("WRONG_ACCOUNT_OR_PASSWORD");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <ErrorModal error={error} setError={setError} />
      <LoadingModal
        isLoading={isLoading}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
        loadWhat={loadWhat}
      />
      {/* Header Section */}
      <div className="flex flex-wrap items-center p-4 md:p-0">
        <img loading="lazy" src={"./img/logo.png"} alt="Logo" className="w-16 md:w-20 md:ml-8" />
        <button onClick={() => router.push("/Main")}>
          <div className="ml-2 md:ml-4 font-nunito text-2xl md:text-4xl text-[#1286CE] font-bold">
            BK
          </div>
        </button>
        <button onClick={() => router.push("/Main")}>
          <div className="font-nunito text-2xl md:text-4xl text-[#EDB24E] font-bold">
            Petcare
          </div>
        </button>
        <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-8 font-nunito text-xl md:text-3xl font-bold text-center md:text-left">
          Đăng nhập
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full bg-[#296EB6] flex flex-col md:flex-row p-4 md:p-8" style={{ minHeight: "80vh" }}>
        {/* Left Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 mt-4 md:mt-8">
          <div className="w-48 md:w-auto">
            <Logo />
          </div>
          <div className="flex items-center mt-4 md:mt-8">
            <div className="font-nunito text-3xl md:text-5xl text-[#1286CE] font-bold">
              BK
            </div>
            <div className="font-nunito text-3xl md:text-5xl text-[#EDB24E] font-bold">
              Petcare
            </div>
          </div>
          <div className="mx-4 md:mx-32 mt-6 md:mt-12 font-nunito text-xl md:text-3xl text-white text-center">
            Cửa hàng dịch vụ chăm sóc thú cưng hàng đầu TP.HCM
          </div>
        </div>

        {/* Login Form Section */}
        <div className="bg-white w-full md:w-2/5 rounded-xl mt-8 md:mt-0 md:ml-16 p-6 md:px-12 md:pt-8">
          <form onSubmit={handleLogin} className="flex flex-col">
            <div className="text-xl md:text-2xl font-bold mb-6 mt-4">Đăng nhập</div>
            <input
              type="text"
              className="p-2 pl-4 mt-4 mb-6 font-nunito rounded border border-gray-300 w-full text-base md:text-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mb-4 font-nunito rounded border border-gray-300 w-full">
              <div className="relative flex items-center font-nunito w-full">
                <input
                  type={hidepass ? "text" : "password"}
                  className="p-2 pl-4 w-full text-base md:text-lg"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => sethidepass(!hidepass)}>
                  <img
                    src={hidepass ? "./img/showIcon.png" : "./img/hideIcon.png"}
                    alt="eye"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 scale-75"
                  />
                </button>
              </div>
            </div>
            <div className="text-sm md:text-md text-[#C5C5CF] mb-4">
              <Link href="/Login/Getpass">Quên mật khẩu ?</Link>
            </div>
            <button
              type="submit"
              className="bg-[#296EB6] text-white font-nunito p-2 text-lg md:text-xl rounded w-full"
            >
              Đăng nhập
            </button>
          </form>

          {/* Divider */}
          {/* <div className="mt-6 text-sm md:text-base font-bold flex flex-row items-center justify-center">
            <div className="border border-[#C5C5CF] w-24 md:w-36 mr-3 md:mr-5"></div>
            <div className="text-[#C5C5CF]">Hoặc</div>
            <div className="border border-[#C5C5CF] w-24 md:w-36 ml-3 md:ml-5"></div>
          </div> */}

          {/* Social Login Buttons */}
          {/* <div className="flex flex-col md:flex-row justify-center mt-6 w-full gap-4 md:gap-8">
            <button className="flex items-center justify-center border-2 border-blue-600 text-blue-600 rounded-md p-2 w-full md:w-1/2 text-sm md:text-base">
              <img src="./img/facebook.png" alt="Facebook logo" className="mr-2 w-5 md:w-6" />
              Facebook
            </button>
            <button className="flex items-center justify-center border-2 border-red-600 text-red-600 rounded-md p-2 w-full md:w-1/2 text-sm md:text-base">
              <img src="./img/google.png" alt="Google logo" className="mr-2 w-5 md:w-6" />
              Google
            </button>
          </div> */}

          {/* Sign Up Link */}
          <div className="mt-6 md:mt-8 font-k2d text-base md:text-lg text-center">
            Chưa có tài khoản,
            <button
              className="text-[#FC0E0E] rounded-md p-2 font-bold"
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