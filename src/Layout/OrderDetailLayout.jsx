import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BottomBar from "../components/Bottombar";
import { ArrowLeft } from "lucide-react";

export default function OrderDetailLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 md:pl-52">
      <header className="sticky top-0 z-30 h-14 bg-white border-b border-gray-200 flex items-center px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/Orders/all-orders")}>
            <ArrowLeft size={22} />
          </button>
          <p className="font-bold text-lg">Order Details</p>
        </div>
      </header>

      <main className="px-3 py-4 pb-28 md:px-6 md:pb-8">
        <Outlet />
      </main>

      <BottomBar />
    </div>
  );
}