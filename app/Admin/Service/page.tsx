"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashCan,
  faPlus,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import ConfirmModal from "@/app/Component/ConfirmModal";

library.add(faTrashCan, faPenToSquare, faPlus);
import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";

interface Service {
  name: String;
  category: String;
  price: Number;
  description: String;
  status: String;
  image: {
    public_id: [String];
    url: [String];
  };
}

function Service() {
  const [services, setServices] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const Router = useRouter();
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/service/admin/list");
        let fetchedServices = response.data.services;

        // Apply status filter first
        if (statusFilter !== "all") {
          fetchedServices = fetchedServices.filter((service: any) =>
            statusFilter === "available"
              ? service.status === "active"
              : service.status !== "active"
          );
        }

        // Apply category filter next
        if (filter !== "all") {
          fetchedServices = fetchedServices.filter(
            (service: any) => service.category === filter
          );
        }

        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [filter, statusFilter]);

  const handleChangeClick = (serviceId: any) => {
    console.log(`Details for service ${serviceId}`);
    Router.push(`/Admin/Service/${serviceId}`);
  };

  const handleDeleteClick = (service: any) => {
    setSelectedService(service);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedService) {
      try {
        await axios.delete(`/service/${selectedService._id}`);
        const newServices = services.filter(
          (service) => service._id !== selectedService._id
        );
        setServices(newServices);
        setIsConfirmModalOpen(false);
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleAddClick = () => {
    console.log(`Add for service`);
    Router.push("/Admin/Service/AddService");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  // Calculate the services to display on the current page
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  // Calculate total pages
  const totalPages = Math.ceil(services.length / servicesPerPage);

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
            Quản lý dịch vụ
          </div>
          {/* Table */}
          <div className="flex w-full space-x-2 mt-4">
            <button
              onClick={handleAddClick}
              className="bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2 hover:bg-blue-500 hover:border-blue-600 hover:text-white"
            >
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
            </button>
            <div className="flex w-full mt-4 mb-4 justify-end">
              <label className="text-lg font-nunito font-bold text-gray-400">
                <FontAwesomeIcon icon={faFilter} className="h-5 w-5" />
              </label>

              <select
                className="border border-gray-300 rounded-md ml-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Phân loại</option>
                <option value="all">Tất cả</option>
                <option value="Thức ăn thú cưng">Thức ăn thú cưng</option>
                <option value="Quần áo & Phụ kiện">Quần áo & Phụ kiện</option>
                <option value="Đồ chơi cho thú cưng">Đồ chơi cho thú cưng</option>
                <option value="Đồ dùng tắm gội">Đồ dùng tắm gội</option>
                <option value="Đồ dùng vệ sinh">Đồ dùng vệ sinh</option>
                <option value="Nhà thú cưng">Nhà thú cưng</option>
                <option value="Đồ dùng thú y">Đồ dùng thú y</option>
              </select>
              <select
                className="border border-gray-300 rounded-md ml-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Trạng thái</option>
                <option value="all">Tất cả</option>
                <option value="available">Đang còn hàng</option>
                <option value="out_of_stock">Đã hết hàng</option>
              </select>
            </div>
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
                  Giá tiền (VNĐ)
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Chi tiết
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentServices) &&
                currentServices.map((service: any) => (
                  <tr key={service._id} className={"bg-white"}>
                    <td className="px-5 py-2 border-b border-gray-200  text-sm">
                      <img
                        loading="lazy"
                        src={service.image.url}
                        alt={service.name}
                        className="h-12 w-12 rounded-full"
                      />
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200  text-sm">
                      {service.name}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200  text-sm">
                      {new Intl.NumberFormat("vi-VN").format(service.price)}
                    </td>
                    <td
                      className={`px-5 py-2 border-b border-gray-200 text-sm ${
                        service.status !== "active" ? "text-red-500" : ""
                      }`}
                    >
                      {service.status === "active"
                        ? "Đang còn hàng"
                        : "Đã hết hàng"}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200  text-sm">
                      <button
                        onClick={() => handleChangeClick(service._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200  text-sm">
                      <button
                        onClick={() => handleDeleteClick(service)}
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
            message={`Bạn có muốn xóa dịch vụ ${selectedService?.name} không?`}
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

export default Service;