import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fuelModes } from "../../../util/enums";
import moment from "moment";
import { createFuelExpense } from "../../../helpers/expense.helper";
function AddFuelExpense() {
  const initialState = {
    mode: "",
    rate: 0,
    date: "",
    quantity: 0,
    amount: 0,
    kms:0
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const [state, setState] = useState(initialState);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const submitData = () => {
    console.log(state);
    setIsSaving(true);
    createFuelExpense(state)
    .then(res =>{
        if(res.data.success){
            toast.success('Fuel expense saved!')
            setIsSaving(prev => !prev)
            setState(initialState)
            navigate('/expense/fuel')
        }
    })
    .catch(err =>{
        console.log(err);
        toast.error('Failed to save data')
    })
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    let value =
      e.target.type == "number" ? Number(e.target.value) : e.target.value;

    setState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));

    if (e.target.name === "quantity" || e.target.name === "rate") {
      let expense;
      if (e.target.name === "quantity") expense = (value * state.rate).toFixed(2);
      if (e.target.name === "rate") expense = (value * state.quantity).toFixed(2);
      setState((prevState) => ({
        ...prevState,
        amount: expense,
      }));
    }
  };

  return (
    <section className="p-5 md:p-10">
      <h2 className="text-lg font-semibold mb-10 text-gray-700 capitalize">
        Add new Fuel Expense
      </h2>

      <form>
        <div className="w-full md:w-3/5 lg:w-1/2 p-2 grid gap-4 grid-cols-2">
          <div className="col-span-2">
            <label htmlFor="mode" className="block text-gray-700 text-sm">
              Fuel Type<span className="text-red-500">*</span>
            </label>
            <select
              name="mode"
              {...register("mode", {
                required: "Required",
              })}
              onChange={handleChange}
              className="select select-bordered border-gray-200 w-full"
            >
              <option disabled selected>
                Select
              </option>
              {Object.keys(fuelModes).map((mode) => (
                <option
                  key={mode}
                  selected={state.mode === fuelModes[mode].name}
                  value={fuelModes[mode].name}
                >
                  {fuelModes[mode].name}
                </option>
              ))}
            </select>

            {errors.mode && (
              <p className="text-xs  text-red-500">{errors.mode.message}</p>
            )}
          </div>
          <div className="col-span-2">
            <label htmlFor="quantity" className="block text-gray-700 text-sm">
              Quantity
            </label>
            <input
              name="quantity"
              type="number"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              value={state.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="rate" className="block text-gray-700 text-sm">
              Rate (Rs.)
            </label>
            <input
              name="rate"
              type="number"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              defaultValue={0}
              value={state.rate}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="amount" className="block text-gray-700 text-sm">
              Kilometers (optional)
            </label>
            <input
              name="kms"
              type="number"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              value={state.kms
              }
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="amount" className="block text-gray-700 text-sm">
              Amount (Rs.)
            </label>
            <input
              name="amount"
              type="number"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              value={
                state.rate && state.quantity
                  ? (
                      Math.round(state.rate * state.quantity * 100) / 100
                    ).toFixed(2)
                  : state.amount
              }
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2 xl:col-span-3">
            <label htmlFor="date" className="block text-gray-700 text-sm">
              Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              placeholder=""
              name="date"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              max={moment().format("YYYY-MM-DD")}
              {...register("date", {
                required: "Date is required",
              })}
              value={
                state.date 
              }
              onChange={handleChange}
            />
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
        </div>
      </form>
    </section>
  );
}

export default AddFuelExpense;
