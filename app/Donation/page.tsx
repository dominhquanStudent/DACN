import Donation from "@/public/img/Donation.png";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import Momo from "@/public/img/Momo.png";
import Banking from "@/public/img/Banking.png";

export default function DonationPage() {
  return (
    <>
      <Header></Header>
      <div className="flex mx-40 font-montserrat space-x-12">
        {/* Introduction */}
        <div className="w-[50%]">
          <div>
            <img src={Donation.src} alt="Donation" className="w-full h-96" />
            <div className="font-semibold">
              Chào mọi người thân yêu <br></br>
              <br></br>
              Chúng tôi thành lập Quỹ Từ Thiện Nuôi Thú Cưng với mục tiêu cung
              cấp sự hỗ trợ cần thiết cho các tổ chức và cá nhân nơi thú cưng
              được chăm sóc, bảo vệ và yêu thương. Quỹ của chúng tôi sẽ hỗ trợ
              trong việc cung cấp thức ăn, điều trị y tế, tiêm phòng, và cải
              thiện điều kiện sống cho những thú cưng cần giúp đỡ. Bằng việc ủng
              hộ Quỹ Từ Thiện Nuôi Thú Cưng, bạn đang chung tay xây dựng một
              cộng đồng nhân văn và yêu thương, nơi mà tất cả các loài động vật
              đều được tôn trọng và quan tâm.
            </div>
          </div>
        </div>
        {/* Donation form */}
        <div className="w-[50%]">
          <div>Cách thức ủng hộ</div>
          <div className="mt-4">
            <label className="mt-2 flex items-center ">
              <input
                type="radio"
                name="payment"
                value="on_delivery"
                className="mr-2 leading-tight"
              />
              <span>Tài khoản ngân hàng</span>
              <img
                loading="lazy"
                src={Banking.src}
                alt="Banking"
                className="text-base w-14 rounded-md ml-4"
              />
            </label>
            <label className=" mt-2 flex items-center">
              <input
                type="radio"
                name="payment"
                value="momo"
                className="mr-2 leading-tight"
              />
              <span>Momo</span>
              <img src={Momo.src} alt="Momo" className="text-base ml-4" />
            </label>
          </div>
          {/* Sponsor information Input */}
          <div className="mt-8">
            <p>Cách thức ủng hộ</p>
            <form>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 border p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Họ tên"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 border p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Email"
                />
                <div className="flex justify-center">
                  <button
                    className="w-4/12 py-3 px-3 font-montserrat text-sm font-semibold 
            uppercase text-white bg-blue-500 rounded-2xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 
            focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
            disabled:opacity-50 disabled:shadow-none mt-8"
                    data-ripple-light="true"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
