import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading spinner
import { MdCancel } from "react-icons/md"; // Cancel icon
import { Link } from 'react-router-dom'
export default function RegisterPage() {
  const [textVisible, setTextVisible] = useState(false);
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);  // Track loading state
  const [picName, setPicName] = useState('');  // Track picture name

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      profile_pic: null
    },
    validationSchema: yup.object({
      name: yup.string().required("Please enter user name"),
      email: yup.string()
        .required("Enter your email ID")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Enter a valid email address"
        ),
      password: yup.string()
        .required("Enter password")
        .min(8, "Minimum 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
    }),
    onSubmit: (values) => {

      alert(JSON.stringify(values));
      console.log(values);
    }
  });

  const handlePassword = () => {
    setTextVisible(!textVisible);
  };

  const handleProfilePic = (e) => {
    setLoading(true);  // Set loading to true when file is selected
    const file = e.target.files[0];

    // Simulating async upload and setting file name
    setTimeout(() => {
      formik.setFieldValue('profile_pic', file);  // Set the file value in formik
      setPicName(file.name);  // Store the file name
      setLoading(false);  // Turn off loading after "upload"
    }, 2000);
  };

  const handleRemovePic = () => {
    formik.setFieldValue('profile_pic', null);  // Reset file value in formik
    setPicName('');  // Reset the picName state
    fileRef.current.value = null;  // Clear the file input
  };

  return (
    <div className='mt-5'>
      <div className='bg-white max-w-sm w-full mx-auto overflow-hidden rounded p-4'>
        <h3>Welcome to my app</h3>
        <form className='grid gap-3 mt-4' onSubmit={formik.handleSubmit}>
          {/* Name Input */}
          <div className='flex flex-col gap-1'>
            <label className='block text-sm font-medium leading-6 text-gray-900' htmlFor='name'>Name :</label>
            <input
              {...formik.getFieldProps('name')}
              type="text"
              id='name'
              name='name'
              placeholder='Enter your name'
              className='bg-slate-100 px-2 py-1 focus:outline-primaryColor' />
            <dd className="mt-2 text-pink-600 text-sm">{formik.errors.name}</dd>
          </div>

          {/* Email Input */}
          <div className='flex flex-col gap-1'>
            <label className='block text-sm font-medium leading-6 text-gray-900 ' htmlFor='email'>Email :</label>
            <input
              {...formik.getFieldProps('email')}
              type="email"
              name='email'

              placeholder='Enter your Email'
              className='bg-slate-100 px-2 py-1 focus:outline-primaryColor' />
            <dd className="mt-2 text-pink-600 text-sm">{formik.errors.email}</dd>
          </div>

          {/* Password Input */}
          <div className='flex flex-col gap-1'>
            <label className='block text-sm font-medium leading-6 text-gray-900' htmlFor='password'>Password :</label>
            <div className='relative flex items-center'>
              <input
                {...formik.getFieldProps('password')}
                type={textVisible ? "text" : "password"}
                name='password'
                placeholder='Enter your password'
                className='bg-slate-100 px-2 py-1 w-full focus:outline-primaryColor' />
              {formik.values.password && (
                textVisible ? (
                  <IoEyeOff className='absolute right-3 cursor-pointer' onClick={handlePassword} />
                ) : (
                  <IoEye className='absolute right-3 cursor-pointer' onClick={handlePassword} />
                )
              )}
            </div>
            <dd className="mt-2 text-pink-600 text-sm">{formik.errors.password}</dd>
          </div>

          {/* Profile Pic Upload */}
          <div className='flex flex-col gap-1 relative'>
            <label className='block text-sm font-medium leading-6 text-gray-900  ' htmlFor="profile_pic">Photo :</label>
            <div className='h-14  cursor-pointer bg-slate-200 flex items-center justify-center border hover:border-primaryColor rounded'
              onClick={() => fileRef.current.click()}>
              <p className='text-sm font-medium leading-6 text-gray-900 '>
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin " />
                ) : (
                  picName || 'Upload profile pic'
                )}
              </p>
            </div>

            {/* Cancel Button for Profile Pic */}
            {picName && (
              <MdCancel
                className='absolute right-3 top-2/4  hover:text-red-600 cursor-pointer'
                onClick={handleRemovePic}
              />
            )}

            <input
              type="file"
              name="profile_pic"
              accept='image/*'
              className='bg-slate-100 px-2 py-1 hidden'
              ref={fileRef}
              onChange={handleProfilePic} />
          </div>

          {/* Submit Button */}
          <button type='submit' className='w-full cursor-pointer border p-1 rounded bg-green-600 text-white text-lg hover:bg-green-700 font-bold' disabled={!formik.isValid || !formik.dirty}>Submit</button>
        </form>
        <p className='mt-2 text-sm text-gray-400'>Already have account? <Link to={'/email'} onClick={(e) => e.stopPropagation()} className='text-blue-500 hover:underline' >sign in</Link></p>
      </div>

    </div>
  );
}
