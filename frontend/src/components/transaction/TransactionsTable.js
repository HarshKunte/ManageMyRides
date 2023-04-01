import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
function TransactionsTable({ data }) {
  const navigate = useNavigate();
  return (
    <div class="overflow-hidden border border-gray-200  md:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200 ">
        <thead class="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
            >
              Customer Name
            </th>
            <th
              scope="col"
              class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
            >
              Trip End Date
            </th>
            
            <th
              scope="col"
              class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500"
            >
              Payment Status
            </th>

            <th
              scope="col"
              class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
            >
              Ride Mode
            </th>

            <th
              scope="col"
              class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
            >
              No. of days
            </th>
            
            <th
              scope="col"
              class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
            >
              Total Amt.
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 ">
          {data.map((transaction) => (
            <tr
              onClick={() => navigate(`/view/${transaction._id}`)}
              className="hover:bg-gray-100 bg-white cursor-pointer"
            >
              <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                {transaction.customer_name}
              </td>
              <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                {moment(transaction.to_date).utc().format('DD-MM-YYYY')}
              </td>
              
              {transaction.payment_received === "yes" && (
                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <h2 class="text-sm font-normal">Paid</h2>
                  </div>
                </td>
              )}
              {transaction.payment_received === "no" && (
                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60">
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

                    <h2 class="text-sm font-normal">Pending</h2>
                  </div>
                </td>
              )}
              <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-violet-500 bg-violet-100/60">
                  <h2 class="text-sm font-normal">{transaction.ride_mode}</h2>
                </div>
              </td>
              <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                {transaction.no_of_days}
              </td>
              <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                {transaction.total_bill}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
