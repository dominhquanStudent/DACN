//create template
import logo from '../../../public/img/Header/logo.png'
export default function Login_SignUp_Header(){
    return (
        <div className='flex items-center space-x-5'>
            <img src={logo.src} alt="Logo" className="w-60 m-4"/>
            <div className='font-black	 font-k2d text-3xl'>Đăng Nhập</div>
        </div>
            
   
    )
}