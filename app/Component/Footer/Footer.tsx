import Logo from "../../../public/img/Logo.png";
export default function Footer(){
    return (
        <div className="grid grid-cols-4 border-t-[1px] border-black mt-10 bg-footer-yellow ">
            
            {/*Hình*/}
            <div className="col-span-1 flex justify-center items-center">
                <img src={Logo.src} alt="" className="w-1/2 p-8 "/>
            </div>
            {/*About us, Social, Customer support*/}
            <div className="col-span-3 flex justify-between font-montserrat">
                {/*About us*/}
                <div className="flex flex-col mt-8 ">
                    <div className="font-montserrat font-bold mb-6">Về chúng tôi</div>
                    <div>Trang chủ</div>
                    <div>Giới thiệu</div>
                    <div>Chính sách bảo mật</div>
                    <div className="border-b-2 mb-1 border-gray-400">Điều khoản sử dụng</div>
                    <div>bkpetcare@gmail.com</div>

                    
                </div>
                {/*Customer support*/}
                <div className="flex flex-col mt-8">
                    <div className="font-montserrat font-bold mb-6">Hỗ trợ khách hàng </div>
                    <div>Câu hỏi thường gặp</div>
                    <div>Hướng dẫn đăng kí</div>
                    <div>Hướng dẫn thanh toán</div>
                </div>
                {/*Social*/}
                <div className="flex flex-col mt-8 mr-48">
                    <div className="font-montserrat font-bold mb-6 text-center">Liên Hệ</div>
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