import React, { useContext, useEffect, useState } from "react";
import {
  BsFuelPumpDiesel,
  BsCurrencyRupee,
  BsPiggyBankFill,
  BsCheckCircle,
} from "react-icons/bs";
import { TiLocation } from "react-icons/ti";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineCalendar, AiFillCar } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import Map from "../../Map.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteTransactionById,
  editTransaction,
  getTransactionById,
} from "../../../helpers/transaction.helper.js";
import { toast } from "react-hot-toast";
import Context from "../../../context/Context.js";
import moment from "moment";
import { fuelModes } from "../../../util/enums.js";
import { getDirectionsResponse } from "../../../helpers/map.helper.js";
import Loading from "../../Loading.js";
import NotFound from "../NotFound.js";
import PdfDocument from "../../invoice/PdfDocument.js";
import { generateInvoiceData } from "../../../helpers/invoice.helper.js";
import { PDFDownloadLink } from "@react-pdf/renderer";
function ViewTransaction() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [directionsResponse, setDirectionsResponse] = useState();
  const [invoiceData, setInvoiceData] = useState();

  const { transactionId } = useParams();
  const navigate = useNavigate();
  const { user, setUser, viewingTransaction, setViewingTransaction } =
    useContext(Context);

  const getData = async () => {
    try {
      const res = await getTransactionById(transactionId);
      if (res.data?.success) {
        setViewingTransaction(res.data?.transaction);
        setData(res.data?.transaction);
        setUser(res.data.user);
        setIsLoading(false);

        // eslint-disable-next-line no-undef
        const directions = await getDirectionsResponse(
          res.data.transaction.from_address,
          res.data.transaction.to_address
        );

        if (directions) {
          setDirectionsResponse(directions);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to receive data!");
    }
  };

  //useEffect Hooks
  useEffect(() => {
    if (!viewingTransaction) getData();
    else {
      setData(viewingTransaction);
      setIsLoading(false);
    }
  }, [transactionId]);
  useEffect(() => {
    if (data) {
      //set invoice data
      let invoice = generateInvoiceData(user, data);
      setInvoiceData(invoice);
    }
  }, [data]);

  const deleteTransaction = () => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransactionById(data._id)
        .then((res) => {
          if (res.data?.success) {
            setData(null);
            setViewingTransaction(null);
            toast.success("Deleted");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Delete failed.");
        });
    }
  };

  const markAsPaid = () => {
    editTransaction(
      { payment_received: "yes", pending_payment_amt: 0 },
      transactionId
    )
      .then((res) => {
        if (res.data?.success) {
          setData(res.data.transaction);
          toast.success("Marked as paid!!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update!");
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <NotFound />;
  }
  return (
    <section className="p-5 md:p-10">
      <section className="p-2 flex flex-col md:px-5 py-0">
        <div class=" flex mb-5 sm:mb-10 self-end sm:self-start w-fit overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse  ">
          <Link to={`/edit/${transactionId}`}>
            <button class="flex items-center px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-3 hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 text-blue-500 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>

              <span className="hidden sm:block">Edit</span>
            </button>
          </Link>

          <button
            onClick={deleteTransaction}
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

            <span className="hidden sm:block">Delete</span>
          </button>
          <PDFDownloadLink
            document={<PdfDocument invoicedata={invoiceData} />}
            fileName="invoice.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                ""
              ) : (
                <p
                  target="_blank"
                  class="flex items-center px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-3 hover:bg-gray-100"
                >
                  <TbFileDownload className="text-amber-400 w-4 h-4" />

                  <span className="">Invoice</span>
                </p>
              )
            }
          </PDFDownloadLink>
        </div>
        <div className="flex flex-wrap gap-y-5">
          <div className="w-full lg:w-1/2 ">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-400">Customer Details:</p>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 capitalize">
                  {data.customer_name}
                </h2>
              </div>
              {data?.payment_received === "no" && (
                <button
                  onClick={markAsPaid}
                  class="flex items-center px-3 rounded-xl border border-b-2 border-green-500 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-sm sm:px-3  gap-x-3 hover:bg-gray-100"
                >
                  <BsCheckCircle className="w-4 h-4 text-green-500" />
                  <span className="hidden sm:block">Mark as paid</span>
                </button>
              )}
            </div>
            <div className="flex justify-between ">
              <p className="text-sm text-gray-400">+91{data.customer_mobile}</p>
              <p className="text-sm text-gray-400">
                <span className="text-gray-500 font-medium mr-2">Txn Id: </span>
                {data._id}
              </p>
            </div>

            <div className="flex flex-wrap items-center space-x-2">
              <span class="inline-flex items-center justify-center my-4 rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
                <p class="text-sm whitespace-nowrap font-medium">
                  {data.ride_mode}
                </p>
              </span>
              {data.round_trip && (
                <span class="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
                  <p class="whitespace-nowrap text-sm font-medium">
                    Round Trip
                  </p>
                </span>
              )}
              {data.charged_lumpsum && (
                <span class="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
                  <p class="whitespace-nowrap text-sm font-medium">
                    Charged lumpsum
                  </p>
                </span>
              )}

              {(data.rate_per_hr || data.rate_per_km) && (
                <span class="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
                  {data.rate_per_km && (
                    <p class="whitespace-nowrap text-sm font-medium">{`@${data.rate_per_km} km/hr`}</p>
                  )}
                  {data.rate_per_hr && (
                    <p class="whitespace-nowrap text-sm font-medium">{`@${data.rate_per_hr} km/hr`}</p>
                  )}
                </span>
              )}

              {data.payment_received === "no" && (
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

                  <p class="whitespace-nowrap text-sm">Payment Pending</p>
                </span>
              )}
            </div>
            {data.company_crn && (
              <p className="text-sm text-gray-500 my-1">
                {" "}
                {`CRN: ${data.company_crn}`}
              </p>
            )}
            <div>
              <ol class="grid grid-cols-2 divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-gray-500 sm:grid-cols-2">
                <li class="flex items-center  gap-2 bg-gray-50 p-4">
                  <AiOutlineCalendar className=" w-7 h-7 text-gray-600" />

                  <p class="leading-none">
                    <strong class="block font-medium text-gray-700">
                      {" "}
                      From{" "}
                    </strong>
                    <small class="mt-1">
                      {" "}
                      {moment(data.from_date).format("MMMM Do YYYY")}{" "}
                    </small>
                  </p>
                </li>

                <li class="relative flex items-center  gap-2 bg-gray-50 p-4">
                  <AiOutlineCalendar className=" w-7 h-7 text-gray-600" />

                  <p class="leading-none">
                    <strong class="block font-medium text-gray-700">
                      {" "}
                      To{" "}
                    </strong>
                    <small class="mt-1">
                      {" "}
                      {moment(data.to_date).format("MMMM Do YYYY")}{" "}
                    </small>
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
                  <p class="text-sm">{data.from_address}</p>
                </li>
                <li class="mb-10 ml-6">
                  <span class="absolute flex items-center justify-center w-9 h-9 bg-gray-100 rounded-full -left-4 ring-4 ring-white  ">
                    <TiLocation className="w-5 h-5 text-gray-600" />
                  </span>
                  <h3 class="font-medium text-base leading-tight text-gray-700">
                    End
                  </h3>
                  <p class="text-sm">{data.to_address}</p>
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
                    {data.fuel_required === 0 ? "NA" : data.fuel_required}{" "}
                    <span className="text-xs">
                      {fuelModes[data.fuel_mode]?.unit}
                    </span>
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Fuel Expense</p>

                  <p class="text-lg font-medium text-gray-900">
                  {data.fuel_expense}
                    <span className="text-xs">
                      Rs.
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <div class="inline-flex  gap-2 rounded mt-2 bg-blue-100 p-1 text-blue-600">
                  <span class="text-xs font-medium">{data.fuel_mode}</span>
                </div>
                {data.fuel_rate !== 0 && (
                  <div class="inline-flex gap-2 rounded mt-2 bg-sky-100 p-1 text-sky-600">
                    <span class="text-xs font-medium">{`@${data.fuel_rate}/${
                      fuelModes[data.fuel_mode]?.unit
                    }`}</span>
                  </div>
                )}
              </div>
            </article>

            <article class="flex justify-between items-start rounded-lg border border-gray-100 bg-white p-4">
              <div class="flex self-start items-center gap-4">
                <span class="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                  <AiFillCar className="w-5 h-5" />
                </span>

                <div>
                  <p class="text-sm text-gray-500">Startin Kms.</p>

                  <p class="text-lg font-medium text-gray-900">
                    {data.starting_kms === 0 ? "NA" : data.starting_kms}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-gray-500">Closing Kms.</p>

                  <p class="text-lg font-medium text-gray-900">
                    {data.closing_kms === 0 ? "NA" : data.closing_kms}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-gray-500">Total Kms.</p>

                  <p class="text-lg font-medium text-gray-900">
                    {data.total_kms === 0 ? "NA" : data.total_kms}
                  </p>
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
                    {data.toll_amt === 0 ? "NA" : data.toll_amt}{" "}
                    <span className="text-xs">Rs</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-gray-500">GST</p>

                  <p class="text-lg font-medium text-gray-900">
                    {data.tax_amt === 0 ? "NA" : data.tax_amt}{" "}
                    <span className="text-xs">Rs</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-gray-500">Commission</p>

                  <p class="text-lg font-medium text-gray-900">
                    {data.company_commission === 0
                      ? "NA"
                      : data.company_commission}{" "}
                    <span className="text-xs">Rs</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-gray-500">Driver Allowance</p>

                  <p class="text-lg font-medium text-gray-900">
                    {data.driver_allowance} <span className="text-xs">Rs</span>
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
                    {data.total_bill} <span className="text-xs">Rs.</span>
                  </p>
                </div>
                {data.payment_received === "no" && (
                  <div>
                    <p class="text-sm text-red-500">Pending Amount</p>
                    <p class="text-lg font-medium text-red-400">
                      {data.pending_payment_amt}{" "}
                      <span className="text-xs">Rs.</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <div class="inline-flex  gap-2 rounded mt-2 bg-emerald-100 p-1 text-emerald-600">
                  <span class="text-xs font-medium">{data.payment_mode}</span>
                </div>
                {data.payment_received === "no" && (
                  <div class="inline-flex  gap-2 rounded mt-2 bg-red-100 p-1 text-red-600">
                    <span class="text-xs font-medium">Pending</span>
                  </div>
                )}
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
                    {data.earnings} <span className="text-xs">Rs.</span>
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="w-full lg:w-1/2 h-96  lg:px-10">
            {/* // eslint-disable-next-line no-undef */}
            <Map directionsResponse={directionsResponse} draggableMap={false} />
          </div>
        </div>
      </section>
    </section>
  );
}

export default ViewTransaction;
