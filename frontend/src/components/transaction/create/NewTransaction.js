import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NewTransactionForm from "./NewTransactionForm";
import moment from 'moment'
function NewTransaction() {
  const initialState = {
    customer_name: "",
    customer_mobile: "",
    company_crn: "",
    from_date: "",
    to_date: "",
    no_of_days: "",
    from_address: "",
    to_address: "",
    round_trip: false,
    starting_kms: 0,
    closing_kms: 0,
    total_kms: 0,
    rate_per_km: 0,
    rate_per_hr: 0,
    driver_allowance: 0,
    ride_mode: "",
    fuel_type: "",
    fuel_required: 0,
    fuel_required: 0,
    fuel_rate: 0,
    toll_amt: 0,
    tax_amt: 0,
    company_commission: 0,
    total_bill: 0,
    payment_mode: "",
    earnings: 0,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const [state, setState] = useState(initialState);

  const calculateDays = (date1, date2) => {
    let days;
    if (date1 == date2) {
      days = 1;
    } else {
      let d1 = moment(date1);
      let d2 = moment(date2);
      days = d1.diff(d2, "days")+1;
    }
    return days;
  };

  const submitData = () => {
    
    console.log(state);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    let value =
      e.target.type == "number" ? Number(e.target.value) : e.target.value;
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
    if(e.target.name=='from_date' || e.target.name =='to_date'){
      if(state.to_date && (e.target.name=='from_date'&& value>state.to_date) || (e.target.name =='to_date' &&value<state.from_date)){
        setError('to_date',{
          type: "custom",
          message: "Should be >= start date",
        })
      }
      else{
        clearErrors("to_date");
        setState((prevState) => ({
          ...prevState,
          ["no_of_days"]: calculateDays(prevState.to_date, prevState.from_date),
        }))
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
          ["total_kms"]: value + state.closing_kms,
        }));
      }
    }
    if (e.target.name == "closing_kms") {
      console.log(e.target.value);
      if (state.starting_kms > value) {
        setError("closing_kms", {
          type: "custom",
          message: "Should be greater than or equal to starting kms.",
        });
      } else {
        clearErrors("closing_kms");
        setState((prevState) => ({
          ...prevState,
          ["total_kms"]: value + state.starting_kms,
        }));
      }
    }
    if (e.target.type == "checkbox") {
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: value === "on" ? true : false,
      }));
    }
  };

  

  return (
    <NewTransactionForm
      setState={setState}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      handleChange={handleChange}
      state={state}
      submitData={submitData}
    />
  );
}

export default NewTransaction;
