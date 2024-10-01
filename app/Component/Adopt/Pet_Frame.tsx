"use client";
import React from "react"// import Bull from "@/public/img/Pet/bull.png";
import {useRouter} from "next/navigation";
export default function Pet_Frame({pet}:  {pet: any}){
    const Router = useRouter();
    const handleChangeClick = (petId: any) => {
        
        console.log(`Details for rescue ${petId}`);
        Router.push(`/Adopt/${petId}`);
        
      };
    return(
        <div className="flex border-solid rounded-md border-[1px] border-sky-500 p-5 w-[500px] overflow-auto hover:border-yellow-500 hover:shadow-lg transform hover:scale-110  transition duration-200 " 
                onClick={() => handleChangeClick(pet._id)}>

            {/* Image */}
            {/* <img src={pet.image.url} alt="" className="mb-4"/> */}
            <div className="w-[150px] h-[150px] bg-gray-300 rounded-md">
                <img src={pet.image.url} alt="" className="w-full h-full object-cover"/>
            </div>

            {/* Description */}
            <div className="ml-20">
                <div className="font-montserrat font-bold text-2xl">{pet.name}</div>
        
                <div className="font-montserrat flex flex-col space-y-4">
                    <div className="flex space-x-4 justify-between"> 
                        <div className="font-bold">Giới tính:</div> 
                        <div>{pet.gender}</div>
                    </div>

                    <div className="flex space-x-4 justify-between"> 
                        <div className="font-bold">Tuổi:</div> 
                        <div>{pet.age}</div>
                    </div>

                    <div className="flex space-x-4 justify-between">
                        <div className="font-bold">Giống:</div> 
                        <div>{pet.race}</div>
                    </div>
                </div>  

            </div>
        </div>
    )
}