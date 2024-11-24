'use client';
import Footer from '../../Component/Footer/Footer';
import Logo from '../../../public/img/logo';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from '@/api/axios';

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
            try {
                const response = axios.post('/account/forgotpass', { email: email });
                console.log(response);
            } catch (error) {
                console.error('Error sending email:', error);
            }
        } else {
            setEmailError('Email không hợp lệ');
        }
    }

    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <div className="flex flex-wrap items-center p-4 md:p-0">
                <img src={"./../img/logo.png"} alt="Logo" className="w-16 md:w-20 md:ml-8" />
                <button onClick={() => router.push('/Main')}>
                    <div className="ml-2 md:ml-4 font-nunito text-2xl md:text-4xl text-[#1286CE] font-bold">BK</div>
                </button>
                <button onClick={() => router.push('/Main')}>
                    <div className="font-nunito text-2xl md:text-4xl text-[#EDB24E] font-bold">Petcare</div>
                </button>
                <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-8 font-nunito text-xl md:text-3xl font-bold text-center md:text-left">
                    Lấy mật khẩu
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full bg-[#296EB6] flex flex-col md:flex-row p-4 md:pt-16" style={{ minHeight: '90vh' }}>
                {/* Left Section */}
                <div className="flex flex-col items-center w-full md:w-1/2 mt-4 md:mt-8">
                    <div className="w-48 md:w-auto">
                        <Logo />
                    </div>
                    <div className="flex items-center mt-4 md:mt-8">
                        <div className="font-nunito text-3xl md:text-5xl text-[#1286CE] font-bold">BK</div>
                        <div className="font-nunito text-3xl md:text-5xl text-[#EDB24E] font-bold">Petcare</div>
                    </div>
                    <div className="mx-4 md:mx-32 mt-6 md:mt-12 font-nunito text-xl md:text-3xl text-white text-center">
                        Cửa hàng dịch vụ chăm sóc thú cưng hàng đầu TP.HCM
                    </div>
                </div>

                {/* Form Section */}
                {step === 1 && (
                    <div className="bg-white w-full md:w-2/5 rounded-xl mt-8 md:mt-0 md:ml-16 p-6 md:px-12 md:pt-8">
                        <div className="text-xl md:text-2xl font-bold mb-6 md:mb-12 text-center">Lấy mật khẩu</div>
                        <div className="text-lg md:text-xl text-[#969090] mb-6 md:mb-12 text-center">
                            Mật khẩu tạm thời sẽ được gửi <br/> qua Email của bạn
                        </div>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="p-2 pl-4 font-nunito rounded border border-gray-300 w-full text-base md:text-lg"  
                            placeholder="Email" 
                        />
                        {emailError && <div className="text-[#ff0000] my-2 ml-4">{emailError}</div>}
                        <button 
                            type="submit" 
                            className={`bg-[#296EB6] text-white font-nunito p-2 text-lg md:text-xl rounded w-full 
                            ${emailError ? 'mt-4' : 'mt-8 md:mt-12'}`} 
                            onClick={handleSubmit}
                        >
                            Lấy mật khẩu
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-white w-full md:w-2/5 rounded-xl mt-8 md:mt-0 md:ml-16 p-6 md:px-12 md:pt-8">
                        <div className="text-xl md:text-2xl font-bold mb-4 text-center">Lấy mật khẩu</div>
                        <div className="text-lg md:text-xl text-[#F29A2E] mb-4 text-center font-bold">
                            Gửi yêu cầu lấy mật khẩu <br/> thành công
                        </div>
                        <div className="w-full flex items-center justify-center mb-6 md:mb-8">
                            <img src={"./../img/check.svg"} alt="Check" className="w-12 h-12 md:w-16 md:h-16" />
                        </div>
                        <div className="text-base md:text-lg text-[#969090] mb-4 text-center">
                            Mật khẩu tạm thời đã gửi về Email <br/> {email} <br/> Hãy đổi lại mật khẩu sau khi đăng nhập
                        </div>
                        <button 
                            type="submit" 
                            className="bg-[#296EB6] text-white font-nunito p-2 text-lg md:text-xl rounded w-full" 
                            onClick={() => router.push('/Login')}
                        >
                            Đăng nhập ngay
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Page;