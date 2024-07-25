import { BiMobile } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiTwotoneEdit, AiOutlineCar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import Context from "../../context/Context";
function UserDetails() {
    const {user} = useContext(Context)

    useEffect(()=>{

    },[user])

  return (
    <section className="p-4 px-5 md:p-8 md:px-10 bg-gray-100 min-h-screen">
      <h2 className="text-xl mb-4 font-semibold">Your Details</h2>
      <div class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg ">
        <div class="px-6 py-4">
          <h1 class="text-xl font-semibold text-gray-800 ">{user.name}</h1>

          <div class="flex items-center mt-4 text-gray-700 ">
            <svg
              aria-label="suitcase icon"
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 11H10V13H14V11Z" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
              />
            </svg>

            <h1 class="px-2 text-sm">{user.company_name}</h1>
          </div>
          <div class="flex items-center mt-4 text-gray-700 ">
            <AiOutlineCar className="w-6 h-6"/>

            <h1 class="px-2 text-sm">{user.vehicle_number}</h1>
          </div>

          <div class="flex items-center mt-4 text-gray-700 ">
            <BiMobile className="w-6 h-6" />

            <h1 class="px-2 text-sm">{user.mobile}</h1>
          </div>

          <div class="flex items-center mt-4 text-gray-700 ">
            <svg
              aria-label="email icon"
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
              />
            </svg>

            <h1 class="px-2 text-sm">{user.email}</h1>
          </div>
        </div>
      </div>
      <div class="mt-8 flex mb-5 sm:mb-10 self-end sm:self-start w-fit overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse  ">
        <Link to={`/user/details/edit/`}>
          <button class="flex items-center px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-3 hover:bg-gray-100">
            <AiTwotoneEdit className="w-5 h-5 text-blue-700" />

            <span className="">Edit Details</span>
          </button>
        </Link>
        <Link to={`/user/change_password/`}>
          <button class="flex items-center px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-3 hover:bg-gray-100">
            <RiLockPasswordFill className="w-5 h-5 text-orange-500"/>

            <span className="">Change Password</span>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default UserDetails;
