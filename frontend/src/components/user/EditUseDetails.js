import React, { useContext, useState } from "react";
import Context from "../../context/Context";
import { useForm } from "react-hook-form";
import { editUserData } from "../../helpers/user.helper";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function EditUserDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useContext(Context);
  const {name, email, mobile, company_name} = user

  const [state, setState] = useState({name, email, mobile, company_name});
  const [isSaving, setIsSaving] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () =>{
    setIsSaving(true)
    editUserData(state)
    .then((res)=>{
        if(res.data.success){
            setUser({...user, ...res.data.user})
            setIsSaving(prevstate => !prevstate)
            navigate('/user/details')
        }
    })
    .catch(err =>{
        console.log(err);
        toast.error('Failed to update data.')
        setIsSaving(prevstate => !prevstate)
    })
  }

  return (
    <section className="p-4 px-5 md:p-8 md:px-10 bg-gray-100 min-h-screen">
      <h2 className="text-xl mb-4 font-semibold">Edit Details</h2>

      <section class="max-w-4xl p-6 bg-white rounded-md shadow-md ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label class="text-gray-700" htmlFor="name">
                Username
              </label>
              <input
                name="name"
                type="text"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                value={state.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-xs  text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label class="text-gray-700 " htmlFor="email">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
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

            <div>
              <label class="text-gray-700 " htmlFor="company_name">
                Company Name
              </label>
              <input
                name="company_name"
                type="text"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
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

            <div>
              <label class="text-gray-700 " htmlFor="mobile">
                Mobile
              </label>
              <input
                name="mobile"
                type="text"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
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
          </div>

          <div class="flex justify-end mt-6">
            <button onClick={handleSubmit(onSubmit)} disabled={isSaving} class="flex items-center gap-x-2 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              {isSaving &&<div
        class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>}
              Save
            </button>
            
          </div>
        </form>
      </section>
    </section>
  );
}

export default EditUserDetails;
