'use client';
import Footer from '../../Component/Footer/Footer';
import Logo from '../../../public/img/logo';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
function Page() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [combinedOtp, setCombinedOtp] = useState('');
    const inputRefs = Array.from({ length: 4 }).map(() => useRef<HTMLInputElement | null>(null));

    const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOtp = [...otp];
        newOtp[index] = event.target.value;
        setOtp(newOtp);
        if (event.target.value && index < otp.length - 1) {
            inputRefs[index + 1].current?.focus();
        }
        // Combine the OTP digits into a single string
        const otpString = newOtp.join('');
        setCombinedOtp(otpString);
    };
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
                    <div className="flex justify-between mb-6">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="tel"
                            className="p-2 font-nunito rounded border border-gray-300 w-12 text-lg text-center"
                            value={value}
                            onChange={handleChange(index)}
                            maxLength={1}
                            pattern="[0-9]*"
                            ref={inputRefs[index]}
                        />
                    ))}
                </div>
                    <div className='mt-6 font-k2d text-lg text-center'>Chưa nhận được,
                        <button className=' text-[#FC0E0E] rounded-md p-2 font-bold' onClick={() => router.push('/Sigup')}>Gửi lại</button>
                    </div>
                    <button type="submit" className="bg-[#296EB6] text-white font-nunito p-2 text-xl rounded w-full" onClick={() =>{}}>Kế tiếp</button>

                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Page