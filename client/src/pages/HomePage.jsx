import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import usegetUserDetails from '../hooks/usegetUserDetails'
import { useSelector } from 'react-redux';

export default function HomePage() {
  const {user,fetchUserDetails} = usegetUserDetails();
  const userToken = useSelector(state=>state.user);
   console.log("home",userToken);
  useEffect(()=>{
    fetchUserDetails();
  },[])
  
  return (
    <div>
      home page
      <section>
      <Outlet/>
      </section>
    </div>
  )
}
