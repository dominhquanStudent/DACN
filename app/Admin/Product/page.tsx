"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import ConfirmModal from "@/app/Component/ConfirmModal";

library.add(faTrashCan, faPenToSquare, faPlus);
import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";

function Product() {
  const [products, setProducts] = useState<any[]>([]);
  const Router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

  const handleDeleteClick = (product: any) => {
    setSelectedProduct(product);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      try {
        await axios.delete(`/product/${selectedProduct._id}`);
        const newProducts = products.filter(
          (product) => product._id !== selectedProduct._id
        );
        setProducts(newProducts);
        setIsConfirmModalOpen(false);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleAddClick = () => {
    console.log(`Add for order`);
    Router.push("/Admin/Product/AddProduct");
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
              className="bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2 hover:bg-blue-500 hover:border-blue-600 hover:text-white"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nhãn hàng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Số lượng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Giá tiền (VNĐ)
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Giảm giá 
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Chi tiết
                </th>
                <th
                  className="px-5 
                
                
                py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
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
                    {new Intl.NumberFormat('vi-VN').format(product.price)}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {product.discount}%
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {product.status === "active" ? "Đang còn hàng" : "Đã hết hàng"}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleChangeClick(product._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleConfirmDelete}
            message={`Bạn có muốn xóa sản phẩm ${selectedProduct?.name} không?`}
          />
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
