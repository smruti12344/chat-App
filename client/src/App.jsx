import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

function App() {
  

  return (
    <>
    <header>
       <Toaster/>
    </header>
    <main className='my-0'>
    <Outlet/> 
    </main>
    </>
  )
}

export default App
