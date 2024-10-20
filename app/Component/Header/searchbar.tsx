import React, { useState,useEffect } from 'react';
import axios from 'axios';
import RenderStars from '@/app/Product_Info/[product_id]/renderStars';
export default function SearchBar() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  const handleSearch = async (event: any) => {
    const name = event.target.value;
    setSearchTerm(name);

    if (name.length > 0) {
      try {
        const response = await axios.get(`${baseURL}/${name}`);
        setSearchResults(response.data.products);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error("Error searching for products:", error);
      }
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };
    return (
      <div className="flex">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative flex-initial">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-3 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="flex-auto block md:w-[35rem] w-[25rem] p-2 pl-10 text-sm text-gray-900 border border-black-600 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tìm kiếm sản phẩm"
            value={searchTerm}
            onChange={handleSearch}
            required
            autoComplete="off"
          />
          
        </div>
        {isDropdownVisible && searchResults.length > 0 && (
        <div
          className="absolute top-14 left-[570px] z-10 w-[25rem] bg-white border border-gray-300 rounded-lg shadow-lg mt-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {searchResults.map((item: any) => (
            <a href={`/Product_Info/${item._id}`} key={item._id} className="p-2 flex justify-between no-underline text-black">
              <div>
                <div className='flex items-center justify-between'>
                  <img src={item.image.url[0]} alt="" className='w-24 h-24'/>
                  <div className="ml-4 flex-col">
                    <div>Tên: {item.name}</div>
                    <div>Giá: {item.discount_price}</div>
                    <div>Phân loại: {item.category}</div>
                    <div>Nhãn hiệu: {item.brand}</div>
                  </div>
                </div>
                <RenderStars rating={item.rating} />
              </div>
            </a>
          ))}
        </div>
      )}
      </div>
    );
  }
  {/* <button type="submit" className="text-white absolute right-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
