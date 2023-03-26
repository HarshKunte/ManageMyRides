import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {AiFillFileExcel} from 'react-icons/ai'
import { getAllTransactions } from "../../../helpers/transaction.helper";
import Context from "../../../context/Context.js";
import Loading from '../../Loading.js'
import { CSVLink} from 'react-csv';
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

function AllTransactions() {
  //used for pagination. skipcount used in mongo db skip()
  const [skipCount, setSkipCount] = useState(0)
  //used for pagination. limit number of documents fetched. used in mongo db limit()
  const [documentLimit, setDocumentLimit] = useState(10)
  const [excelFullData, setExcelFullData] = useState([]);
  const [fliteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user, setUser} = useContext(Context)
  const csvRef = useRef();
  const navigate = useNavigate();

  const generateDataForExcel = (transactions) =>{
    const data = transactions.map(item =>{
      const {user, createdAt, updatedAt, __v, _id, from_date, to_date,customer_name, customer_mobile, ...rest} = item
      const newFromDate =moment(from_date).utc().format('DD-MM-YYYY')
      const newToDate =moment(to_date).utc().format('DD-MM-YYYY')
      const month = moment(from_date).utc().format('MMMM')
      const year = moment(from_date).utc().format('YYYY')
      return {"ID":_id,customer_name, customer_mobile,from_date:newFromDate, to_date:newToDate, month, year, ...rest}
    })
    console.log(data);
    return data
  }

  useEffect(()=>{
    getAllTransactions(documentLimit, skipCount)
    .then((res)=>{
        if(res.data.success){
            setFilteredTransactions(res.data.transactions)
            if(!user) setUser(res.data.user)
            setIsLoading(false)
        }
    })
    .catch((err)=>{
        console.log(err);
        toast.error('Failed to receive data')
    })
  },[skipCount])

  useEffect(() => {
    if (excelFullData.length>0 && csvRef.current && csvRef.current.link) {
      setTimeout(() => {
        csvRef.current.link.click();
        setExcelFullData([])
      });
    }
  }, [excelFullData]);


  const fetchAllTransactions = () =>{
    console.log('clicked');
    getAllTransactions(0, 0)
    .then((res)=>{
        if(res.data.success){
            let exceldata = generateDataForExcel(res.data.transactions)
            setExcelFullData(exceldata)
        }
    })
    .catch((err)=>{
        console.log(err);
        toast.error('Failed to receive data')
    })
  }
  const loadNext = () =>{
    setSkipCount(prevState => prevState + documentLimit)
  }
  const loadPrevious = () =>{
    setSkipCount(prevState => prevState - documentLimit)
  }

  if(isLoading){
    return <Loading/>
  }

  if (user?.total_transactions === 0) {
    return <>No data found</>;
  }
  

  return (
    <>
      <section class="container px-4 mx-auto">
        <div className="flex gap-x-3">
      <button onClick={fetchAllTransactions} class="w-fit mb-5 flex items-center rounded-md border border-1 border-green-500 px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-2 hover:bg-green-100">
      <AiFillFileExcel className="w-4 h-4 text-green-500"/>

<span className="hidden sm:block">Export All Data</span>
      </button>

      <CSVLink data={generateDataForExcel(fliteredTransactions)} filename="Filtered Report" className="w-fit mb-5 flex items-center rounded-md border border-1 border-green-500 px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-2 hover:bg-green-100">
      <AiFillFileExcel className="w-4 h-4 text-green-500"/>

<span className="hidden sm:block">Export Table Data</span>
      </CSVLink>
      </div>
      {excelFullData.length>0 && <CSVLink ref={csvRef} data={excelFullData} filename="Report" />}
        <div class="flex flex-col">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden border border-gray-200  md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 ">
                  <thead class="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        <div class="flex items-center gap-x-3">
                          <span>Txn ID</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Customer
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Payment
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Mode
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        No. of days
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Total Kms
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Total Amt.
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 ">
                    {fliteredTransactions.map((transaction) => (
                      <tr onClick={()=>navigate(`/view/${transaction._id}`)} className="hover:bg-gray-100 cursor-pointer">
                        <td class="px-4 py-4 text-sm  text-gray-700  whitespace-nowrap">
                          <div class="inline-flex items-center gap-x-3">
                            <span>#{transaction._id}</span>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                          {transaction.customer_name}
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
                          {transaction.total_kms}
                        </td>
                          <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                          {transaction.total_bill}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class=" w-full flex flex-row-reverse items-center justify-between mt-6">
        

        <button onClick={loadNext} href="#" class="flex justify-self-end items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ">
            <span>
                Next
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
        </button>

        {skipCount>0 && <button onClick={loadPrevious} href="#" class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            <span>
                previous
            </span>
        </button>}
    </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllTransactions;
