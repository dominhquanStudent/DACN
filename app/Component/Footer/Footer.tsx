import Service from "../../../public/img/Greet page/Service.png"
export default function Footer(){
    return (
        <div className="flex justify-center border-t-2 border-black mt-10">
            {/*Hình*/}
            <img src={Service.src} alt="" className="w-1/5 p-8 "/>
            {/*About us*/}
            <div className="flex flex-col m-8">
                <div className="font-montserrat font-bold mb-6">Về chúng tôi</div>
                <div>Sentral de Atendimento</div>
                <div>Sentral de Atendimento</div>
                <div>Sentral de Atendimento</div>
            </div>
            {/*Social*/}
            <div className="flex flex-col m-8 ">
                <div className="font-montserrat font-bold mb-6">Mạng xã hội</div>
                <div className="flex">
                    <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="" className='w-9'/>
                    <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="" className='w-9'/>
                    <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="" className='w-9'/>
                </div>
            
            </div>
            {/*About us*/}
            <div className="flex flex-col m-8">
                <div className="font-montserrat font-bold mb-6">Hỗ trợ khách hàng </div>
                <div>Sentral de Atendimento</div>
                <div>Sentral de Atendimento</div>
                <div>Sentral de Atendimento</div>
            </div>
        </div>
    )
}