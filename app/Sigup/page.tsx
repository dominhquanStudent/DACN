'use client';
import Footer from '../Component/Footer/Footer';
import Logo from '../../public/img/logo';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
function Page() {
    const router = useRouter();
    const [isPopup, setIsPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const validateEmail = (email:String) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const handleSubmit = () => {
        if (validateEmail(email)) {
            // Email is valid
            // You can proceed with your logic
            setEmailError(''); // Clear the error message
            setIsPopup(true);
        } else {
            // Email is not valid
            // You can show an error message
            setEmailError('Email is not valid');
        }
    }
    return (
        <>
        <div className="flex flex-col w-full" style={{ opacity: isPopup ? '0.5' : '1' }}>
        <div className="flex items-center">
                <img src={"./img/logo.png"} alt="Logo" className='scale-75 ml-8' />
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
                <div className='bg-white w-2/6 rounded-xl ml-16 px-12 pt-8 flex flex-col ' style={{ height: '60vh' }}>
                    <div className='text-2xl font-bold mb-6'>Đăng ký </div>
                    <input 
  type="email" 
  value={email} 
  onChange={(e) => setEmail(e.target.value)} 
  className="p-2 pl-4 font-nunito rounded border border-gray-300 w-full text-lg" 
  placeholder="Email" 
/>
{emailError && <div className='text-[#ff0000] my-2 ml-4'>{emailError}</div>}
<button type="submit" className={`bg-[#296EB6] text-white font-nunito p-2 text-xl rounded w-full ${emailError ? '' : 'mt-6'}`} onClick={handleSubmit}>Đăng ký</button>                    <div className='mt-6 text-[16px] font-bold flex flex-row items-center justify-center'>
                        <div className='border border-[#C5C5CF] w-36 mr-5'></div>
                        <div className='text-[#C5C5CF]'>Hoặc </div>
                        <div className='border border-[#C5C5CF] w-36 ml-5'></div>
                    </div>
                    <div className='flex justify-center mt-6 w-full'>
                        <button className='flex items-center justify-center border-2 border-blue-600 text-blue-600 rounded-md p-2 mr-4 w-1/2'>
                            <img src="./img/facebook.png" alt='Facebook logo' className='mr-2' />
                            Facebook
                        </button>
                        <button className='flex items-center justify-center border-2 border-red-600 text-red-600 rounded-md p-2 ml-4 w-1/2'>
                            <img src="./img/google.png" alt='Google logo' className='mr-2' />
                            Google
                        </button>
                    </div>
                    <div className='mt-6 font-k2d text-lg text-center'>Đã có tài khoản,
                        <button className=' text-[#FC0E0E] rounded-md p-2 font-bold' onClick={() => router.push('/Login')}>Đăng nhập</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        {isPopup && (
                <>
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 999,
                    }}></div>
                    <div style={{
                        opacity: 1,
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        border: '1px solid black',
                        borderRadius: '10px',
                        zIndex: 1000,
                    }} className='p-4 text-center text-black'>
     Tiếp theo chúng tôi sẽ gửi mã OTP đến email <br /> <text className='font-bold'>{email}</text> <br />
                        <button type="submit" className="bg-[#296EB6] text-white font-nunito text-xl rounded w-1/3 mt-2" onClick={() => router.push('Sigup/next')}>Tiếp tục</button>
                    </div>
                </>
            )}
    </>

    )
}

export default Page