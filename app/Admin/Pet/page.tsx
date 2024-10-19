"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function Pet() {
  const [pets, setPets] = useState<any[]>([]);
  
  
  const Router = useRouter();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("/pet/list");
        setPets(response.data.pets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  const handleChangeClick = (petId: any) => {
    console.log(`Details for pet ${petId}`);
    Router.push(`/Admin/Pet/${petId}`);
  };

  const handleDeleteClick = async (petId: any) => {
    console.log(`Delete for pet ${petId}`);
    try {
      await axios.delete(`/pet/${petId}`);
      const newPets = pets.filter((pet) => pet._id !== petId);
      setPets(newPets);
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const handleAddClick = () => {
    console.log(`Add for order`);
    Router.push("/Admin/Pet/AddPet");
    // Here you can navigate to a detail page or open a modal
  };
  const petsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the pets to display on the current page
  
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  // Calculate total pages
  const totalPages = Math.ceil(pets.length / petsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber:any) => {
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
        pageNumbers.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
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
                  Ảnh
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên thú cưng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Giới tính
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tuổi
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Giống loại
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vaccine
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nhận nuôi
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
              {Array.isArray(currentPets) && currentPets.map((pet: any) => (
                <tr key={pet._id}>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <img loading="lazy" src={pet.image.url} alt={pet.name} className="h-16 rounded-full" />
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {pet.petName}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {pet.gender}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {pet.age}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {pet.race}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {pet.vaccinated}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {pet.adoptStatus}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleChangeClick(pet._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Xem{" "}
                    </button>
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleDeleteClick(pet._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination flex justify-center mt-4">
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
                className={`px-3 py-1 mx-1 ${
                  currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
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
        </div>
      </div>
    </div>
  );
}

export default Pet;