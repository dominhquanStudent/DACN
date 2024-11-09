import { FaStar } from "react-icons/fa";
import Foto from "@/public/img/Product_Main/foto.png";
import { useRouter } from "next/navigation";
import RenderStars from "@/app/Product_Info/[product_id]/renderStars";

const ProductCard = (props: any) => {
  const Router = useRouter();
  const handleChangeClick = (productId: any) => {
    console.log(`Details for product ${productId}`);
    Router.push(`/Product_Info/${productId}`);
  };

  // Format price function
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let price = formatPrice(props.product.price);
  let discount_price = formatPrice(props.product.discount_price);

  return (
    <div
      className="flex flex-col rounded-lg overflow-hidden w-full h-70 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg active:scale-95 border-[#EDB24E] 
      p-4 border-2  mt-4 mb-2 ml-1 mr-1 cursor-pointer"
      onClick={() => handleChangeClick(props.product._id)}
    >
      {/* Product Image */}
      <div className="w-full h-36 flex justify-center items-center">
        <img
          src={props.product.image.url || Foto}
          alt={props.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-2 flex flex-col justify-between flex-grow">
        {/* Product Name */}
        <h2
          className="font-nunito text-sm mb-1 line-clamp-2 product-name min-h-[2.5rem]"
          style={{ whiteSpace: "pre-wrap" }} // Ensure the height is enough for 2 lines
        >
          {props.product.name}
        </h2>

        {/* Product Brand */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-[#f79a36]">
            {props.product.brand}
          </span>
          <span className="text-xs text-gray-500">
           {props.product.category}
          </span>
        </div>

        {/* Price */}
        <div
          className={`flex justify-between`}
        >
          <span className="text-sm font-semibold">
            <span className="text-xs underline">đ</span> {discount_price}
          </span>
          {props.product.discount_price !== props.product.price && (
            <span className="text-sm font-semibold text-red-500 line-through ml-2">
              <span className="text-xs underline">đ</span> {price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
