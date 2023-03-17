import React from "react";
function NewTransaction() {
  return (
    <section className="">
      <h2 className="text-lg font-semibold mb-10 text-gray-700 capitalize">
        Add new transaction
      </h2>

      <form>
        <div className="grid grid-cols-4 gap-6 mt-4  md:grid-cols-6 xl:grid-cols-9">
          <div className="col-span-4 md:col-span-2 xl:col-span-2">
            <label className="text-gray-700 text-sm" htmlFor="customer_name">
              Customer Name
            </label>
            <input
              name="customer_name"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
          </div>
          <div className="col-span-4 md:col-span-2 xl:col-span-3">
            <label className="text-gray-700 text-sm" htmlFor="customer_mobile">
              Customer Mobile no.
            </label>
            <input
              name="customer_mobile"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
          </div>
          <div className="col-span-4 md:col-span-2 xl:col-span-3">
            <label className="text-gray-700 text-sm" htmlFor="company_crn">
              Company CRN (optional)
            </label>
            <input
              name="company_crn"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
          </div>
          <div className="hidden xl:block"></div>
          <div className="col-span-2 xl:col-span-3">
            <label
              htmlFor="from_date"
              className="block text-gray-700 text-sm"
            >
              From Date
            </label>

            <input
              type="date"
              placeholder="" name="from_date"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>
          <div className="col-span-2 xl:col-span-3">
            <label
              htmlFor="to_date"
              className="block text-gray-700 text-sm"
            >
              To Date
            </label>

            <input
              type="date"
              placeholder="" name="to_date"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>
          <div className="flex flex-col justify-center col-span-4 md:col-span-2 ">
          <label
              htmlFor="journey_time"
              className="block text-gray-700 text-sm"
            >
              Journey Time
            </label>
            <span name="journey_time" className="countdown font-mono text-2xl">
                <span style={{"--value":10}}></span>h 
                <span className="ml-2" style={{"--value":24}}></span>m 
                <span className="ml-2" style={{"--value":28}}></span>s 
            </span>
         </div>
         <div className="col-span-2 xl:col-span-3">
          <label
              htmlFor="from_address"
              className="block text-gray-700 text-sm"
            >
              Journey start location
            </label>
            <input
              name="from_address"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="col-span-2 xl:col-span-3">
          <label
              htmlFor="to_address"
              className="block text-gray-700 text-sm"
            >
              Journey end location
            </label>
            <input
              name="to_address"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="col-span-4 md:col-span-2 xl:col-span-3 flex items-center">
          
            <input name="round_trip" type="checkbox"  className="checkbox mr-2" />
            <label
              htmlFor="round_trip"
              className="block text-gray-700 text-base"
            >
              Round trip
            </label>
         </div>
         <div className="col-span-2 lg:col-span-1">
          <label
              htmlFor="starting_kms"
              className="block text-gray-700 text-sm"
            >
              Starting Kms
            </label>
            <input
              name="starting_kms"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="flex flex-col justify-center col-span-2 lg:col-span-1">
          <label
              htmlFor="closing_kms"
              className="block text-gray-700 text-sm"
            >
              Closing Kms
            </label>
            <input
              name="closing_kms"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="flex col-span-4 md:col-span-2 lg:col-span-4 xl:col-span-2 flex-col justify-center">
          <label
              htmlFor="total_kms"
              className="block text-gray-700 text-sm"
            >
              Total Kms
            </label>
            <input
              name="total_kms"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="flex flex-col justify-center col-span-2 xl:col-span-1">
          <label
              htmlFor="rate_per_km"
              className="block text-gray-700 text-sm"
            >
              Rate / Km (Rs.)
            </label>
            <input
              name="rate_per_km"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="flex flex-col justify-center col-span-2 lg:col-span-1">
          <label
              htmlFor="rate_per_hr"
              className="block text-gray-700 text-sm"
            >
              Rate / Hr (Rs.)
            </label>
            <input
              name="rate_per_hr"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="flex col-span-4 md:col-span-2 flex-col justify-center">
          <label
              htmlFor="total_kms"
              className="block text-gray-700 text-sm"
            >
              Driver Allowance
            </label>
            <input
              name="total_kms"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="col-span-2 md:col-span-1 hidden xl:block"></div>
         <div className="col-span-2 md:col-span-1">
          <label
              htmlFor="ride_mode"
              className="block text-gray-700 text-sm"
            >
              Journey via
            </label>
            <select name="ride_mode" className="select select-bordered border-gray-200 w-full">
      <option disabled selected>Select</option>
      <option>OLA</option>
      <option>UBER</option>
    </select>
         </div>
         <div className="col-span-2 md:col-span-1">
          <label
              htmlFor="fuel_type"
              className="block text-gray-700 text-sm"
            >
              Fuel Type
            </label>
            <select name="fuel_type" className="select select-bordered border-gray-200 w-full">
      <option disabled selected>Select</option>
      <option>Petrol</option>
      <option>Diesel</option>
    </select>
         </div>
         <div className="col-span-2">
          <label
              htmlFor="fuel_required"
              className="block text-gray-700 text-sm"
            >
              Qty of fuel required
            </label>
            <input
              id="fuel_required"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="col-span-2 lg:col-span-1">
          <label
              htmlFor="fuel_rate"
              className="block text-gray-700 text-sm"
            >
              Fuel rate (Rs.)
            </label>
            <input
              id="fuel_rate"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="col-span-2">
          <label
              htmlFor="toll_amt"
              className="block text-gray-700 text-sm"
            >
              Toll amount (Rs.)
            </label>
            <input
              id="toll_amt"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="col-span-2 lg:col-span-1">
          <label
              htmlFor="taxes"
              className="block text-gray-700 text-sm"
            >
              GST (Rs.)
            </label>
            <input
              name="taxes"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="col-span-4 md:col-span-2">
          <label
              htmlFor="taxes"
              className="block text-gray-700 text-sm"
            >
              Company commission (Rs.)
            </label>
            <input
              name="taxes"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="col-span-2 md:col-span-3 lg:col-span-3">
          <label
              htmlFor="total_bill"
              className="block text-gray-700 text-sm"
            >
              Total Bill (Rs.)
            </label>
            <input
              id="total_bill"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
         <div className="col-span-2 md:col-span-3 lg:col-span-3">
          <label
              htmlFor="payment_mode"
              className="block text-gray-700 text-sm"
            >
              Payment Mode
            </label>
            <select name="payment_mode" className="select select-bordered border-gray-200 w-full">
      <option disabled selected>Select</option>
      <option>CASH</option>
      <option>UPI</option>
    </select>
         </div>
    
         <div className="col-span-4 md:col-span-3">
          <label
              htmlFor="earnings"
              className="block text-gray-700 text-sm"
            >
              Your earnings after deductions. (Rs.)
            </label>
            <input
              name="earnings"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
            />
         </div>
        </div>

        <div className="flex mt-6">
          <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewTransaction;
