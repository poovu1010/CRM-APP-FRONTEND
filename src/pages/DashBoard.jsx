import React from "react";
import {
  ShoppingBag,
  Clock,
  Package,
  IndianRupee,
  ArrowUp,
} from "lucide-react";

const dashboardData = [
  {
    id: 1,
    type: "delivery",
    title: "Today Delivery",
    value: "12",
    trendValue: "+20%",
    trendText: "from yesterday",
    statusMessage: null,
    statusColor: null,
  },
  {
    id: 2,
    type: "late",
    title: "Late Orders",
    value: "5",
    trendValue: null,
    trendText: null,
    statusMessage: "Need attention",
    statusColor: "text-red-500",
  },
  {
    id: 3,
    type: "pending",
    title: "Pending Orders",
    value: "18",
    trendValue: null,
    trendText: null,
    statusMessage: "Total pending",
    statusColor: "text-gray-500",
  },
  {
    id: 4,
    type: "revenue",
    title: "Total Revenue",
    value: "₹25,000",
    trendValue: "+15%",
    trendText: "from last month",
    statusMessage: null,
    statusColor: null,
  },
];

const iconConfig = {
  delivery: {
    icon: ShoppingBag,
    bgColor: "bg-indigo-100",
    color: "text-indigo-600",
  },

  late: {
    icon: Clock,
    bgColor: "bg-red-100",
    color: "text-red-500",
  },

  pending: {
    icon: Package,
    bgColor: "bg-blue-100",
    color: "text-blue-500",
  },

  revenue: {
    icon: IndianRupee,
    bgColor: "bg-green-100",
    color: "text-green-600",
  },
};

const DashboardGrid = () => {
  return (
    <div className="p-4  -">
      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardData.map((item) => {
          const config = iconConfig[item.type];
          const Icon = config.icon;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl flex  justify-between px-5 pb-2 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              {/* Top */}
              <div className="flex place-items-center  justify-between">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${config.bgColor}`}
                >
                  <Icon className={`w-7 h-7 ${config.color}`} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5 flex gap-2 h-full w-2/3 flex-col">
                <h3 className="text-gray-500 text-sm font-medium">
                  {item.title}
                </h3>

                <h1 className="text-sm font-bold  text-gray-900">
                  {item.value}
                </h1>

                {/* Trend */}
                {item.trendValue && (
                  <div className="flex items-center gap-1 ">
                    <ArrowUp className="w-4 h-4 text-green-500" />

                    <span className="text-green-500 text-sm font-semibold">
                      {item.trendValue}
                    </span>

                    <span className="text-gray-400 text-sm">
                      {item.trendText}
                    </span>
                  </div>
                )}

                {/* Status */}
                {item.statusMessage && (
                  <p className={` text-sm font-medium ${item.statusColor}`}>
                    {item.statusMessage}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardGrid;
