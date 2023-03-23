/*global google*/
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { rideModes, fuelModes, paymentModes } from "../../../util/enums.js";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { googleMapsApiData } from "../../../config/index.js";
import { getDirectionsResponse } from "../../../helpers/map.helper.js";
import Map from "../../Map.js";

function NewTransactionForm({
  handleChange,
  state,
  submitData,
  register,
  handleSubmit,
  errors,
  setState,
  setError,
  clearErrors,
}) {
  const [directionsResponse, setDirectionsResponse] = useState();
  //testing
  const [marker1, setMarker1] = useState();
  const [marker2, setMarker2] = useState();
  //
  const inputRef1 = useRef();
  const inputRef2 = useRef();

  const onPlaceChanged = async () => {
    if (inputRef1.current.value == "" || inputRef2.current.value == "") {
      return;
    }
    try {
      console.log(inputRef1.current.value);
      console.log(inputRef2.current.value);
      setState(prevState => ({
        ...prevState,
        from_address: inputRef1.current.value,
        to_address: inputRef2.current.value,
      }));
      clearErrors("from_address")

      //get directions to display on map
      const results = await getDirectionsResponse(
        inputRef1.current.value,
        inputRef2.current.value
      );
      if (results) {
        setDirectionsResponse(results);
        let total_kms = results.routes[0].legs[0].distance.text.split(" ")[0];
        setState(prevState => ({
          ...prevState,
          total_kms: total_kms,
        }));
      }

      //update the markers
      getGeoCodeAndUpdateMarker(inputRef1.current.value, setMarker1);
      getGeoCodeAndUpdateMarker(inputRef2.current.value, setMarker2);

      //clear errors if displayed
      clearErrors("maps_error");
    } catch (err) {
      console.log(err);
      if (err.code === "ZERO_RESULTS") {
        setError("maps_error", {
          type: "custom",
          message: "No route found. Please select valid destination.",
        });
      } else {
        setError("maps_error", {
          type: "custom",
          message: err.message,
        });
      }
    }
  };

  const getGeoCodeAndUpdateMarker = (address, fn) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        fn({ lat: latitude, lng: longitude });
      }
    });
  };

  const onMarkerUpdate = (marker, address) => {
    if (marker == "marker1") {
      inputRef1.current.value = address;
    } else {
      inputRef2.current.value = address;
    }
    onPlaceChanged();
  };

  return (
    <section className="">
      
        <h2 className="text-lg font-semibold mb-10 text-gray-700 capitalize">
          Add new transaction
        </h2>

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
              <label
                className="text-gray-700 text-sm"
                htmlFor="customer_mobile"
              >
                Customer Mobile no.<span className="text-red-500">*</span>
              </label>
              <input
                name="customer_mobile"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                placeholder=""
                {...register("customer_mobile", {
                  required: "Mobile No. is required",
                  patter: {
                    value: /^\+?[1-9][0-9]{7,14}$/,
                    message: "Mobile No. is invalid",
                  },
                  minLength: {
                    value: 6,
                    message: "Mobile No. is invalid",
                  },
                  maxLength: {
                    value: 10,
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
              <label
                htmlFor="from_date"
                className="block text-gray-700 text-sm"
              >
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
                value={state.from_date}
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
                min={state.from_date}
                max={moment().format("YYYY-MM-DD")}
                {...register("to_date", {
                  required: "Date is required",
                })}
                value={state.to_date}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col justify-center col-span-4 md:col-span-2 ">
              <label
                htmlFor="no_of_days"
                className="block text-gray-700 text-sm"
              >
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
              <Autocomplete onPlaceChanged={onPlaceChanged}>
                <input
                  name="from_address"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                  placeholder=""
                  ref={inputRef1}
                />
              </Autocomplete>
              {errors.from_address && (
                <p className="text-xs  text-red-500">
                  {errors.from_address.message}
                </p>
              )}
            </div>
            <div className="col-span-2 xl:col-span-3">
              <label
                htmlFor="to_address"
                className="block text-gray-700 text-sm"
              >
                Journey end location<span className="text-red-500">*</span>
              </label>
              {/* // eslint-disable-next-line no-undef */}
              <Autocomplete onPlaceChanged={onPlaceChanged}>
                <input
                  name="to_address"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                  placeholder=""
                  ref={inputRef2}
                />
              </Autocomplete>
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
                defaultChecked={state.round_trip}
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
            <div className="col-span-4 md:col-span-6 xl:col-span-9 h-96">
              {errors.maps_error && (
                <p className="text-xs  text-red-500">
                  {errors.maps_error.message}
                </p>
              )}
              {directionsResponse && (
                <p className="text-sm text-gray-400">
                  You can also drag markers on map to change the location.
                </p>
              )}
              <div className="w-full md:w-1/2 h-full">
                {/* Google Maps to show directions */}
                <Map
                  directionsResponse={directionsResponse}
                  marker1={marker1}
                  marker2={marker2}
                  draggableMap={true}
                  onMarkerUpdate={onMarkerUpdate}
                />
              </div>
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
                Closing Kms
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
            <div className="flex col-span-4 md:col-span-2 lg:col-span-3 xl:col-span-1 flex-col justify-center">
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
            <div className="flex flex-col justify-center col-span-2 xl:col-span-1">
              <label
                htmlFor="rate_per_km"
                className="block text-gray-700 text-sm"
              >
                Rate / Km (Rs.)
              </label>
              <input
                name="rate_per_km"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                min={0}
                defaultValue={0}
                value={state.rate_per_km}
                onChange={handleChange}
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
            <div className="col-span-2 md:col-span-1 hidden xl:block"></div>
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="ride_mode"
                className="block text-gray-700 text-sm"
              >
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
                  <option key={mode} value={rideModes[mode]}>
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
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="fuel_mode"
                className="block text-gray-700 text-sm"
              >
                Fuel Type<span className="text-red-500">*</span>
              </label>
              <select
                name="fuel_mode"
                {...register("fuel_mode", {
                  required: "Required",
                })}
                onChange={handleChange}
                className="select select-bordered border-gray-200 w-full"
              >
                <option disabled selected>
                  Select
                </option>
                {Object.keys(fuelModes).map((mode) => (
                  <option key={mode} value={fuelModes[mode].name}>
                    {fuelModes[mode].name}
                  </option>
                ))}
              </select>

              {errors.fuel_mode && (
                <p className="text-xs  text-red-500">
                  {errors.fuel_mode.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label
                htmlFor="fuel_required"
                className="block text-gray-700 text-sm"
              >
                Qty of fuel required
              </label>
              <label className="input-group mt-2">
              <input
                name="fuel_required"
                type="number"
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                min={0}
                defaultValue={0}
                value={state.fuel_required}
                onChange={handleChange}
              />
            {state.fuel_mode && <span className="">{`${fuelModes[state.fuel_mode].unit}`}</span>}
            </label>
            </div>
            <div className="col-span-2 lg:col-span-2">
              <label
                htmlFor="fuel_rate"
                className="block text-gray-700 text-sm"
              >
                Fuel rate (Rs.)
              </label>
              <label className="input-group mt-2">
              <input
                name="fuel_rate"
                type="number"
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                min={0}
                defaultValue={0}
                value={state.fuel_rate}
                onChange={handleChange}
              />
              {state.fuel_mode && <span className="">{`/${fuelModes[state.fuel_mode].unit}`}</span>}
              </label>
            </div>
            <div className="col-span-2 lg:col-span-1">
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
            <div className="col-span-2 lg:col-span-1">
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
                defaultValue={0}
                value={state.company_comission}
                onChange={handleChange}
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
                name="total_bill"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                min={0}
                defaultValue={0}
                value={state.total_bill}
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
                  <option key={mode} value={paymentModes[mode]}>
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
                <p className="text-xs  text-red-500">
                  {errors.earnings.message}
                </p>
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

            {state.payment_received==="no" && <div className="col-span-4 md:col-span-3">
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
            </div>}
          </div>

          <div className="flex mt-6">
            <button
              onClick={handleSubmit(submitData)}
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
    </section>
  );
}

export default NewTransactionForm;
