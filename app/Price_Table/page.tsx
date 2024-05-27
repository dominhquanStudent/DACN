"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import Calendar from "react-calendar";
import logo from "@/public/img/Booking/petcare.png";
import Link from "next/link";

import "react-calendar/dist/Calendar.css"; // Import the calendar CSS

export default function Booking() {
  const [activeContainer, setActiveContainer] = useState(1);
  const [date, setDate] = useState(new Date()); // State for selected date

  useEffect(() => {}, []);

  // Function to generate random service name
  const generateRandomService = (index: number) => {
    const services = [
      "",
      "Điều trị",
      "Tiêm phòng",
      "Triệt",
      "Hỗ trợ đẻ",
      "Phẫu thuật",
      "Tư vấn khám bệnh",
      "",
    ];
    return services[index % services.length];
  };

  // Function to generate random price
  const generateRandomPrice = (index: number) => {
    const services = [
      "Dưới 4kg",
      "500.000đ",
      "300.000đ",
      "500.000đ",
      "400.000đ",
      "450.000đ",
      "300.000đ",
      "",
    ];
    return services[index % services.length];
  };

  const generateRandomPrice2 = (index: number) => {
    const services = [
      "Trên 4kg",
      "550.000đ",
      "350.000đ",
      "550.000đ",
      "450.000đ",
      "550.000đ",
      "350.000đ",
      "",
    ];
    return services[index % services.length];
  };

  const generateRandomServiceSpa = (index: number) => {
    const services = ["", "Tắm rửa", "Tỉa lông", "Vệ sinh tai", "Cắt móng"];
    return services[index % services.length];
  };
  const generateRandomPriceSpa = (index: number) => {
    const services = [
      "Trên 4kg",
      "550.000đ",
      "350.000đ",
      "550.000đ",
      "450.000đ",
    ];
    return services[index % services.length];
  };
  const generateRandomPriceSpa2 = (index: number) => {
    const services = [
      "Trên 4kg",
      "550.000đ",
      "350.000đ",
      "550.000đ",
      "450.000đ",
    ];
    return services[index % services.length];
  };

  // JSX code with random content in each cell
  return (
    //global container
    <>
      <Header />

      <div className="flex gap-4 p-4">
        <div className="border-r border-gray-300 mx-4"></div>{" "}
        {/* Divider line */}
        <div className="flex-[8] p-4">
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-center text-orange-500 font-bold text-4xl">
              Bảng giá dịch vụ
            </h2>
            <div className="border-b border-gray-500 w-full my-2"></div>{" "}
            {/* Horizontal line */}
            <div className="flex gap-4 p-4">
              <div>
                <h2 className="mb-4 text-orange-500 font-bold">
                  Kiểm tra sức khỏe
                </h2>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Dịch vụ
                        </th>
                        <th scope="col" className="px-6 py-3" colspan="2">
                          Giá tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(7)].map((_, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={`bg-white border-b  dark:bg-gray-800 dark:border-gray-700`}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {generateRandomService(rowIndex)}
                          </th>
                          <td className="px-6 py-4">
                            {generateRandomPrice(rowIndex)}
                          </td>
                          <td className="px-6 py-4">
                            {generateRandomPrice2(rowIndex)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="border-r border-gray-300 mx-4"></div>{" "}
              {/* Divider line */}
              <div>
                <h2 className="mb-4 text-orange-500 font-bold">
                  Spa and Grooming
                </h2>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Dịch vụ
                        </th>
                        <th scope="col" className="px-6 py-3" colspan="2">
                          Giá tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(5)].map((_, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={`bg-white ${
                            rowIndex % 2 === 0 ? "border-b" : ""
                          } dark:bg-gray-800 dark:border-gray-700`}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {generateRandomServiceSpa(rowIndex)}
                          </th>
                          <td className="px-6 py-4">
                            {generateRandomPriceSpa(rowIndex)}
                          </td>
                          <td className="px-6 py-4">
                            {generateRandomPriceSpa2(rowIndex)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <h2 className="mb-4">
              Lưu ý: Giá tham khảo, có thể thay đổi với mức độ thứ cưng nhưng
              không quá 20%
            </h2>
            <div className="mt-6 mb-4 mx-2">
              <Link href="Component/Booking">
                <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
                  Đặt lịch chăm sóc thú cưng tại đây
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-r border-gray-300 mx-4"></div>{" "}
        {/* Divider line */}
        <div className="flex flex-col items-center  min-h-screen">
          <h2 className="mb-4 text-orange-500 font-bold">Đặt lịch ngay</h2>
          <div className="p-4">
            <Calendar onChange={setDate} value={date} />
          </div>
          <div className="p-4">
            <img src={logo.src} alt="Logo" className="w-60" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
