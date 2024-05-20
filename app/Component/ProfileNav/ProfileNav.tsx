import { useRouter } from 'next/navigation';
export default function ProfileNav() {
    const router = useRouter();

    return(
        <div className="flex flex-col pl-12 mt-12 w-4/12 font-nunito ">
        {/* Left */}
        <div className="flex items-center w-full mb-4">
            <img src="/img/Avatar_vinh.png" alt='Avatar' className="w-12 h-12 rounded-full mr-4" />
            <div className="text-xl font-bold">Nguyễn Quang Vinh</div>
        </div>
        <div className="flex flex-col font-bold w-full text-lg">
            <div className="flex flex-col w-full">
                <div className="flex items-center">
                    <img src="/img/person.svg" alt='Person' className="w-6 h-6 mr-2" />
                    Tài khoản
                </div>
                <div className="ml-8 font-normal">
                    <div className="my-2">Hồ sơ</div>
                    <div className="my-2">Địa chỉ</div>
                    <div className="my-2">Đổi mật khẩu</div>
                </div>
            </div>
            <div className="flex items-center mb-4">
                <img src="/img/order.svg" alt='Order' className="w-6 h-6 mr-2" />
                Lịch sử mua hàng
            </div>
            <div className="flex items-center mb-4">
                <img src="/img/notification.svg" alt='Notification' className="w-6 h-6 mr-2" />
                Cài đặt thông báo
            </div>
            <div className="flex items-center">
                <img src="/img/logout.svg" alt='Logout' className="w-6 h-6 mr-2" />
                Đăng xuất
            </div>
        </div>
    </div>
    )
        
    
}