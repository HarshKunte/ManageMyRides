
import React from "react";
import moment from "moment";
import { rideModes, paymentModes } from "../../../util/enums.js";

function NewTransactionForm({
  state,
  submitData,
  register,
  handleSubmit,
  errors,
  setState,
  setError,
  clearErrors,
  isSaving,
}) {
  const calculateDays = (date1, date2) => {
    console.log(date1);
    console.log(date2);
    let days;
    if (date1 == date2) {
      days = 1;
    } else {
      let d1 = moment(date1);
      let d2 = moment(date2);
      days = d1.diff(d2, "days") + 1;
    }
    return days;
  };

  const calculateTotalBill = (state) => {
    return (
      (state.rate_per_hr * state.total_kms).toFixed(2) +
      (state.rate_per_km * state.total_kms).toFixed(2) +
      state.driver_allowance +
      state.toll_amt +
      state.tax_amt 
    );
  };
  const calculateEarnings = (state) => {
    return (
      (state.total_bill - state.company_commission - state.tax_amt - state.toll_amt).toFixed(2)
    );
  };

  const handleChange = (e) => {

    let value =
      e.target.type == "number" ? Number(e.target.value) : e.target.value;
      
    
    if(e.target.type==="number"){
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: value,
      }));
      setState((prevState) => ({
        ...prevState,
        "total_bill": calculateTotalBill(prevState),
      }));
      setState((prevState) => ({
        ...prevState,
        "earnings": calculateEarnings(prevState),
      }));
    }
    if(e.target.name==="total_bill"){
      setState((prevState) => ({
        ...prevState,
        "earnings": calculateEarnings({...prevState, total_bill:value}),
      }));
    }
    if (e.target.type === "checkbox") {
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: !prevState[e.target.name],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: value,
      }));
    }

    if (e.target.name == "from_date" || e.target.name == "to_date") {
      if (
        (state.to_date &&
          e.target.name == "from_date" &&
          value > state.to_date) ||
        (e.target.name == "to_date" && value < state.from_date)
      ) {
        setError("to_date", {
          type: "custom",
          message: "Should be >= start date",
        });
      } else {
        clearErrors("to_date");
        setState((prevState) => ({
          ...prevState,
          no_of_days: calculateDays(prevState.to_date, prevState.from_date),
        }));
      }
    }
    if (e.target.name == "starting_kms") {
      if (value > state.closing_kms) {
        setError("closing_kms", {
          type: "custom",
          message: "Should be greater than starting kms.",
        });
      } else {
        setState((prevState) => ({
          ...prevState,
          total_kms: state.closing_kms - value,
        }));
      }
    }
    if (e.target.name === "payment_received") {
      if (value === "yes" && state.pending_payment_amt > 0) {
        setState((prevState) => ({
          ...prevState,
          pending_payment_amt: 0,
        }));
      }
    }
    if (e.target.name == "closing_kms") {
      if (state.starting_kms > value) {
        setError("closing_kms", {
          type: "custom",
          message: "Should be greater than or equal to starting kms.",
        });
      } else {
        clearErrors("closing_kms");
        setState((prevState) => ({
          ...prevState,
          total_kms: value - state.starting_kms,
        }));
      }
    }
  };

  return (
    <section className="">
      <form onSubmit={handleSubmit(submitData)}>
        <div className="grid grid-cols-4 gap-6 mt-4  md:grid-cols-6 xl:grid-cols-9">
          <div className="col-span-4 md:col-span-2 xl:col-span-2">
            <label className="text-gray-700 text-sm" htmlFor="customer_name">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              name="customer_name"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
              {...register("customer_name", {
                required: "Customer name is required",
                minLength: {
                  value: 2,
                  message: "Customer name must be at least 2 characters",
                },
              })}
              value={state.customer_name}
              onChange={handleChange}
            />
            {errors.customer_name && (
              <p className="text-xs  text-red-500">
                {errors.customer_name.message}
              </p>
            )}
          </div>
          <div className="col-span-4 md:col-span-2 xl:col-span-3">
            <label className="text-gray-700 text-sm" htmlFor="customer_mobile">
              Customer Mobile no.<span className="text-red-500">*</span>
            </label>
            <input
              name="customer_mobile"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
              {...register("customer_mobile", {
                required: "Mobile No. is required",
                minLength: {
                  value: 6,
                  message: "Mobile No. is invalid",
                },
                maxLength: {
                  value: 11,
                  message: "Mobile No. is invalid",
                },
              })}
              value={state.customer_mobile}
              onChange={handleChange}
            />
            {errors.customer_mobile && (
              <p className="text-xs  text-red-500">
                {errors.customer_mobile.message}
              </p>
            )}
          </div>
          <div className="col-span-4 md:col-span-2 xl:col-span-3">
            <label className="text-gray-700 text-sm" htmlFor="company_crn">
              Company CRN
            </label>
            <input
              name="company_crn"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
              value={state.company_crn}
              onChange={handleChange}
            />
          </div>
          <div className="hidden xl:block"></div>
          <div className="col-span-2 xl:col-span-3">
            <label htmlFor="from_date" className="block text-gray-700 text-sm">
              From Date<span className="text-red-500">*</span>
            </label>
            {errors.from_date && (
              <p className="text-xs  text-red-500">
                {errors.from_date.message}
              </p>
            )}

            <input
              type="date"
              placeholder=""
              name="from_date"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              max={moment().format("YYYY-MM-DD")}
              {...register("from_date", {
                required: "Date is required",
              })}
              value={
                state.from_date
                  ? moment.utc(state.from_date).format("YYYY-MM-DD")
                  : ""
              }
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2 xl:col-span-3">
            <label htmlFor="to_date" className="block text-gray-700 text-sm">
              To Date<span className="text-red-500">*</span>
              {errors.to_date && (
                <span className="text-xs  text-red-500">
                  {errors.to_date.message}
                </span>
              )}
            </label>

            <input
              type="date"
              placeholder=""
              name="to_date"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              min={
                state.from_date
                  ? moment.utc(state.from_date).format("YYYY-MM-DD")
                  : ""
              }
              max={moment().format("YYYY-MM-DD")}
              {...register("to_date", {
                required: "Date is required",
              })}
              value={
                state.to_date
                  ? moment.utc(state.to_date).format("YYYY-MM-DD")
                  : ""
              }
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-center col-span-4 md:col-span-2 ">
            <label htmlFor="no_of_days" className="block text-gray-700 text-sm">
              No. of days
            </label>
            <span name="no_of_days" className="countdown font-mono text-2xl">
              {state.from_date && state.to_date && !errors.to_date
                ? state.no_of_days
                : 0}
            </span>
          </div>
          <div className="col-span-2 xl:col-span-3">
            
            <label
              htmlFor="from_address"
              className="block text-gray-700 text-sm"
            >
              Journey start location<span className="text-red-500">*</span>
            </label>
            <input
              name="from_address"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
              {...register("from_address", {
                required: "Required"
              })}
              value={state.from_address}
              onChange={handleChange}
            />
            {errors.from_address && (
              <p className="text-xs  text-red-500">
                {errors.from_address.message}
              </p>
            )}
          </div>
          <div className="col-span-2 xl:col-span-3">
            <label htmlFor="to_address" className="block text-gray-700 text-sm">
              Journey end location<span className="text-red-500">*</span>
            </label>
            <input
              name="to_address"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder=""
              {...register("to_address", {
                required: "Required"
              })}
              value={state.to_address}
              onChange={handleChange}
            />
            {errors.to_address && (
              <p className="text-xs  text-red-500">
                {errors.to_address.message}
              </p>
            )}
          </div>

          <div className="col-span-4 md:col-span-2 xl:col-span-3 flex items-center">
            <input
              name="round_trip"
              type="checkbox"
              checked={state.round_trip}
              onChange={handleChange}
              className="checkbox mr-2"
            />
            <label
              htmlFor="round_trip"
              className="block text-gray-700 text-base"
            >
              Round trip
            </label>
          </div>
          <div className="col-span-4 mt-5 md:col-span-6 xl:col-span-9 flex items-center">
            <input
              name="charged_lumpsum"
              type="checkbox"
              defaultChecked={state.charged_lumpsum}
              onChange={handleChange}
              className="checkbox mr-2"
            />
            <label
              htmlFor="round_trip"
              className="block text-gray-700 text-base"
            >
              Charged Lumpsum
              <span className="ml-2 text-xs">
                (For trips charged lumpsum without Kms calculations)
              </span>
            </label>
          </div>

            <div className="col-span-2 lg:col-span-2 xl:col-span-2">
              <label
                htmlFor="starting_kms"
                className="block text-gray-700 text-sm"
              >
                Starting Kms (optional)
              </label>
              <input
                name="starting_kms"
                type="number"
                min={0}
                defaultValue={0}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                value={state.starting_kms}
                onChange={handleChange}
              />
            </div>


            <div className="flex flex-col justify-center col-span-2 lg:col-span-2">
              <label
                htmlFor="closing_kms"
                className="block text-gray-700 text-sm"
              >
                Closing Kms (optional)
              </label>
              <input
                name="closing_kms"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                min={state.starting_kms}
                value={state.closing_kms}
                onChange={handleChange}
              />
              {errors.closing_kms && (
                <p className="text-xs  text-red-500">
                  {errors.closing_kms.message}
                </p>
              )}
            </div>

            <div className="flex col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 flex-col justify-center">
              <label
                htmlFor="total_kms"
                className="block text-gray-700 text-sm"
              >
                Total Kms
              </label>
              <input
                name="total_kms"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                min={0}
                defaultValue={0}
                value={state.total_kms}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col justify-center col-span-2 lg:col-span-3 xl:col-span-1">
              <label
                htmlFor="rate_per_km"
                className="block text-gray-700 text-sm"
              >
                Rate / Km (Rs.)
              </label>
              <input
              disabled={state.rate_per_hr>0}
                name="rate_per_km"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                min={0}
                defaultValue={0}
                value={state.rate_per_km}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col justify-center col-span-2 lg:col-span-3 xl:col-span-1">
              <label
                htmlFor="rate_per_hr"
                className="block text-gray-700 text-sm"
              >
                Rate / Hr (Rs.)
              </label>
              <input
              disabled={state.rate_per_km>0}
                name="rate_per_hr"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                min={0}
                defaultValue={0}
                value={state.rate_per_hr}
                onChange={handleChange}
              />
            </div>
          <div className="flex col-span-4 md:col-span-2 flex-col justify-center">
            <label
              htmlFor="driver_allowance"
              className="block text-gray-700 text-sm"
            >
              Driver Allowance
            </label>
            <input
              name="driver_allowance"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              defaultValue={0}
              value={state.driver_allowance}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <label htmlFor="ride_mode" className="block text-gray-700 text-sm">
              Journey via<span className="text-red-500">*</span>
            </label>
            <select
              name="ride_mode"
              {...register("ride_mode", {
                required: "Required",
              })}
              onChange={handleChange}
              className="select select-bordered border-gray-200 w-full"
            >
              <option disabled selected>
                Select
              </option>
              {Object.keys(rideModes).map((mode) => (
                <option
                  key={mode}
                  selected={state.ride_mode === rideModes[mode]}
                  value={rideModes[mode]}
                >
                  {rideModes[mode]}
                </option>
              ))}
            </select>
            {errors.ride_mode && (
              <p className="text-xs  text-red-500">
                {errors.ride_mode.message}
              </p>
            )}
          </div>
          <div className="col-span-2 lg:col-span-2">
            <label htmlFor="toll_amt" className="block text-gray-700 text-sm">
              Toll amt (Rs.)
            </label>
            <input
              name="toll_amt"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              defaultValue={0}
              value={state.toll_amt}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2 lg:col-span-2 xl:col-span-1">
            <label htmlFor="tax_amt" className="block text-gray-700 text-sm">
              GST (Rs.)
            </label>
            <input
              name="tax_amt"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              defaultValue={0}
              value={state.tax_amt}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-4 md:col-span-2">
            <label
              htmlFor="company_commission"
              className="block text-gray-700 text-sm"
            >
              Company commission (Rs.)
            </label>
            <input
              name="company_commission"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              value={state.company_commission}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2 md:col-span-3 lg:col-span-3">
            <label htmlFor="total_bill" className="block text-gray-700 text-sm">
              Total Bill (Rs.)
            </label>
            <input
              name="total_bill"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              defaultValue={0}
              value={ state.total_bill}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2 md:col-span-3 lg:col-span-3">
            <label
              htmlFor="payment_mode"
              className="block text-gray-700 text-sm"
            >
              Payment Mode<span className="text-red-500">*</span>
            </label>
            <select
              name="payment_mode"
              {...register("payment_mode", {
                required: "Required",
              })}
              onChange={handleChange}
              className="select select-bordered border-gray-200 w-full"
            >
              <option disabled selected>
                Select
              </option>
              {Object.keys(paymentModes).map((mode) => (
                <option
                  key={mode}
                  selected={state.payment_mode === paymentModes[mode]}
                  value={paymentModes[mode]}
                >
                  {paymentModes[mode]}
                </option>
              ))}
            </select>
            {errors.payment_mode && (
              <p className="text-xs  text-red-500">
                {errors.payment_mode.message}
              </p>
            )}
          </div>

          <div className="col-span-4 md:col-span-3">
            <label htmlFor="earnings" className="block text-gray-700 text-sm">
              Your earnings after deductions (Rs.)
              <span className="text-red-500">*</span>
            </label>
            <input
              name="earnings"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              max={state.total_bill}
              defaultValue={0}
              {...register("earnings", {
                required: "Required",
              })}
              value={state.earnings}
              onChange={handleChange}
            />
            {errors.earnings && (
              <p className="text-xs  text-red-500">{errors.earnings.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label
              htmlFor="payment_received"
              className="block mb-2 text-gray-700 text-sm"
            >
              Payment received
            </label>
            <fieldset class="grid grid-cols-2 gap-x-4">
              <div>
                <input
                  type="radio"
                  name="payment_received"
                  value="yes"
                  id="yes"
                  class="peer hidden [&:checked_+_label_svg]:block"
                  checked={state.payment_received === "yes"}
                  onChange={handleChange}
                />

                <label
                  for="yes"
                  class="block cursor-pointer rounded-lg border border-gray-100 p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-green-500 peer-checked:ring-1 peer-checked:ring-green-500"
                >
                  <div class="flex items-center justify-between">
                    <p class="text-gray-700">Yes</p>

                    <svg
                      class="hidden h-5 w-5 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="payment_received"
                  value="no"
                  id="no"
                  class="peer hidden [&:checked_+_label_svg]:block"
                  checked={state.payment_received === "no"}
                  onChange={handleChange}
                />

                <label
                  for="no"
                  class="block cursor-pointer rounded-lg border border-gray-100 p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-red-500 peer-checked:ring-1 peer-checked:ring-red-500"
                >
                  <div class="flex items-center justify-between">
                    <p class="text-gray-700">No</p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="hidden h-5 w-5 text-red-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                </label>
              </div>
            </fieldset>
          </div>

          {state.payment_received === "no" && (
            <div className="col-span-4 md:col-span-3">
              <label htmlFor="earnings" className="block text-gray-700 text-sm">
                Pending amt.
                <span className="text-red-500">*</span>
              </label>
              <input
                name="pending_payment_amt"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                min={0}
                value={state.pending_payment_amt}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <div className="flex mt-6">
          <button
            disabled={isSaving}
            onClick={handleSubmit(submitData)}
            className="flex items-center gap-x-2 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            {isSaving && (
              <div
                class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            )}
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewTransactionForm;
