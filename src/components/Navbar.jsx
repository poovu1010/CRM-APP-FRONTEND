import {
  Bell,
  Menu,
  SearchIcon,
  User,
  X,
  Home,
  Settings,
  HelpCircle,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const Navigate = useNavigate()
  function goToProfile(){
    Navigate("/Dashboard/me")
  }

  return (
    <>
      <nav className=" md:ml-50 sticky top-0 z-50  flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
    
       <button className="p-1.5 bg-gray-100 rounded-full" onClick={goToProfile}>
            <User className="w-6 h-6 text-gray-600" />
          </button>

        {/* Searchbar */}
        <div className="flex flex-1 items-center bg-gray-100 rounded-full mx-3 px-3 py-1.5">
          <SearchIcon className="w-4 h-4 text-gray-500 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full  bg-transparent border-none outline-none text-sm ml-2 text-gray-800"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button className="relative p-1.5 text-gray-600">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
        </div>
      </nav>

    
    </>
  );
}
