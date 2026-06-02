import React, { useState } from "react";
import { Home, Users, GitMerge, Layout, MoreHorizontal, Icon, Key } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { div, h1 } from "framer-motion/client";
import logo from "../assets/logo.png";

export default function BottomBar() {

  const navigate = useNavigate();
  const [activeTab,setActiveTab] = useState();


  const navItems = [
    { id: "dashboard", label: "Dashboard", Icon: Home, Link: "/dashboard" },
    { id: "customers", label: "Customers", Icon: Users, Link: "/dashboard/CustomerPage" },
    { id: "orders", label: "Orders", Icon: GitMerge, Link: "/dashboard/all-orders" },
  ];





  return (
    <div className=" overflow-hidden fixed h-20 bg-white border border-x-0 border-b-0  bottom-0 left-0 w-full z-40 flex justify-around  place-items-center

    
    md:top-0 md:left-0 md:w-50  hover:md:transition-all duration-300 ease-in-out  md:h-screen  md:border-r md:border-y-0

    md:flex-col  
    ">


      <div className="w-3/4 hidden md:block">
        <img src={logo} alt="logo" />

      </div>
   <div className="flex md:flex-col gap-15">
      {navItems.map((items) => (
        <div className="hover:bg-gray-200 md:px-5 md:py-2.5 rounded-2xl"
          key={items.id}>
          <NavLink to={items.Link} end={"/Dashboard"} className={({ isActive }) => {
            if (isActive) {
              return ` text-violet-400 flex md:gap-3 flex-col   place-items-center md:flex-row `
            } else {
              return `text-black flex flex-col md:gap-3 place-items-center md:flex-row`
            }
          }}
          >
            <items.Icon />
            <span className="  ">{items.label}</span>

          </NavLink>
        </div>
      ))}
    </div>

    <div className="hidden md:block"><h1>logout</h1></div>


    </div>
  );
}
