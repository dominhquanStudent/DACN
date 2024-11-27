'use client';
import { FaExclamationCircle } from "react-icons/fa";
import Cat_Error from "@/public/img/Cat_Error.jpg";
const ErrorModal = ({ error, setError, product }: any ) => {
  const handleClose = () => {
    if (error === "NOT_LOGGED_IN" || error === "ADOPT_NOT_LOGIN") {
      window.location.href = "/Login";
    }
    if (error === "PAGE_NOT_FOUND" || error === "PAGE_UNAUTHORIZED") {
      window.location.href = "/Main";
    }
    if (error === "PRODUCT_NOT_FOUND") {
      window.location.href = "/Product";
    }
    if (error === "PET_NOT_FOUND") {
      window.location.href = "/Adopt";
    }
    if (error === "PET_OWNED") {
      window.location.href = "/Adopt";
    }
    
     else {
      setError(null);
    }
  };

  if (!error) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        {error && (
          <div className="flex flex-col items-center justify-center h-64 w-80 font-montserrat">
            <img src={Cat_Error.src} className="text-red-500 text-6xl mb-4 h-40 w-40" />
            {/* Page not found */}
            {error == "PAGE_NOT_FOUND" && <p>Trang bạn tìm hiện không tồn tại</p>}
            {error == "PAGE_UNAUTHORIZED" && <p>Bạn không được truy cập vào trang này</p>}
            {/*Account */}
            {error == "WRONG_ACCOUNT_OR_PASSWORD" && <p>Tài khoản hoặc mật khẩu không đúng</p>}
            {error == "WRONG_PASSWORD" && <p>Mật khẩu hiện tại không đúng</p>}
            {error == "EMPTY_PASSWORD_FIELD" && <p>Không thể bỏ trống trường mật khẩu</p>}
            {error == "PASSWORD_TOO_SHORT" && <p>Mật khẩu phải ít nhất 6 kí tự</p>}
            {error == "CONFIRM_PASSWORD_NOT_MATCH" && <p className="text-center">Mật khẩu mới và mật khẩu nhập lại không khớp</p>}
            {error == "INVALID_PHONE_NUMBER" && <p>Số điện thoại không hợp lệ</p>}
            {error == "INVALID_OTP" && <p>Mã OTP không hợp lệ</p>}
            {error == "INCORRECT_OTP" && <p>Mã OTP của bạn không chính xác</p>}
            {/* Comment Errors */}
            {error == "EMPTY COMMENT" && <p>Nội dung không được phép rỗng</p>}
            {error == "EMPTY RATING" && <p>Đánh giá không được phép rỗng</p>}
            {error == "NOT_LOGGED_IN_COMMENT" && (
              <p>Bạn phải đăng nhập để đánh giá sản phẩm</p>
            )}
            {error == "USER_ALREADY_RATED" && (
              <p>Bạn đã đánh giá trước đó rồi</p>
            )}
              {error == "ADDRESS_TOO_SHORT" && (
              <p>Hãy nhập địa chỉ chi tiết hơn</p>
            )}
            
            {/* Product Filter Error */}
            {error == "INVALID_PRICE_RANGE" && (
              <p>Giá tối thiểu không thể lớn hơn giá tối đa</p>
            )}
            {/* Cart Errors */}
            {error == "NOT_LOGGED_IN_CART" && (
              <p>Bạn cần đăng nhập để mua sản phẩm</p>
            )}
            {error == "NOT_ENOUGH_STOCK" && (
                <p>Sản phẩm <span className="text-red-500">{product}</span> hiện không đủ hàng</p>
            )}
            {error == "INVALID_PRODUCTSTOCK" && (
              <p>Số lượng sản phẩm không hợp lệ</p>
              )}
            {error == "MAX_QUANTITY_ALLOWED" && (
              <p>Hiện tại giỏ hàng đã có tối đa sản phẩm này</p>
            )}
            {error == "TOTAL_PRICE_INVALID" && (
              <p>Giá trị thanh toán không hợp lệ</p>
            )}
            {error == "TOTAL_PRICE_INVALID" && (
              <p className="text-center">Bạn cần nhập thêm số điện thoại vào tài khoản trước khi đặt hàng</p>
            )}
            {/* Not log in errors */}
            {error == "NOT_LOGGED_IN" && <p>Bạn cần đăng nhập xem trang này</p>}
            {/* ADOPT ERROR */}
            {error == "NO_ARRIVE_DAY" && <p>Vui lòng chọn ngày hẹn!</p>}
            {error == "NO_ADOPT_METHOD" && (
              <p>Vui lòng chọn phương thức nhận Boss!</p>
            )}

            {/* BOOKING INFO */}
            {error == "NO_BOOKING_NAME" && (
              <p>Vui lòng nhập tên của bạn!</p>
            )}
            {error == "NO_BOOKING_PHONE" && (
              <p>Vui lòng nhập email của bạn!</p>
            )}
            {error == "NO_BOOKING_ADDRESS" && (
              <p>Vui lòng nhập địa chỉ của bạn!</p>
            )}
            {error == "NO_BOOKING_PETAGE" && (
              <p>Vui lòng nhập tuổi bé!</p>
            )}
            {error == "INVALID_AGE" && (
              <p>Số tuổi không hợp lệ!</p>
            )}
            {error == "NO_BOOKING_PETGENDER" && (
              <p>Vui lòng chọn giới tính bé!</p>
            )}
            {error == "NO_BOOKING_WEIGHT" && (
              <p>Vui lòng chọn cân nặng của bé!</p>
            )}
            {error == "NO_BOOKING_SERVICE" && (
              <p>Vui lòng chọn dịch vụ!</p>
            )}
            {error == "NO_BOOKING_DATE" && <p>Vui lòng chọn ngày hẹn!</p>}
            {error == "NO_BOOKING_TIME" && <p>Vui lòng chọn giờ hẹn!</p>}
            {error == "INVALID_EMAIL" && <p>Địa chỉ Email không hợp lệ</p>}




            {/* RESCUE INFO */}
            {error == "NO_ADOPT_USER_NAME" && (
              <p>Vui lòng nhập tên của bạn!</p>
            )}
            {error == "NO_ADOPT_PHONE" && (
              <p>Vui lòng nhập số điện thoại của bạn!</p>
            )}
            {error == "NO_ADOPT_IMAGE" && (
              <p>Vui lòng gửi hình ảnh!</p>
            )}
            {error == "NO_ADOPT_LOCATION" && (
              <p>Vui lòng nhập địa chỉ cần cứu hộ!</p>
            )}
            {error == "NO_ADOPT_MESSAGE" && (
              <p>Vui lòng nhập lời nhắn!</p>
            )}

            {/* REGISTER */}
            {error == "INVALID_PHONENUMBER" && (
              <p>Số điện thoại không hợp lệ!</p>
            )}

            {error == "LACK_INFO" && <p>Vui lòng nhập đầy đủ thông tin!</p>}

            {/* ADD NEW */}
            {error == "LACK_TITLE" && <p>Vui lòng nhập tiêu đề!</p>}
            {error == "LACK_CONTENT" && <p>Vui lòng nhập nội dung!</p>}
            {error == "LACK_IMAGE" && <p>Vui lòng chọn ảnh bìa!</p>}

            {/* PRODUCT */}
            {error == "INVALID_PRODUCTQUANTITY" && <p>Số lượng sản phẩm không hợp lệ</p>}
            {error == "PRODUCT_NOT_FOUND" && <p>Sản phẩm không tồn tại</p>}
            {error == "LACK_PRODUCTNAME" && <p>Vui lòng nhập tên sản phẩm!</p>}
            {error == "LACK_PRODUCTBRAND" && <p>Vui lòng nhập thương hiệu!</p>}
            {error == "LACK_PRODUCTPRICE" && <p>Vui lòng nhập giá sản phẩm!</p>}
            {error == "INVALID_PRODUCTDISCOUNT" && <p>Phần trăm giảm giá không hợp lệ!</p>}
            
            {error == "LACK_PRODUCTQUANTITY" && (
              <p>Vui lòng nhập số lượng sản phẩm!</p>
            )}
            {error == "LACK_PRODUCTCATEGORY" && (
              <p>Vui lòng chọn danh mục sản phẩm!</p>
            )}
            {error == "LACK_PRODUCTDISCOUNT" && (
              <p>Vui lòng nhập giá trị giảm giá sản phẩm!</p>
            )}
            {error == "LACK_PRODUCTDESCRIPTION" && (
              <p>Vui lòng nhập mô tả sản phẩm!</p>
            )}
            {error == "LACK_PRODUCTIMAGE" && <p>Vui lòng chọn ảnh sản phẩm!</p>}

            {/* PET */}
            {error == "PET_OWNED" && <p>Pet này đã có người khác rồi :( </p>}
            {error == "PET_NOT_FOUND" && <p>Pet này không có trong cửa hàng!</p>}
            {error == "LACK_PETNAME" && <p>Vui lòng nhập tên thú cưng!</p>}
            {error == "LACK_PETGENDER" && (
              <p>Vui lòng chọn giới tính thú cưng!</p>
            )}
            {error == "LACK_PETAGE" && <p>Vui lòng nhập tuổi thú cưng!</p>}
            {error == "LACK_PETRACE" && <p>Vui lòng chọn giống thú cưng!</p>}
            {error == "LACK_PETSPECIES" && <p>Vui lòng chọn loài thú cưng!</p>}
            {error == "LACK_PETVACCINATED" && (
              <p>Vui lòng chọn trạng thái tiêm chủng thú cưng!</p>
            )}
            {error == "LACK_PETDESCRIPTION" && (
              <p>Vui lòng nhập mô tả thú cưng!</p>
            )}
            {error == "LACK_PETIMAGE" && <p>Vui lòng chọn ảnh thú cưng!</p>}

            {/* VOUCHER */}
            {error == "LACK_VOUCHERNAME" && <p>Vui lòng nhập tên voucher!</p>}
            {error == "LACK_VOUCHERQUANTITY" && (
              <p>Vui lòng nhập số lượng voucher!</p>
            )}
            {error == "INVALID_VOUCHERUSETIME" && (
              <p>Số lần sử dụng voucher không hợp lệ!</p>
            )}
            {error == "INVALID_VOUCHERENDDATE" && (
              
              <p>Ngày không hợp lệ!</p>
            )}
           
                        {error == "INVALID_VOUCHERQUANTITY" && (
              <p>Số lượng voucher không hợp lệ!</p>
            )}
            {error == "INVALID_VOUCHERDISCOUNTVALUE" && (
              <p>Giá trị giảm giá không hợp lệ!</p>
            )}

            {error == "LACK_VOUCHERBEGINDATE" && (
              <p>Vui lòng nhập ngày bắt đầu!</p>
            )}
            {error == "LACK_VOUCHERENDDATE" && (
              <p>Vui lòng nhập ngày kết thúc!</p>
            )}

            {error == "LACK_VOUCHERCODE" && (
              <p>Vui lòng nhập mã của voucher!</p>
            )}
            {error == "LACK_VOUCHERDISCOUNTTYPE" && (
              <p>Vui lòng nhập loại giảm giá!</p>
            )}
            {error == "LACK_VOUCHERDISCOUNTVALUE" && (
              <p>Vui lòng nhập giá trị giảm giá!</p>
            )}
            {error == "LACK_VOUCHERMINREQUIRE" && (
              <p>Vui lòng nhập yêu cầu tối thiểu!</p>
            )}
            {error == "LACK_VOUCHERMAXDISCOUNT" && (
              <p>Vui lòng nhập giá trị giảm tối đa!</p>
            )}
            {error == "LACK_VOUCHERDESCRIPTION" && (
              <p>Vui lòng nhập mô tả voucher!</p>
            )}
            {error == "LACK_VOUCHERSTATUS" && (
              <p>Vui lòng nhập trạng thái của voucher!</p>
            )}
            {error == "LACK_VOUCHERUSETIME" && (
              <p>Vui lòng nhập số lần sử dụng của voucher!</p>
            )}
            {error == "VOUCHER_OUT_OF_STOCK" && (
              <p>Voucher này đã hết, xin hãy chọn Voucher khác !</p>
            )}

            {/* RESCUE */}
            {error == "LACK_EMPLOYEE" && <p>Vui lòng nhập tên nhân viên xử lý!</p>}

            {error == "INVALID_DATE" && <p>Ngày hẹn không hợp lệ!</p>}


            {/* ADMIN PROFILE */}
            {error == "EMPTY_USERNAME" && <p>Vui lòng nhập tên!</p>}
            {error == "EMPTY_EMAIL" && <p>Vui lòng nhập email!</p>}
            {error == "EMPTY_ADDRESS" && <p>Vui lòng nhập địa chỉ!</p>}
            {error == "EMPTY_PHONE" && <p>Vui lòng nhập số điện thoại!</p>}
            {error == "EMPTY_GENDER" && <p>Vui lòng chọn giới tính!</p>}
            {error == "EMPTY_BIRTHDAY" && <p>Vui lòng chọn ngày sinh!</p>}



            {/* USER ADOPT */}
            {error == "ADOPT_NOT_LOGIN" && <p>Bạn cần đăng nhập để nhận nuôi!</p>}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleClose}
            >
            {/* User Profile */}
              {error == "EMPTY_EMAIL" && <p>Email không thể để trống!</p>}
              Hoàn tất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorModal;
