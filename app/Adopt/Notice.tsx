import React, { useState, useEffect } from "react";

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoticeModal: React.FC<NoticeModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Match the duration of the slide-out animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className={`bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 ${isOpen ? 'animate-slideIn' : 'animate-slideOut'}`}>
        <div className="text-right">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="text-center font-semibold mt-2 text-xl">
          Quy trình nhận nuôi thú cưng
        </div>
        <div className="flex justify-center items-center">
          <ul className="flex flex-col">
            <li>
              1. Tìm hiểu về thú cưng bạn muốn nhận nuôi trên trang web BKPetCare
            </li>
            <li>
              2. Điền form thông tin nhận nuôi và chờ nhân viên liên lạc
            </li>
            <li>
              3. Tham gia phỏng vấn nhận nuôi (Online hoặc tại cửa hàng)
            </li>
            <li>
              4. Chuẩn bị cơ sở vật chất, ký giấy tờ nhận nuôi và đóng tiền vía để đón bé về.
            </li>
          </ul>
        </div>
        <div className="text-center font-semibold mt-2 text-xl">
          <span className="text-red-500">Lưu ý</span>
        </div>
        <div className="flex justify-center items-center mx-2 md:mx-40">
          <ul>
            <li>
              1. Tiền vía mỗi bé sẽ khác nhau tùy thuộc vào tình trạng của bé khi cứu cũng như các dịch vụ y tế (tiêm phòng, triệt sản) đã thực hiện.
            </li>
            <li>
              2. Tiền vía dùng để trả các khoản chi về y tế trước đây cho bé, cũng như để hỗ trợ chi phí chăm sóc, nuôi dưỡng các bé khác tại nhà chung.
            </li>
            <li>
              3. Trường hợp không nuôi được tiếp cần trả lại cho Nhóm, không tự ý đem cho người khác.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;