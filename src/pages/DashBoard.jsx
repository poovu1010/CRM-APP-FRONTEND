import React, { useEffect, useState } from "react";
import { ArrowBigDown, ArrowBigDownDash, ArrowBigUp, ArrowDownNarrowWide, BadgeCheck, CheckCircle, Edit3, Hourglass, IndianRupee, RefreshCw, Scissors, Search, ShoppingBag, TimerIcon, Truck } from 'lucide-react'

import { h1 } from "framer-motion/client";
import api from "../api/axios";
import Skeleton from "react-loading-skeleton";




const DashboardGrid = () => {

  const [DashboardData, setDashboardData] = useState({
    totalOrders: null,
    Queue: null,
    Processing: null,
    Stitching: null,
    Ready: null,
    Delivered: null,

  });

  const [loading,setLoading] = useState(false)


  async function fetchAllOrders() {

    try {
      setLoading(true)
      const response = await api.get("/Owner/get-all-order");

      console.log(response.data);

      const stats = response.data.stats;



      setDashboardData({

        totalOrders: stats[0]?.TotalOrders || 0,
        Queue: stats[0]?.TotalQueue || 0,
        Processing: stats[0]?.TotalProcessing || 0,
        Stitching: stats[0]?.TotalStitching || 0,
        Ready: stats[0]?.TotalReady || 0,
        Delivered: stats[0]?.TotalDelivery || 0,
      });
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllOrders();
    console.log(DashboardData)
  }, []);





  const OrdersDashBoard = [
    {
      logo: <ShoppingBag size={30} className=' shrink-0 bg-violet-100 w-full h-full text-violet-400 p-2 rounded-xl' />,
      text: "Total Orders",
      result: DashboardData.totalOrders

    },
    {
      logo: <TimerIcon size={30} className=' bg-yellow-100 w-full h-full text-yellow-600 p-2 rounded-xl' />,
      text: "Queue",
      result: DashboardData.Queue

    },
    {
      logo: <TimerIcon size={30} className=' bg-blue-100 w-full h-full text-blue-700 p-2 rounded-xl' />,
      text: "Processing",
      result: DashboardData.Processing
    },
    {
      logo: <Scissors size={30} className=' bg-violet-100 w-full h-full text-violet-400 p-2 rounded-xl' />,
      text: "Stitching",
      result: DashboardData.Stitching
    },
    {
      logo: <CheckCircle size={30} className=' bg-green-100 w-full h-full text-green-800 p-2 rounded-xl' />,
      text: "Ready",
      result: DashboardData.Ready
    },
    {
      logo: <Truck size={30} className=' bg-green-100 w-full h-full text-green-900 p-2 rounded-xl' />,
      text: "Delivered",
      result: DashboardData.Delivered
    }

  ]

  if(loading){
    return (
      <section className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {OrdersDashBoard.map((value, index) => (
          <div

            className="rounded-xl px-4 py-4 flex items-center gap-3 min-w-0 shadow-sm"
          >
            <Skeleton borderRadius={16} baseColor="#e5e7eb"
              highlightColor="#f3f4f6" />
            <div className="h-10 w-10 md:h-12 md:w-12 shrink-0 flex items-center justify-center rounded-xl bg-violet-100 text-violet-500">

    
              <Skeleton borderRadius={16} baseColor="#e5e7eb"
                highlightColor="#f3f4f6" />
            </div>

            <div className="min-w-0">
              <p className="font-bold text-lg"><Skeleton /></p>
              <p className="text-xs md:text-sm text-gray-500 truncate">
                <Skeleton borderRadius={16} baseColor="#e5e7eb"
                  highlightColor="#f3f4f6" />
              </p>
            </div>
          </div>
        ))}




      </section>


    )
  }



  return (

    <>

      <section className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {OrdersDashBoard.map((value, index) => (
          <div
            key={index}
            className="bg-white rounded-xl px-4 py-4 flex items-center gap-3 min-w-0 shadow-sm"
          >
            <div className="h-10 w-10 md:h-12 md:w-12 shrink-0 flex items-center justify-center rounded-xl bg-violet-100 text-violet-500">
              {value.logo}
            </div>

            <div className="min-w-0">
              <p className="font-bold text-lg">{value?.result}</p>
              <p className="text-xs md:text-sm text-gray-500 truncate">
                {value.text}
              </p>
            </div>
          </div>
        ))}
      </section>
      
    </>

  );
};

export default DashboardGrid;
