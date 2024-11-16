"use client";
import React, { useEffect, useState, use } from "react";

import { mutate } from "swr";
import Sidebar from "@/app/Admin/sidebar";
import Header from "../../../Component/Header/Header";
import Footer from "../../../Component/Footer/Footer";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import getInfo from "@/hooks/getInfo";
import logo from "../../../../public/img/Booking/petcare.png";
import logoname from "../../../../public/img/Booking/pc.jpg";
import { sendNotifications } from "@/ultis/notificationUtils";
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";



///////////////////////////////
function SendRequest({ params }: { params: { Detail: string } }) {
  //Handle loading and complete
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const petId = params.Detail;
  // const [data, setData] = useState<any>({});
  const [method, setMethod] = useState<string>('Chưa có phương thức');

  const [data, setData] = useState<any>({ image: { url: [""] } });

  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();
  const [account, setAccount] = useState({
    _id: "",
    userName: "",
    phone: "",
    address: "",
  });
  const jtw = getCookie("jwt");


  const fetchData = async () => {
    const getAccount = await getInfo();
    setAccount(getAccount);
  };

  useEffect(() => {
    const fetchPetData = async (id: any) => {
      try {
        const response = await axios.get(`/pet/${petId}`);
        const petData = response.data;
        console.log("API Response:", petData); // Log the API response
        setData(petData.pet);
      } catch (error) {
        console.error("Error fetching pet data:", error);
        setNotFound(true);
      }
    };
    if (petId) {
      fetchPetData(petId);
    }
    if (jtw) {
      fetchData();
    }
  }, [petId]);

  useEffect(() => {
    console.log("Pet Data:", data); // Log the state
  }, [data]);
  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setMethod(value);
  };
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

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData({
        ...data,
        image: { public_id: "null", url: reader.result as string },
      });
    };
  };

  const handleChangeClick = async () => {
    setIsEditable(true);
  };

  const handleAdoptClick = async () => {

    try {

      const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

      const updatedData = {
        ...data,
        userName: account.userName,
        phoneNumber: account.phone,
        address: account.address,
        requestDay: currentDate,
        adoptStatus: "Đang được yêu cầu",
        method: method,
      };
      const notificationContent = `
  <div style="padding: 16px; font-family: Arial, sans-serif;">
    <div style="margin-bottom: 16px;">
      <strong style="font-size: 18px;">Gửi yêu cầu nhận nuôi thành công</strong>
    </div>
    <div style="margin-bottom: 16px;">
      <strong style="font-size: 16px;">Chi tiết yêu cầu:</strong>
    </div>
    <div style="margin-bottom: 8px;">
      <strong>Tên người dùng:</strong> ${updatedData.userName}
    </div>
    <div style="margin-bottom: 8px;">
      <strong>Số điện thoại:</strong> ${updatedData.phoneNumber}
    </div>
    <div style="margin-bottom: 8px;">
      <strong>Địa chỉ:</strong> ${updatedData.address}
    </div>
    <div style="margin-bottom: 8px;">
      <strong>Ngày yêu cầu:</strong> ${updatedData.requestDay}
    </div>
    <div style="margin-bottom: 8px;">
      <strong>Trạng thái nhận nuôi:</strong> ${updatedData.adoptStatus}
    </div>
    <div style="margin-bottom: 8px;">
      <strong>Phương thức:</strong> ${updatedData.method}
    </div>
    <div style="margin-top: 16px;">
      Bạn đã gửi yêu cầu nhận nuôi bé ${updatedData.petName} thành công! Vui lòng chờ xác nhận từ cửa hàng!
    </div>
  </div>
`;
      const notification = {
        user_id: account._id || "",
        category: "Thú cưng",
        Title: "Gửi yêu cầu nhận nuôi thành công",
        content: notificationContent,
        status: "Chưa đọc",
      };
      sendNotifications(notification);
      console.log("Updated Data:", updatedData); // Log the updated data
      if (updatedData.message === "Chưa có lời nhắn" || updatedData.message === "") {
        setError("NO_ADOPT_MESSAGE");
        return;
      }
      if (!updatedData.arriveDay) {
        setError("NO_ARRIVE_DAY");
        return;
      }
      if (updatedData.method === "Chưa có phương thức") {
        setError("NO_ADOPT_METHOD");
        return;
      }
      setLoadWhat("SEND_ADOPT_REQUEST");
      setIsLoading(true);
      const response = await axios.put(`/pet/${petId}`, updatedData);
      setIsLoading(false);
      setIsComplete(true);
      // Revalidate the data
      mutate(`/pet/${petId}`);

      // router.push(`/Adopt`);

      // alert("Đăng kí nhận nuôi thành công!");
    } catch (error) {
      console.error("Error updating pet data:", error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }
     console.log(data.adoptStatus);
  if (data.petName && data.adoptStatus!="Chưa có chủ") return <ErrorModal error="PET_OWNED" setError={setError} />;
  if(data.petName) return (
    <>
      <Header />
      <ErrorModal error={error} setError={setError} />
      <LoadingModal isLoading={isLoading} isComplete={isComplete} setIsComplete={setIsComplete} loadWhat={loadWhat} />
      <div className="flex gap-4 p-4 bg-background-blue justify-center font-nunito">
        <div className="relative left-28 p-6">

          <div className="p-3">
            <img src={logoname.src} alt="Logo" className="w-60" />
          </div>
          <h2 className="text-4xl text-center text-white font">
            Nhận nuôi thú cưng
          </h2>
          <div className="p-3 mt-7 ">
            <img src={data.image.url} alt="Doggo1" className="w-60 h-60 rounded-full" />
          </div>
          <h2 className="relative right-7 text-4xl text-center text-yellow-500">
            {data.petName}
          </h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 w-1/2 mx-auto">
          <form className="w-full mx-4" key={data._id}>
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="userName">
                  Tên của bạn
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="userName"
                  type="text"
                  value={account.userName}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="address">
                  Địa chỉ
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="address"
                  type="text"
                  value={account.address}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="phoneNumber">
                  SĐT
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="phoneNumber"
                  type="text"
                  value={account.phone}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>

              <div>
                <div className="flex w-full">
                  <div className="w-full px-3">
                    <label className="text-xs font-bold mb-2" htmlFor="method">
                      Chọn phương thực nhận thú cưng
                      <span className="text-red-500"> *</span>
                    </label>
                    <select
                      id="method"
                      name="method"
                      className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={handleMethodChange}
                      value={method}
                    >
                      <option value="Chưa có phương thức">Chọn phương thức</option>
                      <option value="Trực tiếp">Trực tiếp</option>
                      <option value="Đơn vị vận chuyển">Đơn vị vận chuyển (Khu vực TP HCM và Bình Dương)</option>
                    </select>
                  </div>
                </div>
                {/* <button onClick={handleSubmit}>Submit</button> */}
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="arriveDay">
                  Chọn ngày nhận thú cưng
                  <span className="text-red-500"> *</span>

                </label>
                <input
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="arriveDay"
                  type="date"
                  value={data.arriveDay}
                  min={new Date().toISOString().split("T")[0]}

                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="message">
                  Lời nhắn
                  <span className="text-red-500"> *</span>

                </label>
                <textarea
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="message"
                  // type="text"

                  // value={data.message}
                  placeholder="Gửi lời nhắn đến cửa hàng"
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            {data.adoptStatus === "Chưa có chủ" && (
              <button
                onClick={() => handleAdoptClick()} // Pass the petId here
                className="bg-[hsl(56,86%,56%)] hover:bg-blue-700 text-white font-bold py-2 px-4"
                style={{ borderRadius: "30px" }}
              >
                {/* <button onClick={handleSendRequestClick} className="bg-[hsl(56,86%,56%)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " style={{ borderRadius: '30px' }}> */}
                Gửi yêu cầu
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
  if (!data.petName && !notFound) return  <LoadingModal isLoading={true} isComplete={false} setIsComplete={setIsComplete} loadWhat="LOADING_PET_INFO" />;
  if (notFound) return <ErrorModal error="PET_NOT_FOUND" setError={setError} />;
  
}

export default SendRequest;
