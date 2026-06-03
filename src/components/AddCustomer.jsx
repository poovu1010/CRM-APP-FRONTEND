import React, { useContext, useState } from 'react'
import AuthDetails from '../context/AuthContext';
import axios from 'axios';
import { h1 } from 'framer-motion/client';
import { ShoppingBag, User, X } from 'lucide-react';
import api from '../api/axios';
import { toast } from 'react-toastify';

export default function AddCustomer() {
  const { isOpen, setopen, Customers, getCustomers } = useContext(AuthDetails)

  const [boxState, setBoxState] = useState({
    boxTab: 1,
    isSuccess: false
    , header: "Add Customer"
  })

  // Customer details
  const [CustomerInput, setCustomerInput] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Address: ""
  })

  const [errors, setErrors] = useState({});


  // Order details

  const [orderInput, setOrderInput] = useState({
    clothType: "",
    price: "",
    advancePaid: "",
    expectedDeliveryDate: "",
    status: "stitching",
    notes: "",
  });

  const [orderErrors, setOrderErrors] = useState({});







  // function

  function getOrderInput(e) {
    const { name, value } = e.target;

    setOrderInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    setOrderErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }


  function backBtn() {
    setCustomerInput({
      Name: "",
      Phone: "",
      Email: "",
      Address: ""
    })

    setOrderInput({
      clothType: "",
      price: "",
      advancePaid: "",
      expectedDeliveryDate: "",
      status: "stitching",
      notes: ""
    })


    setopen(false)

  }









  function getInput(e) {

    const name = e.target.name
    const value = e.target.value

    setCustomerInput(input => {
      return { ...CustomerInput, [name]: value }
    })

  }

  function gotoOrders() {
    const isValid = validateCustomer();

    if (!isValid) return;

    setBoxState({
      boxTab: 2,
      isSuccess: true,
      header: "Get Order",
    });


  }


  function validateOrder() {
    const errors = {};

    if (!orderInput.clothType) {
      errors.clothType = "Cloth type is required";
    }

    if (!orderInput.price) {
      errors.price = "Total price is required";
    } else if (Number(orderInput.price) <= 0) {
      errors.price = "Price must be greater than 0";
    }

    if (!orderInput.advancePaid) {
      errors.advancePaid = "Advance amount is required";
    } else if (Number(orderInput.advancePaid) < 0) {
      errors.advancePaid = "Advance cannot be negative";
    } else if (Number(orderInput.advancePaid) > Number(orderInput.price)) {
      errors.advancePaid = "Advance cannot be greater than total price";
    }

    if (!orderInput.expectedDeliveryDate) {
      errors.expectedDeliveryDate = "Delivery date is required";
    }

    setOrderErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validateCustomer() {
    const newErrors = {};

    if (!CustomerInput.Name.trim()) {
      newErrors.Name = "Name is required";
    }

    if (!CustomerInput.Phone.trim()) {
      newErrors.Phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(CustomerInput.Phone)) {
      newErrors.Phone = "Enter valid 10 digit phone number";
    }

    if (CustomerInput.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CustomerInput.Email)) {
      newErrors.Email = "Enter valid email address";
    }

    if (!CustomerInput.Address.trim()) {
      newErrors.Address = "Address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }



  // API CALL

  async function submitOrder(e) {
    e?.preventDefault();

    const isValid = validateOrder();
    if (!isValid) return;

    try {
   
      // CustomerAPI
      const customerRes = await api.post(
        "/Owner/newCustomer",
        {
          customer_name: CustomerInput.Name,
          Phone: CustomerInput.Phone,
          Addres: CustomerInput.Address,
          Email: CustomerInput.Email,
        },
        { withCredentials: true }
      );

      const customerId = customerRes.data.data._id;

   
      // getOrderApi
      const orderRes = await api.post(
        "/Owner/newOrder",
        {
          customerId: customerId,
          clothType: orderInput.clothType,
          price: Number(orderInput.price),
          advancePaid: Number(orderInput.advancePaid),
          expectedDeliveryDate: orderInput.expectedDeliveryDate,
          // status: orderInput.status,
        },
        { withCredentials: true }
      );

     

      toast.success("Customer and Order created successfully");
      setopen(false);

    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Please try again.");
      }
    }
  }

  return (
    <>
      {isOpen && (
        <div className='bg-black/50  h-screen w-screen fixed top-0 left-0 flex place-items-center justify-center'>

          <div className='w-100  relative h-170 px-8  py-4 bg-white opacity-100 rounded-2xl'>

            {/* close button */}
            <X className='absolute right-5 cursor-pointer '
              onClick={() => setopen(false)}></X>


            {/* heading */}
            <div>
              <div className='flex gap-3 mt-3'>
                <div className='h-10 w-10 bg-violet-400 rounded-full flex place-items-center justify-center font-extrabold'>{boxState.boxTab}</div>

                <div>
                  <h1 className='self-center font-bold'>{boxState.header}</h1>
                  <h1 className=' text-xs text-gray-500'>create customer & orderdetails</h1>
                </div>

              </div>
              {/* order status */}
              <div className='mt-4 flex justify-center'>
                <div className={`w-30 flex place-items-center justify-center gap-2 h-10 rounded-2xl ${boxState.isSuccess === true ? `bg-green-400` : `bg-violet-500`}`}>
                  <User />
                  <h1 className='text-sm'>Customer</h1>
                </div>
                {/* pipe line ui  */}
                <div className={`relative w-25 self-center h-1.5 bg-white border border-x-0 
                                before:content-[""] before:absolute before:animate-pulse  before:h-1.5    before:left-0
                ${boxState.isSuccess === true ? `before:bg-green-400 before:w-25` : `before:bg-violet-500 before:w-10`}`}>

                </div>

                <div className={`w-30 flex place-items-center justify-center gap-2 h-10 rounded-2xl border  ${boxState.isSuccess === true ? `bg-violet-400` : `bg-white`}`}>
                  <ShoppingBag></ShoppingBag>
                  <h1 className='text-sm'>Order</h1>
                </div>
              </div>

              {/* form */}

              {boxState.boxTab === 1 && (
                <>
                  <form className='flex flex-col gap-2 border h-110 mt-5 rounded-2xl px-3 pt-2 overflow-y-auto '>
                    {/* name */}
                    <div className='flex flex-col gap-1 '>
                      <label className='ml-1 font-bold text-lg' htmlFor="Name">Name</label>
                      <input
                        onChange={getInput}
                        value={CustomerInput.Name}
                        type="text" id='Name' name='Name' className='border px-3 h-12 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-300'
                        placeholder={`Enter the Name`} />
                      {errors.Name && (
                        <p className="text-red-500 text-sm ml-1 vibrate">
                          {errors.Name}
                        </p>
                      )}

                    </div>

                    {/* phone */}
                    <div className='flex flex-col gap-1'>
                      <label className='ml-1 font-bold text-lg' htmlFor="Phone">Phone</label>
                      <input
                        onChange={getInput}
                        value={CustomerInput.Phone}
                        placeholder='Enter the Phone Number' type="text" id='Phone' name='Phone' className='border px-3 h-12 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-300' />
                      {errors.Phone && (
                        <p className="text-red-500 text-sm ml-1 vibrate">
                          {errors.Phone}
                        </p>
                      )}
                    </div>
                    {/* email */}
                    <div className='flex flex-col gap-1'>
                      <label className='ml-1 font-bold text-lg' htmlFor="Email">Email</label>
                      <input
                        onChange={getInput}
                        value={CustomerInput.Email}
                        type="text" placeholder='Enter the Email' name='Email' id='Email' className='border px-3 h-12 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-300' />
                      {errors.Email && (
                        <p className="text-red-500 text-sm ml-1 vibrate">
                          {errors.Email}
                        </p>
                      )}
                    </div>
                    {/* address */}
                    <div className='flex flex-col gap-1'>
                      <label className=' ml-1 font-bold text-lg' htmlFor="">Address</label>
                      <textarea
                        onChange={getInput}
                        value={CustomerInput.Address}
                        name="Adderess" placeholder='Enter the Address' id="Address" name="Address" className='border px-3 pt-2.5 h-12 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-300'></textarea>
                      {errors.Address && (
                        <p className="text-red-500 text-sm ml-1 vibrate">
                          {errors.Address}
                        </p>
                      )}
                    </div>


                  </form>

                  <div className='mt-3 flex justify-around'>
                    <button onClick={backBtn} className='bg-gray-300 h-13 w-3/7 rounded-2xl'>

                      cancel
                    </button>

                    <button onClick={gotoOrders} className='bg-violet-400 h-13 w-3/7 rounded-2xl'>
                      <p>New one</p>
                    </button>

                  </div>
                </>
              )}

              {boxState.boxTab === 2 && (

                <>
                  <form className="flex flex-col gap-5  border h-110 mt-5 rounded-2xl px-3 pt-2 overflow-y-auto">

                    {/* Cloth Type */}
                    <div className="flex flex-col gap-1">
                      <label className="ml-1 font-bold text-lg" htmlFor="clothType">
                        Cloth Type
                      </label>
                      <select
                        value={orderInput.clothType}
                        onChange={getOrderInput}
                        id="clothType"
                        name="clothType"
                        className="border px-3 h-12 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
                      >
                        <option value="">Select Cloth Type</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Pant">Pant</option>
                        <option value="Blouse">Blouse</option>
                        <option value="Chudi">Chudi</option>
                        <option value="Coat">Coat</option>
                        <option value="Other">Other</option>
                      </select>
                      {orderErrors.clothType && <p className="text-red-500 text-sm vibrate">{orderErrors.clothType}</p>}
                    </div>

                    {/* Total Price */}
                    <div className="flex flex-col gap-1">
                      <label className="ml-1 font-bold text-lg" htmlFor="price">
                        Total Price
                      </label>
                      <input
                        value={orderInput.price}
                        onChange={getOrderInput}
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter Total Price"
                        className="border px-3 h-12 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
                      />
                      {orderErrors.price && <p className="text-red-500 text-sm vibrate">{orderErrors.price}</p>}
                    </div>

                    {/* Advance Amount */}
                    <div className="flex flex-col gap-1">
                      <label className="ml-1 font-bold text-lg" htmlFor="advancePaid">
                        Advance Paid
                      </label>
                      <input
                        type="number"
                        id="advancePaid"
                        name="advancePaid"
                        value={orderInput.advancePaid}
                        onChange={getOrderInput}
                        placeholder="Enter Advance Amount"
                        className="border px-3 h-12 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
                      />
                      {orderErrors.advancePaid && <p className="text-red-500 text-sm vibrate">{orderErrors.advancePaid}</p>}
                    </div>

                    {/* Delivery Date */}
                    <div className="flex flex-col gap-1">
                      <label
                        className="ml-1 font-bold text-lg"
                        htmlFor="expectedDeliveryDate"
                      >
                        Delivery Date
                      </label>
                      <input
                        value={orderInput.expectedDeliveryDate}
                        onChange={getOrderInput}
                        type="date"
                        id="expectedDeliveryDate"
                        name="expectedDeliveryDate"
                        className="border px-3 h-12 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
                      />
                      {orderErrors.expectedDeliveryDate && <p className="text-red-500 text-sm vibrate">{orderErrors.expectedDeliveryDate}</p>}
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-1">
                      <label className="ml-1 font-bold text-lg" htmlFor="status">
                        Status
                      </label>
                      <select
                        value={orderInput.status}
                        onChange={getOrderInput}
                        id="status"
                        name="status"
                        className="border px-3 h-12 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
                      >
                        <option value="stitching">Stitching</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                      </select>
                      <p></p>
                    </div>

                    {/* Instructions */}
                    <div className="flex flex-col gap-1">
                      <label className="ml-1 font-bold text-lg" htmlFor="notes">
                        Instructions
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={orderInput.notes}
                        onChange={getOrderInput}
                        placeholder="Special instructions..."
                        className="border px-3 pt-2 h-20 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
                      />
                      <p></p>
                    </div>
                  </form>

                  <div className="mt-3 flex justify-around">
                    <button
                      type="button"
                      className="bg-gray-300 h-13 w-3/7 rounded-2xl"
                      onClick={() =>
                        setBoxState({
                          boxTab: 1,
                          isSuccess: false,
                          header: "Add Customer"
                        })
                      }
                    >
                      Back
                    </button>

                    <button
                      onClick={submitOrder}
                      className="bg-violet-400 h-13 w-3/7 rounded-2xl text-white font-semibold"
                    >
                      Create Order
                    </button>
                  </div>
                </>
              )}



            </div>

          </div>

        </div>

      )}
    </>
  )
}