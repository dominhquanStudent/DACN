'use client';
import Welcome from '@/public/img/Product_Main/Welcome.jpg'
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
import axios from '@/api/axios';
export default function Product_Main(){
   
      const [products, setProducts] = useState<any[]>([]);
      //get products from server
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get("/product/list");
            setProducts(response.data.products);
            
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    
        fetchProducts();
      }, []);
      const sampleProducts = products.slice(0, 4);
        console.log(sampleProducts);
    return(
        <>
        <Header></Header>
        <div className='flex flex-col'>
            <img src={Welcome.src} alt="" className='border-b-[1px]'/>
            {/* Featured Product */}
            <div className='mx-40'> 
               
                <div className='font-montserrat text-2xl font-semibold my-10'>Sản phẩm nổi bật</div>
                <div className='flex space-x-4'>
                    {sampleProducts.map((item) => (
                        <Product_Frame name={item.name} price={item.price} image={item.image.url} id={item._id}/>
                            ))}
  
                </div>
            </div>
            {/* Trending Product */}
            <div className='mx-40'> 
                <div className='font-montserrat text-2xl font-semibold my-10'>Sản phẩm nổi bật</div>
                <div className='flex space-x-4'>
                    {sampleProducts.map((item) => (
                        <Product_Frame name={item.name} price={item.price} image={item.image.url} id={item._id}/>
                            ))}
  
                </div>
            </div>
             {/* Brand Available */}
             <div className='mx-40'> 
                <div className='font-montserrat text-2xl font-semibold my-10'>Nhãn hiệu hiện có</div>
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
        <Footer></Footer>
        </>
    )
}