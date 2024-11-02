"use client";
import { useState, useEffect } from "react";
import axios from "@/api/axios";

export default function Product_Frame(props) {
  const [quantity, setQuantity] = useState(props.product.quantity);
  const [isRemoved, setIsRemoved] = useState(false);
  const [selected, setSelected] = useState(props.product.selected);
  const { onSelectChange } = props;
  const [data, setData] = useState(0);
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(price);
  };
  // Handle update cart function
  const fetchProductData = async () => {
    try {
    
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.get(`${baseURL}/product/${props.product.product_id}`);
      const productData = response.data;
      setData(productData.product);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, []);
  const handleUpdateCart = async (e) => {
    if (e) e.preventDefault();
    try {
      const cartItem = {
        product_id: props.product.product_id,
        quantity: quantity,
      };
      const response = await axios.post('/cart/update', cartItem);
      props.fetchCartData();
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    handleUpdateCart();
  }, [quantity]);

  useEffect(() => {
    setQuantity(props.product.quantity);
  }, [props.product.quantity]);

  const handleAmountChange = (Amount) => {
    if (Amount > 0 && Amount <= data.stock) {
      setQuantity(Amount);
    }
  };

  // Handle remove item function
  const handleRemoveItem = async (e) => {
    if (e) e.preventDefault();
    try {
      const cartItem = {
        product_id: props.product.product_id,
      };
      const response = await axios.delete('/cart/deleteProduct', {
        data: cartItem,
      });
      console.log("Remove cart:", response.data);
      props.fetchCartData();
      setIsRemoved(true);
    } catch (error) {
      console.log("Error removing from cart:", error);
    }
  };

  const handleSelect = async (e) => {
    try {
      const cartItem = {
        product_id: props.product.product_id,
        selected: !selected,
      };
      const response = await axios.post('/cart/selectProduct', cartItem);
      setSelected(!selected);
      onSelectChange(!selected);
    } catch (error) {
      console.log("Error selecting item:", error);
    }
  };

  if (isRemoved) {
    return null; // Don't render the component if the item is removed
  }
  console.log(data.stock);
  return (
    <div className="relative flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
      <button
        className="absolute top-4 right-1 p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        onClick={handleRemoveItem} // Define this function to handle item removal
      >
        <svg
          className="w-4 h-4 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="w-full md:max-w-[126px]">
        <img src={props.product.product_image} alt="perfume bottle image" className="mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="md:col-span-2">
          <div className="flex flex-col max-[500px]:items-center gap-3">
            <h6 className="font-semibold text-base leading-7 text-black">{props.product.product_name}</h6>
            <h6 className={`font-normal text-base leading-7 transition-all duration-300 ${props.product.price === props.product.discount_price ? 'hidden' : 'text-red-500 line-through'}`}>
              {formatPrice(props.product.price)} đ
            </h6>
            <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
              {formatPrice(props.product.discount_price)} đ
            </h6>
          </div>
        </div>
        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
          <div className="flex items-center h-full">
            <button
              className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
              onClick={() => { handleAmountChange(quantity - 1); }}
            >
              <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                viewBox="0 0 22 22" fill="none">
                <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <input type="number"
              className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
              value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min="1" />
            <button
              className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
              onClick={() => { handleAmountChange(quantity + 1); }}
            >
              <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                viewBox="0 0 22 22" fill="none">
                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
          <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">{formatPrice(quantity * props.product.discount_price)}đ</p>
        </div>
      </div>
      <div className="absolute bottom-4 right-1 p-1 rounded-full">
        <button
          className="p-1 rounded-full"
          onClick={handleSelect}
        >
          <input
            type="checkbox"
            checked={selected}
            onChange={handleSelect}
            className="mr-2"
          />
        </button>
      </div>
    </div>
  );
}