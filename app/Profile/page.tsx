'use client';
import Header from "@/app/Component/Header/Header";
import Footer from '@/app/Component/Footer/Footer';
import ProfileNav from "@/app/Component/ProfileNav/ProfileNav";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function Page() {
    const [startDate, setStartDate] = useState(new Date());
    const pulldata = {
        tendangnhap: 'vinhnq123',
        tenhienthi: 'Nguyễn Quang Vinh',
        email: 'vinhnq@gmail.com',
        sdt: "",
        gender: "male",
    };
    const [data, setdata] = useState(pulldata)
    const handleSave = () => {
        //......
    }
    const changeAvatar = () => {
        //......
    }
    return (
        <div className="flex flex-col w-full ">
            <Header />
            <div className="flex bg-[#DFF3FF] w-full ">
                <ProfileNav />
                {/* Right */}
                <div className="flex flex-col w-full bg-white py-4 px-12 my-8 mr-12 rounded-lg shadow-lg">
                    <div className="mb-2 font-nunito font-bold text-2xl">Hồ sơ của tôi</div>
                    <div className='border border-[#C5C5CF] w-full mr-5 mx-4'></div>
                    <div className="flex py-2">
                        {/* Left */}
                        <div className="flex-grow flex-col mr-8">
                            <div className="flex items-center my-4">
                                <div className="font-nunito w-1/4">Tên đăng nhập</div>
                                <input type="text" value={data.tendangnhap ? data.tendangnhap : ""} className="p-2 pl-4 font-nunito 
                                    rounded border border-gray-300 w-full text-lg"  onChange={e => setdata({ ...data, tendangnhap: e.target.value })} placeholder="Chưa có" />
                            </div>
                            <div className="flex items-center my-4">
                                <div className="font-nunito w-1/4">Tên hiển thị</div>
                                <input type="text" value={data.tenhienthi ? data.tenhienthi : ""} className="p-2 pl-4 font-nunito 
                                rounded border border-gray-300 w-full text-lg" onChange={e => setdata({ ...data, tenhienthi: e.target.value })} placeholder="Chưa có" />
                            </div>
                            <div className="flex items-center my-4">
                                <div className="font-nunito w-1/4">Email</div>
                                <input type="text" value={data.email ? data.email : ""} className="p-2 pl-4 font-nunito 
                                rounded border border-gray-300 w-full text-lg" onChange={e => setdata({ ...data, email: e.target.value })} placeholder="Chưa có" />
                            </div>
                            <div className="flex items-center my-4">
                                <div className="font-nunito w-1/4">Số điện thoại</div>
                                <input type="text" value={data.sdt ? data.sdt : ""} className="p-2 pl-4 font-nunito 
                                rounded border border-gray-300 w-full text-lg" onChange={e => setdata({ ...data, sdt: e.target.value })} placeholder="Chưa có" />
                            </div>
                            <div className="flex items-center my-4">
                                <div className="font-nunito w-1/4">Giới tính</div>
                                <div className="flex items-center">
                                    <input type="radio" id="male" name="gender" value="male" checked={data.gender === "male"}
                                        onChange={e => setdata({ ...data, gender: e.target.value })}
                                    />
                                    <label htmlFor="male" className="ml-2">Nam</label>
                                </div>
                                <div className="flex items-center ml-8">
                                    <input type="radio" id="female" name="gender" value="female" checked={data.gender === "female"}
                                        onChange={e => setdata({ ...data, gender: e.target.value })}
                                    />
                                    <label htmlFor="female" className="ml-2">Nữ</label>
                                </div>
                                <div className="flex items-center ml-8">
                                    <input type="radio" id="other" name="gender" value="other" checked={data.gender === "other"}
                                        onChange={e => setdata({ ...data, gender: e.target.value })}
                                    />
                                    <label htmlFor="other" className="ml-2">Khác</label>
                                </div>
                            </div>
                            <div className="flex items-center my-4">
                                <div className="font-nunito w-1/4">Ngày sinh</div>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: Date) => setStartDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="p-2 pl-4 font-nunito rounded border border-gray-300 text-lg w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center mt-8">
                                <button type="submit" className="bg-[#EDB24E] text-white font-nunito p-2 text-xl rounded w-1/3" onClick={handleSave}>Lưu</button>
                            </div>
                        </div>
                        {/* Line */}
                        <div className="border-l-2 border-gray-300 mx-4 my-8"></div>
                        {/* Right */}
                        <div className="flex flex-col w-1/3 items-center justify-center">
                            <div className="flex flex-col items-center mt-8 w-full">
                                <img src="/img/Avatar_vinh.png" alt='Avatar' className="w-20 h-20 rounded-full mr-4 mb-4" />
                                <button type="submit" className="bg-[#EDB24E] text-white font-nunito p-2 text-lg rounded w-1/2" onClick={changeAvatar}>Thay đổi Avatar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page