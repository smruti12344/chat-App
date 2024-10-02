import { useFormik } from 'formik'
import React from 'react'
import { StringSchema } from 'yup';
import * as yup from 'yup';
export default function RegisterPage() {
  const formik = useFormik({
    initialValues:{
      name:"",
      email : "",
      password: "",
      profile_pic:""
    },
    validationSchema:yup.object({
      name :yup.string().required("please enter user name")
    }),
    onSubmit: (values)=>{
      alert(JSON.stringify(values));
    }
  })
  return (
    <div className='mt-5'>
      <div className='bg-white max-w-sm w-full mx-2 overflow-hidden rounded p-4'>
        <h3>welcome to my app</h3>
        <form >
          <label htmlFor='name'className='text-primaryColor'>Name :</label>
          <input
          {...formik.getFieldProps('name')}
            type="text"
            id='name'
            name='name'
            placeholder='Enter your name' 
            className='bg-slate-100 px-2 py-1  focus:outline-primaryColor'/>
            <dd className='text-red-700'>{formik.errors.name}</dd>
        </form>
      </div>
    </div>
  )
}
