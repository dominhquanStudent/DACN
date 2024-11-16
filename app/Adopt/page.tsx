"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import Pet_Frame from "../Component/Adopt/Pet_Frame";
import axios from "@/api/axios";
import Paw from "@/public/img/Pet/paw.png";
import NoticeModal from "./Notice";
import LoadingModal from "@/app/Component/Loading";

export default function Product_Main() {
  //error and loading
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [species, setSpecies] = useState(""); // State for species filter
  const [adoptStatus, setAdoptStatus] = useState("Chưa có chủ"); // State for adoptStatus filter
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const petsPerPage = 4;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  interface Pet {
    _id: string;
    image: { url: string[] };
    petName: string;
    gender: string;
    age: string;
    race: string;
    species: string; // Added species field
    vaccinated: boolean;
    adoptStatus: string;
  }

  const [shownProducts, setShownProducts] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`${baseURL}/pet/list`);
        console.log(response.data);
        setShownProducts(response.data.pets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [gender, age, species, adoptStatus]);

  const filteredProducts = shownProducts.filter((pet) => {
    const matchesSpecies =
      species === "" || pet.species.toLowerCase() === species.toLowerCase();
    const matchesGender = gender === "" || pet.gender === gender;
    const matchesAge =
      age === "" ||
      (age === "light" && Number(pet.age) < 1) ||
      (age === "medium" && Number(pet.age) >= 1 && Number(pet.age) <= 2) ||
      (age === "heavy" && Number(pet.age) > 2);
    const matchesStatus = adoptStatus === "" || pet.adoptStatus === adoptStatus;
    return matchesSpecies && matchesGender && matchesAge && matchesStatus;
  });

  const paginatedProducts = filteredProducts.slice(
    currentPage * petsPerPage,
    (currentPage + 1) * petsPerPage
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * petsPerPage < filteredProducts.length) {
      setAnimationClass("animate-slideOutToLeft");
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setAnimationClass("animate-slideInFromRight");
      }, 300);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setAnimationClass("animate-slideOutToRight");
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setAnimationClass("animate-slideInFromLeft");
      }, 300);
    }
  };
  if (shownProducts.length===0) return  <LoadingModal isLoading={true} isComplete={false} setIsComplete={setIsComplete} loadWhat="LOADING_PET_INFO" />;
  if (shownProducts.length!==0)return (
    <>
      <Header />
      <div className="flex flex-col font-montserrat">
        <div className="text-center my-2 font-bold">
          Nhắc nhỏ trước khi nhận nuôi thú cưng
        </div>
        <div className="flex flex-col md:flex-row mx-2 md:mx-12">
          <div className="mx-auto w-full md:w-[70%] mr-0 md:mr-3">
            Trước khi quyết định nhận nuôi bé chó hay mèo nào, bạn hãy tự hỏi
            bản thân rằng mình đã sẵn sàng để chịu trách nhiệm cả đời cho bé
            chưa, cả về tài chính, nơi ở cũng như tinh thần. Việc nhận nuôi cần
            được sự đồng thuận lớn từ bản thân bạn cũng như gia đình và những
            người liên quan. Xin cân nhắc kỹ trước khi liên hệ với chúng tôi về
            việc nhận nuôi.
            <div className="text-center font-semibold mt-2 text-xl">
              Xem quy trình nhận nuôi tại{" "}
              <span
                className="text-red-500 cursor-pointer hover:shadow-lg hover:shadow-red-500 transition duration-300"
                onClick={openModal}
              >
                đây
              </span>
            </div>
          </div>
          <div className="mx-auto w-full md:w-[30%] bg-gray-300 border rounded-xl border-solid border-gray-300 mt-3 md:mt-0">
            <div className="text-center my-2 font-bold">
              Điều kiện nhận nuôi thú cưng
            </div>
            <div className="flex mb-2">
              <img src={Paw.src} alt="" className="mx-2 w-6 h-5" />
              Có khả năng nuôi dưỡng thú cưng
            </div>
            <div className="flex mb-2">
              <img
                src={Paw.src}
                alt=""
                className="mx-2 w-6 h-5"
              />
              Không sử dụng thú cưng mục đích thương mại
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-5">
          <div className="border-b border-gray-500 w-[80%] my-2 "></div>{" "}
          {/* Horizontal line */}
        </div>

        <div className="mx-auto">
          <div className="text-center text-3xl font-semibold my-4 font-k2d">
            Tìm thú cưng
          </div>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8 justify-center ">
            <button
              onClick={() => setSpecies("")}
              className={`transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-yellow-500 duration-300 w-full md:w-auto flex justify-center items-center p-2 space-x-3 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 ${
                species === "" ? "bg-yellow-500" : ""
              }`}
            >
              <span className="font-montserrat">Tất cả</span>
            </button>

            <button
              onClick={() => setSpecies("Chó")}
              className={`transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-yellow-500 duration-300 w-full md:w-auto flex justify-center items-center p-2 space-x-3 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 ${
                species === "Chó" ? "bg-yellow-500" : ""
              }`}
            >
              <span className="font-montserrat">Chó</span>
            </button>

            <button
              onClick={() => setSpecies("Mèo")}
              className={`transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-yellow-500 duration-300 w-full md:w-auto flex justify-center items-center p-2 space-x-3 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 ${
                species === "Mèo" ? "bg-yellow-500" : ""
              }`}
            >
              <span className="font-montserrat">Mèo</span>
            </button>
            <button
              onClick={() => setSpecies("Thỏ")}
              className={`transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-yellow-500 duration-300 w-full md:w-auto flex justify-center items-center p-2 space-x-3 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 ${
                species === "Thỏ" ? "bg-yellow-500" : ""
              }`}
            >
              <span className="font-montserrat">Thỏ</span>
            </button>
          </div>

          {/* filter */}
          <div className="flex flex-col md:flex-row flex-wrap justify-between mt-2 space-y-3 md:space-y-0 md:space-x-6">
            <div className="flex space-x-3 items-center">
              <label className="">Giới tính</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              >
                <option value="">Tất cả</option>
                <option value="Đực">Đực</option>
                <option value="Cái">Cái</option>
              </select>
            </div>
            <div className="flex space-x-3 items-center">
              <label className="">Độ tuổi</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              >
                <option value="">Tất cả</option>
                <option value="light">Dưới 1 tuổi</option>
                <option value="medium">1 tuổi-2 tuổi</option>
                <option value="heavy">Trên 2 tuổi</option>
              </select>
            </div>
            <div className="flex space-x-3 items-center">
              <label className="">Trạng thái</label>
              <select
                value={adoptStatus}
                onChange={(e) => setAdoptStatus(e.target.value)}
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              >
                
                <option value="Chưa có chủ">Chưa có chủ</option>
                <option value="Đang được yêu cầu">Đang được yêu cầu</option>
                <option value="Đã có chủ">Đã có chủ</option>
                <option value="">Tất cả</option>
              </select>
            </div>
          </div>
        </div>
        {/* Featured Pet */}
        <div className="mx-2 md:mx-20">
          <div className="font-montserrat text-2xl font-semibold my-8 ">
            {adoptStatus === "Đã có chủ"
              ? "Các bé đã có chủ"
              : adoptStatus === "Đang được yêu cầu"
              ? "Đang được yêu cầu"
              : adoptStatus === "Chưa có chủ"
              ? "Các bé thú cưng chưa có chủ"
              : "Các bé thú cưng của cửa hàng"}
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              className="bg-gray-300 p-2 rounded-full"
              disabled={currentPage === 0}
            >
              &lt;
            </button>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${animationClass}`}>
              {paginatedProducts.map((pet) => (
                <div
                  className="w-full p-3 flex items-center justify-center"
                  key={pet._id}
                >
                  <Pet_Frame pet={pet} />
                </div>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              className="bg-gray-300 p-2 rounded-full"
              disabled={(currentPage + 1) * petsPerPage >= filteredProducts.length}
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-5">
          <div className="border-b border-gray-500 w-[80%] my-2 "></div>{" "}
          {/* Horizontal line */}
        </div>

        <NoticeModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <Footer />
    </>
  );
  
}