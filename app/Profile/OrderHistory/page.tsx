'use client';
import Header from "@/app/Component/Header/Header";
import Footer from '@/app/Component/Footer/Footer';
import ProfileNav from "@/app/Component/ProfileNav/ProfileNav";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
function Page() {
    const [sort, setSort] = useState('all')
    const handleSort = (e: any) => {
        setSort(e)
    }
    return (
        <div className="flex flex-col w-full ">
            <Header />
            <div className="flex bg-[#DFF3FF] w-full " style={{ minHeight: '80vh' }}>
                <ProfileNav />
                {/* Right */}
                <div className="flex flex-col w-full bg-white py-4 px-12 my-8 mr-12 rounded-lg shadow-lg">
                    <div className="mb-4 font-nunito font-bold text-2xl">Lịch sử đơn hàng</div>
                    <div className="flex w-full items-center justify-around border border-slate-200 rounded-md shadow-xl font-k2d text-lg">
                        <button className={`px-4 py-2 rounded w-full ${sort == "all" ? "text-[#EDB24E] font-bold" : ""}`}
                            onClick={() => handleSort("all")}>Tất cả</button>
                        <button className={`px-4 py-2 rounded w-full ${sort == "wait" ? "text-[#EDB24E] font-bold" : ""}`}
                            onClick={() => handleSort("wait")}>Chờ giao hàng</button>
                        <button className={`px-4 py-2 rounded w-full ${sort == "complete" ? "text-[#EDB24E] font-bold" : ""}`}
                            onClick={() => handleSort("complete")}>Đã hoàn thành</button>
                        <button className={`px-4 py-2 rounded w-full ${sort == "cancel" ? "text-[#EDB24E] font-bold" : ""}`}
                            onClick={() => handleSort("cancel")}>Đã hủy</button>
                    </div>
                    {/* Map Order */}
                    <div className="flex flex-col mt-4 py-2 border border-[#969090] rounded-md shadow-xl font-nunito w-full">
                        <div className="text-lg font-bold py-2 text-right mr-16 text-[#ff0000]">Đã giao hàng</div>
                        {/* Map Product */}
                        <div className="flex flex-col w-full items-center">
                            <div className='border border-[#C5C5CF] w-11/12 '></div>
                            <div className="flex w-11/12 justify-between py-2">
                                <div className="flex w-10/12">
                                    <img src="./../img/showergel.png" className="h-20 w-auto" ></img>
                                    <div className="flex flex-col ml-4">
                                        <div className="text-lg">
                                            Sữa tắm dưỡng da cho Chó Sanol</div>
                                        <div className="text-sm ">1000ml</div>
                                        <div className="text-sm ">x 2</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center w-1/6 ">
                                    <div className="text-lg font-bold">400.000đ</div>
                                </div>
                            </div>
                        </div>
                        <div className='border border-[#C5C5CF] w-full '></div>
                        <div className="flex justify-between py-2 w-full">
                            {/* Left */}
                            <div className="flex items-center justify-center w-8/12">
                                <div className="w-1/2 flex justify-center">
                                    <button className="bg-[#EDB24E] text-white font-nunito p-2 rounded-md w-1/2">Mua lại</button>
                                </div>
                                <div className="w-1/2 flex justify-center">
                                    <button className="bg-[#FC0E0E] text-white font-nunito p-2 rounded-md w-1/2">Trả hàng</button>
                                </div>
                            </div>
                            {/* Right*/}
                            <div className="flex-grow flex-col text-lg ml-4">
                                <div className="flex w-full">
                                    <div className="w-6/12">Giảm giá: </div>
                                    <div className="font-bold">40000 đ</div>
                                </div>
                                <div className="flex w-full">
                                    <div className="w-6/12">Thành tiền: </div>
                                    <div className="text-[#ff0000] font-bold">360000 đ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 py-2 border border-[#969090] rounded-md shadow-xl font-nunito w-full">
                        <div className="text-lg font-bold py-2 text-right mr-16 text-[#ff0000]">Đã hủy</div>
                        {/* Map Product */}
                        <div className="flex flex-col w-full items-center">
                            <div className='border border-[#C5C5CF] w-11/12 '></div>
                            <div className="flex w-11/12 justify-between py-2">
                                <div className="flex w-10/12">
                                    <img src="./../img/showergel.png" className="h-20 w-auto" ></img>
                                    <div className="flex flex-col ml-4">
                                        <div className="text-lg">
                                            Sữa tắm dưỡng da cho Chó Sanol</div>
                                        <div className="text-sm ">1000ml</div>
                                        <div className="text-sm ">x 1</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center w-1/6 ">
                                    <div className="text-lg font-bold">200.000đ</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full items-center">
                            <div className='border border-[#C5C5CF] w-11/12 '></div>
                            <div className="flex w-11/12 justify-between py-2">
                                <div className="flex w-10/12">
                                    <img src="./../img/dogfood.png" className="h-20 w-auto" ></img>
                                    <div className="flex flex-col ml-4">
                                        <div className="text-lg">
                                            Thức ăn cho chó Granola</div>
                                        <div className="text-sm ">500g</div>
                                        <div className="text-sm ">x 2</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center w-1/6 ">
                                    <div className="text-lg font-bold">250.000đ</div>
                                </div>
                            </div>
                        </div>
                        <div className='border border-[#C5C5CF] w-full '></div>
                        <div className="flex justify-between py-2 w-full">
                            {/* Left */}
                            <div className="flex items-center justify-center w-8/12">
                                <div className="w-1/2 flex justify-center">
                                    <button className="bg-[#EDB24E] text-white font-nunito p-2 rounded-md w-1/2">Mua lại</button>
                                </div>
                            </div>
                            {/* Right*/}
                            <div className="flex-grow flex-col text-lg ml-4">
                                <div className="flex w-full">
                                    <div className="w-6/12">Giảm giá: </div>
                                    <div className="font-bold">50000 đ</div>
                                </div>
                                <div className="flex w-full">
                                    <div className="w-6/12">Thành tiền: </div>
                                    <div className="text-[#ff0000] font-bold">400000 đ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 py-2 border border-[#969090] rounded-md shadow-xl font-nunito w-full">
                        <div className="text-lg font-bold py-2 text-right mr-16 text-[#ff0000]">Chờ giao hàng</div>
                        {/* Map Product */}
                        <div className="flex flex-col w-full items-center">
                            <div className='border border-[#C5C5CF] w-11/12 '></div>
                            <div className="flex w-11/12 justify-between py-2">
                                <div className="flex w-10/12">
                                    <img src="./../img/showergel.png" className="h-20 w-auto" ></img>
                                    <div className="flex flex-col ml-4">
                                        <div className="text-lg">
                                            Sữa tắm dưỡng da cho Chó Sanol</div>
                                        <div className="text-sm ">500ml</div>
                                        <div className="text-sm ">x 1</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center w-1/6 ">
                                    <div className="text-lg font-bold">100.000đ</div>
                                </div>
                            </div>
                        </div>
                        <div className='border border-[#C5C5CF] w-full '></div>
                        <div className="flex justify-between py-2 w-full">
                            {/* Left */}
                            <div className="flex items-center justify-center w-8/12">
                                <div className="w-1/2 flex justify-center">
                                    <button className="bg-[#EDB24E] text-white font-nunito p-2 rounded-md w-1/2">Mua lại</button>
                                </div>
                                <div className="w-1/2 flex justify-center">
                                    <button className="bg-[#FC0E0E] text-white font-nunito p-2 rounded-md w-1/2">Hủy đơn hàng</button>
                                </div>
                            </div>
                            {/* Right*/}
                            <div className="flex-grow flex-col text-lg ml-4">
                                <div className="flex w-full">
                                    <div className="w-6/12">Giảm giá: </div>
                                    <div className="font-bold">0 đ</div>
                                </div>
                                <div className="flex w-full">
                                    <div className="w-6/12">Thành tiền: </div>
                                    <div className="text-[#ff0000] font-bold">100000 đ</div>
                                </div>
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