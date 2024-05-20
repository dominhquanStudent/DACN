'use client';
import Header from "../../Component/Header/Header";
import Footer from '../../Component/Footer/Footer';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
function Page() {
    const [page, setPage] = useState("changepass")
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
    const handleSave = () => {

    }
    return (
        <div className="flex flex-col w-full ">
            <Header />
            <div className="flex bg-[#DFF3FF] w-full ">
                <div className="flex flex-col pl-12 mt-12 w-4/12 font-nunito ">
                    {/* Left */}
                    <div className="flex items-center w-full mb-4">
                        <img src="/img/Avatar_vinh.png" alt='Avatar' className="w-12 h-12 rounded-full mr-4" />
                        <div className="text-xl font-bold">Nguyễn Quang Vinh</div>
                    </div>
                    <div className="flex flex-col font-bold w-full text-lg">
                        <div className="flex flex-col w-full">
                            <div className="flex items-center">
                                <img src="/img/person.svg" alt='Person' className="w-6 h-6 mr-2" />
                                Tài khoản
                            </div>
                            <div className="ml-8 font-normal">
                                <div className={`my-2 ${page == "profile" ? "text-[#EDB24E] font-bold" : ""}`}>
                                    <Link href="/Profile">Hồ sơ </Link></div>
                                <div className={`my-2 ${page == "address" ? "text-[#EDB24E] font-bold" : ""}`}>
                                    <Link href="/Profile/Address">Địa chỉ </Link></div>
                                <div className={`my-2 ${page == "changepass" ? "text-[#EDB24E] font-bold" : ""}`}>
                                    <Link href="/Profile/ChangePass">Đổi mật khẩu</Link></div>
                            </div>
                        </div>
                        <div className="flex items-center mb-4">
                            <img src="/img/order.svg" alt='Order' className={` w-6 h-6 mr-2 ${page == "order" ? "text-[#EDB24E] font-bold" : ""}`} />
                            <Link href="/Profile/OrderHistory">Lịch sử đơn hàng</Link>
                        </div>
                        <div className="flex items-center mb-4">
                            <img src="/img/notification.svg" alt='Notification' className={` w-6 h-6 mr-2 ${page == "notify" ? "text-[#EDB24E] font-bold" : ""}`} />
                            <Link href="/Profile/NotifySetting">Cài đặt thông báo</Link>
                        </div>
                        <div className="flex items-center">
                            <img src="/img/logout.svg" alt='Logout' className={` w-6 h-6 mr-2 ${page == "logout" ? "text-[#EDB24E] font-bold" : ""}`} />
                            <Link href="/Profile/Logout">Đăng xuất</Link>
                        </div>
                    </div>
                </div>
                {/* Right */}
                <div className="flex flex-col w-full bg-white py-4 px-12 my-8 mr-12 rounded-lg shadow-lg">
                    <div className="mb-2 font-nunito font-bold text-2xl">Đổi mật khẩu</div>
                    <div className='border border-[#C5C5CF] w-full mr-5 mx-4'></div>
                    <div className="flex flex-col py-2 mr-8">
                        {passwordFields.map((field) => (
                            <div className="flex items-center my-2" key={field.label}>
                                <div className="font-nunito w-1/4">{field.label}</div>
                                <div className="relative flex items-center font-nunito w-1/2 text-lg">
                                    <input
                                        type={hidepass[field.hidepassIndex] ? "text" : "password"}
                                        className='p-2 pl-4 w-full rounded border border-gray-300'
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