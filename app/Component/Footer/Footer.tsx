import logo from "@/public/img/Header/logo.png";
import Link from "next/link";

// Footer for large screens
function FooterLarge() {
    return (
        <div className="pl-16 grid grid-cols-4 gap-x-2 border-black mt-10 bg-footer-yellow">
            <div className="col-span-1 w-[110%] flex justify-center items-center">
                <img src={logo.src} alt="Logo" className="p-8" />
            </div>
            <div className="pl-8 col-span-3 flex justify-around font-montserrat">
                <div className="flex flex-col mt-8">
                    <div className="font-bold mb-3">Về chúng tôi</div>
                    <Link href="/Product"><div className="hover:text-yellow-500">Sản phẩm</div></Link>
                    <Link href="/Main"><div className="hover:text-yellow-500">Giới thiệu</div></Link>
                    <div>Chính sách bảo mật</div>
                    <div className="border-b-2 mb-1 border-gray-400">Điều khoản sử dụng</div>
                </div>
                <div className="flex flex-col mt-8">
                    <div className="font-bold mb-3">Giờ hoạt động</div>
                    <div>Thứ 2 - Thứ 6: 8:00 - 22:00</div>
                    <div>Thứ 7: 8:00 - 18:00</div>
                    <div>Chủ Nhật: 8:00 - 12:00</div>
                </div>
                <div className="flex flex-col mt-8 mr-16 items-start">
                    <div className="font-bold mb-3 text-center">Liên Hệ</div>
                    <div>bkpetcare@gmail.com</div>
                    <div>268 Lý Thường Kiệt, Phường 14, Quận 10, TP. HCM</div>
                    <div className="flex space-x-2">
                        <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="Facebook" className="w-9"/>
                        <img src="https://cdn-icons-png.freepik.com/256/145/145812.png?semt=ais_hybrid" alt="Twitter" className="w-9"/>
                        <img src="https://image.similarpng.com/very-thumbnail/2020/05/Vector-Instagram-icon-PNG.png" alt="Instagram" className="w-10"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Footer for small screens
function FooterSmall() {
    return (
        <div className="p-5 flex flex-col gap-4 bg-footer-yellow">
            <div className="w-full flex justify-center">
                <img src={logo.src} alt="Logo" className="w-72" />
            </div>
            <div className="font-montserrat">
                <div className="font-bold mb-2">Về chúng tôi</div>
                <Link href="/Product"><div className="hover:text-yellow-500">Sản phẩm</div></Link>
                <Link href="/Main"><div className="hover:text-yellow-500">Giới thiệu</div></Link>
            </div>
            <div>
                <div className="font-bold mb-2">Giờ hoạt động</div>
                <div>Thứ 2 - Thứ 6: 8:00 - 22:00</div>
                <div>Thứ 7: 8:00 - 18:00</div>
                <div>Chủ Nhật: 8:00 - 12:00</div>
            </div>
            <div>
                <div className="font-bold mb-2">Liên Hệ</div>
                <div>bkpetcare@gmail.com</div>
                <div>07 Lý Tự Trọng, Long Xiên, An Giang</div>
                <div className="flex justify-center space-x-4 mt-2">
                    <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="Facebook" className="w-8"/>
                    <img src="https://cdn-icons-png.freepik.com/256/145/145812.png?semt=ais_hybrid" alt="Twitter" className="w-8"/>
                    <img src="https://image.similarpng.com/very-thumbnail/2020/05/Vector-Instagram-icon-PNG.png" alt="Instagram" className="w-8"/>
                </div>
            </div>
        </div>
    );
}

export default function Footer() {
    return (
        <>
            <div className="hidden lg:block">
                <FooterLarge />
            </div>
            <div className="block lg:hidden">
                <FooterSmall />
            </div>
        </>
    );
}
