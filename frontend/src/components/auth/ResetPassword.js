import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Context from "../../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { resetPassword } from "../../helpers/auth.helper";
function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { token } = useParams();

  const new_password = useRef({});
  new_password.current = watch("new_password", "");

  const [state, setState] = useState({
    new_password: "",
    confirm_new_password: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (state.new_password !== state.confirm_new_password) {
      toast.error("Confirm password does not match with new password");
      return;
    }
    setIsSaving(true);
    resetPassword(token, state.new_password,state.confirm_new_password)
      .then((res) => {
        if (res.data.success) {
          setIsSaving((prevstate) => !prevstate);
          toast.success("Password updated!");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          toast.error(err.response.data.message);
          navigate("/login");
        } else {
          toast.error("Failed to update");
        }
        setIsSaving((prevstate) => !prevstate);
      });
  };

  return (
    <section className="p-4 px-5 md:p-8 md:px-10 bg-gray-100">
      <h2 className="text-xl mb-4 font-semibold">Reset Password</h2>

      <section class="max-w-xl p-6 bg-white rounded-md shadow-md ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="grid grid-cols-1 gap-6 mt-4">
            <div>
              <label
                htmlFor="new_password"
                className="block text-sm font-medium text-gray-700"
              >
                New password
              </label>

              <input
                type="password"
                name="new_password"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                {...register("new_password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                value={state.new_password}
                onChange={handleChange}
              />
              {errors.new_password && (
                <p className="text-xs  text-red-500">
                  {errors.new_password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm_new_password"
                className="block text-sm font-medium text-gray-700"
              >
                Repeat new password
              </label>

              <input
                type="text"
                name="confirm_new_password"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                {...register("confirm_new_password", {
                  required: "Password is required",
                  validate: (value) =>
                    value === new_password.current ||
                    "Does not match with new password",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                value={state.confirm_new_password}
                onChange={handleChange}
              />
              {errors.confirm_new_password && (
                <p className="text-xs  text-red-500">
                  {errors.confirm_new_password.message}
                </p>
              )}
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSaving}
              class="flex items-center gap-x-2 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
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
    </section>
  );
}

export default ResetPassword;
