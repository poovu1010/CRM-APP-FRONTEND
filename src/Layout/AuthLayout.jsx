import React from "react";
import { Outlet } from "react-router-dom";
import bgimgDesktop from "../assets/bgimg.png";
import bgimgMobile from "../assets/bgimgmobile.png";

export default function AuthLayout() {
  return (
    <div className="h-screen w-screen relative">
      <div className="absolute inset-0 z-0">
        <img
          src={bgimgDesktop}
          alt="img"
          className="object-cover w-full h-full hidden md:block"
        />
        <img
          src={bgimgMobile}
          alt="img"
          className="object-cover w-full h-full md:hidden"
        />
      </div>
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
