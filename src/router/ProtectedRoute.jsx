import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../api/axios'

export default function ProtectedRoute({children}) {

  const [isAuth,setAuth] = useState(null)

  useEffect(()=>{
    async function isVerified() {
      try {

        const res = await api.post("/Owner/Verify",{withCredentials:true})
        console.log("veri")
      

      setAuth(true)
        
      } catch (error) {
        // console.log(error.response)
        setAuth(false)
         
       
      }
      
    }
    isVerified()
  },[])



   if (isAuth === false) {
          return <Navigate to={"/auth/login"}/>
          
        }

return children

  return (
    <></>
  )
}
