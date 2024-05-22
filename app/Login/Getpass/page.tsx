'use client';
import Footer from '../../Component/Footer/Footer';
import Logo from '../../../public/img/logo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
function Page() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const validateEmail = (email:String) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const handleSubmit = () => {
        if (validateEmail(email)) {
            setEmailError(''); 
            setStep(2);
        } else {
            setEmailError('Email không hợp lệ');
        }
    }
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
                <div className="ml-8 font-nunito text-3xl font-bold">Lấy mật khẩu</div>
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
                {step === 1 && (
                <div className='bg-white w-2/6 rounded-xl ml-16 px-12 pt-8 flex flex-col ' style={{ height: '60vh' }}>
                    <div className='text-2xl font-bold mb-12 w-full text-center'>Lấy mật khẩu </div>
                    <div className='text-xl text-[#969090] mb-12 text-center '>
                        Mật khẩu tạm thời sẽ được gửi <br/> qua Email của bạn
                    </div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                    className="p-2 pl-4 font-nunito rounded border border-gray-300 w-full text-lg"  placeholder="Email" />
{emailError && <div className='text-[#ff0000] my-2 ml-4'>{emailError}</div>}
<button type="submit" className={`bg-[#296EB6] text-white font-nunito p-2 text-xl rounded w-full 
${emailError ? '' : 'mt-12'}`} onClick={handleSubmit}>Lấy mật khẩu</button>
                </div>)}
                {step === 2 && (
                <div className='bg-white w-2/6 rounded-xl ml-16 px-12 pt-8 flex flex-col ' style={{ height: '60vh' }}>
                    <div className='text-2xl font-bold mb-4 w-full text-center'>Lấy mật khẩu </div>
                    <div className='text-xl text-[#F29A2E] mb-4 text-center font-bold '>
                        Gửi yêu cầu lấy mật khẩu <br/> thành công
                    </div>
                    <div className='w-full flex items-center justify-center mb-8'>
                    <img src={"./../img/check.svg"} alt="Check" className='w-16 h-16' />
                    </div>
                    <div className='text-lg text-[#969090] mb-4 text-center '>
                        Mật khẩu tạm thời đã gửi về Email <br/> {email}
                    </div>
                    <button type="submit" className="bg-[#296EB6] text-white font-nunito p-2 text-xl rounded w-full" 
                        onClick={() => router.push('/Login')}>Đăng nhập ngay</button>
                </div>
            )}
                
            </div>
            <Footer />
        </div>
    )
}

export default Page