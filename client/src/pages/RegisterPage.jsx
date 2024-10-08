import { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading spinner
import { MdCancel } from "react-icons/md"; // Cancel icon
import { Link, useNavigate } from 'react-router-dom';
import useUploadFile from '../hooks/uploadFile'; // Custom hook
import axios from'axios';
import toast from 'react-hot-toast';
export default function RegisterPage() {
  const [textVisible, setTextVisible] = useState(false);
  const fileRef = useRef(null); // Reference to file input
  const [picName, setPicName] = useState(''); // To track picture name
  const navigate = useNavigate();
  // Using the custom hook for file upload
  const { uploadFile, loading, error, data } = useUploadFile();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      profile_pic: null, // Will store the uploaded picture URL
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
    onSubmit: async (values,{resetForm}) => {
      // Final form submission
      // alert(JSON.stringify(values));
     
      const backend_url = `${import.meta.env.VITE_BACKEND_URL}/api/register`;
      try {
        const registerResponse = await axios.post(backend_url,values);
        // console.log("response",registerResponse);
        toast.success(registerResponse.data.message);
        console.log(JSON.stringify(values));
         // Reset form after successful submission
      resetForm({
        values: {
          name: "",    // Set the initial values to empty
          email: "",   // Or you can define new default values here
          password: "",
          profile_pic: null,
        
      }}); // Reset form to initialValues
      setPicName(''); //reset the pic name after submit
      fileRef.current.value = null ; //reset after submit
      navigate('/email');

      } catch (error) {
        console.log("error",error);
       // Access error message correctly
    toast.error(error?.response?.data?.message || "An error occurred");
        
      }

    },
  });

  // UseEffect to watch for changes in `data` state from the uploadFile hook
  useEffect(() => {
    if (data) {
      formik.setFieldValue('profile_pic', data.secure_url); // Set the uploaded URL to formik field
      console.log("Updated profile_pic URL: ", data.secure_url);
    }
  }, [data]); // This runs whenever `data` changes

  // Handle password visibility toggle
  const handlePassword = () => {
    setTextVisible(!textVisible);
  };

  // Handle file selection and upload
  const handleProfilePic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadFile(file); // Upload file using custom hook
      setPicName(file.name); // Store the file name for UI

      // You no longer need to log `data` here because it's managed by the useEffect above
    }
  };

  // Handle removing the profile picture
  const handleRemovePic = () => {
    formik.setFieldValue('profile_pic', null); // Reset file value in formik
    setPicName(''); // Reset the picName state
    fileRef.current.value = null; // Clear the file input
  };

  return (
    <div className='mt-5'>
      <div className='bg-white max-w-md w-full   mx-auto overflow-hidden rounded p-4'>
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
            <div className='h-14 cursor-pointer bg-slate-200 flex items-center justify-center border hover:border-primaryColor rounded'
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
                className='absolute right-3 top-2/4 hover:text-red-600 cursor-pointer'
                onClick={handleRemovePic}
              />
            )}

            <input
              type="file"
              name="profile_pic"
              accept='image/*'
              className='hidden'
              ref={fileRef}
              onChange={handleProfilePic} />
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>

          {/* Submit Button */}
          <button type='submit' className='w-full cursor-pointer border p-1 rounded bg-green-600 text-white text-lg hover:bg-green-700 font-bold' disabled={!formik.isValid || !formik.dirty || loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <p className='mt-2 text-sm text-gray-400'>Already have an account? <Link to={'/login'} className='text-blue-500 hover:underline'>Sign in</Link></p>
      </div>
    </div>
  );
}
