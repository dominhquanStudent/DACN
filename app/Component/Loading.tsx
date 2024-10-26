import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const LoadingModal = ({ isLoading, isComplete, setIsComplete,loadWhat }:any) => {
  
  const handleClose = () => {
    setIsComplete(false);
    if(loadWhat=="SEND_ADOPT_REQUEST"){
      window.location.href = "/Adopt";
    }
    if(loadWhat=="SEND_BOOKING_REQUEST"){
      window.location.href = "/Price_Table";
    }
    if(loadWhat=="SEND_RESCUE_REQUEST"){
      window.location.href = "/Main";
    }
  };

  if (!isLoading && !isComplete) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 w-80">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
            {loadWhat=="ADD_TO_CART"&& <p>Đang thêm vào giỏ hàng!</p>}
            {loadWhat=="ADD_COMMENT"&& <p>Đang đăng comment!</p>}
            {loadWhat=="SEND_ADOPT_REQUEST"&& <p>Đang gửi yêu cầu nhận thú cưng!</p>}
            {loadWhat=="ORDERING"&& <p>Đang đặt hàng</p>}
          </div>
        )}
        {isComplete && (
          <div className="flex flex-col items-center justify-center h-64 w-80">
            <FaCheckCircle className="text-green-500 text-6xl mb-4 h-32 w-32" />
            {loadWhat=="ADD_TO_CART"&& <p>Đã thêm vào giỏ hàng thành công!</p>}
            {loadWhat=="ADD_COMMENT"&& <p>Đã comment thành công!</p>}
            {/* Adopt Pet */}
            {loadWhat=="SEND_ADOPT_REQUEST"&& <p>Đã gửi yêu cầu nhận thú cưng!</p>}
            {loadWhat=="SEND_BOOKING_REQUEST"&& <p>Đã đặt lịch thành công!</p>}
            {loadWhat=="SEND_RESCUE_REQUEST"&& <p>Đã gửi yêu cầu cứu hộ!</p>}
            {/* CART LOADING */}
            {loadWhat=="ORDERING"&& <p>Đã đặt hàng thành công, vui lòng thanh toán theo phương thức đã chọn!</p>}
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleClose}
            >
              Hoàn tất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingModal;
//   useEffect(() => {
//     // Simulate loading process
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       setIsComplete(true);
//     }, 3000); // 3 seconds for demonstration

//     return () => clearTimeout(timer);
//   }, []);