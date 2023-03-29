import React, { useContext, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import Context from '../context/Context.js'
import { TbLocationFilled,TbBrandDaysCounter } from "react-icons/tb";
import { getUserDataApi } from "../helpers/user.helper.js";
import toast from 'react-hot-toast'
function Home() {
  const {user, setUser} = useContext(Context)

  const getUserData = () =>{
      getUserDataApi()
      .then(res =>{
        if(res.data.success){
          console.log(res.data.user);
          setUser(res.data.user)
        }
      })
      .catch(err =>{
        console.log(err);
        toast.error('Failed to receive user data')
      })
  }

  useEffect(()=>{
    if(!user)
    getUserData()
  },[])

  return (
    <section className="p-4 px-5 md:p-8 md:px-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl mb-10 font-semibold">Good morning, James!</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-x-8">
        <div class="p-4 col-span-1 bg-white shadow-lg rounded-xl">
          <div class="flex  items-center">
          <span class="mr-2 relative p-2 bg-green-200 rounded-xl">
            <FaRupeeSign className="w-4 h-4"/>
        </span>
            <p class="ml-1 text-gray-800 font-medium text-sm md:text-xs lg:text-sm">Total Earnings</p>
            
          </div>
          <div class="flex flex-col justify-start">
            <p class="mt-3 flex items-center text-3xl font-bold text-left text-gray-800">
              34,500
              <span class="text-sm">
                <FaRupeeSign />
              </span>
            </p>
            <p className="text-xs text-gray-500">earned till now</p>
          </div>
        </div>
        <div class="p-4 col-span-1 bg-white shadow-lg rounded-xl">
          <div class="flex  items-center">
          <span class="mr-2 relative p-2 bg-yellow-200 rounded-xl">
           <AiFillCar className="h-4 w-4"/>
        </span>
            <p class="ml-1 text-gray-800 font-medium text-sm md:text-xs lg:text-sm">Total Kms.</p>
            
          </div>
          <div class="flex flex-col justify-start">
            <p class="mt-3 flex items-center text-3xl font-bold text-left text-gray-800">
              34,500
              <span class="text-sm ml-1">
                Kms.
              </span>
            </p>
            <p className="text-xs text-gray-500">travelled till now</p>
          </div>
        </div>
        <div class="p-4 col-span-1 bg-white shadow-lg rounded-xl">
          <div class="flex  items-center">
          <span class="mr-2 relative p-2 bg-blue-200 rounded-xl">
            <TbLocationFilled className="w-4 h-4"/>
        </span>
            <p class="ml-1 text-gray-800 font-medium text-sm md:text-xs lg:text-sm">Total trips</p>
            
          </div>
          <div class="flex flex-col justify-start">
            <p class="mt-3 flex items-center text-3xl font-bold text-left text-gray-800">
              34,500
            </p>
            <p className="text-xs text-gray-500">completed till now</p>
          </div>
        </div>
        <div class="p-4 col-span-1 bg-white shadow-lg rounded-xl">
          <div class="flex  items-center">
          <span class="mr-2 relative p-2 bg-red-200 rounded-xl">
            <TbBrandDaysCounter className="w-4 h-4"/>
        </span>
            <p class="ml-1 text-gray-800 font-medium text-sm md:text-xs lg:text-sm">Days travelled</p>
            
          </div>
          <div class="flex flex-col justify-start">
            <p class="mt-3 flex items-center text-3xl font-bold text-left text-gray-800">
              34,500
            </p>
          </div>
          <p className="text-xs text-gray-500">till now</p>
        </div>
        
        
      </div>
    </section>
  );
}

export default Home;
