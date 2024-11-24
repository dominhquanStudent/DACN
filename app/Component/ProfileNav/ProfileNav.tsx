import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import getInfo from '@/hooks/getInfo';
import { deleteCookie } from 'cookies-next';
import axios from "@/api/axios";
export default function ProfileNav() {
  const [data, setData] = useState<any>({
    avatar: {
      public_id: '',
      url: ''
    },
    _id: '',
    userName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    gender: '',
    birthday: '',
    token: [],
    role: 'user',
  });

  const fetchData = async () => {
    const Data = await getInfo();
    setData(Data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pathname = usePathname();
  const handleLogout = async () => {
    try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
        await axios.post(`${baseURL}/auth/logout`);
        deleteCookie("jwt");
        deleteCookie("refreshToken", { httpOnly: true, sameSite: 'none', secure: true, path: '/' });
        // Clear the auth state
      } catch (error) {
        console.error('Error logging out:', error);
      }
      // Redirect to login page
      window.location.href = '/Main';
  }
  return (
    <div className="flex flex-col pl-12 mt-12 w-4/12 font-nunito">
      {/* Left */}
      <div className="flex items-center w-full mb-4">
        <img
          src={data.avatar ? data.avatar.url : "https://res.cloudinary.com/dzm879qpm/image/upload/v1724509562/defautProduct_mlmwsw.png"}
          alt='Avatar'
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="text-xl font-bold">{data.userName ? data.userName : data.email}</div>
      </div>
      <div className="flex flex-col font-bold w-full text-lg">
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <img loading='lazy' src="/img/person.svg" alt='Person' className="w-6 h-6 mr-2" />
            Tài khoản
          </div>
          <div className="ml-8 font-normal">
            <div className={`my-2 ${pathname == "/Profile" ? "text-[#EDB24E] font-bold" : ""}`}>
              <Link href="/Profile">Hồ sơ </Link>
            </div>
            <div className={`my-2 ${pathname == "/Profile/ChangePass" ? "text-[#EDB24E] font-bold" : ""}`}>
              <Link href="/Profile/ChangePass">Đổi mật khẩu</Link>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <img src="/img/order.svg" alt='Order' className={`w-6 h-6 mr-2`} />
          <Link href="/Profile/Order" className={`${pathname == "/Profile/Order" ? "text-[#EDB24E] font-bold" : ""}`}> Đơn hàng</Link>
        </div>
        <div className="flex items-center mb-4">
          <img src="/img/notification.svg" alt='Notification' className={`w-6 h-6 mr-2 ${pathname.startsWith("/Profile/Notification") ? "text-[#EDB24E] font-bold" : ""}`} />
          <Link href="/Profile/Notification" className={`${pathname.startsWith("/Profile/Notification") ? "text-[#EDB24E] font-bold" : ""}`}>Thông báo</Link>
        </div>
            <button className ="flex items-center" onClick={handleLogout}>
                <img src="/img/logout.svg" alt='Logout' className={`w-6 h-6 mr-2`} />
                <div>Đăng xuất</div>
            </button>
      </div>
    </div>
  );
}