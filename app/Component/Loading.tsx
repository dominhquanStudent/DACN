import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import LoadingGif from "@/public/img/Loading.gif";
import Dog from "@/public/img/Success_Dog.png";
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
    if(loadWhat=="SEND_ADDNEW_REQUEST"){
      window.location.href = "/Doctor/Blog";
    }
    if(loadWhat=="SEND_ADDPET_REQUEST"){
      window.location.href = "/Admin/Pet";
    }
    if(loadWhat=="SEND_UPDATEPET_REQUEST"){
      window.location.href = "/Admin/Pet";
    }
    if(loadWhat=="SEND_ADDPRODUCT_REQUEST"){
      window.location.href = "/Admin/Product";
    }
    if(loadWhat=="SEND_UPDATEPRODUCT_REQUEST"){
      window.location.href = "/Admin/Product";
    }
    if(loadWhat=="SEND_UPDATEVOUCHER_REQUEST"){
      window.location.href = "/Admin/Voucher";
    }
    if(loadWhat=="SEND_UPDATERESCUE_REQUEST"){
      window.location.href = "/Admin/Rescue";

    }
    if(loadWhat=="ACCEPT_ADOPTION_REQUEST"){
      window.location.href = "/Admin/Adoption";
    }
    if(loadWhat=="SEND_UPDATE_PROFILE"){
      window.location.href = "/Admin/Profile";
    }
    if(loadWhat=="SEND_UPDATE_PROFILE_DOCTOR"){
      window.location.href = "/Doctor/Profile";
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
            <img src={LoadingGif.src} alt="Loading..." className="h-40 w-40 mb-4" />
            {loadWhat=="LOADING_PAGE"&& <p>Đang tải trang!</p>}
            {loadWhat=="LOGIN"&& <p>Đang đăng nhập vào </p>}
            {loadWhat=="ADD_TO_CART"&& <p>Đang thêm vào giỏ hàng!</p>}
            {loadWhat=="ADD_COMMENT"&& <p>Đang thêm đánh giá của bạn!</p>}
            {loadWhat=="SEND_ADOPT_REQUEST"&& <p>Đang gửi yêu cầu nhận thú cưng!</p>}
            {loadWhat=="LOADING_PRODUCT"&& <p>Đang tải thông tin sản phẩm</p>}
            {loadWhat=="LOADING_PET_INFO"&& <p>Đang tải thông tin thú cưng</p>}
            {loadWhat==""&& <p>Template loading!</p>}
            {loadWhat=="ORDERING"&& <p>Đang đặt hàng</p>}
            {loadWhat=="REBUY"&& <p>Đang thêm lại vào giỏ hàng</p>}
            {loadWhat=="SEND_UPDATENEW_REQUEST"&& <p>Đã cập nhật thông tin bài viết!</p>}
            {loadWhat=="SEND_RESCUE_REQUEST"&& <p>Đang gửi yêu cầu cứu hộ!</p>}
            {loadWhat=="GET_ACCOUNT_DATA"&& <p>Đang tải thông tin của bạn</p>}
            {loadWhat=="CANCEL_ORDER"&& <p>Đang hủy đơn của bạn</p>}
            {loadWhat=="LOADING_ORDER"&& <p>Đang tải thông tin order của bạn</p>}
            {loadWhat=="CHANGE_PASSWORD"&& <p>Đang cập nhật lại mật khẩu của bạn</p>}
            {loadWhat=="GET_NOTIFICATION"&& <p>Đang tải thông báo của bạn</p>}
          </div>
        )}
        {isComplete && (
          <div className="flex flex-col items-center justify-center h-64 w-80">
            <img src={Dog.src} className=" mb-4 h-40 w-40" />
            {loadWhat=="ADD_TO_CART"&& <p>Đã thêm vào giỏ hàng thành công!</p>}
            {loadWhat=="ADD_COMMENT"&& <p>Đã review thành công!</p>}
            {/* Adopt Pet */}
            {loadWhat=="SEND_ADOPT_REQUEST"&& <p>Đã gửi yêu cầu nhận thú cưng!</p>}
            {loadWhat=="SEND_BOOKING_REQUEST"&& <p>Đã đặt lịch thành công!</p>}
            {loadWhat=="SEND_RESCUE_REQUEST"&& <p>Đã gửi yêu cầu cứu hộ!</p>}

            {loadWhat=="SEND_ADDPET_REQUEST"&& <p>Đã thêm 1 bé thú cưng thành công!</p>}
            {loadWhat=="SEND_UPDATEPET_REQUEST"&& <p>Đã cập nhật thông tin thành công!</p>}
            {loadWhat=="SEND_ADDPRODUCT_REQUEST"&& <p>Đã thêm sản phẩm thành công!</p>}
            {loadWhat=="SEND_UPDATEPRODUCT_REQUEST"&& <p>Đã cập nhật thông tin sản phẩm!</p>}
            {loadWhat=="SEND_UPDATEVOUCHER_REQUEST"&& <p>Đã cập nhật thông tin mã giảm giá!</p>}
            {loadWhat=="SEND_UPDATERESCUE_REQUEST"&& <p>Đã cập nhật thông tin yêu cầu cứu hộ!</p>}
            
            {loadWhat=="ACCEPT_ADOPTION_REQUEST"&& <p>Đã chấp nhận yêu cầu!</p>}
            {loadWhat=="SEND_UPDATE_PROFILE"&& <p>Admin đã cập nhật thông tin thành công!</p>}
            {loadWhat=="SEND_UPDATE_PROFILE_DOCTOR"&& <p>Bác sĩ đã cập nhật thông tin thành công!</p>}
            {loadWhat=="REBUY"&& <p>Đã add lại vào giỏ hàng</p>}
            {loadWhat=="CANCEL_ORDER"&& <p>Đã hủy đơn của bạn</p>}
            {loadWhat=="CHANGE_PASSWORD"&& <p>Đã đổi mật khẩu thành công</p>}

          {/* // Doctor */}
          {loadWhat=="SEND_ADDNEW_REQUEST"&& <p>Đã thêm bài viết thành công!</p>}
          {loadWhat=="SEND_UPDATENEW_REQUEST"&& <p>Đã cập nhật thông tin bài viết!</p>}



            {/* CART LOADING */}
            {loadWhat=="ORDERING"&& <p className="text-center">Đã đặt hàng thành công, vui lòng thanh toán theo phương thức đã chọn!</p>}
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
