import { div, g, h1 } from 'framer-motion/client'
import { ArrowBigDown, ArrowBigDownDash, ArrowBigUp, ArrowDownNarrowWide, BadgeCheck, CheckCircle, Edit3, Hourglass, IndianRupee, RefreshCw, Scissors, Search, ShoppingBag, TimerIcon, Truck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { data, useNavigate } from 'react-router-dom'
import { all } from 'axios'
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'

export default function OrdersPage() {


  const navigate = useNavigate()


  const [AllOrder, setAllOrder] = useState(null)
  const [ShowAllOrder,setShowAllOrder] =useState(null)

  const [allStatusOpen, setAllStatusOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [status, setStatus] = useState("All Status")
  const [FilterStatus, setFilterStatus] = useState("Newest First")


  const [editOpen, setEditOpen] = useState(null)

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [receivedAmount, setReceivedAmount] = useState("");


  const totalAmount = Number(selectedOrder?.price || 0);
  const advancePaid = Number(selectedOrder?.advancePaid || 0);
  const received = Number(receivedAmount || 0);

  const balanceAmount = totalAmount - (advancePaid + received);
  const paymentStatus = balanceAmount <= 0 ? "paid" : "due";

  const [loading,setLoading] = useState(false)

const [input,setInput] =useState("")





  async function fetchAllOrders() {
    try {
    setLoading(true)  
    const fetchData = await api.get("/Owner/get-all-order")
    setAllOrder(fetchData.data.data)
    setShowAllOrder(fetchData.data.data)
      
    } catch (error) {
      console.log(error)
      
    }finally{
      setLoading(false)
    }
    
  }
  useEffect(() => {
    if (AllOrder == null) {
      fetchAllOrders()
    }

  },[])

  function EditBtnFun(id) {
    if (editOpen !== null) {
      return setEditOpen(null)
    }
    setEditOpen(id)
  }

  async function updateOrderStatus(id, status) {
    try {
      const ok = window.confirm(
      "Are you sure you want to change the status?"
    );

    if (!ok) return;
    setLoading(true)
    const updateApi = await api.patch(`/Owner/update-status/${id}`, { Status: status })
    
    fetchAllOrders();
    toast.success(updateApi.data.message)
      
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
    
  }

  async function confirmDelivery() {
    try {
      setLoading(true)
      const updateApi = await api.patch(
        `/Owner/update-status/${selectedOrder._id}`,
        {
          Status: "Delivered",
          receivedAmount: Number(receivedAmount),
        },
        {
          withCredentials: true,
        }
      );

      toast.success(updateApi.data.message);

      
      setShowPaymentPopup(false);

      
      setSelectedOrder(null);
      setReceivedAmount("");

      // refresh orders
      fetchAllOrders();

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update delivery"
      );
    }finally{
      setLoading(false)
    }
  }


  function getDeliveryStatus(deliveryDate) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const delivery = new Date(deliveryDate);
    delivery.setHours(0, 0, 0, 0);

    const diff =
      (delivery - today) / (1000 * 60 * 60 * 24);

    if (diff === 0) {
      return {
        text: "Today",
        color: "bg-orange-100 text-orange-600",
      };
    }

    if (diff === 1) {
      return {
        text: "Tomorrow",
        color: "bg-blue-100 text-blue-600",
      };
    }

    if (diff < 0) {
      return {
        text: `Late by ${Math.abs(diff)} day(s)`,
        color: "bg-red-100 text-red-600",
      };
    }

    return {
      text: `${diff} days left`,
      color: "bg-green-100 text-green-600",
    };
  }


  function RouteA_Order(name,id){
    navigate(`/Orders/all-orders/${name}/${id}`)
  }


  if (loading) {
  return (
    <div className="space-y-3 ">
       <Skeleton height={60} borderRadius={16}  baseColor="#e5e7eb"
  highlightColor="#f3f4f6"/>

      <Skeleton height={180} borderRadius={16}   baseColor="#e5e7eb"
  highlightColor="#f3f4f6"/>

      <Skeleton height={200} borderRadius={16}  baseColor="#e5e7eb"
  highlightColor="#f3f4f6" />

      <Skeleton height={150} borderRadius={16}  baseColor="#e5e7eb"
  highlightColor="#f3f4f6"/>

      <Skeleton height={100} borderRadius={16}  baseColor="#e5e7eb"
  highlightColor="#f3f4f6"/>
    </div>
  );
}

// filtering process

function filterOrders(e){
    const getUserInput = e.target.value
    setInput(getUserInput)
    const filterdElements = ShowAllOrder?.filter((value)=>{
      return(
        value?.CustomerDetail?.customer_name?.toLowerCase().includes(getUserInput) ||
        value?.CustomerDetail?.Phone?.toLowerCase().includes(getUserInput)
      )
      
    })
   
    setShowAllOrder(filterdElements)
}

function FilterviaList(filterType){
  if (filterType == "All Status") {
   return setShowAllOrder(AllOrder)
  }
    const filterData = AllOrder?.filter((value)=>{
      return(
        value?.status.includes(filterType)
      )
      
    })
    setShowAllOrder(filterData)
}




  return (
    <>

      {/* searchbox filterbtn */}
      <section className='flex  md:flex-row md:items-center gap-4'>
        {/* searh bar */}
        <div className='relative min-w-0 md:flex-7'>
          <input
          onChange={filterOrders}
          value={input}
           type="text" placeholder='Search by name or Phone' className='border pl-13 w-full h-10 md:h-13 border-gray-400 rounded-sm bg-white shadow-sm outline-none focus:border-violet-400' />
          <Search className='absolute left-3 top-2/9  text-gray-400' />
        </div>
        <div className='flex gap-4 flex-1 md:flex-2'>
          <div onClick={() => {
            if (allStatusOpen) {
              return setAllStatusOpen(false)
            }
            setAllStatusOpen(true)
          }
          }
            className='h-10 border md:h-13 relative px-2 min-w-0 flex items-center justify-around  z-20 bg-white flex-1 shadow-sm rounded-xl '>
            <p className='truncate'>{status}</p>
            {
              allStatusOpen ? <ArrowBigUp /> : <ArrowBigDownDash />
            }

            {/* dropDown */}

            {allStatusOpen && (
              <div className='flex flex-col absolute top-13 bg-gray-200 w-full mt-3 rounded-2xl border'>
                <button onClick={()=>FilterviaList("All Status")} className='w-full hover:bg-gray-100 bg-white h-10 text-sm rounded-2xl '> All Status </button>
                <button onClick={()=>FilterviaList("Processing")} className='w-full hover:bg-gray-100 bg-white h-10 text-sm '> Processing</button>
                <button onClick={()=>FilterviaList("Stitching")} className='w-full hover:bg-gray-100 bg-white h-10 text-sm '>Stitching</button>
                <button onClick={()=>FilterviaList("Ready")} className='w-full hover:bg-gray-100 bg-white h-10 text-sm '>Ready</button>
                <button onClick={()=>FilterviaList("Queue")} className='w-full hover:bg-gray-100 bg-white h-10 text-sm '>Queue</button>
                <button onClick={()=>FilterviaList("Delivered")} className='w-full hover:bg-gray-100 bg-white h-10 text-sm rounded-2xl  '> Delivered</button>
              </div>
            )}


          </div>
        
        </div>
        {/* filterbtn */}
        
      </section>

      {/* orders Detail */}

      <section className="flex flex-col gap-3">
        {ShowAllOrder?.map((value) => {
           const deliveryInfo = getDeliveryStatus(value.expectedDeliveryDate);

           return(
            <div
            onClick={()=>RouteA_Order(value?.CustomerDetail?.customer_name,value?._id)}
            key={value?._id}
            className="
        bg-white shadow-sm rounded-xl
        p-4
        border border-gray-300
        flex flex-col gap-4
        md:grid md:grid-cols-[2fr_1.5fr_1fr]
        lg:grid-cols-[2fr_1.5fr_1fr_40px]
        md:items-center
      "
          >
           
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-12 flex justify-center items-center text-white text-2xl font-bold it w-12 shrink-0 bg-black rounded-full">{value?.CustomerDetail?.customer_name.substring(0,1)}</div>

              <div className="min-w-0">
                <p className="font-bold truncate">
                  {value?.CustomerDetail?.customer_name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {value?.CustomerDetail?.Phone}
                </p>
              </div>
            </div>

            
            <div className="flex items-center justify-between gap-3 md:flex-col md:items-start">
              <div
                className={`px-3 py-1 rounded-xl text-xs font-medium ${deliveryInfo.color}`}
              >
                {deliveryInfo.text}
              </div>

              {value.status === "Queue" && (
                <div className='flex gap-2.5'>
                  <div className="bg-orange-100 text-orange-600 h-8 px-3 flex gap-1 items-center rounded-xl text-sm w-fit">
                    <Hourglass size={16} />
                    <p>{value.status}</p>
                  </div>


                  <div

                    onClick={(e) =>{
                      e.stopPropagation()
                       return EditBtnFun(value._id)
                    }}
                    className="relative p-2 rounded-lg hover:bg-gray-100">
                    <Edit3 size={18} />


                    {editOpen == value._id && (
                      <div className="absolute right-0 top-10 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

                        <button
                          onClick={() => updateOrderStatus(value._id, "Queue")}
                          className="w-full px-4 py-3 text-left hover:bg-orange-50 border-b flex items-center gap-3">
                          <Hourglass size={16} className="text-orange-500" />
                          <span>Queue</span>
                        </button>

                        <button
                          onClick={() => updateOrderStatus(value._id, "Processing")}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b flex items-center gap-3">
                          <RefreshCw size={16} className="text-blue-500" />
                          <span>Processing</span>
                        </button>

                        <button
                          onClick={() => updateOrderStatus(value._id, "Stitching")}
                          className="w-full px-4 py-3 text-left hover:bg-violet-50 border-b flex items-center gap-3">
                          <Scissors size={16} className="text-violet-500" />
                          <span>Stitching</span>
                        </button>
{/* 
                        <button
                          onClick={() => updateOrderStatus(value._id, "Ready")}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 border-b flex items-center gap-3">
                          <BadgeCheck size={16} className="text-green-500" />
                          <span>Ready</span>
                        </button> */}


                        <button
                          onClick={() => {
                            setSelectedOrder(value);   // full order object
                            setReceivedAmount("");
                            setShowPaymentPopup(true);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 flex items-center gap-3">
                          <Truck size={16} className="text-green-600" />
                          <span>Delivered</span>
                        </button>

                      </div>

                    )}


                  </div>
                </div>

              )}

              {value.status === "Stitching" && (
                <div className='flex gap-2.5'>
                  <div className="bg-violet-100 text-violet-600 h-8 px-3 flex gap-1 items-center rounded-xl text-sm w-fit">
                    <Scissors size={16} />
                    <p>{value.status}</p>
                  </div>
                  <div

                     onClick={(e) =>{
                      e.stopPropagation()
                       return EditBtnFun(value._id)
                    }}
                    className="relative p-2 rounded-lg hover:bg-gray-100">
                    <Edit3 size={18} />


                    {editOpen == value._id && (
                      <div className="absolute right-0 top-10 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

                        <button
                          onClick={() => updateOrderStatus(value._id, "Queue")}
                          className="w-full px-4 py-3 text-left hover:bg-orange-50 border-b flex items-center gap-3">
                          <Hourglass size={16} className="text-orange-500" />
                          <span>Queue</span>
                        </button>

                        <button
                          onClick={() => updateOrderStatus(value._id, "Processing")}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b flex items-center gap-3">
                          <RefreshCw size={16} className="text-blue-500" />
                          <span>Processing</span>
                        </button>

                        <button
                          onClick={() => updateOrderStatus(value._id, "Stitching")}
                          className="w-full px-4 py-3 text-left hover:bg-violet-50 border-b flex items-center gap-3">
                          <Scissors size={16} className="text-violet-500" />
                          <span>Stitching</span>
                        </button>

                        <button
                          onClick={() => updateOrderStatus(value._id, "Ready")}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 border-b flex items-center gap-3">
                          <BadgeCheck size={16} className="text-green-500" />
                          <span>Ready</span>
                        </button>

                        <button
                          onClick={() => updateOrderStatus(value._id, "Delivered")}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 flex items-center gap-3">
                          <Truck size={16} className="text-green-600" />
                          <span>Delivered</span>
                        </button>

                      </div>

                    )}


                  </div>
                </div>
              )}

              {value.status === "Ready" && (
                <div className='flex gap-2.5'>
                  <div className="bg-green-100 text-green-600 h-8 px-3 flex gap-1 items-center rounded-xl text-sm w-fit">
                    <BadgeCheck size={16} />
                    <p>{value.status}</p>
                  </div>
                  <div

                     onClick={(e) =>{
                      e.stopPropagation()
                       return EditBtnFun(value._id)
                    }}
                    className="relative p-2 rounded-lg hover:bg-gray-100">
                    <Edit3 size={18} />


                    {editOpen == value._id && (
                      <div className="absolute right-0 top-10 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

                       

                        <button
                          onClick={() => updateOrderStatus(value._id, "Processing")}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b flex items-center gap-3">
                          <RefreshCw size={16} className="text-blue-500" />
                          <span>Processing</span>
                        </button>

                        <button
                          onClick={() => updateOrderStatus(value._id, "Stitching")}
                          className="w-full px-4 py-3 text-left hover:bg-violet-50 border-b flex items-center gap-3">
                          <Scissors size={16} className="text-violet-500" />
                          <span>Stitching</span>
                        </button>

                        <button
                          onClick={() => updateOrderStatus(value._id, "Ready")}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 border-b flex items-center gap-3">
                          <BadgeCheck size={16} className="text-green-500" />
                          <span>Ready</span>
                        </button>

                       

                        <button
                          onClick={() => {
                            setSelectedOrder(value);   // full order object
                            setReceivedAmount("");
                            setShowPaymentPopup(true);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 flex items-center gap-3">
                          <Truck size={16} className="text-green-600" />
                          <span>Delivered</span>
                        </button>

                      </div>

                    )}


                  </div>
                </div>

              )}

              {value.status === "Processing" && (
                <div className='flex gap-2.5'>
                  <div className="bg-green-100 text-green-600 h-8 px-3 flex gap-1 items-center rounded-xl text-sm w-fit">
                    <BadgeCheck size={16} />
                    <p>{value.status}</p>
                  </div>
                  <div

                     onClick={(e) =>{
                      e.stopPropagation()
                       return EditBtnFun(value._id)
                    }}
                    className="relative p-2 rounded-lg hover:bg-gray-100">
                    <Edit3 size={18} />


                    {editOpen == value._id && (
                      <div className="absolute right-0 top-10 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

                       

                        

                        <button
                          onClick={() => updateOrderStatus(value._id, "Stitching")}
                          className="w-full px-4 py-3 text-left hover:bg-violet-50 border-b flex items-center gap-3">
                          <Scissors size={16} className="text-violet-500" />
                          <span>Stitching</span>
                        </button>

                        <button
                          onClick={() => updateOrderStatus(value._id, "Ready")}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 border-b flex items-center gap-3">
                          <BadgeCheck size={16} className="text-green-500" />
                          <span>Ready</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedOrder(value);   // full order object
                            setReceivedAmount("");
                            setShowPaymentPopup(true);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 flex items-center gap-3">
                          <Truck size={16} className="text-green-600" />
                          <span>Delivered</span>
                        </button>

                      </div>

                    )}


                  </div>
                </div>

              )}

              {value.status === "Delivered" && (
                <div className='flex gap-2.5'>
                  <div className="bg-green-100 text-green-600 h-8 px-3 flex gap-1 items-center rounded-xl text-sm w-fit">
                    <Truck size={16} />
                    <p>{value.status}</p>
                  </div>
                  <div

                     onClick={(e) =>{
                      e.stopPropagation()
                       return EditBtnFun(value._id)
                    }}
                    className="relative p-2 rounded-lg hover:bg-gray-100">
                    <Edit3 size={18} />


                    {editOpen == value._id && (
                      <div className="absolute right-0 top-10 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

                        {/* <button
                          onClick={() => updateOrderStatus(value._id, "Queue")}
                          className="w-full px-4 py-3 text-left hover:bg-orange-50 border-b flex items-center gap-3">
                          <Hourglass size={16} className="text-orange-500" />
                          <span>Queue</span>
                        </button> */}

                        {/* <button
                          onClick={() => updateOrderStatus(value._id, "Processing")}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b flex items-center gap-3">
                          <RefreshCw size={16} className="text-blue-500" />
                          <span>Processing</span>
                        </button> */}

                        {/* <button
                          onClick={() => updateOrderStatus(value._id, "Stitching")}
                          className="w-full px-4 py-3 text-left hover:bg-violet-50 border-b flex items-center gap-3">
                          <Scissors size={16} className="text-violet-500" />
                          <span>Stitching</span>
                        </button> */}

                        <button
                          onClick={() => updateOrderStatus(value._id, "Ready")}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 border-b flex items-center gap-3">
                          <BadgeCheck size={16} className="text-green-500" />
                          <span>Ready</span>
                        </button>

                        <button
                          onClick={() => updateOrderStatus(value._id, "Delivered")}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 flex items-center gap-3">
                          <Truck size={16} className="text-green-600" />
                          <span>Delivered</span>
                        </button>

                      </div>

                    )}
                  </div>
                </div>
              )}




            </div>

            {/* Amount */}
            <div className="flex items-center justify-between md:flex-col md:items-start">
              <p className="flex items-center font-bold">
                <IndianRupee size={15} />
                {value.price}
              </p>

              <p className="flex text-green-700 text-sm items-center">
                Advance:
                <IndianRupee size={13} />
                {value.advancePaid}
              </p>
            </div>

            {/* Arrow only laptop */}
            <div className="hidden lg:flex justify-end text-gray-400">
              ›
            </div>
          </div>
        )
      }
    )}
      </section>


      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="bg-violet-500 text-white p-5">
              <h1 className="text-xl font-bold">
                Confirm Delivery
              </h1>
              <p className="text-sm text-violet-100">
                Complete payment before delivery
              </p>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col gap-4">

              {/* Amount Details */}
              <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-3">

                <div className="flex justify-between">
                  <p className="text-gray-500">Total Amount</p>
                  <p className="font-bold text-lg">
                    ₹{selectedOrder?.price}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-500">Advance Paid</p>
                  <p className="font-semibold text-green-600">
                    ₹{selectedOrder?.advancePaid}
                  </p>
                </div>

                <div className="border-t pt-3 flex justify-between">
                  <p className="font-medium">
                    Pending Amount
                  </p>

                  <p className="font-bold text-red-500">
                    ₹
                    {selectedOrder?.price -
                      selectedOrder?.advancePaid}
                  </p>
                </div>

              </div>

              {/* Input */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">
                  Amount Received Now
                </label>

                <input
                  type="number"
                  value={receivedAmount}
                  onChange={(e) =>
                    setReceivedAmount(e.target.value)
                  }
                  placeholder="Enter amount"
                  className="
              border
              h-12
              rounded-xl
              px-4
              outline-none
              focus:ring-2
              focus:ring-violet-300
              focus:border-violet-500
            "
                />
              </div>

             
              <div className="bg-violet-50 rounded-2xl p-4">

                <div className="flex justify-between">
                  <p>Balance Amount</p>

                  <p
                    className={`font-bold ${balanceAmount > 0
                      ? "text-red-500"
                      : "text-green-600"
                      }`}
                  >
                    ₹{balanceAmount < 0 ? 0 : balanceAmount}
                  </p>
                </div>

                <div className="mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatus === "paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                      }`}
                  >
                    {paymentStatus === "paid"
                      ? "Fully Paid"
                      : "Due Pending"}
                  </span>
                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="p-5 border-t flex gap-3">

              <button
                onClick={() =>
                  setShowPaymentPopup(false)
                }
                className="
            flex-1
            h-11
            rounded-xl
            bg-gray-200
            hover:bg-gray-300
          "
              >
                Cancel
              </button>

              <button
                onClick={confirmDelivery}
                className="
            flex-1
            h-11
            rounded-xl
            bg-violet-500
            text-white
            font-semibold
            hover:bg-violet-600
          "
              >
                Delivery
              </button>

            </div>

          </div>

        </div>
      )}
      
    </>
  )
}
