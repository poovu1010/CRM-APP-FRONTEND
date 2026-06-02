import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthDetails = createContext();

export function UserDetails({ children }) {
  const [token, managetoken] = useState(() => {});
  const [Customers,getCustomers]=useState([])
  const [Orders,getAllorders] = useState([])

 

  const [isOpen,setopen] = useState(false)

  useEffect(()=>{

    async function getUserFunc(){
       const customer_data = await api.get("/Owner/get-all-user",{ withCredentials: true })
       const all_orders = await api.get("/Owner/get-all-order",{ withCredentials: true })


       getAllorders(all_orders.data.allorders)
       getCustomers(customer_data.data)
      
    }
    getUserFunc()
   
  },[])

  return <AuthDetails.Provider value={{Orders,getAllorders,Customers,getCustomers,isOpen,setopen}}>{children}</AuthDetails.Provider>;

  
}

export default AuthDetails;
