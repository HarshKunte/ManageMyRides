import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { createOtherExpense } from "../../../helpers/expense.helper";
function AddOtherExpense() {
  const initialState = {
    expense_name: "",
    date: "",
    amount: 0,
    kms:0,
    description:"",
    bill_no:""
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
    createOtherExpense(state)
    .then(res =>{
        if(res.data.success){
            toast.success('Expense saved!')
            setIsSaving(prev => !prev)
            setState(initialState)
            navigate('/expense/other')
        }
    })
    .catch(err =>{
        console.log(err);
        setIsSaving(false)
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

  };

  return (
    <section className="p-5 md:p-10">
      <h2 className="text-lg font-semibold mb-10 text-gray-700 capitalize">
        Add new Expense
      </h2>

      <form>
        <div className="w-full md:w-3/5 lg:w-1/2 p-2 grid gap-4 grid-cols-2">
          <div className="col-span-2">
            <label htmlFor="expense_name" className="block text-gray-700 text-sm">
              Expense name<span className="text-red-500">*</span>
            </label>
            <input
              name="expense_name"
              type="text"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder="eg.Maintenance charges"
              value={state.expense_name}
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
            {errors.date && (
              <p className="text-xs  text-red-500">
                {errors.date.message}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <label htmlFor="name" className="block text-gray-700 text-sm">
              Description (optional)
            </label>
            <textarea
              name="description"
              type="text"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder="eg. Garage name -"
              value={state.description}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="bill_no" className="block text-gray-700 text-sm">
              Bill no (optional)
            </label>
            <input
              name="bill_no"
              type="text"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder="eg. Garage name -"
              value={state.bill_no}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="amount" className="block text-gray-700 text-sm">
              Kilometers (optional)<span className="text-red-500">*</span>
            </label>
            <input
              name="kms"
              type="number"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              value={ state.kms }
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="amount" className="block text-gray-700 text-sm">
              Amount (Rs.)<span className="text-red-500">*</span>
            </label>
            <input
              name="amount"
              type="number"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              min={0}
              value={ state.amount }
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

export default AddOtherExpense;
