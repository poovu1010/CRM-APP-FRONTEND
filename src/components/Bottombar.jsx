import React, { useState } from "react";
import { Home, Users, GitMerge, Layout, MoreHorizontal, Icon, Key, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { div, h1 } from "framer-motion/client";
import logo from "../assets/logo.png";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function BottomBar() {

  const navigate = useNavigate();
  const [activeTab,setActiveTab] = useState();


  const navItems = [
    { id: "dashboard", label: "Dashboard", Icon: Home, Link: "/dashboard" },
    { id: "customers", label: "Customers", Icon: Users, Link: "/dashboard/CustomerPage" },
    { id: "orders", label: "Orders", Icon: GitMerge, Link: "/Orders/all-orders" },
  ];


  async function LogoutFun(){
    window.confirm("Are u sure to Logout")

    try {
      const logout = await api.post("/Owner/logout")
      
      toast.success(logout.data.message)
      if (logout.data.status) {
         navigate("/auth/login")
      }
     
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }




  return (
    <div className=" overflow-hidden fixed h-20 bg-white border border-x-0 border-b-0  bottom-0 left-0 w-full z-40 flex  md:pb-50   place-items-center
        
    md:top-0 md:left-0 md:w-50  hover:md:transition-all duration-300 ease-in-out  md:h-screen  md:border-r md:border-y-0

    md:flex-col  
    ">


      <div className="w-3/4 hidden md:block">
        <img src={logo} alt="logo" />

      </div>
   <div className="flex w-full justify-around  md:flex-col gap-15">
      {navItems.map((items) => (
        <div className="hover:bg-gray-200 md:h-13 flex justify-center  rounded-2xl"
          key={items.id}>
          <NavLink to={items.Link} end={"/Dashboard"} className={({ isActive }) => {
            if (isActive) {
              return ` text-violet-400 flex justify-center md:gap-3 flex-col md:border-r-4 md:h-13 md:w-full md:bg-violet-200 place-items-center md:flex-row `
            } else {
              return `text-black flex flex-col md:gap-3 justify-center place-items-center md:flex-row`
            }
          }}
          >
            <items.Icon />
            <span className="  ">{items.label}</span>

          </NavLink>
        </div>
      ))}
    </div>

<button onClick={LogoutFun} className="hidden md:block md:flex gap-4 mt-90 "> <LogOut/> logout </button>


    </div>
  );
}
