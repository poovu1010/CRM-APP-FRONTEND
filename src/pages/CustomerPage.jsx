import React, { useContext, useEffect, useState } from 'react';
import AuthDetails from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { Filter, Loader, LoaderCircle, Plus, ShoppingBag, ShoppingBasket } from 'lucide-react';
import { div, tr } from 'framer-motion/client';
import AddOrder from '../components/AddOrder';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';


export default function CustomerPage() {
  const { loading, setLoading, Customers, getCustomers, isOrderOpen, setOrderOpen, refreshData } = useContext(AuthDetails);

  const [SelectedCustomer, setSelectedCustomer] = useState(null)
  const [filterbtn, setFilterbtn] = useState(false)
  const [displayCustomers, setDisplayCustomers] = useState(Customers);


  const changePage = useNavigate()

  const filterbtnopen = () => {
    if (filterbtn) {
      return setFilterbtn(false)
    }
    return setFilterbtn(true)
  }

  function handlefilter(FilterType) {

    if (FilterType === "all") {
      setDisplayCustomers(Customers)
      // setFilterbtn(false)


    }

    if (FilterType === "az") {
      displayCustomers.sort((a, b) =>
        a.customer_name.localeCompare(b.customer_name)
      )

      setFilterbtn(false)
    }




  }

  // console.log(setOrderOpen)
  useEffect(() => {
    if (Customers.length === 0) {
      refreshData()
      
    }
  },[])
  useEffect(() => {
  setDisplayCustomers(Customers);
}, [Customers]);

  function navigateInfo(id, name) {
    changePage(`/Customers/${name}/${id}`)
  }




  async function addOrder(customerId) {



    try {


      const orderRes = await api.post(
        "/Owner/newOrder",
        {
          customerId: customerId,
          clothType: orderInput.clothType,
          price: Number(orderInput.price),
          advancePaid: Number(orderInput.advancePaid),
          expectedDeliveryDate: orderInput.expectedDeliveryDate,
          status: "Queue",
          notes: orderInput.notes
        },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error(error)
    }

  }
  
  if(loading){
    return(
     <div>
      <div className='border mt-10 border-gray-300 p-5 rounded-xl'>
        <Skeleton circle width={50} height={50} baseColor='#FFFFFF'/>
      <Skeleton count={3}  baseColor='#FFFFFF'/>
      </div>
      <div className='border mt-10 border-gray-300 p-5 rounded-xl'>
        <Skeleton circle width={50} height={50} baseColor='#FFFFFF'/>
      <Skeleton count={3}  baseColor='#FFFFFF'/>
      </div>
      <div className='border mt-10 border-gray-300 p-5 rounded-xl'>
        <Skeleton circle width={50} height={50} baseColor='#FFFFFF'/>
      <Skeleton count={3}  baseColor='#FFFFFF'/>
      </div>
      <div className='border mt-10 border-gray-300 p-5 rounded-xl'>
        <Skeleton circle width={50} height={50} baseColor='#FFFFFF'/>
      <Skeleton count={3}  baseColor='#FFFFFF'/>
      </div>
      <div className='border mt-10 border-gray-300 p-5 rounded-xl'>
        <Skeleton circle width={50} height={50} baseColor='#FFFFFF'/>
      <Skeleton count={3}  baseColor='#FFFFFF'/>
      </div>
     
      
     </div>
        
    )
  }






  return (

    

      <div className='px-5 pb-8 h-full mt-4 flex flex-col gap-5 w-full'>
        {/* heading of the customer */}
        <div className='flex justify-between ' >
          <h1 className='font-bold  '>All Customers</h1>
          <div className='relative flex gap-4 place-items-center'>
            < Filter onClick={filterbtnopen} className={filterbtn ? `border-2 border-violet-400 rounded-md shrink-0 h-8 p-1 w-8` : ""} />

            <div
              className={`
    absolute top-full right-0 mt-2
    w-44
    bg-white
    border border-gray-200
    rounded-xl
    shadow-lg
    overflow-hidden
    z-30
    ${filterbtn ? "block" : "hidden"}
  `}
            >
              <button onClick={() => handlefilter("all")} className="w-full text-left px-4 py-3 hover:bg-violet-100 transition">
                👥 All Customers
              </button>

              <button onClick={() => handlefilter("az")} className="w-full text-left px-4 py-3 hover:bg-violet-100 transition">
                🔤 A - Z
              </button>

             
            </div>
            
          </div>



        </div>

        {/* <h1>{Customers}</h1> */}
       
        {/* customer list */}
        <div className="flex flex-col gap-3 w-full">
          {displayCustomers.map((value, index) => (
            <div
              key={value._id}
              className="
        flex flex-col  md:flex-row md:justify-between
      
        gap-4
        w-full
        px-4 py-3
        border-1 border-gray-300 shadow-xl
        rounded-xl
        bg-white
      "
              onClick={() => navigateInfo(value._id, value.customer_name)}
            >
              <div className="flex flex-1 items-center gap-4 min-w-0">
                <h1 className="font-black w-6 truncate">{index + 1}</h1>

                <div className="h-14 w-14 shrink-0 flex justify-center items-center text-white font-extrabold text-2xl rounded-full bg-black ">{value.customer_name.substring(0,1)}</div>

                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{value.customer_name}</h1>
                  <p className="text-sm text-gray-600">+91 {value.Phone}</p>
                </div>
              </div>


              <div className="flex flex-1 items-center min-w-0 ml-12 justify-between sm:gap-8">
                <div className='flex flex-col items-center min-w-0'>
                  <p className="font-medium truncate text-sm ">Amount Due</p>
                  <p className='text-red-500 font-bold truncate'>{value.totalOrder}</p>
                </div>

                <div className="flex  gap-4 items-center ">
                  {/* <div className='border-3 p-2 border-violet-400  bg-violet-100 rounded-2xl'>
                    <ShoppingBag className='text-violet-600' />
                  </div> */}
                  <div className='flex flex-col min-w-0 items-center'>
                    <p className="font-medium truncate tex-sm">Orders</p>
                    <p className='text-violet-800 font-bold truncate'>{value.totalOrder}</p>
                  </div>

                </div>

                {/* button order */}
                <button onClick={(e) => {
                  e.stopPropagation();
                  setOrderOpen(true)
                  setSelectedCustomer({
                    id: value._id,
                    name: value.customer_name
                  })

                }}
                  className="flex min-w-0  items-center gap-2 bg-violet-300 px-3 py-2 rounded-xl cursor-pointer hover:bg-violet-400 active:scale-95">
                  <ShoppingBag size={18} className='shrink-0'/>
                  <p className='truncate'>Order</p>
                </button>
              </div>
            </div>
          ))}

        </div>

        <AddOrder CustomerDetail={SelectedCustomer} />

      </div>
  

  );
}