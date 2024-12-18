"use client";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import axios from "@/api/axios";
import ProductCard from "@/app/Component/Product_Intro/Product/ProductFrame_Main";
import ErrorModal from "@/app/Component/Error";
import "@/app/Component/CheckboxStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import LoadingModal from "@/app/Component/Loading";

const ProductContent = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const productsPerPage = 10;

  const [products, setProducts] = useState<any[]>([]);
  const [brandlist, setBrandlist] = useState<any[]>([]);
  const [brand, setBrand] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const productGridRef = useRef<HTMLDivElement>(null);
  const [sortOrder, setSortOrder] = useState<string>("none");
  const [sortBy, setSortBy] = useState<string>("none");
  const sortOptions = [
    { label: "Không", value: "none", field: "none" },
    { label: "Giá thấp đến cao", value: "asc", field: "price" },
    { label: "Giá cao đến thấp", value: "desc", field: "price" },
    { label: "Tên A-Z", value: "asc", field: "name" },
    { label: "Tên Z-A", value: "desc", field: "name" }
  ];
  const scrollToProducts = () => {
    if (productGridRef.current) {
      const yOffset = -80;
      const y = productGridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y + 100, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sortByParam = params.get("sortBy");
    const sortOrderParam = params.get("sortOrder");

    // If either param is none or missing, clear both
    if (!sortByParam || !sortOrderParam || sortByParam === "none" || sortOrderParam === "none") {
      params.delete("sortBy");
      params.delete("sortOrder");
      setSortBy("none");
      setSortOrder("none");
    } else {
      setSortBy(sortByParam);
      setSortOrder(sortOrderParam);
    }
  }, []);
  const updateSearchParams = (updates: { [key: string]: string | null }) => {
    const params = new URLSearchParams(window.location.search);

    // Handle each update
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Don't reset page when it's being updated
    if (!updates.hasOwnProperty("page")) {
      params.delete("page");
    }

    router.push(`?${params.toString()}`);
  };
  const fetchProducts = async (page: number) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams(window.location.search);

      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const apiParams: {
        page: number;
        limit: number;
        category: string;
        brand?: string;  // Add brand parameter
        minPrice: string;
        maxPrice: string;
        sortBy?: string;
        sortOrder?: string
      } = {
        page,
        limit: productsPerPage,
        category: params.get("category") || "",
        brand: params.get("brand") || "",
        minPrice: params.get("minPrice") || "",
        maxPrice: params.get("maxPrice") || ""
      };

      // Only add sort params if they exist and aren't "none"
      const sortBy = params.get("sortBy");
      const sortOrder = params.get("sortOrder");
      if (sortBy && sortOrder && sortBy !== "none" && sortOrder !== "none") {
        apiParams["sortBy"] = sortBy;
        apiParams["sortOrder"] = sortOrder;
      }

      // Clean empty params
      Object.keys(apiParams).forEach(key => {
        if (!apiParams[key as keyof typeof apiParams]) delete apiParams[key as keyof typeof apiParams];
      });
      console.log(apiParams);
      const response = await axios.get(`${baseURL}/product/list`, { params: apiParams });
      console.log(response.data);
      setProducts(response.data.products);
      setBrandlist(response.data.brandlist);
      console.log(response.data.brandlist);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage).then(() => {
      // Scroll after products are loaded
      const productGrid = document.getElementById('product-grid');
      if (productGrid && products.length > 0) {
        setTimeout(() => {
          productGrid.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100); // Small delay to ensure content is rendered
      }
    });

  }, [currentPage, selectedCategory, maxPrice, minPrice, sortBy, sortOrder, brand]);

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
  const priceOptions = [
    0, 10000, 100000, 200000, 500000, 800000, 1000000, 2000000,
  ];
  // Update handlers to use new function
  const handleCategoryChange = (category: string) => {
    const currentCategory = searchParams.get("category");
    const updates: { [key: string]: string | null } = {};

    // Toggle category and always remove brand
    if (category === currentCategory) {
      updates.category = null;
    } else {
      updates.category = category;
    }
    updates.brand = null;
    setBrand(null);

    updateSearchParams(updates);
  };

  const handleBrandChange = (brand: string) => {
    const currentBrand = searchParams.get("brand");
    const updates: { [key: string]: string | null } = {};

    // Toggle brand selection  
    if (brand === currentBrand) {
      updates.brand = null;
    } else {
      updates.brand = brand;
    }

    updateSearchParams(updates);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSearchParams({
      minPrice: e.target.value || null
    });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSearchParams({
      maxPrice: e.target.value || null
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split("-");
    if (field === "none" || order === "none") {
      updateSearchParams({
        sortBy: null,
        sortOrder: null
      });
      setSortBy("none");
      setSortOrder("none");
    } else {
      updateSearchParams({
        sortBy: field,
        sortOrder: order
      });
    }
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    const params = new URLSearchParams(window.location.search);
    params.set("page", pageNumber.toString());

    // Update URL with page number
    router.push(`?${params.toString()}`);

    // Scroll to product grid
    if (productGridRef.current) {
      productGridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const clearFilters = () => {
    // Reset all states
    setBrand(null);
    setSelectedCategory(null);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("none");
    setSortOrder("none");

    // Clear all search params except page
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get("page");
    params.delete("category");
    params.delete("brand");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("sortBy");
    params.delete("sortOrder");

    // Keep current page if exists
    if (currentPage) {
      params.set("page", currentPage);
    }

    router.push(`?${params.toString()}`);
  };
  // Generate pagination buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pageNumbers;
  };

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const categoryParam = searchParams.get("category");
    const brandParam = searchParams.get("brand");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const sortByParam = searchParams.get("sortBy") || "price";
    const sortOrderParam = searchParams.get("sortOrder") || "asc";
    setCurrentPage(page);
    setSelectedCategory(categoryParam);
    setBrand(brandParam || null);
    setMinPrice(minPriceParam || "");
    setMaxPrice(maxPriceParam || "");
    setSortBy(sortByParam);
    setSortOrder(sortOrderParam);
  }, [searchParams]);
  useEffect(() => {
    // Scroll on initial page load
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
      productGrid.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);
  if (isLoading) {
    return <LoadingModal isLoading={true} isComplete={false} setIsComplete={setIsComplete} loadWhat="LOADING_PRODUCT" />;
  }

  return (
    <>
      <Header />
      <ErrorModal error={error} setError={setError} />
      <div className="flex flex-col md:flex-row mr-2">
        {/* Burger Menu for Mobile */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <button className="text-gray-700 focus:outline-none">
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
          <span className="text-lg font-bold">Bộ lọc sản phẩm</span>
        </div>
        {/* FilterSide */}
        <div className={`w-full md:w-1/6 font-k2d flex flex-col items-center border-r-[1px] border-clicked_filter p-4 space-y-6 overflow-y-auto md:block`}>
          {/* Bộ lọc */}
          <div className="relative w-full flex-col">
            <div className="flex justify-between items-center p-2 text-center font-bold bg-[#659287] text-white">
              <FontAwesomeIcon icon={faList} />
              <span className="flex-grow text-center">Theo danh mục</span>
            </div>
            {/* Theo loại */}
            <div className=" space-y-2 border-b-[1px] pb-4 bg-background-filter">
              {categoryOrder.map((cat, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-2 ${searchParams.get("category") === cat ? "bg-clicked_filter" : ""
                    } hover:bg-hover_filter`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  <label htmlFor={cat} className="text-sm">
                    {categoryMapping[cat]}
                  </label>
                </div>
              ))}
            </div>
            {/* Theo thương hiệu */}
            {(brandlist && brandlist.length > 0) && (
              <div className="space-y-2 border-b-[1px] pb-4 bg-background-filter">
                <div className="flex justify-between items-center p-2 text-center font-bold bg-[#659287] text-white">
                  <FontAwesomeIcon icon={faList} />
                  <span className="flex-grow text-center">Theo thương hiệu</span>
                </div>
                {brandlist.map((brand, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 p-2 ${searchParams.get("brand") === brand ? "bg-clicked_filter" : ""
                      } hover:bg-hover_filter`}
                    onClick={() => handleBrandChange(brand)}
                  >
                    <label htmlFor={brand} className="text-sm">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {/* Theo giá */}
            <div className="space-y-4 border-b-[1px] pb-4 mt-4 bg-background-filter">
              <div className="flex justify-between items-center p-2 text-center font-bold bg-[#659287] text-white">
                <FontAwesomeIcon icon={faList} />
                <span className="flex-grow text-center">Theo giá</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <select
                  className="border-[1px] w-20 p-1 rounded"
                  value={minPrice}
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
                  className="border-[1px] w-20 p-1 rounded"
                  value={maxPrice}
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
            <div className="flex justify-between items-center p-2 text-center font-bold bg-[#659287] text-white">
              <FontAwesomeIcon icon={faList} />
              <span className="flex-grow text-center">Sắp xếp theo</span>
            </div>
            <select
              className="border-[1px] p-2 rounded"
              value={sortBy && sortOrder ? `${sortBy}-${sortOrder}` : "none-none"}
              onChange={handleSortChange}
            >
              {sortOptions.map((option, index) => (
                <option key={index} value={`${option.field}-${option.value}`}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="w-full p-2 text-white bg-red-500 hover:bg-red-600 rounded font-semibold"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* Product side */}
        <div
          ref={productGridRef}
          id="product-grid"
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8"
        >
          {!isLoading && products.length === 0 ? (
            <div className="col-span-4 text-center p-6">
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
            products.map((product, index) => (
              <div
                key={index}
                className="transition-transform transform hover:scale-105 w-53 h-64 p-2"
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="pagination flex justify-center mt-12 mb-4">
        <button
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
            className={`px-3 py-1 mx-1 ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            disabled={typeof pageNumber !== 'number'}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ProductContent;