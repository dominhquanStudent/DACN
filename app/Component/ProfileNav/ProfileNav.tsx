import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { lazy, useEffect, useState } from 'react';
import getInfo from '@/hooks/getInfo';
export default function ProfileNav() {
    const [data, setData] = useState<any>({
      avatar: {
        public_id: '',
        url: ''
      },
      _id: '',
      userName: null,
      email: '',
      password: '',
      phone: null,
      address: null,
      gender: null,
      birthday: null,
      token: [],
      role: 'user',});

    const fetchData = async () => {
      const Data = await getInfo();
      setData(Data);
    };
    useEffect(() => {
      fetchData();
    }, []);

    return(<div className="flex flex-col pl-12 mt-12 w-4/12 font-nunito ">
    {/* Left */}
    <div className="flex items-center w-full mb-4">
        <img src={data.avatar.url?data.avatar.url: "https://res.cloudinary.com/dzm879qpm/image/upload/v1724509562/defautProduct_mlmwsw.png"}
         alt='Avatar' className="w-12 h-12 rounded-full mr-4" />
        <div className="text-xl font-bold">{data.userName?data.userName:data.email}</div>
    </div>
    <div className="flex flex-col font-bold w-full text-lg">
        <div className="flex flex-col w-full">
            <div className="flex items-center">
                <img loading='lazy' src="/img/person.svg" alt='Person' className="w-6 h-6 mr-2" />
                Tài khoản
            </div>
            <div className="ml-8 font-normal">
                <div className={`my-2 ${usePathname() == "/Profile" ? "text-[#EDB24E] font-bold" : ""}`}>
                    <Link href="/Profile">Hồ sơ </Link></div>
                <div className={`my-2 ${usePathname() == "/Profile/ChangePass" ? "text-[#EDB24E] font-bold" : ""}`}>
                    <Link href="/Profile/ChangePass">Đổi mật khẩu</Link></div>
            </div>
        </div>
        <div className="flex items-center mb-4 ">
            <img src="/img/order.svg" alt='Order' className={` w-6 h-6 mr-2`} />
            <Link href="/Profile/OrderHistory" className={`${usePathname() == "/Profile/OrderHistory" ? "text-[#EDB24E] font-bold" : ""}`}> Lịch sử đơn hàng</Link>
        </div>
        <div className="flex items-center mb-4">
            <img src="/img/notification.svg" alt='Notification' className={` w-6 h-6 mr-2 ${usePathname() == "/Profile/Notification" ? "text-[#EDB24E] font-bold" : ""}`} />
            <Link href="/Profile/NotifySetting"className={`${usePathname() == "/Profile/NotifySetting" ? "text-[#EDB24E] font-bold" : ""}`}>Cài đặt thông báo</Link>
        </div>
        <div className="flex items-center">
            <img src="/img/logout.svg" alt='Logout' className={` w-6 h-6 mr-2`} />
            <Link href="/Profile/Logout">Đăng xuất</Link>
        </div>
    </div>
</div>
    )
        
    
}