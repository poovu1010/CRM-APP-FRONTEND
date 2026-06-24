import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Shirt,
  Scissors,
  ClipboardList,
  CalendarCheck,
  IndianRupee,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-50 via-white to-green-50 overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full px-4 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg">
            <Scissors className="text-white" size={23} />
          </div>

          <div>
            <h1 className="font-extrabold text-lg text-gray-900">
              Stitch Flow
            </h1>
            <p className="text-xs text-gray-500">Tailor shop management</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/Auth/login")}
          className="hidden sm:block px-5 py-2 rounded-xl bg-white border border-gray-200 shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <main className="px-4 md:px-10 py-8 md:py-14">
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-violet-100 text-violet-700 text-xs font-bold mb-5">
              <Shirt size={16} />
              Smart Tailor ERP
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-950 leading-tight">
              Manage your tailor shop orders easily
            </h1>

            <p className="mt-5 text-gray-600 text-base md:text-lg leading-8 max-w-xl">
              Stitch Flow helps you manage customers, measurements, orders,
              delivery dates, payments, and daily work in one clean dashboard.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/Auth")}
                className="h-12 px-6 rounded-2xl bg-violet-600 text-white font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-violet-700"
              >
                New User
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate("/Auth/login")}
                className="h-12 px-6 rounded-2xl bg-white text-gray-800 font-bold border border-gray-200 shadow-sm hover:bg-gray-50"
              >
                Already have account
              </button>
              <button
                onClick={() => navigate("/Order-status/Login")}
                className="h-12 px-6 rounded-2xl bg-gray-400 text-gray-800 font-bold border border-gray-200 shadow-sm hover:bg-gray-800 hover:text-white hover:transition-all hover:duration-300"
              >
                Check Order Status
              </button>
            </div>

            {/* Points */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Customer details",
                "Order tracking",
                "Delivery reminder",
                "Payment due tracking",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-600" />
                  <p className="text-sm font-semibold text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Dashboard Preview */}
          <div className="w-full min-w-0">
            <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-4 md:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-extrabold text-gray-900">
                    Today Overview
                  </h2>
                  <p className="text-xs text-gray-500">
                    Live shop performance
                  </p>
                </div>

                <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <CalendarCheck className="text-green-700" size={22} />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <InfoCard
                  icon={<ClipboardList size={20} />}
                  title="Orders"
                  value="24"
                  color="violet"
                />
                <InfoCard
                  icon={<CalendarCheck size={20} />}
                  title="Today Delivery"
                  value="08"
                  color="green"
                />
                <InfoCard
                  icon={<IndianRupee size={20} />}
                  title="Revenue"
                  value="₹12.5K"
                  color="blue"
                />
                <InfoCard
                  icon={<Scissors size={20} />}
                  title="Stitching"
                  value="11"
                  color="yellow"
                />
              </div>

              {/* Order Cards */}
              <div className="mt-5 space-y-3">
                <OrderPreview
                  name="Ravi Kumar"
                  type="Shirt"
                  date="Today"
                  status="Ready"
                />
                <OrderPreview
                  name="Meena"
                  type="Blouse"
                  date="Tomorrow"
                  status="Stitching"
                />
                <OrderPreview
                  name="Arun"
                  type="Pant"
                  date="18 Jun"
                  status="Queue"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function InfoCard({ icon, title, value, color }) {
  const colors = {
    violet: "bg-violet-100 text-violet-700",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 min-w-0">
      <div
        className={`h-10 w-10 rounded-xl flex items-center justify-center ${colors[color]}`}
      >
        {icon}
      </div>

      <p className="text-xs text-gray-500 mt-3">{title}</p>
      <h3 className="text-xl font-extrabold text-gray-900">{value}</h3>
    </div>
  );
}

function OrderPreview({ name, type, date, status }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 border border-gray-100 p-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-11 w-11 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
          <span className="font-bold text-violet-700">{name.charAt(0)}</span>
        </div>

        <div className="min-w-0">
          <h4 className="font-bold text-sm text-gray-900 truncate">{name}</h4>
          <p className="text-xs text-gray-500 truncate">
            {type} • {date}
          </p>
        </div>
      </div>

      <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 shrink-0">
        {status}
      </span>
    </div>
  );
}