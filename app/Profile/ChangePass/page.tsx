'use client';
import Header from "@/app/Component/Header/Header";
import Footer from '@/app/Component/Footer/Footer';
import ProfileNav from "@/app/Component/ProfileNav/ProfileNav";
import React, { useState, useEffect } from 'react';
import axios from '@/api/axios';
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";
function Page() {
    //Handle loading and complete
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [loadWhat, setLoadWhat] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [passwords, setPasswords] = useState(["", "", ""]);
    const [hidepass, setHidepass] = useState([false, false, false]);

    const passwordFields = [
        { label: "Nhập mật khẩu hiển tại", passwordIndex: 0, hidepassIndex: 0 },
        { label: "Mật khẩu mới", passwordIndex: 1, hidepassIndex: 1 },
        { label: "Nhập lại mật khẩu mới", passwordIndex: 2, hidepassIndex: 2 },
    ];

    const handlePasswordChange = (index: any, value: any) => {
        const newPasswords = [...passwords];
        newPasswords[index] = value;
        setPasswords(newPasswords);
    };

    const handleHidepassChange = (index: any) => {
        const newHidepass = [...hidepass];
        newHidepass[index] = !newHidepass[index];
        setHidepass(newHidepass);
    };
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
      
        const updatePassword = async () => {
          if (passwords[1] !== passwords[2]) {
            setError("CONFIRM_PASSWORD_NOT_MATCH");
            return;
          }
          try {
            const response = await axios.post(`/account/changepass`, { oldpassword: passwords[0], newpassword: passwords[1] });
            setIsLoading(false);
            setIsComplete(true);
            setLoadWhat("CHANGE_PASSWORD");
          } catch (error: any) {
            console.error('Error update password:', error);
            if (error.response.data.message === "WRONG_PASSWORD") {
              setError("WRONG_PASSWORD");
            }
          }
        };
      
        updatePassword();
      };
    return (
        <div className="flex flex-col w-full ">
            <Header />
            <ErrorModal error={error} setError={setError} />
            <LoadingModal
                isLoading={isLoading}
                isComplete={isComplete}
                setIsComplete={setIsComplete}
                loadWhat={loadWhat}
            />
            <div className="flex bg-[#DFF3FF] w-full ">
                <ProfileNav />
                {/* Right */}
                <div className="flex flex-col w-full bg-white py-4 px-12 my-8 mr-12 rounded-lg shadow-lg">
                    <div className="mb-2 font-nunito font-bold text-2xl">Đổi mật khẩu</div>
                    <div className='border border-[#C5C5CF] w-full mr-5 mx-4'></div>
                    <div className="flex flex-col py-2 mr-8">
                        {passwordFields.map((field) => (
                            <div className="flex items-center my-2 space-y-4" key={field.label}>
                                <div className="font-nunito w-1/4 ">{field.label}</div>
                                <div className="relative flex items-center font-nunito w-1/2 text-lg">
                                    <input
                                        type={hidepass[field.hidepassIndex] ? "text" : "password"}
                                        className='p-1 pl-4 w-full rounded border border-gray-300'
                                        value={passwords[field.passwordIndex]}
                                        onChange={(e) => handlePasswordChange(field.passwordIndex, e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleHidepassChange(field.hidepassIndex)}
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2"
                                    >
                                        <img
                                            src={hidepass[field.hidepassIndex] ? "./../img/showIcon.png" : "./../img/hideIcon.png"}
                                            alt="eye"
                                            className='scale-50'
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-col items-center mt-8 w-5/6">
                            <button type="submit" className="bg-[#EDB24E] text-white font-nunito p-2 text-xl rounded w-1/3" onClick={handleSave}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page