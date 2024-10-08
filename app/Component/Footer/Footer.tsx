import logo from "@/public/img/Header/logo.png";
import Link from "next/link";

export default function Footer(){
    return (
        <div className="pl-32 grid grid-cols-4 gap-x-2  border-black mt-10 bg-footer-yellow">
            
            {/*Hình*/}
            <div className="col-span-1 w-[130%] flex justify-center items-center">
                <img src={logo.src} alt="" className=" p-8 "/>
            </div>
            {/*About us, Social, Customer support*/}
            <div className="pl-24 col-span-3 flex justify-around font-montserrat">
                {/*About us*/}
                <div className="flex flex-col mt-8 ">
                    <div className="font-montserrat font-bold mb-3">Về chúng tôi</div>
                    <Link href="/Product"><div className="hover:text-yellow-500">Sản phẩm</div></Link>
                    <Link href="/Main"><div className="hover:text-yellow-500">Giới thiệu</div></Link>
                    <div>Chính sách bảo mật</div>
                    <div className="border-b-2 mb-1 border-gray-400">Điều khoản sử dụng</div>
                         
                </div>
                {/*Customer support*/}
                <div className="flex flex-col mt-8">
                    <div className="font-montserrat font-bold mb-3">Giờ hoạt động </div>
                    <div>Thứ 2 - Thứ 6: 8:00 - 22:00</div>
                    <div>Thứ 7: 8:00 - 18:00 </div>
                    <div>Chủ Nhật: 8:00 - 12:00</div>
                </div>
                {/*Social*/}
                <div className="flex flex-col mt-8 mr-40 items-start">
                    <div className="font-montserrat font-bold mb-3 text-center">Liên Hệ</div>
                    <div>bkpetcare@gmail.com</div>
                    <div>07 Lý Tự Trọng, Long Xiên, An Giang</div>  
                    <div className="flex space-x-2">
                        <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="" className='w-9'/>
                        <img src="https://cdn-icons-png.freepik.com/256/145/145812.png?semt=ais_hybrid" alt="" className='w-9'/>
                        <img src="https://image.similarpng.com/very-thumbnail/2020/05/Vector-Instagram-icon-PNG.png" alt="" className='w-10'/>
                    </div>
                    
                
                </div>
                
            </div>
        </div>


    )
}