import { usePathname } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
    { name: 'Dash Board', path: '/Admin/DashBoard', icon: '/img/icon/dashboard_hl.svg', iconhl: '/img/icon/dashboard.svg' },
    { name: 'Quản lý đơn hàng', path: '/Admin/Order', icon: '/img/icon/order.svg', iconhl: '/img/icon/order_hl.svg' },
    { name: 'Quản lý sản phẩm', path: '/Admin/Product', icon: '/img/icon/product.svg', iconhl: '/img/icon/product_hl.svg' },
    { name: 'Quản lý dịch vụ', path: '/Admin/Service', icon: '/img/icon/service.svg', iconhl: '/img/icon/service_hl.svg' },
    { name: 'Quản lý Voucher', path: '/Admin/Voucher', icon: '/img/icon/voucher.svg', iconhl: '/img/icon/voucher_hl.svg' },
    { name: 'Quản lý lịch hẹn', path: '/Admin/Appointment', icon: '/img/icon/appointment.svg', iconhl: '/img/icon/appointment_hl.svg' },
    { name: 'Yêu cầu cứu hộ', path: '/Admin/Rescue', icon: '/img/icon/rescue.svg', iconhl: '/img/icon/rescue_hl.svg' },
    { name: 'Quản lý nhận nuôi', path: '/Admin/Adoption', icon: '/img/icon/adopt.svg', iconhl: '/img/icon/adopt_hl.svg' },
    { name: 'Quản lý thú cưng', path: '/Admin/Pet', icon: '/img/icon/pet.svg', iconhl: '/img/icon/pet_hl.svg' },
    { name: 'Tin nhắn', path: 'https://1240.3cx.cloud/#/chat', icon: '/img/icon/message.svg', iconhl: '/img/icon/message_hl.svg', external: true },
    { name: 'Thông báo người dùng', path: '/Admin/Notification', icon: '/img/icon/Allert.svg', iconhl: '/img/icon/Allert_hl.svg'},
    { name: 'Hồ sơ', path: '/Admin/Profile', icon: '/img/icon/admin.svg', iconhl: '/img/icon/admin_hl.svg' },
    { name: 'Cài đặt', path: '/Admin/Setting', icon: '/img/icon/setting.svg', iconhl: '/img/icon/setting_hl.svg' },
];

function Sidebar() {
    const pathname = usePathname();

    return (
        <div className='flex flex-col w-1/5 mt-12 space-y-6'>
            {menuItems.map((item) => (
                <div key={item.path} className='flex items-center ml-12 font-nunito text-md text-[#B1B1B1]'>
                    {item.external ? (
                        <a href={item.path} target="_blank" rel="noopener noreferrer" className='flex items-center'>
                            <div>
                                <img src={pathname.includes(item.path) ? item.iconhl : item.icon} className='h-6 w-6' alt={item.name} />
                            </div>
                            <div className={`ml-4 ${pathname.includes(item.path) ? "text-[#EDB24E] font-bold" : ""}`}>
                                {item.name}
                            </div>
                        </a>
                    ) : (
                        <Link href={item.path} className='flex items-center'>
                            <div>
                                <img src={pathname.includes(item.path) ? item.iconhl : item.icon} className='h-6 w-6' alt={item.name} />
                            </div>
                            <div className={`ml-4 ${pathname.includes(item.path) ? "text-[#EDB24E] font-bold" : ""}`}>
                                {item.name}
                            </div>
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Sidebar;