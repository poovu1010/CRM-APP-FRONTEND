import React, { useContext, useEffect, useState } from 'react';
import AuthDetails from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { Plus, ShoppingBag, ShoppingBasket } from 'lucide-react';


export default function CustomerPage() {
  const { Customers, getCustomers } = useContext(AuthDetails);
  console.log(Customers)






  return (
    <div className='px-5 mt-4 flex flex-col gap-5 w-screen'>
      {/* heading of the customer */}
      <div className='flex justify-between'>
        <h1 className='font-bold  '>All Customers</h1>
        <button className='flex gap-2 text-sm font-bold bg-violet-400 justify-center place-items-center py-1.5 px-3 rounded-xl'>
          <Plus />
          Add Customer
        </button>
      </div>

      {/* <h1>{Customers}</h1> */}

      {/* customer list */}
<div className='flex flex-col gap-2 w-full h-auto'>
      {Customers.map((value,index)=>(
          <div key={value._id} className='flex justify-between gap-5 place-items-center px-4 py-1 rounded-xl bg-gray-200 h-25 w-full'>
            
            <h1 className='font-black'>{index+1}</h1>


            {/* customer photo */}
            <div className=' h-15 w-15  rounded-full bg-black'>
            </div>

            {/* details */}
            <div className=' flex flex-col gap-1'>
              <h1 className='text-lg font-bold'>{value.customer_name}</h1> 
              <p>+91 {value.Phone}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='font-medium'>Orders</p>
              <p className='self-center' >{value.totalOrder}</p>
            </div>

            <button className='flex gap-2 bg-violet-300 px-3 py-2 rounded-xl cursor-pointer hover:bg-violet-400 active:scale-95'>
              <ShoppingBag/>
              <p>order</p>
            </button>
            

          </div>
      ))}

      </div>

    </div>
  );
}