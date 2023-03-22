import React from "react";
import { BsFuelPumpDiesel, BsCurrencyRupee, BsPiggyBankFill } from "react-icons/bs";
import { TiLocation } from "react-icons/ti";
import { AiOutlineCalendar, AiFillCar } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import Map from "../../Map.js";
import { useJsApiLoader } from "@react-google-maps/api";
import { googleMapsApiData } from "../../../config/index.js";
function ViewTransaction() {
    const isLoaded = useJsApiLoader({googleMapsApiKey:googleMapsApiData.googleMapsApiKey})
  return (
    <>
      <section className="p-2 md:p-5">
        <div className="flex flex-wrap gap-y-5">
          <div className="w-full lg:w-1/2 ">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">
              John Doe
            </h2>
            <p className="text-sm text-gray-400">+918786868776</p>
            <div className="flex items-center space-x-2">
              <span class="inline-flex items-center justify-center my-4 rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
                <p class="text-sm whitespace-nowrap font-medium">OLA</p>
              </span>
              <span class="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                <p class="whitespace-nowrap text-sm font-medium">Round Trip</p>
              </span>
              <span class="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                <p class="whitespace-nowrap text-sm font-medium">@16 km/hr</p>
              </span>
            </div>
            <div>
              <ol class="grid grid-cols-2 divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-gray-500 sm:grid-cols-2">
                <li class="flex items-center  gap-2 bg-gray-50 p-4">
                  <AiOutlineCalendar className=" w-7 h-7 text-gray-600" />

                  <p class="leading-none">
                    <strong class="block font-medium text-gray-700">
                      {" "}
                      From{" "}
                    </strong>
                    <small class="mt-1"> January 20th 2023 </small>
                  </p>
                </li>

                <li class="relative flex items-center  gap-2 bg-gray-50 p-4">
                  <AiOutlineCalendar className=" w-7 h-7 text-gray-600" />

                  <p class="leading-none">
                    <strong class="block font-medium text-gray-700">
                      {" "}
                      To{" "}
                    </strong>
                    <small class="mt-1"> January 20th 2023 </small>
                  </p>
                </li>
              </ol>
            </div>

            <div className="p-4 pb-0 mt-2">
              <ol class="relative text-gray-500 border-l border-gray-200 ">
                <li class="mb-10 ml-6">
                  <span class="absolute flex items-center justify-center w-9 h-9 bg-gray-100 rounded-full -left-4 ring-4 ring-white  ">
                    <TiLocation className="w-5 h-5 text-gray-600" />
                  </span>
                  <h3 class="font-medium text-base leading-tight text-gray-700">
                    Start
                  </h3>
                  <p class="text-sm">Panvel, Navi Mumbai, Maharashtra</p>
                </li>
                <li class="mb-10 ml-6">
                  <span class="absolute flex items-center justify-center w-9 h-9 bg-gray-100 rounded-full -left-4 ring-4 ring-white  ">
                    <TiLocation className="w-5 h-5 text-gray-600" />
                  </span>
                  <h3 class="font-medium text-base leading-tight text-gray-700">
                    End
                  </h3>
                  <p class="text-sm">Panvel, Navi Mumbai, Maharashtra</p>
                </li>
              </ol>
            </div>

            <article class="flex justify-between items-start rounded-lg border border-gray-100 bg-white p-4">
              <div class="flex self-start items-center gap-4">
                <span class="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                  <BsFuelPumpDiesel className="w-5 h-5" />
                </span>

                <div>
                  <p class="text-sm text-gray-500">Fuel Details</p>

                  <p class="text-lg font-medium text-gray-900">
                    35 <span className="text-xs">kg</span>
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <div class="inline-flex  gap-2 rounded mt-2 bg-blue-100 p-1 text-blue-600">
                  <span class="text-xs font-medium">CNG</span>
                </div>
                <div class="inline-flex gap-2 rounded mt-2 bg-sky-100 p-1 text-sky-600">
                  <span class="text-xs font-medium">@ 65/kg</span>
                </div>
              </div>
            </article>

            <article class="flex justify-between items-start rounded-lg border border-gray-100 bg-white p-4">
              <div class="flex self-start items-center gap-4">
                <span class="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                  <AiFillCar className="w-5 h-5" />
                </span>

                <div>
                  <p class="text-sm text-gray-500">Starting Kms.</p>

                  <p class="text-lg font-medium text-gray-900">35</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-gray-500">Closing Kms.</p>

                  <p class="text-lg font-medium text-gray-900">35</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-gray-500">Total Kms.</p>

                  <p class="text-lg font-medium text-gray-900">35</p>
                </div>
              </div>
            </article>

            <article class="flex gap-5 flex-wrap justify-between items-start rounded-lg border border-gray-100 bg-white p-4">
              <div class="flex self-start items-center gap-4">
                <span class="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                  <FaRegMoneyBillAlt className="w-5 h-5" />
                </span>

                <div>
                  <p class="text-sm text-gray-500">Toll</p>

                  <p class="text-lg font-medium text-gray-900">
                    35 <span className="text-xs">Rs</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-gray-500">GST</p>

                  <p class="text-lg font-medium text-gray-900">
                    35 <span className="text-xs">Rs</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-gray-500">Commission</p>

                  <p class="text-lg font-medium text-gray-900">
                    35 <span className="text-xs">Rs</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-gray-500">Driver Allowance</p>

                  <p class="text-lg font-medium text-gray-900">
                    35 <span className="text-xs">Rs</span>
                  </p>
                </div>
              </div>
            </article>

            <article class="flex justify-between items-start rounded-lg mt-8 border border-gray-100 bg-white p-4">
              <div class="flex self-start items-center gap-4">
                <span class="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                  <BsCurrencyRupee className="w-5 h-5" />
                </span>

                <div>
                  <p class="text-sm text-gray-500">Total Amount</p>

                  <p class="text-lg font-medium text-gray-900">
                    3500 <span className="text-xs">Rs.</span>
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <div class="inline-flex  gap-2 rounded mt-2 bg-emerald-100 p-1 text-emerald-600">
                  <span class="text-xs font-medium">UPI</span>
                </div>
            
              </div>
            </article>
            <article class="flex justify-between items-start rounded-lg border border-gray-100 bg-white p-4">
              <div class="flex self-start items-center gap-4">
                <span class="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                  <BsPiggyBankFill className="w-5 h-5" />
                </span>

                <div>
                  <p class="text-sm font-medium">Your Earnings</p>

                  <p class="text-2xl font-semibold text-gray-900">
                    3500 <span className="text-xs">Rs.</span>
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="w-full lg:w-1/2 h-96  lg:px-10">
            {isLoaded && <Map draggableMap={false}/>}
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewTransaction;
