'use client';
import Footer from '../../Component/Footer/Footer';
import Logo from '../../../public/img/logo';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
function Page() {
    const router = useRouter();
    
    const [step, setStep] = useState(1);


    return (
        <div className="flex flex-col w-full ">
            <div className="flex items-center">
                <img src={"./../img/logo.png"} alt="Logo" className='scale-75 ml-8' />
                <button onClick={() => router.push('/Main')}>
                    <div className="ml-4 font-nunito text-4xl text-[#1286CE] font-bold">BK</div>
                </button>
                <button onClick={() => router.push('/Main')}>
                    <div className="font-nunito text-4xl text-[#EDB24E] font-bold">Petcare</div>
                </button>
                <div className="ml-8 font-nunito text-3xl font-bold">Đăng ký</div>
            </div>
            <div className="w-full bg-[#296EB6] flex pt-16" style={{ height: '90vh' }}>
                <div className='flex flex-col items-center w-1/2 mt-8'>
                    <Logo />
                    <div className="flex items-center mt-8">
                        <div className="font-nunito text-5xl text-[#1286CE] font-bold">BK</div>
                        <div className="font-nunito text-5xl text-[#EDB24E] font-bold">Petcare</div>
                    </div>
                    <div className="mx-32 mt-12 font-nunito text-3xl text-[#ffffff] text-center ">Cửa hàng dịch vụ chăm sóc thú cưng hàng đầu TP.HCM</div>
                </div>
                <div className='bg-white w-2/6 rounded-xl ml-16 px-12 pt-8 flex flex-col ' style={{ height: '70vh' }}>
                    <div className='text-2xl font-bold mb-6'>Đăng ký </div>
                    <div className='text-lg text-[#969090] mb-6 text-center font-bold'>
                        Nhập mã xác nhận
                        <div className='font-normal'>
                        Mã xác nhận sẽ được gửi qua Email <br/> user@gmail.com
                        </div>
                    </div>
                    <input type="text" className="p-2 pl-4 mb-6 font-nunito rounded border border-gray-300 w-full text-lg" placeholder="Email/SĐT" />
                    <div className='mt-6 font-k2d text-lg text-center'>Chưa nhận được,
                        <button className=' text-[#FC0E0E] rounded-md p-2 font-bold' onClick={() => router.push('/Sigup')}>Gửi lại</button>
                    </div>
                    <button type="submit" className="bg-[#296EB6] text-white font-nunito p-2 text-xl rounded w-full" onClick={() => router.push('/')}>Kế tiếp</button>

                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Page