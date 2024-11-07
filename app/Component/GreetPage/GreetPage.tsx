// import Doggo1 from "../../../public/img/Greet page/Doggo1.png";
// import Service from "../../../public/img/Greet page/Service.png";
// import Healthcare from "../../../public/img/Greet page/Healtcare.png";
// import Consult from "../../../public/img/Greet page/Consult.png";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Link from "next/link";

export default function GreetPage() {
  const [activeContainer, setActiveContainer] = useState(1); // 1: top, 2: middle, 3: bottom

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;

      const scrollPercentage = scrollTop / (documentHeight - windowHeight);

      // Logic to determine which container should be active based on scroll position
      if (scrollPercentage < 0.2) {
        setActiveContainer(1); // Top container
      } else if (scrollPercentage >= 0.2 && scrollPercentage < 0.85) {
        setActiveContainer(2); // Middle container
      } else {
        setActiveContainer(3); // Bottom container
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col w-full">
        {/* top container */}
        <div
          className={`flex flex-col items-center ${
            activeContainer >= 1
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0 transition-opacity duration-500"
          }`}
        >
          <div className="text-2xl md:text-4xl font-nunito">Chào mừng đến với </div>
          <div className="text-2xl md:text-4xl font-nunito"> BKPetcare</div>
            <img
              loading="lazy"
              src="https://res.cloudinary.com/dzm879qpm/image/upload/v1730966806/Doggo1_mcr1pq.png"
              className="w-[150px] h-[200px] md:w-[250px] md:h-[400px]"
              alt="Doggo1"
            />
            {/*word container*/}
            <div className="text-center px-2 md:px-0 md:ml-4">
              <div className="text-2xl md:text-4xl font-bold font-nunito">
                Gâu Gâu
              </div>
              <div className="text-2xl md:text-4xl font-bold font-nunito">
                chăm sóc cho thú cưng của bạn
              </div>
              <div className="max-w-[600px] font-montserrat text-justify">
                Thú cưng là một phần trong cuộc sống của chúng tôi. Mọi người luôn
                nói về tình yêu, niềm hạnh phúc trong cuộc sống. Hạnh phúc là khi
                có những người bạn nhỏ đồng hành. Chúng tôi sinh ra để làm một
                niềm tin cho bạn, giúp cuộc sống và các bé trở nên tốt đẹp và tươi
                sáng hơn.
              </div>
            </div>
        </div>
        {/* mid container */}
        <div
          className={`flex flex-col mt-8 mx-2 md:mx-16 items-center ${
            activeContainer >= 2
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0 transition-opacity duration-500"
          }`}
        >
          {/* Sản Phẩm */}
          <div className="flex flex-col md:flex-row items-center space-x-4 ">
            {/* first left container */}
            <div className="w-full md:w-[50%] flex flex-col items-center text-center md:text-left">
              <div className="text-xl md:text-3xl font-bold font-k2d mb-4">
                Chúng tôi coi thú cưng như người nhà
              </div>
              <div className="text-base md:text-lg font-montserrat text-justify">
                Mang đến những sản phẩm an toàn và chất lượng nhất cùng dịch phụ
                chăm sóc thoải mái để giúp bạn có thú cưng có một ngày tuyệt
                vời.
              </div>
              <Link href="/Product">
                <button
                  className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-full md:w-auto flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 mt-8"
                >
                  <span className="font-montserrat text-sm px-2">SẢN PHẨM</span>
                </button>
              </Link>
            </div>
            {/* first right container */}
            <div className="w-full md:w-[50%] mt-4 md:mt-0">
              <img loading="lazy" src="https://res.cloudinary.com/dzm879qpm/image/upload/v1730966806/Service_wcsffg.png" alt="Service" />
            </div>
          </div>
          {/* Dịch vụ */}
          <div className="flex flex-col md:flex-row items-center mt-8 space-x-4">
            {/* second left container */}
            <div className="w-full md:w-[50%] order-2 md:order-1 mt-4 md:mt-0">
              <img loading="lazy" src="https://res.cloudinary.com/dzm879qpm/image/upload/v1730966806/Healtcare_gubc6c.png" alt="Healthcare" />
            </div>
            {/* second right container */}
            <div className="w-full md:w-[50%] order-1 md:order-2 flex flex-col items-center text-center md:text-left">
              <div className="text-xl md:text-3xl font-bold font-k2d mb-4">
                Quan tâm đến những bé thú cưng cần hỗ trợ
              </div>
              <div className="text-base md:text-lg font-montserrat text-justify">
                Trong ý nghĩa nhân đạo của mình, chúng tội mong muốn giúp đỡ
                được những bạn thú cưng cô đơn tìm được người chủ tuyệt vời, để
                hưởng niềm yêu thương trọn vẹn nhất.
              </div>
              <div className="flex flex-col md:flex-row mt-4 justify-center">
                <Link href="/Adopt">
                  <button
                    className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-full md:w-auto flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 mt-4 md:mt-0"
                  >
                    <span className="font-montserrat text-sm px-2">NHẬN NUÔI NGAY</span>
                  </button>
                </Link>
                <Link href="/Rescue">
                  <button
                    className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-full md:w-auto flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 mt-4 md:mt-0 md:ml-4"
                  >
                    <span className="font-montserrat text-sm px-2">THÔNG BÁO CỨU HỘ</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Bác sĩ */}
          <div className="flex flex-col md:flex-row items-center mt-8 space-x-4">
            {/* third left container */}
            <div className="w-full md:w-[50%] flex flex-col items-center text-center md:text-left">
              <div className="text-xl md:text-3xl font-bold font-k2d mb-4">
                Bạn không hiểu về người bạn nhỏ của mình? Cần những tư vấn hợp
                lí?
              </div>
              <div className="text-base md:text-lg font-montserrat text-justify">
                Chúng tôi có thể giúp bạn đưa ra những tư vấn hợp lí về tình
                hình sức khỏe cũng như thói quen của thú cưng. Nếu cần hỗ trợ
                một cách trực tiếp, bạn cũng có thể đặt lịch tư vấn trực tiếp
                tại cửa hàng ngay hôm nay!
              </div>
              <div className="flex flex-col md:flex-row mt-4 justify-center">
                <button
                  className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-full md:w-auto flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 mt-4 md:mt-0"
                >
                  <span className="font-montserrat text-sm px-2">CẦN TƯ VẤN</span>
                </button>
                <Link href="/Price_Table">
                  <button
                    className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-full md:w-auto flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 mt-4 md:mt-0 md:ml-4"
                  >
                    <span className="font-montserrat text-sm px-2">ĐẶT LỊCH KHÁM</span>
                  </button>
                </Link>
              </div>
            </div>
            {/* third right container */}
            <div className="w-full md:w-[50%] mt-4 md:mt-0">
              <img loading="lazy" src="https://res.cloudinary.com/dzm879qpm/image/upload/v1730966806/Consult_dvbmoj.png" alt="Consult" />
            </div>
          </div>
        </div>
        {/* Bottom Container */}
        <div
          className={`flex flex-col items-center mt-6 ${
            activeContainer === 3
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0 transition-opacity duration-500"
          }`}
        >
          <img src="https://res.cloudinary.com/dzm879qpm/image/upload/v1730968243/Dachshund_Dog_Love_Heart_houyzu.jpg" loading="lazy"
          className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full" alt="Dachshund_Dog_Love_Heart" />
          <div className="text-xl md:text-3xl font-bold font-k2d max-w-[90%] md:max-w-[50%] text-center mb-4">
            Cảm ơn vì đã trở thành một phần trong hành trình của chúng tôi
          </div>
          <div className="max-w-[90%] md:max-w-[50%] text-center font-montserrat">
            Trong ý nghĩa nhân đạo của mình, chúng tội mong muốn giúp đỡ được
            những bạn thú cưng cô đơn tìm được người chủ tuyệt vời, để hưởng
            niềm yêu thương trọn vẹn nhất.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}