"use client";
import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import axios from "@/api/axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/Component/Error";
import LoadingModal from "@/app/Component/Loading";

function VoucherAdd() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [minRequire, setMinRequire] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [employee_id, setEmployeeId] = useState("66e5800a52098d8bd1397010");
  ///////
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  /////

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const numberValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    return new Intl.NumberFormat("vi-VN").format(Number(numberValue));
  };

  const handleCurrencyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = e.target;
    const numberValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    setValue(numberValue);
  };

  const handleSaveClick = async () => {
    try {
      const data = {
        name,
        quantity,
        beginDate,
        endDate,
        code,
        discount_type: discountType,
        discount_value: {
          value: discountValue,
          min_require: minRequire,
          max_discount: maxDiscount,
        },
        description,
        status,
        employee_id,
      };

      if (!name) {
        setError("LACK_VOUCHERNAME");
        return;
      }
      if (!quantity) {
        setError("LACK_VOUCHERQUANTITY");
        return;
      }
      if (Number(quantity) < 0) {
        setError("INVALID_VOUCHERQUANTITY");
        return;
      }
      if (!beginDate) {
        setError("LACK_VOUCHERBEGINDATE");
        return;
      }
      if (!endDate) {
        setError("LACK_VOUCHERENDDATE");
        return;
      }
      if (!code) {
        setError("LACK_VOUCHERCODE");
        return;
      }
      if (!discountType) {
        setError("LACK_VOUCHERDISCOUNTTYPE");
        return;
      }
      if (!discountValue) {
        setError("LACK_VOUCHERDISCOUNTVALUE");
        return;
      }
      if (!minRequire) {
        setError("LACK_VOUCHERMINREQUIRE");
        return;
      }
      if (!maxDiscount) {
        setError("LACK_VOUCHERMAXDISCOUNT");
        return;
      }
      if (!description) {
        setError("LACK_VOUCHERDESCRIPTION");
        return;
      }
      if (!status) {
        setError("LACK_VOUCHERSTATUS");
        return;
      }

      setLoadWhat("SEND_ADDPET_REQUEST");
      setIsLoading(true);
      const response = await axios.post("/voucher/add", data);
      setIsLoading(false);
      setIsComplete(true);
      router.push("/Admin/Voucher");
    } catch (error) {
      toast.error("Error saving voucher!");
      console.error("Error saving voucher:", error);
    }
  };

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
            Thêm voucher
          </div>
          <form className="w-full mx-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="VoucherName">
                  Tên voucher
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="VoucherName"
                  type="text"
                  placeholder="Nhập tên voucher"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Quantity">
                    Số lượng
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Quantity"
                    type="number"
                    placeholder="Nhập số lượng"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="BeginDate">
                    Ngày bắt đầu
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="BeginDate"
                    type="date"
                    value={beginDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setBeginDate(e.target.value)}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="EndDate">
                    Ngày kết thúc
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="EndDate"
                    type="date"
                    value={endDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Code">
                    Mã voucher
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Code"
                    type="text"
                    placeholder="Nhập mã voucher"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div className="w-full px-3">
                  <label
                    className="text-xs font-bold mb-2"
                    htmlFor="DiscountType"
                  >
                    Loại giảm giá
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="DiscountType"
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
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
                    htmlFor="MinRequire"
                  >
                    Yêu cầu tối thiểu
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="MinRequire"
                    type="text"
                    placeholder="Nhập yêu cầu tối thiểu"
                    value={formatCurrency(minRequire)}
                    onChange={(e) => handleCurrencyChange(e, setMinRequire)}
                  />
                </div>
                <div className="w-full px-3">
                  <label
                    className="text-xs font-bold mb-2"
                    htmlFor="MaxDiscount"
                  >
                    Giá trị giảm tối đa
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="MaxDiscount"
                    type="text"
                    placeholder="Nhập giá trị giảm tối đa"
                    value={formatCurrency(maxDiscount)}
                    onChange={(e) => handleCurrencyChange(e, setMaxDiscount)}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label
                    className="text-xs font-bold mb-2"
                    htmlFor="DiscountValue"
                  >
                    Giá trị giảm giá{" "}
                    {discountType === "Giảm theo phần trăm" ? "(%)" : "(VNĐ)"}
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="DiscountValue"
                    type="text"
                    placeholder="Nhập giá trị giảm giá"
                    value={formatCurrency(discountValue)}
                    onChange={(e) => handleCurrencyChange(e, setDiscountValue)}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Status">
                    Trạng thái
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Description">
                  Mô tả
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Description"
                  placeholder="Nhập mô tả"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center w-full mb-4">
            <button
              onClick={handleSaveClick}
              className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default VoucherAdd;