import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillFileExcel } from "react-icons/ai";
import { getInvoices } from "../../../helpers/invoice.helper.js";
import Context from "../../../context/Context.js";
import Loading from "../../Loading.js";
import { CSVLink } from "react-csv";
import moment from "moment";
import InvoicesTable from "./InvoicesTable.js";

function AllInvoices() {
  //used for pagination. skipcount used in mongo db skip()
  const [skipCount, setSkipCount] = useState(0);
  //used for pagination. limit number of documents fetched. used in mongo db limit()
  const [documentLimit, _setDocumentLimit] = useState(10);
  const [excelFullData, setExcelFullData] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(Context);
  const csvRef = useRef();

  const generateDataForExcel = (invoices) => {
    const data = invoices.filter(item => item.status==="active").map((item) => {
      const {
        invoiceNo,
        createdAt,
        _id, user, updatedAt, __v,
        ...rest
      } = item;
      const newCreatedDate = moment(createdAt).utc().format("DD-MM-YYYY");
      const month = moment(createdAt).utc().format("MMMM");
      const year = moment(createdAt).utc().format("YYYY");
      return {
        ID: invoiceNo,
        date:newCreatedDate,
        month,
        year,
        ...rest
      };
    });
    return data;
  };

  useEffect(() => {
      setIsLoading(true)
      getInvoices(documentLimit, skipCount)
        .then((res) => {
          if (res.data.success) {
            setInvoices(res.data.invoices);
            setFilteredInvoices(res.data.invoices);
            if (!user) setUser(res.data.user);
            setIsLoading(prev => !prev);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to receive data");
        });

  }, [skipCount]);

  useEffect(() => {
    if (excelFullData.length > 0 && csvRef.current && csvRef.current.link) {
      setTimeout(() => {
        csvRef.current.link.click();
        setExcelFullData([]);
      });
    }
  }, [excelFullData]);

  const fetchAllTransactions = () => {
    getInvoices(0, 0)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          let exceldata = generateDataForExcel(res.data.invoices);
          setExcelFullData(exceldata);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to receive data");
      });
  };
  const loadNext = () => {
    setSkipCount((prevState) => prevState + documentLimit);
  };
  const loadPrevious = () => {
    setSkipCount((prevState) => prevState - documentLimit);
  };

  if (isLoading) {
    return <Loading />;
  }

  // if (filteredInvoices.length === 0) {
  //   return <div className="text-center w-full py-10">
  //     <p className="font-medium">You dont have any invoices yet!</p>
  //     <Link className="underline underline-offset-2 text-sm text-gray-600" to='/add' >Add new transaction</Link>
  //   </div>;
  // }

  return (
    <section className="p-5 md:p-10 bg-gray-100 min-h-screen">
      <section class="container px-4 mx-auto">
        <h2 className="text-xl mb-4 font-semibold">Invoices</h2>
        <div className="flex gap-x-3">
          <button
            onClick={fetchAllTransactions}
            class="w-fit mb-5 flex items-center rounded-md border border-1 border-green-500 px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-2 hover:bg-white"
          >
            <AiFillFileExcel className="w-4 h-4 text-green-500" />

            <span className="">Export All Data</span>
          </button>

          {/* implement filters and uncomment below to export filtered data */}
          {/* <CSVLink
            data={generateDataForExcel(filteredInvoices)}
            filename="Filtered Report"
            className="w-fit mb-5 flex items-center rounded-md border border-1 border-green-500 px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-2 hover:bg-white"
          >
            <AiFillFileExcel className="w-4 h-4 text-green-500" />

            <span className="hidden sm:block">Export Table Data</span>
          </CSVLink> */}
        </div>
        {excelFullData.length > 0 && (
          <CSVLink ref={csvRef} data={excelFullData} filename="Invoices" />
        )}
        <div class="flex flex-col">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <InvoicesTable data={filteredInvoices} />
            </div>
          </div>
          <div class=" w-fit flex flex-row-reverse items-center justify-between mt-6">
            <button
              onClick={loadNext}
              href="#"
              class="flex justify-self-end items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 "
            >
              <span>Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>

            {skipCount > 0 && (
              <button
                onClick={loadPrevious}
                href="#"
                class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 rtl:-scale-x-100"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>

                <span>previous</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}

export default AllInvoices;
