import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import AuthDetails from '../context/AuthContext'
import { div, h1 } from 'framer-motion/client'
import { AlertCircle, Calendar, CalendarArrowDown, Clock, IndianRupee, Wallet } from 'lucide-react'

export default function DashBoardData() {

  const { Orders, getAllorders, refreshData } = useContext(AuthDetails)
  const [TodayDelivety, setTodayDelivery] = useState(null)
  const [LateOrders, SetLateOrders] = useState(null)
  const [RecentOrderData, SetRecentOrderData] = useState(null)
  const [DueOrdes, SetDueOrdes] = useState(null)
  const [OverAllRevenue, setOverAllRevenue] = useState(null)



  const TodayDate = new Date()

  useEffect(() => {
    refreshData()
  }, [])

  // Today Deliver

  function todayDelvery() {

    TodayDate.setHours(0, 0, 0, 0)
    console.log(TodayDate)

    const Datas = Orders?.data?.filter(value => {
      const OrderDeliveryDate = new Date(value?.expectedDeliveryDate)
      OrderDeliveryDate.setHours(0, 0, 0, 0)

      return TodayDate.getTime() == OrderDeliveryDate.getTime()
    })
    console.log(Datas)
    setTodayDelivery(Datas)
  }


  // LateOrders

  function LateDelivery() {

    TodayDate.setHours(0, 0, 0, 0)


    const Datas = Orders?.data?.filter(value => {
      const OrderDeliveryDate = new Date(value?.expectedDeliveryDate)
      OrderDeliveryDate.setHours(0, 0, 0, 0)
      console.log(OrderDeliveryDate)
      return TodayDate.getTime() > OrderDeliveryDate.getTime()
    })
    SetLateOrders(Datas)

  }

  // Revenue
  function SumAllRevenue() {
    const filterDelivered = Orders?.data?.filter(value => {
      return value?.status === "Delivered"
    }) || []
    console.log(filterDelivered)

    const totalRevenue = filterDelivered.reduce((Zero, value) => (Zero + value?.price || 0), 0)
    setOverAllRevenue(totalRevenue)
  }



  // RecentOrders
  function RecentOrders() {

    const LastTherrdays = new Date()
    LastTherrdays.setHours(0, 0, 0, 0)
    LastTherrdays.setDate(LastTherrdays.getDate() - 2)
    console.log(Orders?.data)

    const FilterRecentData = Orders?.data?.filter(value => {
      const OrderDeliveryDate = new Date(value?.createdAt)
      OrderDeliveryDate.setHours(0, 0, 0, 0)
      return TodayDate.getTime() >= OrderDeliveryDate.getTime() && OrderDeliveryDate.getTime() >= LastTherrdays.getTime()
    })

    SetRecentOrderData(FilterRecentData)
  }

  function DueOrders() {

    const DueDatas = Orders?.data?.filter(value => {
      return (
        value?.paymentStatus == "due" && value?.status == "Delivered"

      )
    })
    SetDueOrdes(DueDatas)

  }

  useEffect(() => {
    SumAllRevenue()

    DueOrders()
    todayDelvery()
    LateDelivery()
    RecentOrders()


  }, [Orders])


  function Button() {
    return (
      <>
        <button className='min-w-0 bg-violet-200 h-10 w-25 rounded-xl  text-violet-600'>
          <p className='truncate'>View All</p>
        </button>
      </>
    )
  }


  const formatDate = (date) => {
  if (!date) return "No date";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
};

const formatPrice = (price) => {
  return Number(price || 0).toLocaleString("en-IN");
};

const getCustomerName = (value) => {
  return value?.CustomerDetail?.customer_name || "Unknown Customer";
};

  return (
    <div className="grid max-w-full  grid-cols-1 lg:grid-cols-2 gap-5">
  {/* Today Delivery */}
  <section className="min-h-80 rounded-2xl flex flex-col bg-white border border-gray-200 shadow-sm w-full overflow-hidden">
    <div className="bg-gray-50 border-b px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3 items-center min-w-0">
          <div className="bg-green-100 h-11 w-11 flex items-center justify-center rounded-xl shrink-0">
            <CalendarArrowDown size={23} className="text-green-700" />
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-sm truncate">Today Delivery</h3>
            <p className="text-xs text-gray-500 truncate">
              Orders to deliver today
            </p>
          </div>
        </div>

        <Button />
      </div>
    </div>

    <div className="flex-1 flex flex-col">
      {TodayDelivety?.length === 0 && (
        <div className="flex flex-1 items-center justify-center min-h-40 px-4">
          <p className="font-semibold text-sm text-gray-400">
            No today delivery orders
          </p>
        </div>
      )}

      {TodayDelivety?.map((value) => (
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 border-b border-gray-100 last:border-b-0"
          key={value?._id}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-11 w-11 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-green-700 font-bold">
                {getCustomerName(value).charAt(0)}
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <p className="font-bold text-sm truncate">
                {getCustomerName(value)}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {value?.clothType}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={17} />
              <p className="text-xs">
                {formatDate(value?.expectedDeliveryDate)}
              </p>
            </div>

            <p className="text-green-600 font-bold text-sm whitespace-nowrap">
              ₹ {formatPrice(value?.price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Late Orders */}
  <section className="min-h-80 rounded-2xl flex flex-col bg-white border border-gray-200 shadow-sm w-full overflow-hidden">
    <div className="bg-gray-50 border-b px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3 items-center min-w-0">
          <div className="bg-red-100 h-11 w-11 flex items-center justify-center rounded-xl shrink-0">
            <AlertCircle size={23} className="text-red-700" />
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-sm truncate">Late Orders</h3>
            <p className="text-xs text-gray-500 truncate">
              Delivery date crossed
            </p>
          </div>
        </div>

        <Button />
      </div>
    </div>

    <div className="flex-1 flex flex-col">
      {LateOrders?.length === 0 && (
        <div className="flex flex-1 items-center justify-center min-h-40 px-4">
          <p className="font-semibold text-sm text-gray-400">
            No late orders
          </p>
        </div>
      )}

      {LateOrders?.slice(0,5).map((value) => (
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 border-b border-gray-100 last:border-b-0"
          key={value?._id}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-11 w-11 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-red-700 font-bold">
                {getCustomerName(value).charAt(0)}
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <p className="font-bold text-sm truncate">
                {getCustomerName(value)}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {value?.clothType}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={17} />
              <p className="text-xs">
                {formatDate(value?.expectedDeliveryDate)}
              </p>
            </div>

            <p className="text-red-600 font-bold text-sm whitespace-nowrap">
              ₹ {formatPrice(value?.price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Recent Orders */}
  <section className="min-h-80 rounded-2xl flex flex-col bg-white border border-gray-200 shadow-sm w-full overflow-hidden">
    <div className="bg-gray-50 border-b px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3 items-center min-w-0">
          <div className="bg-blue-100 h-11 w-11 flex items-center justify-center rounded-xl shrink-0">
            <Clock size={23} className="text-blue-700" />
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-sm truncate">Recent Orders</h3>
            <p className="text-xs text-gray-500 truncate">
              Latest created orders
            </p>
          </div>
        </div>

        <Button />
      </div>
    </div>

    <div className="flex-1 flex flex-col">
      {RecentOrderData?.length === 0 && (
        <div className="flex flex-1 items-center justify-center min-h-40 px-4">
          <p className="font-semibold text-sm text-gray-400">
            No recent orders
          </p>
        </div>
      )}

      {RecentOrderData?.map((value) => (
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 border-b border-gray-100 last:border-b-0"
          key={value?._id}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-11 w-11 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-blue-700 font-bold">
                {getCustomerName(value).charAt(0)}
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <p className="font-bold text-sm truncate">
                {getCustomerName(value)}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {value?.clothType}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={17} />
              <p className="text-xs">{formatDate(value?.createdAt)}</p>
            </div>

            <p className="text-gray-900 font-bold text-sm whitespace-nowrap">
              ₹ {formatPrice(value?.price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Due Orders */}
  <section className="min-h-80 rounded-2xl flex flex-col bg-white border border-gray-200 shadow-sm w-full overflow-hidden">
    <div className="bg-gray-50 border-b px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3 items-center min-w-0">
          <div className="bg-yellow-100 h-11 w-11 flex items-center justify-center rounded-xl shrink-0">
            <Wallet size={23} className="text-yellow-700" />
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-sm truncate">Due Payments</h3>
            <p className="text-xs text-gray-500 truncate">
              Pending balance payments
            </p>
          </div>
        </div>

        <Button />
      </div>
    </div>

    <div className="flex-1 flex flex-col">
      {DueOrdes?.length === 0 && (
        <div className="flex flex-1 items-center justify-center min-h-40 px-4">
          <p className="font-semibold text-sm text-gray-400">
            No due payment orders
          </p>
        </div>
      )}

      {DueOrdes?.map((value) => (
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 border-b border-gray-100 last:border-b-0"
          key={value?._id}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-11 w-11 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-yellow-700 font-bold">
                {getCustomerName(value).charAt(0)}
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <p className="font-bold text-sm truncate">
                {getCustomerName(value)}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {value?.clothType}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-red-600 font-bold text-sm whitespace-nowrap">
              Due: ₹ {formatPrice(value?.balanceAmount)}
            </p>
            <p className="text-xs text-gray-500">
              Total: ₹ {formatPrice(value?.price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Overall Revenue */}
  <section className="lg:col-span-2 rounded-2xl bg-white border border-gray-200 shadow-sm w-full overflow-hidden">
    <div className="flex items-center justify-between gap-4 px-5 py-6">
      <div className="flex items-center gap-4 min-w-0">
        <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
          <IndianRupee size={24} className="text-purple-700" />
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-sm truncate">Overall Revenue</h3>
          <p className="text-xs text-gray-500 truncate">
            From delivered orders
          </p>
        </div>
      </div>

      <p className="text-xl md:text-2xl font-extrabold text-purple-700 whitespace-nowrap">
        ₹ {OverAllRevenue}
      </p>
    </div>
  </section>
</div>
  )
}
