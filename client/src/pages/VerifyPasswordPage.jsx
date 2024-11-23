import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from'axios';
import toast from 'react-hot-toast';
import AvtarComponent from '../components/AvtarComponent';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';

export default function VerifyPasswordPage() {
  const [textVisible, setTextVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); //to get data from url
  const   dispatch = useDispatch();
 
  const formik = useFormik({
    initialValues: {
     userId:'',
      password: "",
      
    },
    validationSchema: yup.object({
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
     
      const backend_url = `${import.meta.env.VITE_BACKEND_URL}/api/password`;
      try {
        //added userId form routes
       const updateValues={
        ...values,
        userId : location.state?.data?._id

       }
        const passwordResponse = await axios({
          method:'post',
          url:backend_url,
          data: updateValues,
          withCredentials:true

          
        });
        console.log("userDetails",passwordResponse);
        console.log("response",passwordResponse.data.token);
        toast.success(passwordResponse.data.message);
        
         // Reset form after successful submission
         
         
          
         dispatch(setToken(passwordResponse.data.token));
         localStorage.setItem('Token', passwordResponse.data.token);
        
      resetForm({
        values: {
          password: "",
      
        
      }}); // Reset form to initialValues
     
      navigate('/');

      } catch (error) {
        console.log("error",error);
       // Access error message correctly
    toast.error(error?.response?.data?.message || "An error occurred");
        
      }

    },
  });

  // Handle password visibility toggle
  const handlePassword = () => {
    setTextVisible(!textVisible);
  };
  // restrict user to visit password-page without verifying email
  useEffect(()=>{
    if(!location.state){
     navigate('/email');
    }
  },[]);
  return (
    <div className='mt-5'>
      <div className='bg-white max-w-md w-full   mx-auto overflow-hidden rounded p-4'>
        <div className=' mb-3 flex flex-col justify-center items-center'>
          <AvtarComponent width={'70'}
                          height={'70'}
                          name={location?.state?.data?.name}
                          imgUrl={location?.state?.data?.profile_pic}/>
          <h2 className='font-semibold'>{location?.state?.data?.name}</h2>
        </div>
        
        <form className='grid gap-3 mt-4' onSubmit={formik.handleSubmit}>



          {/* Email Input */}
           {/* Password Input */}
           <div className='flex flex-col gap-1'>
            <label className='block text-sm font-medium leading-6 text-gray-900' htmlFor='password'>Password :</label>
            <div className='relative flex items-center'>
              <input
                {...formik.getFieldProps('password')}
                type={textVisible ? "text" : "password"}
                name='password'
                placeholder='Enter your password'
                className={`bg-slate-100 px-2 py-1 w-full focus:outline-primaryColor ${ formik.touched.password && formik.errors.password ? 'focus:outline-red-600' : 'focus:outline-primaryColor'}`} />
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





          {/* Submit Button */}
          <button type='submit' className='w-full cursor-pointer border p-1 rounded bg-green-600 text-white text-lg hover:bg-green-700 font-bold' disabled={!formik.isValid || !formik.dirty}>
            Login
          </button>
        </form>
        <p className='text-center mt-2 text-sm text-gray-400'><Link to={'/forgot-password'} className=' text-black  '>Forgot Password</Link></p>
      </div>
    </div>
  );
}
