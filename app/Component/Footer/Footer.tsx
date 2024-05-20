import Logo from "../../../public/img/Logo.png";
export default function Footer(){
    return (
        <div className="flex justify-center border-t-[1px] border-black mt-10 bg-footer-yellow ">
            {/*Hình*/}
            <img src={Logo.src} alt="" className="w-1/6 p-8 "/>
            {/*About us*/}
            <div className="flex flex-col m-8">
                <div className="font-montserrat font-bold mb-6">Về chúng tôi</div>
                <div>Trang chủ</div>
                <div>Giới thiệu</div>
                <div>Chính sách bảo mật</div>
            </div>
            {/*Social*/}
            <div className="flex flex-col m-8 ml-60">
                <div className="font-montserrat font-bold mb-6 ">Mạng xã hội</div>
                <div className="flex space-x-2">
                    <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="" className='w-9'/>
                    <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="" className='w-9'/>
                    <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="" className='w-9'/>
                </div>
            
            </div>
            {/*About us*/}
            <div className="flex flex-col m-8">
                <div className="font-montserrat font-bold mb-6">Hỗ trợ khách hàng </div>
                <div>Câu hỏi thường gặp</div>
                <div>Hướng dẫn đăng kí</div>
                <div>Hướng dẫn thanh toán</div>
            </div>
        </div>
    )
}