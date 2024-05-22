import Product1 from "../../../public/img/Product_Main/Product1.png";
export default function Product_Frame(props: any){
    return(
        <div className="flex border-solid rounded-md border-[1px] border-sky-500 p-5 w-[300px] overflow-auto hover:border-yellow-500 hover:shadow-lg transform hover:scale-110  transition duration-200">

            {/* Image */}
            <img src={Product1.src} alt="" className=""/>
            {/* Description */}
            <div>
                <div className="font-montserrat font-bold text-2xl">{props.price}</div>
        
                <div className="font-montserrat ">{props.name}</div>

                <div className="font-montserrat ">{props.weight}</div>
            </div>
        </div>
    )
}