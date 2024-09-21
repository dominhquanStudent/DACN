"use client";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import StarRating from "./star_rating";
import ProductCard from "./ProductFrame_Main";
import { useSearchParams  } from "next/navigation";

import "@/app/Component/CheckboxStyles.css";
import axios from "@/api/axios";

import { useState, useEffect } from "react";

export default function Product() {
  const searchParams = useSearchParams();
  const queryFilterMode = Number(searchParams.get('filterMode') ?? "0");

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
  console.log(products);
  const brands = Array.from(new Set(products.map((product) => product.brand)));
  const category = Array.from(
    new Set(products.map((product) => product.category))
  );
  //LOGIC FOR FILTERING PRODUCTS
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  //if queryFilterMode is not 0 then filter products
  const [Params, setParams] = useState(0);
  useEffect(() => {
    if (queryFilterMode === 1) {
      console.log("Filtering products by category 'Thức ăn thú cưng'");
      console.log("Products before filtering:", products);
      
      const filtered = products.filter(product => product.category === "Thức ăn thú cưng");
  
      setParams(1);
      setFilteredProducts(filtered);
      console.log("Filtered products:", filteredProducts);
    }
    else if (queryFilterMode === 2) {
      console.log("Filtering products by category 'Phụ kiện & Đồ chơi'");
      console.log("Products before filtering:", products);
  
      const filtered = products.filter(product => product.category === "Phụ kiện & Đồ chơi");
      setParams(2);
      setFilteredProducts(filtered);
      console.log("Filtered products:", filteredProducts);
    }
    else if (queryFilterMode === 3) {
      console.log("Filtering products by category 'Đồ dùng vệ sinh'");
      console.log("Products before filtering:", products);
  
      const filtered = products.filter(product => product.category === "Đồ dùng vệ sinh");
      setParams(3);
      setFilteredProducts(filtered);
      console.log("Filtered products:", filteredProducts);
    }
    else if (queryFilterMode === 4) {
      console.log("Filtering products by category 'Nhà thú cưng'");
      console.log("Products before filtering:", products);
  
      const filtered = products.filter(product => product.category === "Nhà thú cưng");
      setParams(4);
      setFilteredProducts(filtered);
      console.log("Filtered products:", filteredProducts);
    }
    else if (queryFilterMode === 5) {
      console.log("Filtering products by category 'Đồ dùng thú y'");
      console.log("Products before filtering:", products);
  
      const filtered = products.filter(product => product.category === "Đồ dùng thú y");
      setParams(5);
      setFilteredProducts(filtered);
      console.log("Filtered products:", filteredProducts);
    }
  }, [queryFilterMode, products]);
////////////////////////////////////////
  const handleCheckboxChange = (brand: string) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand]
    );
  };
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value ? parseFloat(e.target.value) : null);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value ? parseFloat(e.target.value) : null);
  };
  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const handleApplyClick = () => {
    setSearchPerformed(true);
    let filtered = products;

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product: any) =>
        selectedBrands.includes(product.brand)
      );
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product: any) =>
        selectedCategories.includes(product.category)
      );
    }

    if (minPrice !== null) {
      filtered = filtered.filter((product: any) => product.price >= minPrice);
    }

    if (maxPrice !== null) {
      filtered = filtered.filter((product: any) => product.price <= maxPrice);
    }
    if (selectedRating !== null) {
      filtered = filtered.filter(
        (product: any) => product.rating == selectedRating
      );
    }

    setFilteredProducts(filtered);
  };
  useEffect(() => {
    console.log(filteredProducts);
  }, [filteredProducts]);
  //LOGIC FOR PAGINATION
  

  return (
    <>
      <Header />
      <div className="flex">
        {/* FilterSide */}
        <div className="w-1/6 font-k2d   flex flex-col items-center border-r-[1px] border-black ">
          {/* Bộ lọc */}
          <div>
            <h1 className=" text-lg text-center">Bộ lọc tìm kiếm</h1>
            {/* Theo loại */}
            <div className="space-y-4 border-b-[1px] pb-2">
              <div className="text-center">Theo danh mục</div>
              {category.map((cat, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={cat}
                    id={cat}
                    className="custom-checkbox"
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <label htmlFor={cat}>{cat}</label>
                </div>
              ))}
            </div>
            {/* Theo brand */}
            <div className="space-y-3 border-b-[1px] pb-2">
              <div className="text-center">Theo Thương Hiệu</div>
              {brands.map((brand, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={`brand${index + 1}`}
                    id={`brand${index + 1}`}
                    className="custom-checkbox"
                    onChange={() => handleCheckboxChange(brand)}
                  />
                  <label htmlFor={`brand${index + 1}`}>{brand}</label>
                </div>
              ))}
            </div>
            {/* Min and max price searching */}
            <div className="space-y-3 border-b-[1px] pb-2 ">
              <div className="text-center">Theo giá</div>
              <div>
                <input
                  type="number"
                  className="border-[1px] w-20"
                  placeholder="Từ"
                  onChange={handleMinPriceChange}
                />
                -
                <input
                  type="number"
                  className="border-[1px] w-20"
                  placeholder="Đến"
                  onChange={handleMaxPriceChange}
                />
              </div>
              {/* rating by stars */}
              <div className="text-center">Đánh Giá</div>
              <StarRating handleRatingChange={handleRatingChange} />
              <button
                className="w-full rounded-md bg-search-button-orange py-2 px-6 font-kd2 text-xs font-bold 
                uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 
                focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none active:bg-cyan-700 active:scale-95 
                disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={handleApplyClick}
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
        {/* Product side*/}
        <div className="w-5/6 grid grid-cols-3 gap-14 ml-16">
          {(searchPerformed && filteredProducts.length === 0)||(Params!=0 && filteredProducts.length === 0)  ? (
            <div className="col-span-3 text-center p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">No items found</h2>
              <p className="text-gray-600">
                Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            (filteredProducts && filteredProducts.length > 0
              ? filteredProducts
              : products
            ).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          )}
        </div>

      </div>
      <Footer />
    </>
  );
}
