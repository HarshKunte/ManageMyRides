import React, { useContext } from "react";
import { IoAnalyticsSharp } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { BsClipboard2DataFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {logout} from '../helpers/auth.helper.js'
import { toast } from 'react-hot-toast';
import Context from "../context/Context";

function Sidebar() {
  const { user } = useContext(Context);
  const navigate = useNavigate()
  const location = useLocation()
  const logOut = () => {
      logout()
      .then(res =>{
          navigate('/login')
      })
      .catch(err =>{
        toast.error('Something went wrong')
      })
  };

  return (
    <div className="flex menu h-screen flex-col justify-between border-r bg-white">
      <div className="px-4 py-6">
        <label
          htmlFor="my-drawer-2"
          className="lg:hidden btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>

        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-3">
          <Link
            to="/add"
            className={`flex items-center gap-2 rounded-lg ${location.pathname==='/add'? "bg-gray-100 text-gray-700": "hover:bg-gray-100 hover:text-gray-700 text-gray-500"}  px-4 py-2 `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <span className="text-sm font-medium"> Add new transaction </span>
          </Link>

          <Link
            to="/"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${location.pathname==='/'? "bg-gray-100 text-gray-700": "hover:bg-gray-100 hover:text-gray-700 text-gray-500"}`}
          >
            <IoAnalyticsSharp />

            <span className="text-sm font-medium"> Dashboard </span>
          </Link>
          <Link
            to="/transactions"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${location.pathname==='/transactions'? "bg-gray-100 text-gray-700": "hover:bg-gray-100 hover:text-gray-700 text-gray-500"}`}
          >
            <BsClipboard2DataFill />

            <span className="text-sm font-medium"> Transactions </span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>

                <span className="text-sm font-medium"> Account </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Account Nav" className="mt-2 flex flex-col px-4">
              <Link
                to="/user/details"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 ${location.pathname==='/user/details'? "bg-gray-100 text-gray-700": "hover:bg-gray-100 hover:text-gray-700 text-gray-500"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>

                <span className="text-sm font-medium"> Details </span>
              </Link>
              <button
                onClick={logOut}
                type="button"
                className={"flex w-full items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>

                <span className="text-sm font-medium"> Logout </span>
              </button>
            </nav>
            
          </details>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <RxAvatar className="w-6 h-6" />

          {user && (
            <div>
              <p className="text-xs">
                <strong className="block font-medium">{user.name}</strong>

                <span> {user.mobile} </span>
              </p>
            </div>
          )}
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
