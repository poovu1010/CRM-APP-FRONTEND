import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { BadgeIndianRupee, CalendarDays, Clock, Clock11, IndianRupee, Locate, LocateFixed, LucideLogOut, Mail, NotebookPen, Phone, Shirt, ShoppingBag, Wallet, Wallet2 } from 'lucide-react'
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify/unstyled'
import OrderDetail from '../OrderDetail'

export default function CheckStatus() {

  const [order,setOrderInfo] = useState(null)
  const [userInfo,setUserInfo] = useState(null)

  const navigate = useNavigate()


  async function GetAllInfo() {
    const details =await api.get("/Order-check/OrderInfo")
    setUserInfo(details.data.getOrderDetails[0])
    setOrderInfo(details.data.getOrderDetails[0].OrderHistory)
  }

 const totoal = order?.reduce((zero,price)=>zero+Number(price.price),0)
 const balence = order?.reduce((zero,balence)=>zero+Number(balence.balanceAmount),0)
  useEffect(()=>{
    GetAllInfo()
  
  },[])


 

  async function logout() {
    try {
      const logoutres = await api.post("/Order-check/logout");
    if (logoutres.data.status) {
      navigate("/");
      toast.success("logout success")
    }
    
      
    } catch (error) {
     console.log(error) 
    }
    
  }

  const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  return (

    


     
    <div className=' bg-gradient-to-b from-violet-400 from-20% to-100% to-white flex flex-col gap-5'>

      {/* Nav Bar */}
      <div className='w-full sticky top-0 h-20   bg-blue-50 flex justify-between items-center px-4'>
    
        <div className=' flex items-center'>
          <div  className='w-30 hidden md:bloc h-20 relative top-[-35px] '>
        <img src={logo} alt="" className=' '/>
          </div>
             
          <p className='font-extrabold text-3xl font-serif text-blue-950' >StichFlow</p>

        </div>


      <button onClick={logout} className='border-blue-900 flex justify-center items-center gap-3 h-10 w-35 rounded-lg text-lg font-bold border-2 transition-transform duration-100 active:scale-90'>
        <LucideLogOut size={20} className='text-blue-950'/>
        Log out
      </button>

      </div>

      <main className='flex flex-col w-full px-3 '>

        {/* Customer Details */}

        <section className='w-full flex-col gap-3 md:flex-row  flex min-w-0 py-4 '>
          {/* prfil */}

          <div className='flex  bg-white  px-3 items-center  gap-4 md:flex-1 rounded-3xl  py-5  min-w-0'>
            <div className='h-25 w-25 bg-gradient-to-br shrink-0 flex  from-blue-400 to-blue-950 rounded-full items-center justify-center'> <p>o</p> </div>
            <div className='flex flex-col min-w-0 gap-1'>

                <p className='text-xl font-bold font-mono'> {userInfo?.customer_name}</p>
                <p className='flex gap-2  text-sm truncate'> <Phone className=' text-amber-700  'size={20} />{userInfo?.Phone}</p>
                <p className='flex gap-2 text-sm truncate'> <Mail className=' text-amber-700 truncate'size={20} />{userInfo?.Gmail}</p>
                <p className='flex gap-2 text-sm truncate'> <Locate className=' text-amber-700 'size={20} />{userInfo?.Addres}</p>
            </div>
          </div>


          <div className='grid-cols-2 grid md:flex-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='bg-white items-center px-4 flex justify-between rounded-2xl '>
              <div className='flex gap-3.5'>
                <ShoppingBag className = ' text-red-500 bg-red-100 p-2 rounded-2xl ' size={50}/>
                <div className=''>
                  <p className='font-medium' >Total Orders</p>
                  <p>
                    {order?.length}
                  </p>
                </div>
              </div>
            </div>

<div className='bg-white items-center px-4 py-4 flex justify-between rounded-2xl '>
              <div className='flex gap-3.5'>
                <Wallet2 className = ' text-blue-400 bg-blue-100 p-2 rounded-2xl ' size={50}/>
                <div className=''>
                  <p className='font-medium' >Total Amount</p>
                  <p>
                    {totoal}
                  </p>
                </div>
              </div>
            </div><div className='bg-white items-center px-4 py-4 flex justify-between rounded-2xl '>
              <div className='flex gap-3.5'>
                <Clock11 className = ' text-red-500 bg-red-100 p-2 rounded-2xl ' size={50}/>
                <div className=''>
                  <p className='font-medium' >Due Amount</p>
                  <p>
                    {balence}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="w-full mt-6 px-4 md:px-8">
  {/* Header */}
  <div className="flex items-center justify-between mb-5">
    <div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950">
        Your Orders
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        Track your tailoring order status and payment details
      </p>
    </div>

    <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
      {order?.length} Orders
    </span>
  </div>

  {/* Orders List */}
  <div className="flex flex-col gap-5">
    {order?.length > 0 ? (
      order?.map((order) => (
        <div
          key={order?._id}
          className="
            w-full bg-white rounded-3xl border border-slate-200
            shadow-sm hover:shadow-lg transition-all duration-200
            p-4 md:p-5
          "
        >
          <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
           
            <div className="w-full lg:w-28 h-28 shrink-0 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex justify-center items-center">
              <Shirt size={46} className="text-blue-800" />
            </div>

           
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-extrabold text-blue-950 truncate">
                  {order?.clothType}
                </h3>

                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
                  {order?.status}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order?.paymentStatus === "due"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {order?.paymentStatus}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-2 truncate">
                Order ID: {order?._id}
              </p>

              {/* Amount Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                <div className="bg-blue-50 rounded-2xl p-3">
                  <div className="flex items-center gap-2 text-blue-700">
                    <IndianRupee size={17} />
                    <p className="text-xs font-semibold">Price</p>
                  </div>
                  <h4 className="font-extrabold text-blue-950 mt-2">
                    ₹{order?.price}
                  </h4>
                </div>

                <div className="bg-green-50 rounded-2xl p-3">
                  <div className="flex items-center gap-2 text-green-700">
                    <Wallet size={17} />
                    <p className="text-xs font-semibold">Advance</p>
                  </div>
                  <h4 className="font-extrabold text-green-700 mt-2">
                    ₹{order?.advancePaid}
                  </h4>
                </div>

                <div className="bg-indigo-50 rounded-2xl p-3">
                  <div className="flex items-center gap-2 text-indigo-700">
                    <BadgeIndianRupee size={17} />
                    <p className="text-xs font-semibold">Received</p>
                  </div>
                  <h4 className="font-extrabold text-indigo-700 mt-2">
                    ₹{order?.receivedAmount}
                  </h4>
                </div>

                <div className="bg-red-50 rounded-2xl p-3">
                  <div className="flex items-center gap-2 text-red-600">
                    <Clock size={17} />
                    <p className="text-xs font-semibold">Balance</p>
                  </div>
                  <h4 className="font-extrabold text-red-600 mt-2">
                    ₹{order?.balanceAmount}
                  </h4>
                </div>
              </div>

              {/* Date + Notes */}
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mt-5 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <CalendarDays size={17} className="text-blue-700 shrink-0" />
                  <span>
                    Expected Delivery:{" "}
                    <b className="text-blue-950">
                      {formatDate(order?.expectedDeliveryDate)}
                    </b>
                  </span>
                </p>

                <p className="flex items-center gap-2 min-w-0">
                  <NotebookPen size={17} className="text-blue-700 shrink-0" />
                  <span className="truncate">
                    Notes: <b className="text-blue-950">{order?.notes}</b>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">
        <h3 className="font-extrabold text-blue-950 text-xl">
          No Orders Found
        </h3>
        <p className="text-slate-500 mt-2">
          Your order history will appear here.
        </p>
      </div>
    )}
  </div>
</section>

       

      </main>
     
    </div>
  )
}
