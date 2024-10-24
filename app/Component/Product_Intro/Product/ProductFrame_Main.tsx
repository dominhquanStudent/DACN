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
  return (
    <div
      className="flex flex-col border rounded-lg overflow-hidden w-60 transform transition-transform duration-300 hover:scale-110 hover:shadow-lg active:scale-95 bg-teal-100"
      onClick={() => handleChangeClick(props.product._id)}
    >
      {/* Product Image */}
      <div className="w-full flex justify-center items-center">
        <img
          src={props.product.image.url || Foto}
          alt={props.product.name}
          className=" w-full h-64"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* Product Name */}

        <h2 className="font-semibold font-montserrat text-center">
          {props.product.name}
        </h2>

        <div className="flex justify-between items-center mt-2">
          <h2 className="font-extralight text-sm underline italic">
            {props.product.category}
          </h2>
          <span className="font-extralight text-sm underline italic">
            {props.product.brand}
          </span>
        </div>

        {/* Brand and Rating */}
        <div className="flex justify-between items-center mt-2">
          {/* Rating */}
          <RenderStars rating={props.product.rating}></RenderStars>
        </div>

        {/* Price */}
        <div className={`mt-2 flex ${props.product.discount_price === props.product.price ? 'justify-center' : 'justify-between'}`}>
  <span className="text-lg font-semibold">${props.product.discount_price}</span>
  {props.product.discount_price !== props.product.price && (
    <span className="text-lg font-semibold text-red-500 line-through ml-2">
      ${props.product.price}
    </span>
  )}
</div>
      </div>
    </div>
  );
};

export default ProductCard;
