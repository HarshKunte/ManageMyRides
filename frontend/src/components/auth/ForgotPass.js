import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../../helpers/auth.helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
function ForgotPass() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const navigate = useNavigate()

      const initialState = {
        email: "",
      }
      const [state, setState] = useState(initialState);
      const [isSaving, setIsSaving] = useState(false);
      const handleChange = (e) => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      };

    const onSubmit = () =>{
        setIsSaving(true)
        forgotPassword(state.email)
        .then(res =>{
            if(res.data.success){
                toast.success(res.data.message)
            }
            navigate('/login')
            setIsSaving(prev => !prev)
        })
        .catch(err =>{
            console.log(err);
            if(err.response.data.message){
                toast.error(err.response.data.message)
            }
            setIsSaving(prev => !prev)
        })
    } 

    return ( 
        <>
        <p className='text-2xl font-bold'>Reset password</p>
        <form action="#" className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit(onSubmit)}>
                
      
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                    Enter email to receive password reset link
                  </label>
      
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    placeholder='Enter email'
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Invalid email address',
                        },
                      })}

                      value={state.email}
            onChange={handleChange}
          
                 />
                 {errors.email && <p className="text-xs  text-red-500">{errors.email.message}</p>}
                </div>
      
                
      
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button disabled={isSaving}
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    {isSaving &&<div
            class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>}
                    Submit
                  </button>
                </div>
              </form>
              </>
     );
}

export default ForgotPass;