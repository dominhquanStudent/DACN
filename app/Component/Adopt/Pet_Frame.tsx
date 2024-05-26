// import Bull from "@/public/img/Pet/bull.png";
export default function Pet_Frame(props: any){
    return(
        <div className="flex border-solid rounded-md border-[1px] border-sky-500 p-5 w-[500px] overflow-auto hover:border-yellow-500 hover:shadow-lg transform hover:scale-110  transition duration-200">

            {/* Image */}
            <img src={props.image.src} alt="" className="mb-4"/>
            {/* Description */}
            <div className="ml-20">
                <div className="font-montserrat font-bold text-2xl">{props.name}</div>
        
                <div className="font-montserrat flex flex-col space-y-4">
    <div className="flex space-x-4 justify-between"> 
        <div className="font-bold">Giới tính:</div> 
        <div>{props.gender}</div>
    </div>

    <div className="flex space-x-4 justify-between"> 
        <div className="font-bold">Tuổi:</div> 
        <div>{props.age}</div>
    </div>

    <div className="flex space-x-4 justify-between">
        <div className="font-bold">Tiêm phòng:</div> 
        <div>{props.vaccination}</div>
    </div>
</div>

            </div>
        </div>
    )
}