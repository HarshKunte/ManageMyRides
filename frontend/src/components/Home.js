import React, { useContext, useEffect, useState } from "react";
import { FaRupeeSign, FaHistory } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import Context from "../context/Context.js";
import { TbLocationFilled, TbBrandDaysCounter } from "react-icons/tb";
import { getUserDataApi } from "../helpers/user.helper.js";
import toast from "react-hot-toast";
import {
  getAllTransactions,
  getAllTransactionsReport,
  getFormatedStringFromDays,
  numberFormatter,
} from "../helpers/transaction.helper.js";
import _Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import Loading from "./Loading.js";
import TransactionsTable from "./transaction/TransactionsTable.js";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function Home() {
  const { user, setUser, transactions, setTransactions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState();
  const [earningsChartData, setEarningsChartData] = useState({});
  const [kmsChartData, setKmsChartData] = useState({});
  const [fuelChartData, setFuelChartData] = useState({});
  const [expenseChartData, setExpenseChartData] = useState({});
  const [years, _setYears] = useState(generateArrayOfYears());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max - 20;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  }

  const calculateEarningsChartData = () => {
    if (reportData) {
      const { transaction_report, fuel_report, expense_report } = reportData;
      const sortedTransByMonth = [...transaction_report]
        .sort((p1, p2) =>
          p1._id.month < p2._id.month ? -1 : p1._id.month > p2._id.month ? 1 : 0
        )
        .filter((item) => item._id.year === currentYear);
      const sortedFuelByMonth = [...fuel_report]
        .sort((p1, p2) =>
          p1._id.month < p2._id.month ? -1 : p1._id.month > p2._id.month ? 1 : 0
        )
        .filter((item) => item._id.year === currentYear);
      const sortedExpenseByMonth = [...expense_report]
        .sort((p1, p2) =>
          p1._id.month < p2._id.month ? -1 : p1._id.month > p2._id.month ? 1 : 0
        )
        .filter((item) => item._id.year === currentYear);
      const labels = sortedTransByMonth.map(
        (item) => months[item._id.month - 1]
      );
      const earningsData = sortedTransByMonth.map(
        (item) => item.total_earnings_month
      );
      const kmsData = months.map((_item, index) => {
        let element = sortedTransByMonth.find(
          (mnth) => mnth._id.month === index + 1
        );
        if (!element) {
          return 0;
        }
        return element.total_kms_month;
      });
      const fuelData = months.map((_item, index) => {
        let element = sortedFuelByMonth.find(
          (mnth) => mnth._id.month === index + 1
        );
        if (!element) {
          return 0;
        }
        return element.total_fuel_month;
      });
      const expenseData = months.map((_item, index) => {
        let element = sortedExpenseByMonth.find(
          (mnth) => mnth._id.month === index + 1
        );
        if (!element) {
          return 0;
        }
        return element.total_expense_month;
      });
      setEarningsChartData({ labels, data: earningsData });
      setKmsChartData({ labels, data: kmsData });
      setFuelChartData({ labels, data: fuelData });
      setExpenseChartData({ labels, data: expenseData });
    }
  };

  const getUserData = () => {
    getUserDataApi()
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to receive user data");
      });
  };

  useEffect(() => {
    getUserData();

    if (!transactions) {
      getAllTransactions(10, 0)
        .then((res) => {
          setTransactions(res.data.transactions);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getAllTransactionsReport()
      .then((res) => {
        setReportData({
          transaction_report: res.data.report,
          fuel_report: res.data.fuelReport,
          expense_report: res.data.otherExpenseReport,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    calculateEarningsChartData();
    setIsLoading(false);
  }, [reportData, currentYear]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="p-4 px-5 md:p-8 md:px-10 bg-gray-100 min-h-screen">
      <h2 className="text-xl mb-4 font-semibold">Welcome, {user.name}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-x-8">
        <div class="p-4 col-span-1 bg-white shadow-lg rounded-xl">
          <div class="flex  items-center">
            <span class="mr-2 relative p-2 bg-green-200 rounded-xl">
              <FaRupeeSign className="w-4 h-4" />
            </span>
            <p class="ml-1 text-gray-800 font-medium text-sm md:text-xs lg:text-sm">
              Total Earnings
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p class="mt-3 flex items-center text-3xl font-bold text-left text-gray-800">
              {numberFormatter(user.total_earnings)}
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
              <AiFillCar className="h-4 w-4" />
            </span>
            <p class="ml-1 text-gray-800 font-medium text-sm md:text-xs lg:text-sm">
              Total Kms.
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p class="mt-3 flex items-center text-3xl font-bold text-left text-gray-800">
              {numberFormatter(user.total_kms)}
              <span class="text-sm ml-1">Kms.</span>
            </p>
            <p className="text-xs text-gray-500">travelled till now</p>
          </div>
        </div>
        <div class="p-4 col-span-1 bg-white shadow-lg rounded-xl">
          <div class="flex  items-center">
            <span class="mr-2 relative p-2 bg-blue-200 rounded-xl">
              <TbLocationFilled className="w-4 h-4" />
            </span>
            <p class="ml-1 text-gray-800 font-medium text-sm md:text-xs lg:text-sm">
              Total trips
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p class="mt-3 flex items-center text-3xl font-bold text-left text-gray-800">
              {numberFormatter(user.total_transactions)}
            </p>
            <p className="text-xs text-gray-500">completed till now</p>
          </div>
        </div>
        <div class="p-4 col-span-1 bg-white shadow-lg rounded-xl">
          <div class="flex  items-center">
            <span class="mr-2 relative p-2 bg-red-200 rounded-xl">
              <TbBrandDaysCounter className="w-4 h-4" />
            </span>
            <p class="ml-1 text-gray-800 font-medium text-sm md:text-xs lg:text-sm">
              On road
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <div className="flex">
              {user.total_no_of_days > 0 &&
                getFormatedStringFromDays(user.total_no_of_days)
                  .split(",")
                  .map(
                    (item, index) =>
                      item.split(" ")[0] !== 0 && (
                        <p
                          key={index}
                          class="mt-3 ml-2 flex items-center text-3xl font-semibold text-left text-gray-800"
                        >
                          {item.split(" ")[0]}
                          <span className="text-xs">{item.split(" ")[1]}</span>
                        </p>
                      )
                  )}
              {user.total_no_of_days === 0 && (
                <p class="mt-3 ml-2 flex items-center text-3xl font-semibold text-left text-gray-800">
                  0<span className="text-xs">days</span>
                </p>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500">till now</p>
        </div>
      </div>

      <div className="mt-10 w-72">
      <label htmlFor="mode" className="block text-gray-700 text-sm">
              Current Year (For below charts)<span className="text-red-500">*</span>
            </label>
            <select
              name="year"
              onChange={(e)=>setCurrentYear(Number(e.target.value))}
              className="select select-bordered border-gray-200 w-full"
            >
              {years.map((item) => (
                <option
                  key={item}
                  selected={currentYear === item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
      </div>

      <div className="flex flex-wrap mt-10">
        <div className="w-full md:w-1/2 xl:h-64 flex items-center justify-center md:justify-start">
          <Line
            data={{
              labels: earningsChartData.labels,
              datasets: [
                {
                  label: `Earnings per Month (${new Date().getFullYear()})`,
                  backgroundColor: "#392e4a",
                  borderColor: "#392e4a",
                  data: earningsChartData.data,
                },
              ],
            }}
          />
        </div>
        <div className="w-full md:w-1/2 xl:h-64 flex items-center justify-center md:justify-start">
          <Bar
            data={{
              labels: months,
              datasets: [
                {
                  label: `Kms travelled (${currentYear})`,
                  backgroundColor: "#392e4a",
                  // backgroundColor: "#6A1B4D",
                  borderColor: "#392e4a",
                  data: kmsChartData.data,
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap mt-10">
      <div className="w-full md:w-1/2 xl:h-64 flex items-center justify-center md:justify-start">
          <Bar
            data={{
              labels: months,
              datasets: [
                {
                  label: `Fuel expense (${currentYear})`,
                  backgroundColor: "#207398",
                  // backgroundColor: "#6A1B4D",
                  borderColor: "#207398",
                  data: fuelChartData.data,
                },
                {
                  label: `Other expense (${currentYear})`,
                  backgroundColor: "#6A1B4D",
                  // backgroundColor: "#6A1B4D",
                  borderColor: "#6A1B4D",
                  data: expenseChartData.data,
                },
              ],
            }}
          />
        </div>
        <div className="order-1 md:order-2 w-full md:w-2/5 flex justify-center items-center">
          <div className="w-64 xl:w-80 h-64 xl:h-80">
            <Pie
              data={{
                labels: ["Earnings", "Expenses/Commissions"],
                datasets: [
                  {
                    backgroundColor: ["#392e4a", "#a3a0a9"],
                    borderColor: ["#392e4a", "#a3a0a9"],
                    data: [
                      user.total_earnings,
                      user.total_bills_amt - user.total_earnings,
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
