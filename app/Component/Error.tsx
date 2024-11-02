import { FaExclamationCircle } from "react-icons/fa";

const ErrorModal = ({ error, setError }: any) => {
  const handleClose = () => {
    if (error === "NOT_LOGGED_IN" || error === "ADOPT_NOT_LOGIN") {
      window.location.href = "/Login";
    }
    if (error === "PAGE_NOT_FOUND") {
      window.location.href = "/Main";
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
          <div className="flex flex-col items-center justify-center h-64 w-80">
            <FaExclamationCircle className="text-red-500 text-6xl mb-4 h-32 w-32" />
            {/* Comment Errors */}
            {error == "EMPTY COMMENT" && <p>Comment không được phép rỗng</p>}
            {error == "EMPTY RATING" && <p>Đánh giá không được phép rỗng</p>}
            {error == "NOT_LOGGED_IN_COMMENT" && (
              <p>Bạn phải đăng nhập để bình luận</p>
            )}
            {/* Product Filter Error */}
            {error == "INVALID_PRICE_RANGE" && (
              <p>Giá tối thiểu không thể lớn hơn giá tối đa</p>
            )}
            {/* Cart Errors */}
            {error == "NOT_LOGGED_IN_CART" && (
              <p>Bạn cần đăng nhập để mua sản phẩm</p>
            )}
            {error == "MAX_QUANTITY_ALLOWED" && (
              <p>Hiện tại giỏ hàng đã có tối đa sản phẩm này</p>
            )}
            {/* Not log in errors */}
            {error == "NOT_LOGGED_IN" && <p>Bạn cần đăng nhập xem trang này</p>}
            {/* ADOPT ERROR */}
            {error == "NO_ADOPT_MESSAGE" && <p>Vui lòng nhập lời nhắn</p>}
            {error == "NO_ARRIVE_DAY" && <p>Vui lòng chọn ngày hẹn!</p>}
            {error == "NO_ADOPT_METHOD" && (
              <p>Vui lòng chọn phương thức nhận Boss!</p>
            )}

            {/* BOOKING INFO */}
            {error == "NO_BOOKING_INFO" && (
              <p>Vui lòng nhập đầy đủ thông tin!</p>
            )}

            {/* RESCUE INFO */}
            {error == "NO_RESCUE_INFO" && (
              <p>Vui lòng nhập đầy đủ thông tin!</p>
            )}
            {error == "INVALID_PHONENUMBER" && (
              <p>Số điện thoại không hợp lệ!</p>
            )}

            {error == "LACK_INFO" && <p>Vui lòng nhập đầy đủ thông tin!</p>}

            {/* ADD NEW */}
            {error == "LACK_TITLE" && <p>Vui lòng nhập tiêu đề!</p>}
            {error == "LACK_CONTENT" && <p>Vui lòng nhập nội dung!</p>}
            {error == "LACK_IMAGE" && <p>Vui lòng chọn ảnh bìa!</p>}

            {/* PRODUCT */}
            {error == "LACK_PRODUCTNAME" && <p>Vui lòng nhập tên sản phẩm!</p>}
            {error == "LACK_PRODUCTBRAND" && <p>Vui lòng nhập thương hiệu!</p>}
            {error == "LACK_PRODUCTPRICE" && <p>Vui lòng nhập giá sản phẩm!</p>}
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


            {/* RESCUE */}
            {error == "LACK_EMPLOYEE" && <p>Vui lòng nhập tên nhân viên xử lý!</p>}

            {error == "INVALID_DATE" && <p>Ngày hẹn không hợp lệ!</p>}
            {error == "PAGE_NOT_FOUND" && <p>Trang bạn tìm kiếm không có !</p>}
            {/* USER ADOPT */}
            {error == "ADOPT_NOT_LOGIN" && <p>Bạn cần đăng nhập để nhận nuôi!</p>}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
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

export default ErrorModal;
