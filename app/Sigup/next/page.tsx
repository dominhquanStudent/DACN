'use client';
import Footer from '../../Component/Footer/Footer';
import Logo from '../../../public/img/logo';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import axios from '@/api/axios';

function Page({
    searchParams,
}: { searchParams: { email: string }; }) {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [combinedOtp, setCombinedOtp] = useState('');
    const [password, setPassword] = useState('');
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const [step, setStep] = useState(1);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOtp = [...otp];
        newOtp[index] = event.target.value;
        setOtp(newOtp);
        if (event.target.value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
        // Combine the OTP digits into a single string
        const otpString = newOtp.join('');
        setCombinedOtp(otpString);
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = event.clipboardData.getData('text');
        if (pasteData.length === otp.length) {
            const newOtp = pasteData.split('');
            setOtp(newOtp);
            newOtp.forEach((value, index) => {
                if (inputRefs.current[index]) {
                    inputRefs.current[index]!.value = value;
                }
            });
            setCombinedOtp(newOtp.join(''));
            inputRefs.current[otp.length - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        try {
            const response = await axios.post('/otp/verify', {
                email: searchParams.email,
                otp: combinedOtp,
                job: 'register',
            });
            console.log(response);
            if (response.status === 200) {
                setStep(step + 1);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const handleResend = async () => {
        // Implement resend logic here
    };

    const handleCreateAccount = async () => {
        try {
            const response = await axios.post('/account/create', {
                email: searchParams.email,
                password: password,
                role: 'user',
            });
            if (response.status === 200) {
                setStep(step + 1);
            }
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    useEffect(() => {
        if (combinedOtp.length === 4) {
            buttonRef.current?.focus();
        }
    }, [combinedOtp]);

    return (
        <div className="flex flex-col w-full ">
            <div className="flex items-center">
                <img src={"./../img/logo.png"} alt="Logo" className='w-20 ml-8' />
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
                {step === 1 && (
                    <div className='bg-white w-2/6 rounded-xl ml-16 px-12 pt-8 flex flex-col' style={{ height: '70vh' }}>
                        <div className='text-2xl font-bold mb-6'>Đăng ký </div>
                        <div className='text-lg text-[#969090] mb-6 text-center font-bold'>
                            Nhập mã xác nhận
                            <div className='font-normal'>
                                Mã xác nhận sẽ được gửi qua Email <br /> {searchParams.email}
                            </div>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }}>
                            <div className="flex justify-center">
                                {otp.map((value, index) => (
                                    <input
                                        key={index}
                                        type="tel"
                                        className="p-2 mx-4 font-nunito rounded border border-gray-300 w-12 text-lg text-center"
                                        value={value}
                                        onChange={handleChange(index)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        maxLength={1}
                                        pattern="[0-9]*"
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                    />
                                ))}
                            </div>
                            <div className='mt-6 font-k2d text-lg text-center'>Chưa nhận được,
                                <button className=' text-[#FC0E0E] rounded-md p-2 font-bold' onClick={() => router.push('/Sigup')}>Gửi lại</button>
                            </div>
                            <button type="submit" className="bg-[#296EB6] text-white font-nunito p-2 text-xl rounded w-full" ref={buttonRef}>Kế tiếp</button>
                        </form>
                    </div>
                )}
                {step === 2 && (
                    <div className='bg-white w-2/6 rounded-xl ml-16 px-12 pt-8 flex flex-col' style={{ height: '70vh' }}>
                        <div className='text-2xl font-bold mb-6'>Đăng ký </div>
                        <div className='text-xl text-[#969090] mb-12 text-center font-bold'>
                            Nhập mật khẩu
                            <div className='text -lg font-normal mt-4'>
                                Cuối cùng hãy tạo mật khẩu <br /> cho tài khoản của bạn
                            </div>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleCreateAccount(); }}>
                            <div>
                                <input type="password" className="p-2 pl-4 mb-12 w-full font-nunito text-lg rounded border border-gray-300" placeholder="Mật khẩu"
                                    value={password} onChange={handlePasswordChange} />
                            </div>
                            <button type="submit" className="bg-[#296EB6] text-white font-nunito p-2 text-xl rounded w-full" ref={buttonRef}>Hoàn thành</button>
                        </form>
                    </div>
                )}
                {step === 3 && (
                    <div className='bg-white w-2/6 rounded-xl ml-16 px-12 pt-8 flex flex-col items-center' style={{ height: '60vh' }}>
                        <div className='text-2xl font-bold mb-6'>Đăng ký </div>
                        <div className='text-3xl text-[#F29A2E] mb-4 mt-4 text-center font-bold'>
                            Chúc mừng, bạn đã <br /> đăng ký thành công
                        </div>
                        <img src="https://res.cloudinary.com/dzm879qpm/image/upload/v1730968243/Dachshund_Dog_Love_Heart_houyzu.jpg" loading="lazy"
                            className="w-[200px] h-[200px] rounded-full" alt="Dachshund_Dog_Love_Heart" />
                        <button type="submit" className="bg-[#296EB6] text-white font-nunito p-2 text-xl rounded w-full mt-4" ref={buttonRef} onClick={() => router.push("/Login")}>Đăng nhập ngay</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>

    )
}

export default Page;