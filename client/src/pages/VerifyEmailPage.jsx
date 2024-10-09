import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {

      email: "",

    },
    validationSchema: yup.object({
      email: yup.string()
        .required("Enter your email ID")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Enter a valid email address"
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      // Final form submission
      // alert(JSON.stringify(values));

      const backend_url = `${import.meta.env.VITE_BACKEND_URL}/api/email`;
      try {
        const emailResponse = await axios.post(backend_url, values);
        // console.log("response",registerResponse);
        toast.success(emailResponse.data.message);
        console.log(JSON.stringify(values));
        // Reset form after successful submission
        resetForm({
          values: {
            // Set the initial values to empty
            email: "",   // Or you can define new default values here


          }
        }); // Reset form to initialValues
        navigate('/password');

      } catch (error) {
        console.log("error", error);
        // Access error message correctly
        toast.error(error?.response?.data?.message || "An error occurred");

      }

    },
  });

  return (
    <div className='mt-5'>
      <div className='bg-white max-w-md w-full   mx-auto overflow-hidden rounded p-4'>
        <div className='flex justify-center items-center mb-3'>
          <FaRegCircleUser size={60} />
        </div>
        <h3>Welcome to my app</h3>
        <form className='grid gap-3 mt-4' onSubmit={formik.handleSubmit}>



          {/* Email Input */}
          <div className='flex flex-col gap-1'>
            <label className='block text-sm font-medium leading-6 text-gray-900 ' htmlFor='email'>Email :</label>
            <input
              {...formik.getFieldProps('email')}
              type="email"
              name='email'
              placeholder='Enter your Email'
              className={`bg-slate-100 px-2 py-1  ${
                formik.touched.email && formik.errors.email ? 'focus:outline-red-600' : 'focus:outline-primaryColor'
              }`} />
            <dd className="mt-2 text-pink-600 text-sm">{formik.errors.email}</dd>
          </div>





          {/* Submit Button */}
          <button type='submit' className='w-full cursor-pointer border p-1 rounded bg-green-600 text-white text-lg hover:bg-green-700 font-bold' disabled={!formik.isValid || !formik.dirty}>
            verify
          </button>
        </form>
        <p className='text-center mt-2 text-sm text-gray-400'>New User? <Link to={'/register'} className='text-blue-500  hover:underline'>Sign up</Link></p>
      </div>
    </div>
  );
}
