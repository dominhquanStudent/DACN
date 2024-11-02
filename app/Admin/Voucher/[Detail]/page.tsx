"use client";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function VoucherDetail({ params }: { params: { Detail: string } }) {
  const voucherId = params.Detail;
  const [data, setData] = useState<any>({
    name: "",
    quantity: 0,
    UsedTime: 0,
    beginDate: "",
    endDate: "",
    code: "",
    discount_type: "",
    discount_value: {
      value: 0,
      min_require: 0,
      max_discount: 0,
    },
    description: "",
    employee_id: "",
    status: "",
  });
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const fetchVoucherData = async (id: any) => {
      try {
        const response = await axios.get(`/voucher/${voucherId}`);
        const vouherData = response.data;
        setData(vouherData.voucher);
        const log = await axios.post(`/test`, vouherData.voucher);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    if (voucherId) {
      fetchVoucherData(voucherId);
    }
  }, [voucherId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [id]: value,
      //
      discount_value: {
        ...prevData.discount_value,
        [id]: value,
      },
    }));
  };

  const handleSaveClick = async (e: any) => {
    e.preventDefault();

    if (!data.name) {
      setError("LACK_VOUCHERNAME");
      return;
    }
    if (!data.UsedTime) {
      setError("LACK_VOUCHERUSETIME");
      return;
    }
    if (!data.quantity) {
      setError("LACK_VOUCHERQUANTITY");
      return;
    }
    if (!data.beginDate) {
      setError("LACK_VOUCHERBEGINDATE");
      return;
    }
    if (!data.endDate) {
      setError("LACK_VOUCHERENDDATE");
      return;
    }
    if (!data.code) {
      setError("LACK_VOUCHERCODE");
      return;
    }
    if (!data.discount_type) {
      setError("LACK_VOUCHERDISCOUNTTYPE");
      return;
    }
    if (!data.discount_value.value) {
      setError("LACK_VOUCHERDISCOUNTVALUE");
      return;
    }
    if (!data.discount_value.min_require) {
      setError("LACK_VOUCHERMINREQUIRE");
      return;
    }
    if (!data.discount_value.max_discount) {
      setError("LACK_VOUCHERMAXDISCOUNT");
      return;
    }
    if (!data.description) {
      setError("LACK_VOUCHERDESCRIPTION");
      return;
    }
    if (!data.status) {
      setError("LACK_VOUCHERSTATUS");
      return;
    }

    setLoadWhat("SEND_UPDATEVOUCHER_REQUEST");
    setIsLoading(true);

    try {
      const response = await axios.put(`/voucher/${voucherId}`, data);
      mutate(`/voucher/${voucherId}`);
      setIsLoading(false);
      setIsComplete(true);
    } catch (error) {
      setIsLoading(false);
      setError("Error saving pet data");
      console.error("Error saving voucher data:", error);
    }
  };

  const handleChangeClick = async () => {
    setIsEditable(true);
    setShowButton(true);
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <ErrorModal error={error} setError={setError} />
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
            Chi tiết voucher
          </div>
          <form className="w-full mx-4" key={data.id}>
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="name">
                  Tên voucher
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="quantity">
                    Số lượng
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="quantity"
                    type="text"
                    value={data.quantity}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="UsedTime">
                    Số lần sử dụng
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="UsedTime"
                    type="text"
                    value={data.UsedTime}
                    onChange={handleInputChange}
                    
                    disabled={!isEditable}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="beginDate">
                    Ngày bắt đầu
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="beginDate"
                    type="date"
                    value={formatDate(data.beginDate)}
                    // min={new Date().toISOString().split("T")[0]}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="endDate">
                    Ngày kết thúc
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="endDate"
                    type="date"
                    value={formatDate(data.endDate)}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="code">
                    Mã voucher
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="code"
                    type="text"
                    value={data.code}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="w-full px-3">
                  <label
                    className="text-xs font-bold mb-2"
                    htmlFor="discount_type"
                  >
                    Loại giảm giá
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="discount_type"
                    value={data.discount_type}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="Giảm theo phần trăm">Phần trăm</option>
                    <option value="Giảm theo giá trị">Trực tiếp</option>
                  </select>
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label
                    className="text-xs font-bold mb-2"
                    htmlFor="min_require"
                  >
                    Yêu cầu tối thiểu
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="min_require"
                    type="text"
                    value={data.discount_value.min_require}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="w-full px-3">
                  <label
                    className="text-xs font-bold mb-2"
                    htmlFor="max_discount"
                  >
                    Giá trị giảm tối đa
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="max_discount"
                    type="text"
                    value={data.discount_value.max_discount}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label
                    className="text-xs font-bold mb-2"
                    htmlFor="value"
                  >
                    Giá trị giảm giá{" "}
                    {data.discount_type === "Giảm theo phần trăm"
                      ? "(%)"
                      : "(VNĐ)"}
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="value"
                    type="text"
                    value={data.discount_value.value}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="status">
                    Trạng thái
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="status"
                    value={data.status}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="description">
                  Mô tả
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  value={data.description}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center w-full space-x-4 mb-4">
            {!showButton && (<button
              onClick={handleChangeClick}
              className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
            >
              Sửa
            </button>)}
            {showButton &&(<button
              onClick={handleSaveClick}
              className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
            >
              Lưu
            </button>)}
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default VoucherDetail;
