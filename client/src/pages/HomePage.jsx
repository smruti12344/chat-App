import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import usegetUserDetails from '../hooks/usegetUserDetails'

export default function HomePage() {
  const {user,fetchUserDetails} = usegetUserDetails();
  useEffect(()=>{
    fetchUserDetails();
  },[])
  console.log("userDetails:",user);
  return (
    <div>
      home page
      <section>
      <Outlet/>
      </section>
    </div>
  )
}
