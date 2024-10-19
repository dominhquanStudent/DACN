"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";
function Product() {
  const [products, setProducts] = useState<any[]>([]);
  const Router = useRouter();

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

  const handleChangeClick = (productId: any) => {
    console.log(`Details for product ${productId}`);
    Router.push(`/Admin/Product/${productId}`);
  };
  const handleDeleteClick = async (productId: any) => {
    console.log(`Delete for product ${productId}`);
    try {
      await axios.delete(`/product/${productId}`);
      const newProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(newProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleAddClick = () => {
    console.log(`Add for order`);
    Router.push("/Admin/Product/AddProduct");
    // Here you can navigate to a detail page or open a modal
  };
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
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
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pageNumbers;
  };
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Header></Header>
      <div className="flex w-full">
        <Sidebar></Sidebar>
        <div className="w-3/4 border-l-2 border-gray-200 px-4">
          <div
            className={
              "flex font-nunito text-xl font-bold w-full justify-center mb-4"
            }
          >
            Quản lý sản phẩm
          </div>
          {/* Table */}
          <div className="flex w-full space-x-2 mt-4">
            <button
              onClick={handleAddClick}
              className="bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2"
            >
              Thêm
            </button>
          </div>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Xem
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentProducts) &&
                currentProducts.map((product: any) => (
                  <tr key={product._id}>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <img
                        loading="lazy"
                        src={product.image.url}
                        alt={product.name}
                        className="h-16 rounded-full"
                      />
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {product.name}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {product.brand}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {product.stock}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {product.price}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {product.discount}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {product.status}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleChangeClick(product._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Chi tiết
                      </button>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleDeleteClick(product._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="pagination flex justify-center">
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
                onClick={() =>
                  typeof pageNumber === "number" && handlePageChange(pageNumber)
                }
                className={`px-3 py-1 mx-1 ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                disabled={typeof pageNumber !== "number"}
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
        </div>
      </div>
    </div>
  );
}

export default Product;
