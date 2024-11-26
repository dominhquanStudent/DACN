'use client';
import Welcome from '@/public/img/Product_Main/Welcome.jpg';
import Header from '@/app/Component/Header/Header';
import Footer from '@/app/Component/Footer/Footer';
import Product_Frame from './Product_Frame';
import Brand1 from '@/public/img/Product_Main/Brand_Farmina.png';
import Brand2 from '@/public/img/Product_Main/Brand_Hill.png';
import Brand3 from '@/public/img/Product_Main/Brand_NexGard.png';
import Brand4 from '@/public/img/Product_Main/Brand_Pedigree.png';
import Brand5 from '@/public/img/Product_Main/Brand_Premier.png';
import Brand6 from '@/public/img/Product_Main/Brand_RoyalCanin.png';
import Brand7 from '@/public/img/Product_Main/Brand_Whiskas.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
interface ProductIntro {
  "Nhà thú cưng": any[],
  "Đồ chơi cho thú cưng": any[],
  "Thức ăn thú cưng": any[],
  "Đồ dùng tắm gội": any[],
  "Đồ dùng thú y": any[],
  "Đồ dùng vệ sinh": any[],
  "overall": any[]
}
export default function Product_Main() {
  const [products, setProducts] = useState<ProductIntro>();

  // Get products from server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get(`${baseURL}/product/intro`);
        console.log("Response data:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  
  const topRatedProducts = products ? products["overall"] : []
  const topHouseProducts = products ? products["Nhà thú cưng"] : []
  const topToyProducts = products ? products["Đồ chơi cho thú cưng"] : []
  const topFoodProducts = products ? products["Thức ăn thú cưng"] : []

  return (
    <>
      <Header />
      <div className='flex flex-col'>
        <img src={Welcome.src} alt="" className='border-b-[1px]' />
        {/* Featured Product */}
        <div className='mx-40'>
          <div className='font-montserrat text-2xl font-semibold my-4'>Sản phẩm nổi bật</div>
          <div className='flex space-x-4'>
            {topRatedProducts.map((item) => (
              <Product_Frame
                name={item.name}
                brand={item.brand}
                category={item.category}
                price={item.price}
                discount_price={item.discount_price}
                image={item.image.url}
                star={item.rating}
                id={item._id}
                key={item._id}
              />
            ))}
          </div>
        </div>
        <div className='mx-40'>
          <div className='font-montserrat text-2xl font-semibold my-4'>Bộ sưu tập Balo bán chạy nhất</div>
          <div className='flex space-x-4'>
            {topHouseProducts.map((item) => (
              <Product_Frame
                name={item.name}
                brand={item.brand}
                category={item.category}
                price={item.price}
                discount_price={item.discount_price}
                image={item.image.url}
                star={item.rating}
                id={item._id}
                key={item._id}
              />
            ))}
          </div>
        </div>
        <div className='mx-40'>
          <div className='font-montserrat text-2xl font-semibold my-4'>Bộ sưu tập đồ chơi hot nhất</div>
          <div className='flex space-x-4'>
            {topToyProducts.map((item) => (
              <Product_Frame
                name={item.name}
                brand={item.brand}
                category={item.category}
                price={item.price}
                discount_price={item.discount_price}
                image={item.image.url}
                star={item.rating}
                id={item._id}
                key={item._id}
              />
            ))}
          </div>
        </div>
        <div className='mx-40'>
          <div className='font-montserrat text-2xl font-semibold my-4'>Thức ăn Best Seller</div>
          <div className='flex space-x-4'>
            {topFoodProducts.map((item) => (
              <Product_Frame
                name={item.name}
                brand={item.brand}
                category={item.category}
                price={item.price}
                discount_price={item.discount_price}
                image={item.image.url}
                star={item.rating}
                id={item._id}
                key={item._id}
              />
            ))}
          </div>
        </div>

        {/* Brand Available */}
        <div className='mx-40'>
          <div className='font-montserrat text-2xl font-semibold my-4'>Nhãn hiệu chúng tôi có </div>
          <div className='flex space-x-4'>
            <img src={Brand1.src} alt="" />
            <img src={Brand2.src} alt="" />
            <img src={Brand3.src} alt="" />
            <img src={Brand4.src} alt="" />
            <img src={Brand5.src} alt="" />
            <img src={Brand6.src} alt="" />
            <img src={Brand7.src} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}