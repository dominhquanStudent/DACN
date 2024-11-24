import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "@/api/axios";
import ProductCard from "./ProductFrame_Main";
import ErrorModal from "@/app/Component/Error";
import "@/app/Component/CheckboxStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import LoadingModal from "@/app/Component/Loading";
const ProductContent = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const searchParams = useSearchParams();
  const queryFilterMode = Number(searchParams.get("filterMode") ?? "0");

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>(""); // Initialize as empty string
  const [maxPrice, setMaxPrice] = useState<string>(""); // Initialize as empty string
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [Params, setParams] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get(`${baseURL}/product/list`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (queryFilterMode === 1) {
      const filtered = products.filter(
        (product) => product.category === "Thức ăn thú cưng"
      );
      setParams(1);
      setFilteredProducts(filtered);
    } else if (queryFilterMode === 2) {
      const filtered = products.filter(
        (product) => product.category === "Phụ kiện & Đồ chơi"
      );
      setParams(2);
      setFilteredProducts(filtered);
    } else if (queryFilterMode === 3) {
      const filtered = products.filter(
        (product) => product.category === "Đồ dùng vệ sinh"
      );
      setParams(3);
      setFilteredProducts(filtered);
    } else if (queryFilterMode === 4) {
      const filtered = products.filter(
        (product) => product.category === "Nhà thú cưng"
      );
      setParams(4);
      setFilteredProducts(filtered);
    } else if (queryFilterMode === 5) {
      const filtered = products.filter(
        (product) => product.category === "Đồ dùng thú y"
      );
      setParams(5);
      setFilteredProducts(filtered);
    }
  }, [queryFilterMode, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSelectedBrands([]); // Reset selected brands when category changes
  
    // Reset checkboxes
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
    });
  };

  const categoryMapping: { [key: string]: string } = {
    "Thức ăn thú cưng": "Boss ăn Boss uống",
    "Quần áo & Phụ kiện": "Boss mang Boss mặc",
    "Đồ chơi cho thú cưng": "Boss học Boss chơi",
    "Đồ dùng tắm gội": "Boss tắm Boss gội",
    "Đồ dùng vệ sinh": "Boss sạch Boss thơm",
    "Nhà thú cưng": "Boss ngủ Boss nghỉ",
    "Đồ dùng thú y": "Boss khỏe Boss ngoan",
  };

  const categoryOrder = [
    "Thức ăn thú cưng",
    "Quần áo & Phụ kiện",
    "Đồ chơi cho thú cưng",
    "Đồ dùng tắm gội",
    "Đồ dùng vệ sinh",
    "Nhà thú cưng",
    "Đồ dùng thú y",
  ];

  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter(
        (product: any) => product.category === selectedCategory
      );
    }
    // Apply price filter
    if (minPrice !== "") {
      filtered = filtered.filter(
        (product: any) => product.discount_price >= parseFloat(minPrice)
      );
    }
    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product: any) => product.discount_price <= parseFloat(maxPrice)
      );
    }
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product: any) =>
        selectedBrands.includes(product.brand)
      );
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrands, products]);

  const handleCheckboxChange = (brand: string) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand]
    );
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinPrice(e.target.value ? e.target.value : ""); // Set to empty string if no value
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMaxPrice(e.target.value ? e.target.value : ""); // Set to empty string if no value
  };

  const handleApplyClick = () => {
    setSearchPerformed(true);
    let filtered = products; // Start filtering from the original list of products

    if (minPrice !== "" && maxPrice !== "" && parseFloat(minPrice) > parseFloat(maxPrice)) {
      setError("INVALID_PRICE_RANGE");
      return;
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (product: any) => product.category === selectedCategory
      );
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product: any) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Apply price filter
    if (minPrice !== "") {
      filtered = filtered.filter(
        (product: any) => product.discount_price >= parseFloat(minPrice)
      );
    }
    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product: any) => product.discount_price <= parseFloat(maxPrice)
      );
    }

    setFilteredProducts(filtered);
  };

  const priceOptions = [
    0, 10000, 100000, 200000, 500000, 800000, 1000000, 2000000,
  ];

  const brands = Array.from(
    new Set(
      products
        .filter((product) => product.category === selectedCategory)
        .map((product) => product.brand)
    )
  );
  const category = Array.from(
    new Set(products.map((product) => product.category))
  ).sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b));

  if (products.length!==0)return (
    <>
      <Header />
      <ErrorModal error={error} setError={setError} />
      <div className="flex mr-2">
        {/* FilterSide */}
        <div className="w-1/6 font-k2d flex flex-col items-center border-r-[1px] border-clicked_filter p-4 space-y-6 ">
          {/* Bộ lọc */}
          <div className="relative w-full flex-col">
            <div className="flex justify-between items-center p-2 text-center font-bold bg-title_filter text-orange-700">
              <FontAwesomeIcon icon={faList} />
              <span className="flex-grow text-center">Theo danh mục</span>
            </div>

            {/* Theo loại */}
            <div className=" space-y-2 border-b-[1px] pb-4 bg-background-filter">
              {category.map((cat, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2  p-2  ${
                    selectedCategory === cat ? "bg-clicked_filter" : ""
                  } hover:bg-hover_filter`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  <label htmlFor={cat} className="text-sm">
                    {categoryMapping[cat]}
                  </label>
                </div>
              ))}
            </div>
            {selectedCategory && (
              <>
                {/* Theo brand */}
                <div className="space-y-4 border-b-[1px] pb-4 mt-4 bg-background-filter">
                  <div className="flex justify-between items-center p-2 text-center font-bold bg-title_filter text-orange-700">
                    <FontAwesomeIcon icon={faList} />
                    <span className="flex-grow text-center">
                      Theo thương hiệu
                    </span>
                  </div>
                  {brands.map((brand, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={`brand${index + 1}`}
                        id={`brand${index + 1}`}
                        className="custom-checkbox bg-blue-white"
                        onChange={() => handleCheckboxChange(brand)}
                      />
                      <label htmlFor={`brand${index + 1}`} className="text-sm">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
                
              </>
            )}
            {/* Min and max price searching */}
            <div className="space-y-4 border-b-[1px] pb-4 mt-4 bg-background-filter">
                  <div className="flex justify-between items-center p-2 text-center font-bold bg-title_filter text-orange-700">
                    <FontAwesomeIcon icon={faList} />
                    <span className="flex-grow text-center">Theo giá</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <select
                      className="border-[1px] w-20 p-1 rounded "
                      value={minPrice} // Bind value to state
                      onChange={handleMinPriceChange}
                    >
                      <option value="">Từ</option>
                      {priceOptions.map((price, index) => (
                        <option key={index} value={price}>
                          {price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                    <span>-</span>
                    <select
                      className="border-[1px] w-20 p-1 rounded "
                      value={maxPrice} // Bind value to state
                      onChange={handleMaxPriceChange}
                    >
                      <option value="">Đến</option>
                      {priceOptions.map((price, index) => (
                        <option key={index} value={price}>
                          {price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  className="w-full rounded-md bg-search-button-orange py-2 px-6 font-kd2 text-xs font-bold 
              uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 
              focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none active:bg-cyan-700 active:scale-95 
              disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-4"
                  data-ripple-light="true"
                  onClick={handleApplyClick}
                >
                  Áp dụng
                </button>
          </div>
        </div>
        {/* Product side */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-16 ml-1 mr-2 snap-y snap-mandatory overflow-y-scroll h-[calc(100vh-4rem)] hide-scrollbar mt-2">
          {(searchPerformed && filteredProducts.length === 0) ||
          (Params != 0 && filteredProducts.length === 0) ? (
            <div className="col-span-4 text-center p-6 snap-center">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="h-20 w-20 mb-4 text-gray-400"
              />

              <h2 className="text-xl font-semibold mb-2">
                Không tìm thấy sản phẩm
              </h2>
              <p className="text-gray-600">
                Hãy thử lại với bộ lọc khác hoặc xóa bộ lọc hiện tại
              </p>
            </div>
          ) : (
            (filteredProducts && filteredProducts.length > 0
              ? filteredProducts
              : products
            ).map((product, index) => (
              <div
                key={index}
                className="transition-transform transform hover:scale-105 w-53 h-64 p-2 "
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
  if (products.length===0) return  <LoadingModal isLoading={true} isComplete={false} setIsComplete={setIsComplete} loadWhat="LOADING_PRODUCT" />;
};

export default ProductContent;