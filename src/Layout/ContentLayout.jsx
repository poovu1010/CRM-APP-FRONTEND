import React from "react";
import Navbar from "../components/Navbar";
import BottomBar from "../components/Bottombar";
import { Outlet } from "react-router-dom";
import Addbutton from "../components/Addbutton";
import DashboardGrid from "../pages/DashBoard";

export default function ContentLayout() {
  return (
    <>
      <div className="relative min-w-screen  min-h-screen">
        <Navbar />

        <main className="pb-20 md:ml-50">
          <DashboardGrid/>
          <Outlet />
          <Addbutton />
        </main>
        <div>
          <BottomBar />
        </div>
      </div>
    </>
  );
}
