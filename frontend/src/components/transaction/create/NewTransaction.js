import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NewTransactionForm from "./NewTransactionForm";
import moment from 'moment'
import {toast} from 'react-hot-toast'
import { createTransaction } from "../../../helpers/transaction.helper";
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
    fuel_mode: "",
    fuel_required: 0,
    fuel_required: 0,
    fuel_rate: 0,
    toll_amt: 0,
    tax_amt: 0,
    company_commission: 0,
    total_bill: 0,
    payment_mode: "",
    earnings: 0,
    payment_received: "yes",
    pending_payment_amt: 0
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
    if(state.from_address ===""){
      setError('from_address',{
        type: "required",
        message:"Required"
      })
      return
    }
    if(state.to_address ===""){
      setError('from_address',{
        type: "required",
        message:"Required"
      })
      return
    }

    createTransaction(state)
    .then((res) =>{
       toast.success("Created successfully!!")
       setState(initialState)
    })
    .catch(err =>{
      console.log(err);
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
          "no_of_days": calculateDays(prevState.to_date, prevState.from_date),
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
          "total_kms": state.closing_kms - value,
        }));
      }
    }
    if (e.target.name==="payment_received") {
        if (value ==="yes" && state.pending_payment_amt>0) {
          setState(prevState =>({
            ...prevState,
          "pending_payment_amt": 0,
          }))  
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
          "total_kms": value - state.starting_kms,
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
      setError = {setError}
      clearErrors={clearErrors}
    />
  );
}

export default NewTransaction;
