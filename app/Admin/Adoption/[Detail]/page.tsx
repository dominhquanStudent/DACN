"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { getCookie } from "cookies-next";
import getInfo from "@/hooks/getInfo";
import { sendNotifications } from "@/ultis/notificationUtils";
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";
import ConfirmModal from "@/app/Component/ConfirmModal";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function AdoptDetail({ params }: { params: { Detail: string } }) {
  const petId = params.Detail;
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const jtw = getCookie("jwt");
  const [account, setAccount] = useState({
    userName: "",
    phone: "",
    address: "",
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);


  const fetchData = async () => {
    const getAccount = await getInfo();
    setAccount(getAccount);
  };
  useEffect(() => {
    const fetchAdoptData = async (id: any) => {
      try {
        const response = await axios.get(`/pet/${petId}`);
        const petData = response.data;
        setData(petData.pet);
        // const log = await axios.post(`/test`, petData.pet);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };
    if (petId) {
      fetchAdoptData(petId);
    }
    if (jtw) {
      fetchData();
    }
  }, [petId, jtw]);


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
  const handleSaveClick = async () => {
    setLoadWhat("ACCEPT_ADOPTION_REQUEST");
    setIsLoading(true);
    try {
      const updatedData = {
        ...data,
        adoptStatus: "Đã có chủ",
        employeeName: account.userName,
        adoptDay: new Date(),
      };
      // Cái pet ko có user_id thì gửi cho ai
      const response = await axios.put(`/pet/${petId}`, updatedData);
      // Revalidate the data
      mutate(`/pet/${petId}`);
      setIsLoading(false);
      setIsComplete(true);

      // router.push(`/Admin/Adoption`);
    } catch (error) {
      console.error("Error updating pet data:", error);
    }
  };


  const handleDeleteClick = async () => {
    setIsConfirmModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    try {
      const updatedData = {
        ...data,
        adoptStatus: "Chưa có chủ",
        arriveDay: null,
        // adoptDay: false,
        message: "Chưa có lời nhắn",
        method: "Chưa có phương thức",
      };

      const response = await axios.put(`/pet/${petId}`, updatedData);
      // Revalidate the data
      mutate(`/pet/${petId}`);
      router.push(`/Admin/Adoption`);
    } catch (error) {
      console.error("Error updating pet data:", error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <div className="flex flex-col w-full justify-center items-center">
            <LoadingModal
        isLoading={isLoading}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
        loadWhat={loadWhat}
      />
      <Header />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-3/4 border-l-2 border-gray-200">
          <div
            className={
              "flex font-nunito text-xl font-bold w-full justify-center"
            }
          >
            Yêu cầu nhận nuôi thú cưng
          </div>
          <form className="w-full mx-4" key={data._id}>
            {/* <form className="w-full mx-4" > */}
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="userName">
                  Tên khách hàng
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="userName"
                  type="text"
                  value={data.userName}
                  readOnly
                />
              </div>

              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="address">
                    Địa chỉ
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="address"
                    type="text"
                    value={data.address}
                    readOnly
                  />
                </div>
                <div className="w-full px-3">
                  <label
                    className="text-xs font-bold mb-2"
                    htmlFor="phoneNumber"
                  >
                    SĐT liên lạc
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="phoneNumber"
                    type="text"
                    value={data.phoneNumber}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="petName">
                    Tên thú cưng
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="petName"
                    type="text"
                    value={data.petName}
                    readOnly
                  />
                </div>
              </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="image">
                  Hình ảnh
                </label>


                {data.image && (
                  <img
                    className="mt-4"
                    loading="lazy"
                    src={data.image.url}
                    alt="Database Image"
                    style={{ maxWidth: "300px", height: "300px" }}
                  />
                )}
              </div>

              <div className="flex w-full">
                <div className="w-full px-3">
                  <label
                    className="text-xs font-bold mb-2"
                    htmlFor="resquestDay"
                  >
                    Ngày yêu cầu
                  </label>
                  <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                    {formatDate(data.resquestDay)}
                  </div>
                </div>
                <div className="w-full px-3">
                  <label
                    className="text-xs font-bold mb-2"
                    htmlFor="resquestDay"
                  >
                    Ngày hẹn
                  </label>
                  <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                    {formatDate(data.arriveDay)}
                  </div>
                </div>
              </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="method">
                  Hình thức nhận thú cưng
                </label>
                <input
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="method"
                  type="text"
                  value={data.method}
                  readOnly
                />
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="message">
                  Lời nhắn
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="message"
                  value={data.message}
                  readOnly
                ></textarea>
              </div>


              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="adoptStatus">
                  Trạng thái
                </label>
                <input
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="adoptStatus"
                  value={data.adoptStatus}
                  readOnly
                >
                 
                </input>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="employeeName">
                  Nhân viên xử lý
                </label>
                <input
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="employeeName"
                  value={data.employeeName}
                  readOnly
                >
                 
                </input>
              </div>
              {data.adoptStatus === "Đã có chủ" && (
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="adoptDay">
                    Ngày nhận nuôi
                  </label>
                  <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                    {formatDate(data.adoptDay)}
                  </div>
                </div>
              )}
            </div>
          </form>
          <div className="flex items-center justify-center w-full space-x-4">
            <button
              onClick={handleSaveClick}
              className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
            >
              Xác nhận yêu cầu
            </button>

            <button
              onClick={handleDeleteClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-3xl"
            >
              Xóa yêu cầu
            </button>
          </div>
        </div>
        <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Bạn có chắc chắn muốn xóa lời yêu cầu này không?"
      />
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default AdoptDetail;
