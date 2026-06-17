import React, { useContext, useState } from "react";
import { ClockFading, ShoppingBag, X } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";
import AuthDetails from "../context/AuthContext";

export default function AddOrder({ CustomerDetail}) {
    console.log(CustomerDetail?.name)
  const {isOrderOpen, setOrderOpen} = useContext(AuthDetails)

  const [orderInput, setOrderInput] = useState({
    clothType: "",
    price: "",
    advancePaid: "",
    expectedDeliveryDate: "",
    notes: "",
  });

  const [orderErrors, setOrderErrors] = useState({});

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

  function closeModal() {
    setOrderOpen(false);
    setOrderInput({
      clothType: "",
      price: "",
      advancePaid: "",
      expectedDeliveryDate: "",
      notes: "",
    });

    setOrderErrors({});
    
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

    if (orderInput.advancePaid === "") {
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

  async function submitOrder(e) {
    e.preventDefault();

    if (!validateOrder()) return;

    try {
      const res =  await api.post(
        "/Owner/newOrder",
        {
          customerId:CustomerDetail.id,
          clothType: orderInput.clothType,
          price: Number(orderInput.price),
          advancePaid: Number(orderInput.advancePaid),
          expectedDeliveryDate: orderInput.expectedDeliveryDate,
          status: "Queue",
          notes: orderInput.notes,
        },
        { withCredentials: true }
      );
      
      toast.success(res.data.message);
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Server error. Please try again.");
    }
  }

  return (
    <>
    

      {isOrderOpen && (
        <div className="bg-black/50  h-screen w-screen fixed top-0 left-0 flex items-center justify-center z-50">

           
          <div className="w-80 md:w-md h-auto relative px-8 py-5 bg-white rounded-2xl">

            <X
              className="absolute right-6  cursor-pointer"
              onClick={closeModal}
            />
             <div className=" flex items-center gap-4">
                <div className=" h-12 w-12 shrink-0 flex justify-center items-center bg-violet-400 rounded-full">
                    <ShoppingBag className=""/>
                </div>
                <div>
                    <h1 className="font-bold">Add Orders for <span className="text-violet-400">{CustomerDetail.name} </span> </h1>
                </div>
            </div>

            

            <form
              onSubmit={submitOrder}
              className="flex flex-col gap-2 border h-100 py-6 mt-5 rounded-2xl px-3 pt-2 overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                <label className="ml-1 font-bold text-sm">Cloth Type</label>
                <select
                  value={orderInput.clothType}
                  onChange={getOrderInput}
                  name="clothType"
                  className="border px-3 h-10 rounded-xl"
                >
                  <option value="">Select Cloth Type</option>
                  <option value="Shirt">Shirt</option>
                  <option value="Pant">Pant</option>
                  <option value="Blouse">Blouse</option>
                  <option value="Chudi">Chudi</option>
                  <option value="Coat">Coat</option>
                  <option value="Other">Other</option>
                </select>
                {orderErrors.clothType && (
                  <p className="text-red-500 text-sm">{orderErrors.clothType}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="ml-1 font-bold text-sm">Total Price</label>
                <input
                  value={orderInput.price}
                  onChange={getOrderInput}
                  type="number"
                  name="price"
                  placeholder="Enter Total Price"
                  className="border px-3 h-10 rounded-xl"
                />
                {orderErrors.price && (
                  <p className="text-red-500 text-sm">{orderErrors.price}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="ml-1 font-bold text-sm">Advance Paid</label>
                <input
                  value={orderInput.advancePaid}
                  onChange={getOrderInput}
                  type="number"
                  name="advancePaid"
                  placeholder="Enter Advance Amount"
                  className="border px-3 h-10 rounded-xl"
                />
                {orderErrors.advancePaid && (
                  <p className="text-red-500 text-sm">{orderErrors.advancePaid}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="ml-1 font-bold text-sm">Delivery Date</label>
                <input
                  value={orderInput.expectedDeliveryDate}
                  onChange={getOrderInput}
                  type="date"
                  name="expectedDeliveryDate"
                  className="border px-3 h-10 rounded-xl"
                />
                {orderErrors.expectedDeliveryDate && (
                  <p className="text-red-500 text-sm">
                    {orderErrors.expectedDeliveryDate}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="ml-1 font-bold text-sm">Instructions</label>
                <textarea
                  name="notes"
                  value={orderInput.notes}
                  rows={3}
                  onChange={getOrderInput}
                  placeholder="Special instructions..."
                  className="border px-3 pt-2 h-20 rounded-xl"
                />
              </div>

              
            </form>

            <div className="mt-3 flex justify-around">
                <button
                 
                  onClick={closeModal}
                  className="bg-gray-300 h-10 w-3/7 rounded-xl"
                >
                  Cancel
                </button>

                <button
                onClick={submitOrder}
                  type="submit"
                  className="bg-violet-400 h-10 w-3/7 rounded-xl hover:bg-violet-500 active:scale-90 text-white font-semibold"
                >
                  Create Order
                </button>
              </div>
          </div>
        </div>
      )}
    </>
  );
}