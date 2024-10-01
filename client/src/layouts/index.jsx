import React from 'react'
import logo from '../assets/logo.png'
export default function AuthLayout({ children }) {
  return (
    <>
      <header className=' overflow-hidden flex justify-center items-center py-3  h-20 shadow-md '>
        <img
          src={logo}
          alt="logo"
          width={180}
           height={60}
          
           />
      </header>
      {children}
    </>
  )
}
