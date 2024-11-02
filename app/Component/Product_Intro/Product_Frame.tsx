import Product1 from "@/public/img/Product_Main/Product1.png";
import { useRouter } from "next/navigation";
export default function Product_Frame(props: any){
    const Router = useRouter();
    const handleChangeClick = (productId: any) => {
                
        Router.push(`/Product_Info/${productId}`);
      };
    const formatPrice = (price:any) => {
        return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(price);
      };
    return(
        <div className="flex border-solid rounded-md border-[1px] border-sky-500 p-5 w-[300px] overflow-auto hover:border-yellow-500 hover:shadow-lg transform hover:scale-110  transition duration-200 active:scale-95"
        onClick={() => handleChangeClick(props.id)}
        >

            {/* Image */}
            <img src={props.image} alt="" className="w-24 h-24 rounded-xl"/>
            {/* Description */}
            <div>
                <div className="font-montserrat font-bold text-2xl"><span className="text-base underline" >đ</span> {formatPrice(props.discount_price)}</div>

                <div className={`font-montserrat font-bold ${props.discount_price !== props.price ? "line-through text-red-600" : "hidden" }`}><span className="text-base underline" >đ</span> {formatPrice(props.price)}</div>
        
                <div className="font-montserrat ">{props.name}</div>

                
            </div>
        </div>
    )
}