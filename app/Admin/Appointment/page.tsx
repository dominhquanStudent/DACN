"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faFilter } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "@/app/Component/ConfirmModal";

library.add(faTrashCan, faPenToSquare, faFilter);
import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function isToday(dateString: string): boolean {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isThisWeek(dateString: string): boolean {
  const today = new Date();
  const date = new Date(dateString);
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 6)
  );
  return date >= startOfWeek && date <= endOfWeek;
}

function isThisMonth(dateString: string): boolean {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
function isPast(dateString: string): boolean {
  const today = new Date();
  const date = new Date(dateString);
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return date < today;
}

function Appointment() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const Router = useRouter();
  const [value, onChange] = useState<Value>(new Date());
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointment/list");
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleChangeClick = (appointmentId: any) => {
    console.log(`Details for appointment ${appointmentId}`);
    Router.push(`/Admin/Appointment/${appointmentId}`);
  };

  const handleDeleteClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedAppointment) {
      try {
        await axios.delete(`/appointment/${selectedAppointment._id}`);
        const newAppointments = appointments.filter(
          (appointment) => appointment._id !== selectedAppointment._id
        );
        setAppointments(newAppointments);
        setIsConfirmModalOpen(false);
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "all") return appointment.date;
    if (filter === "today") return isToday(appointment.date);
    if (filter === "week") return isThisWeek(appointment.date);
    if (filter === "month") return isThisMonth(appointment.date);
    if (filter === "past") return isPast(appointment.date);
  });

  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 12;
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

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
      <Header />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-3/4 border-l-2 border-gray-200 px-4">
          <div
            className={
              "flex font-nunito text-xl font-bold w-full justify-center mb-4"
            }
          >
            Lịch hẹn khám bệnh
          </div>
          <div className='flex w-full mt-4 mb-4 justify-end'>
            <label className='text-lg font-nunito font-bold text-gray-400'>
              <FontAwesomeIcon icon={faFilter} className="h-5 w-5" />
            </label>
            <select
              className='border border-gray-300 rounded-md ml-2'
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="today">Hôm nay</option>
              <option value="week">Trong tuần</option>
              <option value="month">Trong tháng</option>
              <option value="past">Đã qua</option>
            </select>
          </div>

          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên khách hàng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SĐT
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Địa chỉ
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày hẹn
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Giờ hẹn
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Dịch vụ
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Bác sĩ chỉ định
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
              {Array.isArray(currentAppointments) &&
                currentAppointments.map((appointment: any) => {
                  return (
                    <tr
                      key={appointment._id}
                      className={
                        isToday(appointment.date)
                          ? "bg-blue-50"
                          : "bg-white text-sm"
                      }
                    >
                      <td className="px-5 py-2 border-b border-gray-200">
                        {appointment.userName}
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200">
                        {appointment.phone}
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200">
                        {appointment.address}
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 ">
                        {formatDate(appointment.date)}
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 ">
                        {appointment.time}
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 ">
                        {appointment.service}
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 ">
                        {appointment.doctorName}
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 ">
                        <button
                          onClick={() => handleChangeClick(appointment._id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200">
                        <button
                          onClick={() => handleDeleteClick(appointment)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <ConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleConfirmDelete}
            message={`Bạn có muốn xóa lịch hẹn của ${selectedAppointment?.userName} không?`}
          />
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

export default Appointment;