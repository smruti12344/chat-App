import React, { useState } from 'react'
import axios from 'axios'
const usegetUserDetails = () => {
 const[user,setUser] = useState(null);
 const fetchUserDetails = async()=>{
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;
      const response = await axios({
        method:'get',
        url:URL,
        withCredentials:true

      })
      setUser(response?.data?.data)
     
    } catch (error) {
      console.log("error",error);
    }
  }
  return{user,fetchUserDetails};
}

export default usegetUserDetails
