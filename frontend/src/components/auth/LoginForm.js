import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import { login } from "../../helpers/auth.helper";
function LoginForm() {
  const { setUser } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const initialState = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setIsSaving(true);
    login(state)
      .then((res) => {
        if (res.data?.success) {
          toast.success("Welcome!");
          setUser(res.data.user);
          setState(initialState);
          setIsSaving((prev) => !prev);
          navigate("/");
        }
      })
      .catch(({ response }) => {
        if (!response.data?.success || response.data?.message) {
          toast.error(response.data?.message);
          setState(initialState);
        }
      });
  };

  return (
    <>
      <p className="text-2xl font-bold">Log In</p>
      <form
        action="#"
        className="mt-8 grid grid-cols-6 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          <Link
            to="/password/forgot"
            className="text-xs text-gray-600 underline underline-offset-2 cursor-pointer"
          >
            Forgot password
          </Link>
          {errors.password && (
            <p className="text-xs  text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
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
            Login
          </button>
          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Don't have an account?
            <Link to="/signup" className="text-gray-700 underline">
              Sign Up
            </Link>
          </p>
          
        </div>
      </form>
      <p className="mt-5 text-xs "> To try this app use <br/> <span className="text-blue-600">email: john@gmail.com  password: john1234 </span> </p>

    </>
  );
}

export default LoginForm;
