import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const AuthDetails = createContext();

export function UserDetails({ children }) {
  const [token, managetoken] = useState(() => {});
  const [Customers,getCustomers]=useState([])
  const [Orders,getAllorders] = useState([])
  const [loading,setLoading] = useState(false)

 

  const [isOpen,setopen] = useState(false)
    const [isOrderOpen, setOrderOpen] = useState(false);

  

   const refreshData =  async()=>{
    setLoading(true)
      try {
        const customer_data = await api.get("/Owner/get-all-customer",{ withCredentials: true })
       const all_orders = await api.get("/Owner/get-all-order",{ withCredentials: true })
       getAllorders(all_orders.data)
       getCustomers(customer_data.data.data || [])
        
      } catch (error) {
        
        toast.error(error.response.message)
      }finally{
        setLoading(false)
      }
      
      
    }
    
   
  

  return <AuthDetails.Provider value={{loading,setLoading,isOrderOpen, setOrderOpen,Orders,getAllorders,Customers,getCustomers,isOpen,setopen,refreshData}}>{children}</AuthDetails.Provider>;

  
}

export default AuthDetails;
