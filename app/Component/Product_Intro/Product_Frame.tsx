"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProductFrame = (props: any) => {
  const router = useRouter();

  const handleChangeClick = (productId: any) => {
    router.push(`/Product_Info/${productId}`);
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div
      className="flex flex-col rounded-lg overflow-hidden w-full h-70 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg active:scale-95 border-[#EDB24E] 
      p-4 border-2 mt-4 mb-2 ml-1 mr-1 cursor-pointer"
      onClick={() => handleChangeClick(props.id)}
    >
      {/* Product Image */}
      <div className="w-full h-36 flex justify-center items-center">
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-2 flex flex-col justify-between flex-grow">
        {/* Product Name */}
        <h2
          className="font-nunito text-sm mb-1 line-clamp-2 product-name min-h-[2rem]"
          style={{ whiteSpace: "pre-wrap" }} // Ensure the height is enough for 2 lines
        >
          {props.name}
        </h2>

        {/* Product Brand */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-[#fc9b33]">
            {props.brand}
          </span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">
            {props.category}
          </span>
        </div>

        <div className="flex justify-between items-center mt-2">
          {/* Rating */}
          <div className="flex">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <FaStar
                  key={i}
                  color={
                    ratingValue <= props.star ? "yellow" : "gray"
                  }
                  size={20}
                />
              );
            })}
          </div>
        </div>


        {/* Price */}
        <div className={`flex justify-between mt-3`}>
          <span className="text-sm font-semibold">
            <span className="text-xs underline">đ</span> {formatPrice(props.discount_price)}
          </span>
          {props.discount_price !== props.price && (
            <span className="text-sm font-semibold text-red-500 line-through ml-2">
              <span className="text-xs underline">đ</span> {formatPrice(props.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFrame;
