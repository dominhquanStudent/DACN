'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { useRouter } from 'next/navigation';
import axios from '@/api/axios';
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
function Appointment() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const Router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/appointment/list');
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
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
      const newAppointments = appointments.filter((appointment) => appointment._id !== appointmentId);
      setAppointments(newAppointments);
    } catch (error) {
      console.error('Error deleting appointment:', error);
  }
};
  // const handleAddClick = () => {
  //   console.log(`Add for order`);
  //   Router.push('/Admin/Appointment/AddAppointment');
  //   // Here you can  navigate to a detail page or open a modal
  // };

  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <Header></Header>
      <div className='flex w-full'>
        <Sidebar></Sidebar>
        <div className='w-3/4 border-l-2 border-gray-200 px-4'>
          <div className={'flex font-nunito text-xl font-bold w-full justify-center mb-4'}>
            Lịch hẹn khám bệnh
          </div>
          {/* Table */}
          {/* <div className='flex w-full space-x-2 mt-4'>
            <button onClick={handleAddClick} className="bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2">
              Thêm
            </button>
          </div> */}
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
                  Thời gian hẹn
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Dịch vụ
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Bác sĩ chỉ định
                </th>



              </tr>
            </thead>
            <tbody>
              {Array.isArray(appointments) && appointments.map((appointment: any) => (
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
                    <button onClick={() => handleChangeClick(appointment._id)} className="text-blue-500 hover:text-blue-700">Xem chi tiết</button>
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleDeleteClick(appointment._id)} className="text-red-500 hover:text-red-700">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Appointment;