"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";
import Calendar from 'react-calendar';
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

  const handleDeleteClick = async (appointmentId: any) => {
    console.log(`Delete for appointment ${appointmentId}`);
    try {
      await axios.delete(`/appointment/${appointmentId}`);
      const newAppointments = appointments.filter(
        (appointment) => appointment._id !== appointmentId
      );
      setAppointments(newAppointments);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter==="all") return !isPast(appointment.date);
    if (filter === "today") return isToday(appointment.date);
    if (filter === "week") return isThisWeek(appointment.date);
    if (filter === "month") return isThisMonth(appointment.date);
    if (filter === "past") return isPast(appointment.date);
  });

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
          {/* Filter Buttons */}
          {/* <div className='flex w-full space-x-2 mt-4'>
            <button onClick={() => setFilter('all')} className={`bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2 ${filter === 'all' ? 'bg-gray-200' : ''}`}>
              Tất cả
            </button>
            <button onClick={() => setFilter('today')} className={`bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2 ${filter === 'today' ? 'bg-gray-200' : ''}`}>
              Hôm nay
            </button>
            <button onClick={() => setFilter('week')} className={`bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2 ${filter === 'week' ? 'bg-gray-200' : ''}`}>
              Trong tuần
            </button>
            <button onClick={() => setFilter('month')} className={`bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2 ${filter === 'month' ? 'bg-gray-200' : ''}`}>
              Trong tháng
            </button>
          </div> */}
          <div className="flex w-full space-x-2 mt-4">
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2"
              value={filter}
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
                  Xem
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Xóa
                </th>
              </tr>
            </thead>
            {/* <tbody>
              {Array.isArray(filteredAppointments) &&
                filteredAppointments.map((appointment: any) => (
                  
                  <tr key={appointment._id}>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {appointment.userName}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {appointment.phone}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {appointment.address}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {formatDate(appointment.date)}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {appointment.time}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {appointment.service}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {appointment.doctorName}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleChangeClick(appointment._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Chi tiết
                      </button>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleDeleteClick(appointment._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody> */}
                        <tbody>
              {Array.isArray(filteredAppointments) &&
                filteredAppointments.map((appointment: any) => {
                  // const isPast = new Date(appointment.date) < new Date();
                  return  (
                    <tr key={appointment._id} className={isToday(appointment.date)?"bg-blue-50" : "bg-white text-sm"}>
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
                          Chi tiết
                        </button>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200">
                        <button
                          onClick={() => handleDeleteClick(appointment._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Appointment;
