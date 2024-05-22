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
    var data = [
            {
                orderid: 1,
                status: "Đã giao hàng",
                product: [
                    {
                        name: "Sữa tắm dưỡng da cho Chó Sanol",
                        img: "./../img/showergel.png",
                        detail: "1000ml",
                        price: 200000,
                        quantity: 2,
                        discount: 0,
                    },
                ],
                discount: 40000,
            },
            {
                orderid: 2,
                status: "Đã hủy",
                product: [
                    {
                        name: "Sữa tắm dưỡng da cho Chó Sanol",
                        img: "./../img/showergel.png",
                        detail: "1000ml",
                        price: 200000,
                        quantity: 1,
                        discount: 20000,
                    },
                    {
                        name: "Thức ăn cho cho Granola",
                        img: "./../img/dogfood.png",
                        detail: "500g",
                        price: 125000,
                        quantity: 2,
                        discount: 0,
                    },
                ],
                discount: 50000,
            },
            {
                orderid: 3,
                status: "Chờ giao hàng",
                product: [
                    {
                        name: "Sữa tắm dưỡng da cho Chó Sanol",
                        img: "./../img/showergel.png",
                        detail: "1000ml",
                        price: 200000,
                        quantity: 1,
                        discount: 20000,
                    },
                ],
                discount: 10000,
            },
    ]
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
                    {
    data.map((order, index) => (
        <div key={index} className="flex flex-col mt-4 py-2 border border-[#969090] rounded-md shadow-xl font-nunito w-full">
            <div className="text-lg font-bold py-2 text-right mr-16 text-[#ff0000]">{order.status}</div>
            {/* Map Product */}
            {order.product.map((product, productIndex) => (
                <div key={productIndex} className="flex flex-col w-full items-center">
                    <div className='border border-[#C5C5CF] w-11/12 '></div>
                    <div className="flex w-11/12 justify-between py-2">
                        <div className="flex w-10/12">
                            <img src={product.img} className="h-20 w-auto" ></img>
                            <div className="flex flex-col ml-4">
                                <div className="text-lg">
                                    {product.name}</div>
                                <div className="text-sm ">{product.detail}</div>
                                <div className="text-sm ">x {product.quantity}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-1/6 ">
                            <div className="text-lg font-bold">{(product.price * product.quantity).toLocaleString('vi-VN')}đ</div>
                        </div>
                    </div>
                </div>
            ))}
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
                        <div className="font-bold">{(order.product.reduce((total, product) => total + product.discount * product.quantity, 0) + order.discount).toLocaleString('vi-VN')} đ</div>
                    </div>
                    <div className="flex w-full">
                        <div className="w-6/12">Thành tiền: </div>
                        <div className="text-[#ff0000] font-bold">{(order.product.reduce((total, product) => total + (product.price - product.discount) * product.quantity, 0)-order.discount).toLocaleString('vi-VN')} đ</div>
                    </div>
                </div>
            </div>
        </div>
    ))
}
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page