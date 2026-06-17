import React from "react";
import { Outlet } from "react-router-dom";
import BottomBar from "../components/Bottombar";
import SearchCustomer from "../components/SearchCustomer";

export default function CustomerDetailLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
       
        {/* <SearchCustomer /> */}

        {/* Main content */}
        <div className="flex-1 min-w-0 pb-20 md:pb-0">
          <Outlet />
        </div>
      </div>

      {/* Mobile bottom bar only */}
      <div className="">
        <BottomBar />
      </div>
    </div>
  );
}