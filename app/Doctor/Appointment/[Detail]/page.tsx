"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Doctor/sidebarDoctor";
import Header from "@/app/Admin/Header";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import Footer from "@/app/Component/Footer/Footer";
import Select from 'react-select';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function AppointmentDetail({ params }: { params: { Detail: string } }) {
  const appointmentId = params.Detail;
  const [data, setData] = useState<any>({});
  const [isEditable, setIsEditable] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [newServiceId, setNewServiceId] = useState('');
  const [serviceOptions, setServiceOptions] = useState([]);
  const [serviceDetails, setServiceDetails] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointmentData = async (id: any) => {
      try {
        const response = await axios.get(`/appointment/${appointmentId}`);
        const appointmentData = response.data;
        setData(appointmentData.appointment);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };
    if (appointmentId) {
      fetchAppointmentData(appointmentId);
    }
  }, [appointmentId]);

  useEffect(() => {
    const fetchServiceOptions = async () => {
      try {
        const response = await axios.get('/service/admin/list');
        console.log(response.data);
        const services = response.data.services.map((service: any) => ({
          value: service._id,
          label: service.name,
        }));
        setServiceOptions(services);
      } catch (error) {
        console.error("Error fetching service options:", error);
      }
    };
    fetchServiceOptions();
  }, []);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const serviceIds = data.service || [];
        const serviceDetailsPromises = serviceIds.map((id: string) =>
          axios.get(`/service/${id}`)
        );
        const serviceDetailsResponses = await Promise.all(serviceDetailsPromises);
        const serviceDetailsData = serviceDetailsResponses.map(response => response.data.service);
        setServiceDetails(serviceDetailsData);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };
    if (data.service && data.service.length > 0) {
      fetchServiceDetails();
    }
  }, [data.service]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleServiceChange = (selectedOption: any) => {
    setNewServiceId(selectedOption.value);
  };

  const handleAddService = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newServiceId.trim() !== '' && !data.service.includes(newServiceId)) {
      setData((prevData: any) => ({
        ...prevData,
        service: [...prevData.service, newServiceId]
      }));
      setNewServiceId('');
    }
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData({ ...data, image: reader.result as string });
    };
  };

  const handleSaveClick = () => {
    const updateAppointmentData = async (id: any) => {
      try {
        const response = await axios.put(`/appointment/${appointmentId}`, data);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };
    updateAppointmentData(data);

    router.push("/Doctor/Appointment");
  };

  const handleChangeClick = async () => {
    setIsEditable(true);
    setShowButton(true);
  };

  const calculateTotalPrice = () => {
    return serviceDetails.reduce((total, service) => total + service.price, 0);
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col w-full justify-center items-center bg-gray-100 min-h-screen">
      <Header />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-3/4 border-l-2 border-gray-200 p-6 bg-white shadow-md rounded-lg">
          <div className="flex font-nunito text-2xl font-bold w-full justify-center mb-6">
            Chi tiết lịch hẹn
          </div>
          <form className="w-full mx-4 space-y-6" key={data._id}>
            <div className="space-y-4">
              <div className="font-nunito text-xl font-bold w-full">
                Thông tin khách hàng
              </div>
              <div className="w-full">
                <label className="text-sm font-bold mb-2" htmlFor="userName">
                  Tên khách hàng
                </label>
                <div className="block w-full border border-gray-300 rounded-lg py-2 px-4 bg-gray-50">
                  {data.userName}
                </div>
              </div>
              <div className="flex w-full space-x-4">
                <div className="w-1/2">
                  <label className="text-sm font-bold mb-2" htmlFor="address">
                    Địa chỉ
                  </label>
                  <div className="block w-full border border-gray-300 rounded-lg py-2 px-4 bg-gray-50">
                    {data.address}
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="text-sm font-bold mb-2" htmlFor="phone">
                    SĐT liên lạc
                  </label>
                  <div className="block w-full border border-gray-300 rounded-lg py-2 px-4 bg-gray-50">
                    {data.phone}
                  </div>
                </div>
              </div>
              <div className="font-nunito text-xl font-bold w-full">
                Thông tin thú cưng
              </div>
              <div className="flex w-full space-x-4">
                <div className="w-1/3">
                  <label className="text-sm font-bold mb-2" htmlFor="petAge">
                    Tuổi
                  </label>
                  <div className="block w-full border border-gray-300 rounded-lg py-2 px-4 bg-gray-50">
                    {data.petAge}
                  </div>
                </div>
                <div className="w-1/3">
                  <label className="text-sm font-bold mb-2" htmlFor="weight">
                    Cân nặng
                  </label>
                  <div className="block w-full border border-gray-300 rounded-lg py-2 px-4 bg-gray-50">
                    {data.weight}
                  </div>
                </div>
                <div className="w-1/3">
                  <label className="text-sm font-bold mb-2" htmlFor="petGender">
                    Giới tính
                  </label>
                  <div className="block w-full border border-gray-300 rounded-lg py-2 px-4 bg-gray-50">
                    {data.petGender}
                  </div>
                </div>
              </div>
              <div className="flex w-full space-x-4">
                <div className="w-1/2">
                  <label className="text-sm font-bold mb-2" htmlFor="date">
                    Ngày hẹn
                  </label>
                  <div className="block w-full border border-gray-300 rounded-lg py-2 px-4 bg-gray-50">
                    {formatDate(data.date)}
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="text-sm font-bold mb-2" htmlFor="time">
                    Thời gian đặt hẹn
                  </label>
                  <div className="block w-full border border-gray-300 rounded-lg py-2 px-4 bg-gray-50">
                    {data.time}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm font-bold mb-2" htmlFor="note">
                  Ghi chú
                </label>
                <textarea
                  className="block w-full border border-gray-300 rounded-lg py-2 px-4 bg-gray-50 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="note"
                  value={data.note}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="w-full">
                <label className="text-sm font-bold mb-2" htmlFor="status">
                  Trạng thái
                </label>
                <select
                  className="block w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:bg-blue-50 focus:border-gray-500 bg-white"
                  id="status"
                  value={data.status}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="Chưa xử lý">Chưa xử lý</option>
                  <option value="Đã xử lý">Đã xử lý</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>
              <div className="font-nunito text-xl font-bold w-full">
                Dịch vụ khám bệnh
              </div>
              <div className="w-full px-3">
                <label
                  className="text-xs font-bold mb-2"
                  htmlFor="doctorMessage"
                >
                  Dịch vụ
                </label>
                <Select
                  options={serviceOptions}
                  placeholder="Chọn dịch vụ"
                  onChange={handleServiceChange}
                  isDisabled={!isEditable}
                  className="mt-2"
                />
                <button
                  className="my-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleAddService}
                  disabled={!isEditable}
                >
                  Thêm dịch vụ
                </button>
                {/* Chi tiết dịch vụ */}
                <div className="flex flex-col space-y-4">
                  {serviceDetails.map((service) => (
                  <div
                  key={service._id}
                  className="flex flex-row justify-between items-center w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                  >
                  <div className="font-semibold text-lg text-blue-600">{service.name}</div>
                  <div className="text-gray-600">
                    <span className="font-medium">Danh mục:</span> {service.category}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Giá:</span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                  </div>
                  </div>
                  ))}
                </div>
                <div className="mt-4 font-bold text-lg text-right">
                  Tổng giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotalPrice())}
                </div>
              </div>
              <div className="w-full">
                <label
                  className="text-xs font-bold mb-2"
                  htmlFor="doctorMessage"
                >
                  Lời nhắn
                </label>
                <textarea
                  className="block w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500 bg-white"
                  id="doctorMessage"
                  value={data.doctorMessage}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center w-full space-x-4 mt-6">
            <button
              onClick={() => router.push("/Doctor/Appointment")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl transition duration-300"
            >
              Quay lại
            </button>
            {!showButton && (
              <button
                onClick={handleChangeClick}
                className="bg-yellow-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded-3xl transition duration-300"
              >
                Cập nhật trạng thái
              </button>
            )}
            {showButton && (
              <button
                onClick={handleSaveClick}
                className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl transition duration-300"
              >
                Lưu
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppointmentDetail;