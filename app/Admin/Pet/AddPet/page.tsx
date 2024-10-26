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

function PetAdd() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [petName, setPetName] = useState("");
  const [pet_id, setpet_id] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [race, setRace] = useState("");
  const [species, setSpecies] = useState("");
  const [vaccinated, setVaccinated] = useState("");
  const [description, setDescription] = useState("");
  // const [adoptStatus, setAdoptStatus] = useState('');
  // const [recieveDay, setRecieveDay] = useState('');
  const [image, setImage] = useState({ public_id: "", url: "" });

  const handleSaveClick = async () => {

    try {
      const data = {
        petName,
        gender,
        age,
        race,
        species,
        vaccinated,
        description,

        image,
      };
      console.log("Data:", data);
      if (!petName || !gender || !age || !race || !species || !vaccinated || !description || !image.url) {
        setError("LACK_INFO");
        return;}
      setLoadWhat("SEND_ADDPET_REQUEST");
      setIsLoading(true);
      const response = await axios.post("/pet/add", data);
      setIsLoading(false);
      setIsComplete(true);

      router.push("/Admin/Pet");
    } catch (error) {
      toast.error("Error saving pet!");
      console.error("Error saving pet:", error);
    }
  };
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage({ public_id: "null", url: reader.result as string });
    };
  };

  return (
    
    <div className="flex flex-col w-full justify-center items-center">
      {/* //Header */}
      <ErrorModal error={error} setError={setError} />
      <LoadingModal isLoading={isLoading} isComplete={isComplete} setIsComplete={setIsComplete} loadWhat={loadWhat} />
      <Header></Header>
      <div className="flex w-full">
        <Sidebar></Sidebar>
        <div className="w-3/4 border-l-2 border-gray-200">
          {/* content */}
          <div
            className={
              "flex font-nunito text-xl font-bold w-full justify-center"
            }
          >
            Thêm thú cưng
          </div>
          <form className="w-full mx-4">
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="PetName">
                  Tên thú cưng
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="PetName"
                  type="text"
                  placeholder="Enter Pet Name"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
              </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="ImageUpload">
                  Tải hình ảnh
                </label>
                <input
                  type="file"
                  id="ImageUpload"
                  name="image"
                  accept="image/*"
                  onChange={handleImage}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                />
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Gender">
                    Giới tính
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Đực">Đực</option>
                    <option value="Cái">Cái</option>
                  </select>
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Age">
                    Tuổi
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Age"
                    type="text"
                    placeholder="Enter Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Race">
                    Giống
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Race"
                    type="text"
                    placeholder="Enter Race"
                    value={race}
                    onChange={(e) => setRace(e.target.value)}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Species">
                    Loài
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Species"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                  >
                    <option value="">Select Species</option>
                    <option value="Chó">Chó</option>
                    <option value="Mèo">Mèo</option>
                  </select>
                </div>
              </div>

              <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="Vaccinated">
                    Tiêm Vaccine
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Vaccinated"
                    value={vaccinated}
                    onChange={(e) => setVaccinated(e.target.value)}
                  >
                    <option value="">Chọn trạng thái</option>

                    <option value="Đã tiêm phòng">Rồi</option>
                    <option value="Chưa tiêm phòng">Chưa</option>
                  </select>
                </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="Description">
                  Mô tả
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center w-full">
            <button
              onClick={handleSaveClick}
              className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

export default PetAdd;
