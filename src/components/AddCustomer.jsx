import React, { useContext, useState } from 'react'
import AuthDetails from '../context/AuthContext';
import axios from 'axios';

export default function AddCustomer() {
  const { isOpen, setopen, Customers, getCustomers } = useContext(AuthDetails)

  const [step, setStep] = useState('customer') // 'customer' | 'order'
  const [newCustomer, setNewCustomer] = useState(null)

  const [customerInput, setCustomerInput] = useState({
    customer_name: "",
    Phone: "",
    Address: ""
  })

  const [orderInput, setOrderInput] = useState({
    clothType: "",
    price: "",
    advancePaid: "",
    expectedDeliveryDate: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function closeModal() {
    setopen(false)
    setStep('customer')
    setNewCustomer(null)
    setCustomerInput({ customer_name: "", Phone: "", Address: "" })
    setOrderInput({ clothType: "", price: "", advancePaid: "", expectedDeliveryDate: "" })
    setError("")
  }

  function setCustomerField(e) {
    const { name, value } = e.target
    setCustomerInput(prev => ({ ...prev, [name]: value }))
  }

  function setOrderField(e) {
    const { name, value } = e.target
    setOrderInput(prev => ({ ...prev, [name]: value }))
  }

  async function submitCustomer(e) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await axios.post("http://localhost:5000/Owner/newCustomer", {
        customer_name: customerInput.customer_name,
        Phone: customerInput.Phone,
        Address: customerInput.Address
      }, { withCredentials: true })

      const data = res.data.data
      const detail = {
        _id: data._id,
        Phone: data.Phone,
        customer_name: data.customer_name,
        Address: data.Address,
        createdAt: data.createdAt
      }
      console.log("hi")

      getCustomers(prev => ({
        ...prev,
        data: [...(prev?.data || []), detail]
      }))
      setNewCustomer(detail)
      setStep('order')
    } catch (err) {
      console.log(err.response)
      setError("Failed to add customer. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function submitOrder(e) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await axios.post("http://localhost:5000/Owner/newOrder", {
        customerId: newCustomer._id,
        clothType: orderInput.clothType,
        price: Number(orderInput.price),
        advancePaid: Number(orderInput.advancePaid),
        expectedDeliveryDate: orderInput.expectedDeliveryDate
      }, { withCredentials: true })

      closeModal()
    } catch (err) {
      console.log(err.response)
      setError("Failed to place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`flex items-center gap-2 ${step === 'customer' ? 'text-violet-600' : 'text-green-500'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white
                  ${step === 'customer' ? 'bg-violet-600' : 'bg-green-500'}`}>
                  {step === 'order' ? '✓' : '1'}
                </div>
                <span className="text-sm font-semibold">Customer</span>
              </div>

              <div className={`flex-1 h-0.5 ${step === 'order' ? 'bg-violet-600' : 'bg-gray-200'}`} />

              <div className={`flex items-center gap-2 ${step === 'order' ? 'text-violet-600' : 'text-gray-400'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white
                  ${step === 'order' ? 'bg-violet-600' : 'bg-gray-300'}`}>
                  2
                </div>
                <span className="text-sm font-semibold">Order</span>
              </div>
            </div>

            {/* Header */}
            <div className="relative flex items-center gap-3 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {step === 'customer' ? 'Add Customer' : 'Add Order'}
                </h1>
                <p className="text-sm text-gray-500">
                  {step === 'customer'
                    ? 'Enter customer details below'
                    : `For: ${newCustomer?.customer_name}`}
                </p>
              </div>
              <button
                onClick={closeModal}
                type="button"
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            {/* STEP 1: Customer Form */}
            {step === 'customer' && (
              <form className="space-y-5" onSubmit={submitCustomer}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Customer Name</label>
                  <input
                    name="customer_name"
                    value={customerInput.customer_name}
                    onChange={setCustomerField}
                    type="text"
                    placeholder="Enter customer name"
                    required
                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                  <input
                    name="Phone"
                    value={customerInput.Phone}
                    onChange={setCustomerField}
                    type="text"
                    placeholder="Enter phone number"
                    required
                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Address</label>
                  <textarea
                    name="Address"
                    value={customerInput.Address}
                    onChange={setCustomerField}
                    placeholder="Enter address"
                    rows={3}
                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-md"
                >
                  {loading ? 'Saving...' : 'Next: Add Order →'}
                </button>
              </form>
            )}

            {/* STEP 2: Order Form */}
            {step === 'order' && (
              <form className="space-y-5" onSubmit={submitOrder}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Cloth Type</label>
                  <input
                    name="clothType"
                    value={orderInput.clothType}
                    onChange={setOrderField}
                    type="text"
                    placeholder="e.g. Shirt, Pant, Saree"
                    required
                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                
                

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Price (₹)</label>
                    <input
                      name="price"
                      value={orderInput.price}
                      onChange={setOrderField}
                      type="number"
                      placeholder="0"
                      required
                      className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Advance (₹)</label>
                    <input
                      name="advancePaid"
                      value={orderInput.advancePaid}
                      onChange={setOrderField}
                      type="number"
                      placeholder="0"
                      required
                      className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Expected Delivery Date</label>
                  <input
                    name="expectedDeliveryDate"
                    value={orderInput.expectedDeliveryDate}
                    onChange={setOrderField}
                    type="date"
                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    Skip Order
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-md"
                  >
                    {loading ? 'Placing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  )
}