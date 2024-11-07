"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import Calendar from "react-calendar";
import logo from "@/public/img/Booking/petcare.png";
import Link from "next/link";

import "react-calendar/dist/Calendar.css"; // Import the calendar CSS

export default function Booking() {
  const [date, setDate] = useState(new Date()); // State for selected date
  interface Service {
    service: string;
    price1: string;
    price2: string;
  }

  const [services, setServices] = useState<Service[]>([]);
  const [spaServices, setSpaServices] = useState<Service[]>([]);

  useEffect(() => {
    // Generate services content once on the client side
    const generatedServices = [...Array(7)].map((_, index) => ({
      service: generateRandomService(index),
      price1: generateRandomPrice(index),
      price2: generateRandomPrice2(index),
    }));
    setServices(generatedServices);

    const generatedSpaServices = [...Array(5)].map((_, index) => ({
      service: generateRandomServiceSpa(index),
      price1: generateRandomPriceSpa(index),
      price2: generateRandomPriceSpa2(index),
    }));
    setSpaServices(generatedSpaServices);
  }, []);

  // Function to generate random service name
  const generateRandomService = (index: number) => {
    const services = [
      "Cân nặng",
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
    const services = ["Cân nặng", "Tắm rửa", "Tỉa lông", "Vệ sinh tai", "Cắt móng"];
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
    
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="border-b lg:border-r border-gray-300 mx-4"></div> {/* Divider line */}
        <div className="flex-[8] p-4">
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-center text-orange-500 font-bold text-2xl lg:text-3xl">
              Bảng giá dịch vụ
            </h2>
            <div className="border-b border-gray-500 w-full my-2"></div> {/* Horizontal line */}
            <div className="flex flex-col lg:flex-row gap-4 p-4">
              <div className="w-full lg:w-1/2">
                <h2 className="mb-4 text-orange-500 font-bold text-center">
                  Kiểm tra sức khỏe
                </h2>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Dịch vụ
                        </th>
                        <th scope="col" className="px-6 py-3 text-center" colSpan={2}>
                          Giá tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {service.service}
                          </th>
                          <td className="px-6 py-4">{service.price1}</td>
                          <td className="px-6 py-4">{service.price2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="border-b lg:border-r border-gray-300 mx-4"></div> {/* Divider line */}
              <div className="w-full lg:w-1/2">
                <h2 className="mb-4 text-orange-500 font-bold text-center">
                  Spa and Grooming
                </h2>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Dịch vụ
                        </th>
                        <th scope="col" className="px-6 py-3 text-center" colSpan={2}>
                          Giá tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {spaServices.map((service, rowIndex) => (
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
                            {service.service}
                          </th>
                          <td className="px-6 py-4">{service.price1}</td>
                          <td className="px-6 py-4">{service.price2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <h2 className="mb-4 text-center text-sm lg:text-base">
              Lưu ý: Giá tham khảo, có thể thay đổi với mức độ thứ cưng nhưng không quá 20%
            </h2>
            <div className="mt-6 mb-4 mx-2">
              <Link href="/Booking">
                <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
                  Đặt lịch chăm sóc thú cưng tại đây
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-b lg:border-r border-gray-300 mx-4"></div> {/* Divider line */}
        <div className="flex flex-col items-center min-h-screen">
          <h2 className="mb-4 text-orange-500 font-bold text-center text-xl lg:text-2xl">Đặt lịch ngay</h2>
          <div className="">
            <Calendar onChange={(value) => setDate(value as Date)} value={date} />
          </div>
          <div className="p-4">
            <img src={logo.src} alt="Logo" className="w-40 lg:w-60" />
          </div>
        </div>
      </div>
    
      <Footer />
    </>
  );
}