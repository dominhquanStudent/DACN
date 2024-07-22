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
import { Slider } from '@mui/material';
export default function Product_Main(){
    const shownProducts = [
        { name: 'Thức ăn cho chó Pedigree', weight: '1kg', price: '100.000đ' },
        { name: 'Thức ăn cho chó Shiba', weight: '2kg', price: '200.000đ' },
        { name: 'Thức ăn cho chó Pug', weight: '3kg', price: '300.000đ' },
        { name: 'Thức ăn cho chó Cỏ', weight: '4kg', price: '400.000đ' },
      ];


    return(
        <>
        <Header></Header>
        <div className='flex flex-col'>
            <img src={Welcome.src} alt="" className='border-b-[1px]'/>
            {/* Featured Product */}
            <div className='mx-40'> 
               
                <div className='font-montserrat text-2xl font-semibold my-10'>Sản phẩm nổi bật</div>
                <div className='flex space-x-4'>
                    {shownProducts.map((item) => (
                        <Product_Frame name={item.name} price={item.price} weight={item.weight}/>
                            ))}
  
                </div>
            </div>
            {/* Trending Product */}
            <div className='mx-40'> 
                <div className='font-montserrat text-2xl font-semibold my-10'>Sản phẩm nổi bật</div>
                <div className='flex space-x-4'>
                    {shownProducts.map((item) => (
                        <Product_Frame name={item.name} price={item.price} weight={item.weight}/>
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