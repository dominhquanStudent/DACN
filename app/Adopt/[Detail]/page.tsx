"use client";
import React, { useEffect, useState, use } from "react";

import { mutate } from "swr";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import getInfo from "@/hooks/getInfo";
import LoadingModal from "@/app/Component/Loading";
import ErrorModal from "@/app/Component/Error";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
function PetDetail({ params }: { params: { Detail: string } }) {
  //Handle loading and complete
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadWhat, setLoadWhat] = useState("");
  const [error, setError] = useState<string | null>(null);
  const petId = params.Detail;
  // const [data, setData] = useState<any>({});
  const [data, setData] = useState<any>({ image: { url: [""] } });

  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();
  const jtw = getCookie("jwt");
  const [account, setAccount] = useState<any>();
  const fetchData = async () => {
    const getAccount = await getInfo();
    setAccount(getAccount);
  };

  useEffect(() => {
    const fetchPetData = async (id: any) => {
      try {
        
        const response = await axios.get(`${baseURL}/pet/${petId}`);
        const petData = response.data;
        console.log("API Response:", petData); // Log the API response
        setData(petData.pet);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };
    if (petId) {
      fetchPetData(petId);
    }
    if (jtw) {
      fetchData();
    }
  }, [petId]);

  useEffect(() => {
    console.log("Pet Data:", data); // Log the state
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData({
        ...data,
        image: { public_id: "null", url: reader.result as string },
      });
    };
  };

  const handleSaveClick = () => {
    const updatePetData = async (id: any) => {
      try {
        const response = await axios.put(`/pet/${petId}`, data);
        mutate(`/pet/${petId}`);
        router.push("/Admin/Pet");
      } catch (error) {
        console.error("Error updating pet data:", error);
      }
    };
    updatePetData(data);
  };

  const handleChangeClick = async () => {
    setIsEditable(true);
  };

  const handleAdoptClick = async () => {
    try {
      const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

      const updatedData = {
        ...data,
        userName: account.userName,
        phoneNumber: account.phone,
        address: account.address,
        requestDay: currentDate,
        adoptStatus: "Đang được yêu cầu",
      };
      const response = await axios.put(`/pet/${petId}`, updatedData);
      // Revalidate the data
      mutate(`/pet/${petId}`);
      alert("Đăng kí nhận nuôi thành công!");
    } catch (error) {
      console.error("Error updating pet data:", error);
    }
  };
  const handleSendRequestClick = (petId: any) => {
    if(!account){
      setError("ADOPT_NOT_LOGIN");
    }
    else{
      router.push(`./SendRequest/${petId}`);
    };
    
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);

  return (
    <>
      <Header />
      <ErrorModal error={error} setError={setError} />
      <LoadingModal isLoading={isLoading} isComplete={isComplete} setIsComplete={setIsComplete} loadWhat={loadWhat} />
      {/* <div className="bg-white rounded-lg shadow-md p-8 w-1/2 mx-auto"> */}

      <form className="w-full mr-4 mt-4" key={data._id}>
        <div className="flex flex-row justify-center">
        <div className="w-[300px] h-[300px] bg-gray-300 rounded-md justify-center mr-4">
          <img
            src={data.image.url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="flex border-solid rounded-md border-[1px] border-sky-500 p-5 w-[500px] overflow-auto hover:border-yellow-500 hover:shadow-lg  ml-6"
          onClick={() => handleChangeClick()}
        >
          {/* Image */}
          {/* <img src={pet.image.url} alt="" className="mb-4"/> */}

          {/* Description */}
          <div className="ml-12">
            <div className="font-montserrat font-bold text-2xl justify-items-center">
              {data.petName}
            </div>

            <div className="font-montserrat flex flex-col space-y-4">
              <div className="flex space-x-8 justify-between">
                <div className="font-bold">Giới tính:</div>
                <div>{data.gender}</div>
              </div>

              <div className="flex space-x-4 justify-between">
                <div className="font-bold">Tuổi:</div>
                <div>{data.age}</div>
              </div>
              <div className="flex space-x-4 justify-between">
                <div className="font-bold">Loài:</div>
                <div>{data.species}</div>
              </div>

              <div className="flex space-x-4 justify-between">
                <div className="font-bold">Giống:</div>
                <div>{data.race}</div>
              </div>
              <div className="flex space-x-4 justify-between">
                <div className="font-bold">Vaccine:</div>
                <div>{data.vaccinated}</div>
              </div>
              <div className="flex space-x-4 justify-between">
                <div className="font-bold">Mô tả:</div>
                <div>{data.description}</div>
              </div>
              <div className="flex space-x-4 justify-between">
                <div className="font-bold">Nhận nuôi:</div>
                <div
                  className={
                    data.adoptStatus === "Chưa có chủ"
                      ? "text-green-500"
                      : data.adoptStatus === "Đã có chủ"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }
                >
                  {data.adoptStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* {data.description} */}
      </form>
      <div className="flex justify-center mt-6">
        {data.adoptStatus === "Chưa có chủ" && (
          <button
            onClick={() => handleSendRequestClick(data._id)} // Pass the petId here
            className="bg-[hsl(56,86%,56%)] hover:bg-blue-700 text-white  py-2 px-4"
            style={{ borderRadius: "30px" }}
          >
            {/* <button onClick={handleSendRequestClick} className="bg-[hsl(56,86%,56%)] hover:bg-blue-700 text-white  py-2 px-4 rounded " style={{ borderRadius: '30px' }}> */}
            Nhận nuôi ngay
          </button>
        )}
      </div>

      {/* </div> */}

      <Footer />
    </>
  );
}

export default PetDetail;
