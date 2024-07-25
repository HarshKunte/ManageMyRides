import moment from "moment";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {TbExternalLink} from 'react-icons/tb'
import Context from "../../../context/Context.js";
import { deleteInvoiceHelper } from "../../../helpers/invoice.helper.js";
import { toast } from "react-hot-toast";
function InvoicesTable({ data }) {
  const navigate = useNavigate();
  const { setViewingTransaction } = useContext(Context);

  const deleteInvoice = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      deleteInvoiceHelper(id)
        .then((res) => {
          if (res.data.success) {
            toast.success("Deleted");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete");
        });
    }
  };

  if (!data) {
    return <></>;
  }
  return (
    <div class="overflow-hidden w-fit border border-gray-200  md:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200 ">
        <thead class="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
            >
              Invoice Id
            </th>
            <th
              scope="col"
              class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
            >
              Generated At
            </th>
            <th
              scope="col"
              class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
            >
              Transaction ID
            </th>
            <th
              scope="col"
              class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
            ></th>
            <th
              scope="col"
              class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
            ></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 ">
          {data.map((invoice) => (
            <tr
              
              className=" bg-white cursor-pointer"
            >
              <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                {invoice.invoiceNo}
              </td>
              <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                {moment(invoice.createdAt).utc().format("DD-MM-YYYY")}
              </td>
              <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                {invoice.transaction}
              </td>
              <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
              <button
                  onClick={() => {
                    setViewingTransaction(null);
                    navigate(`/view/${invoice.transaction}`);
                  }}
                  class="flex items-center px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-3 hover:bg-gray-100"
                >
                  <TbExternalLink className="text-blue-500 w-4 h-4"/>

                  <span className="hidden md:block">View transaction</span>
                </button>
              </td>
              <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
               {invoice.status ==="active" && <button
                  onClick={() => deleteInvoice(invoice._id)}
                  class="flex items-center px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-3 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4  text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>

                  <span className="hidden md:block">Delete</span>
                </button>}
                {invoice.status === "deleted" && (
                <span class="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="-ml-1 mr-1.5 h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>

                  <p class="whitespace-nowrap text-sm">Deleted</p>
                </span>
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoicesTable;
