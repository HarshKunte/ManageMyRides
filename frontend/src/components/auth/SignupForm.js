import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, redirect, useNavigate } from "react-router-dom";
import { signup } from "../../helpers/auth.helper";
function Signup() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    mobile: "",
    password: "",
  }

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    const {first_name, last_name, ...rest}=state
    const name = first_name[0].toUpperCase()+first_name.slice(1) +" "+last_name[0].toUpperCase()+last_name.slice(1)
    const data = {name, ...rest}

    signup(data)
    .then((res)=> {
      console.log(res);
      if(res.data?.success){
        toast.success("Account created!")
        navigate('/login')
        setState(initialState)
      }
    })
    .catch(({response}) => {
      toast.error(response.data.message)
    })
  };
  return (
    <>
      <p className="text-2xl font-bold">Sign Up</p>
      <form
        action="#"
        className="mt-8 grid grid-cols-6 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="FirstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>

          <input
            type="text"
            id="FirstName"
            name="first_name"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            {...register("first_name", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
            })}
            value={state.first_name}
            onChange={handleChange}
          />
          {errors.first_name && (
            <p className="text-xs  text-red-500">{errors.first_name.message}</p>
          )}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="LastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>

          <input
            type="text"
            id="LastName"
            name="last_name"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            {...register("last_name", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
            })}
            value={state.last_name}
            onChange={handleChange}
          />
          {errors.last_name && (
            <p className="text-xs  text-red-500">{errors.last_name.message}</p>
          )}
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="Company Name"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>

          <input
            type="text"
            id="Company Name"
            name="company_name"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            {...register("company_name", {
              required: "Company name is required",
              minLength: {
                value: 5,
                message: "Company name must be at least 5 characters",
              },
            })}
            value={state.company_name}
            onChange={handleChange}
          />
          {errors.company_name && (
            <p className="text-xs  text-red-500">
              {errors.company_name.message}
            </p>
          )}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            type="email"
            id="Email"
            name="email"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            value={state.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-xs  text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="Mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile No.
          </label>

          <input
            type="text"
            id="Mobile"
            name="mobile"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            {...register("mobile", {
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
            value={state.mobile}
            onChange={handleChange}
          />
          {errors.mobile && (
            <p className="text-xs  text-red-500">{errors.mobile.message}</p>
          )}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            type="password"
            id="Password"
            name="password"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            value={state.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-xs  text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
            Create an account
          </button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an account?
            <Link to="/login" className="text-gray-700 underline">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Signup;
