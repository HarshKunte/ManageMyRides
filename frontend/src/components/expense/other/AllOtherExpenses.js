import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillFileExcel } from "react-icons/ai";
import {
  deleteOtherExpense,
  getAllOtherExpenses,
  getFilteredOtherExpenses,
} from "../../../helpers/expense.helper.js";
import Context from "../../../context/Context.js";
import Loading from "../../Loading.js";
import { CSVLink } from "react-csv";
import moment from "moment";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function AllOtherExpenses() {
  //used for pagination. skipcount used in mongo db skip()
  const [skipCount, setSkipCount] = useState(0);
  //used for pagination. limit number of documents fetched. used in mongo db limit()
  const [documentLimit, setDocumentLimit] = useState(10);
  const [excelFullData, setExcelFullData] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filteredExcelFullData, setFilteredExcelFullData] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [isFiltered, setIsFiltered] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(Context);
  const csvRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const generateFilteredExcelData = () => {
    const myPromise = getFilteredOtherExpenses(startDate, endDate, 0, 0);
    toast.promise(myPromise, {
      loading: "Generating data",
      success: "File generated, check downloads.",
      error: "Error when generating data",
    });
    myPromise
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.expenses);
          setFilteredExcelFullData(generateDataForExcel(res.data.expenses));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateDataForExcel = (expenses) => {
    const data = expenses.map((item) => {
      const { date, createdAt, _id, user, updatedAt, __v, ...rest } = item;
      const newCreatedDate = moment(date).utc().format("DD-MM-YYYY");
      const month = moment(date).utc().format("MMMM");
      const year = moment(date).utc().format("YYYY");
      return {
        date: newCreatedDate,
        month,
        year,
        ...rest,
      };
    });
    return data;
  };

  useEffect(() => {
    if (isFiltered) {
      getFilteredOtherExpenses(startDate, endDate, documentLimit, skipCount)
        .then((res) => {
          if (res.data.success) {
            setFilteredExpenses(res.data.expenses);
            if (!user) setUser(res.data.user);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to receive data");
        });
    } else {
      getAllOtherExpenses(documentLimit, skipCount)
        .then((res) => {
          if (res.data.success) {
            setExpenses(res.data.expenses);
            setFilteredExpenses(res.data.expenses);
            if (!user) setUser(res.data.user);
            setIsLoading((prev) => !prev);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to receive data");
        });
    }
  }, [skipCount]);

  const filterData = () => {
    if (!startDate || !endDate) {
      toast.error("Invalid date");
      return;
    }
    console.log(startDate);
    console.log(endDate);

    if (!isFiltered) {
      getFilteredOtherExpenses(startDate, endDate, documentLimit, skipCount)
        .then((res) => {
          if (res.data.success) {
            toast.success("Data filtered");
            console.log(res.data.expenses);
            setFilteredExpenses(res.data.expenses);
            setIsFiltered(true);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to apply filter");
        });
    } else {
      setSkipCount(0);
      setDocumentLimit(10);
      getAllOtherExpenses(documentLimit, skipCount)
        .then((res) => {
          if (res.data.success) {
            setFilteredExpenses(res.data.expenses);
            if (!user) setUser(res.data.user);
            setStartDate("");
            setEndDate("");
            setIsFiltered(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to receive data");
        });
    }
  };

  useEffect(() => {
    if (excelFullData.length > 0 && csvRef.current && csvRef.current.link) {
      setTimeout(() => {
        csvRef.current.link.click();
        setExcelFullData([]);
      });
    }
  }, [excelFullData]);
  useEffect(() => {
    if (
      filteredExcelFullData.length > 0 &&
      csvRef.current &&
      csvRef.current.link
    ) {
      setTimeout(() => {
        csvRef.current.link.click();
        setFilteredExcelFullData([]);
      });
    }
  }, [filteredExcelFullData]);

  const fetchAllTransactions = () => {
    getAllOtherExpenses(0, 0)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          let exceldata = generateDataForExcel(res.data.expenses);
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
  const deleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteOtherExpense(id)
        .then((res) => {
          if (res.data.success) {
            toast.success("Deleted");
            let updatedData = filteredExpenses.filter(
              (item) => item._id !== res.data.expense._id
            );
            setFilteredExpenses(updatedData);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete");
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  // if (filteredexpenses.length === 0) {
  //   return <div className="text-center w-full py-10">
  //     <p className="font-medium">You dont have any expenses yet!</p>
  //     <Link className="underline underline-offset-2 text-sm text-gray-600" to='/add' >Add new transaction</Link>
  //   </div>;
  // }

  return (
    <section className="p-5 md:p-10 bg-gray-100 min-h-screen">
      <section class="container px-4 mx-auto">
        <h2 className="text-xl mb-4 font-semibold">Other Expenses</h2>

        <div className="mb-5 flex items-center gap-x-3">
          <Link
            to="/expense/other/add"
            className="p-2 bg-black text-white text-sm px-3 rounded-lg"
          >
            Add new expense
          </Link>
          <button
            onClick={fetchAllTransactions}
            class="w-fit  flex items-center rounded-md border border-1 border-green-500 px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-2 hover:bg-white"
          >
            <AiFillFileExcel className="w-4 h-4 text-green-500" />

            <span className="">Export All Data</span>
          </button>
          <button
            onClick={generateFilteredExcelData}
            class="w-fit flex items-center rounded-md border border-1 border-green-500 px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-2 hover:bg-white"
          >
            <AiFillFileExcel className="w-4 h-4 text-green-500" />

            <span className="">Export Filtered Data</span>
          </button>
        </div>
        {excelFullData.length > 0 && (
          <CSVLink
            ref={csvRef}
            data={excelFullData}
            filename="Other Expenses"
          />
        )}
        {filteredExcelFullData.length > 0 && (
          <CSVLink
            ref={csvRef}
            data={filteredExcelFullData}
            filename={`${startDate} to ${endDate} Expenses`}
          />
        )}
        <div className="flex my-8 gap-x-4 items-end">
          <div className="">
            <label htmlFor="date" className="block text-gray-700 text-sm">
              Start Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              placeholder=""
              name="start_date"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              max={moment().format("YYYY-MM-DD")}
              {...register("start_date", {
                required: "Date is required",
              })}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="date" className="block text-gray-700 text-sm">
              End Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              placeholder=""
              name="end_date"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              max={moment().format("YYYY-MM-DD")}
              {...register("end_date", {
                required: "Date is required",
              })}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit(filterData)}
            className="flex items-center gap-x-2 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            {isFiltered ? "Clear Filter" : "Filter"}
          </button>
        </div>
        <div class="flex flex-col">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden w-fit border border-gray-200  md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 ">
                  <thead class="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
                      >
                        Kms
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
                      >
                        Bill No
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 "
                      ></th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 ">
                    {filteredExpenses.map((expense) => (
                      <tr className="bg-white">
                        <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                          {expense.expense_name}
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                          {moment(expense.date).utc().format("DD-MM-YYYY")}
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                          {expense.amount}
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                          {expense.kms}
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                          {expense.description}
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-700 text-center  whitespace-nowrap">
                          {expense.bill_no || "-"}
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
                          <button
                            onClick={() => deleteExpense(expense._id)}
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
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

export default AllOtherExpenses;
