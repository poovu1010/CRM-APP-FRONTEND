import React, { useContext, useState } from 'react'
import AuthDetails from '../context/AuthContext'
import axios from 'axios'
import api from '../api/axios'

export default function OrdersPage() {

    const { Orders, getAllorders } = useContext(AuthDetails)

    const [loadingId, setLoadingId] = useState(null)

    async function deleteOrder(id) {

        try {

            setLoadingId(id)

            await api.delete(
                `/Owner/deleteOrder/${id}`,
                {
                    withCredentials: true
                }
            )

            const filteredOrders = Orders.filter(
                order => order._id !== id
            )

            getAllorders(filteredOrders)

        } catch (error) {

            console.log(error)

        } finally {

            setLoadingId(null)
        }
    }

    async function updateStatus(id, status) {

        try {

            setLoadingId(id)

            const res = await api.put(
                `/Owner/updateOrder/${id}`,
                {
                    status
                },
                {
                    withCredentials: true
                }
            )

            const updatedOrders = Orders.map(order => {

                if (order._id === id) {

                    return {
                        ...order,
                        status: res.data.updated.status
                    }
                }

                return order
            })

            getAllorders(updatedOrders)

        } catch (error) {

            console.log(error)

        } finally {

            setLoadingId(null)
        }
    }

    return (

        <div className=" bg-gray-100 p-5">

            {/* HEADER */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-800">
                    Orders
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage tailoring orders easily
                </p>

            </div>

            {/* EMPTY */}

            {Orders?.length === 0 && (

                <div className="bg-white rounded-3xl p-10 text-center shadow">

                    <h2 className="text-2xl font-bold text-gray-700">
                        No Orders Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Add your first customer order
                    </p>

                </div>
            )}

            {/* ORDERS */}

            <div className="grid gap-6">

                {Orders?.map(order => (

                    <div
                        key={order._id}
                        className="bg-white rounded-3xl shadow-md p-6 border border-gray-100"
                    >

                        {/* TOP SECTION */}

                        <div className="flex justify-between items-start">

                            <div>

                                <h2 className="text-2xl font-bold text-gray-800">
                                    {order.customerId?.customer_name}
                                </h2>

                                <div className="mt-3 space-y-1">

                                    <p className="text-gray-600">
                                        📞 {order.customerId?.Phone}
                                    </p>

                                    <p className="text-gray-600">
                                        👕 {order.clothType}
                                    </p>

                                </div>

                            </div>

                            {/* STATUS */}

                            <div>

                                <span className={`
                                    px-4 py-2 rounded-full text-sm font-bold capitalize

                                    ${order.status === "stitching"
                                        ? "bg-yellow-100 text-yellow-700"

                                        : order.status === "ready"
                                        ? "bg-blue-100 text-blue-700"

                                        : "bg-green-100 text-green-700"
                                    }
                                `}>
                                    {order.status}
                                </span>

                            </div>

                        </div>

                        {/* PRICE CARDS */}

                        <div className="grid grid-cols-2 gap-4 mt-6">

                            <div className="bg-violet-50 rounded-2xl p-4">

                                <p className="text-sm text-gray-500">
                                    Total Price
                                </p>

                                <h3 className="text-2xl font-bold text-violet-700 mt-1">
                                    ₹{order.price}
                                </h3>

                            </div>

                            <div className="bg-green-50 rounded-2xl p-4">

                                <p className="text-sm text-gray-500">
                                    Advance Paid
                                </p>

                                <h3 className="text-2xl font-bold text-green-700 mt-1">
                                    ₹{order.advancePaid}
                                </h3>

                            </div>

                        </div>

                        {/* DELIVERY DATE */}

                        <div className="mt-5">

                            <p className="text-sm text-gray-500">
                                Expected Delivery Date
                            </p>

                            <p className="font-semibold text-lg text-gray-800 mt-1">
                                {new Date(
                                    order.expectedDeliveryDate
                                ).toLocaleDateString()}
                            </p>

                        </div>

                        {/* ACTIONS */}

                        <div className="mt-6 flex flex-col sm:flex-row gap-3">

                            {/* STATUS UPDATE */}

                            <select
                                value={order.status}
                                disabled={loadingId === order._id}
                                onChange={(e) =>
                                    updateStatus(
                                        order._id,
                                        e.target.value
                                    )
                                }
                                className="border border-gray-300 rounded-xl px-4 py-3 outline-none font-medium"
                            >

                                <option value="stitching">
                                    Stitching
                                </option>

                                <option value="ready">
                                    Ready
                                </option>

                                <option value="delivered">
                                    Delivered
                                </option>

                            </select>

                            {/* DELETE */}

                            <button
                                onClick={() =>
                                    deleteOrder(order._id)
                                }
                                disabled={loadingId === order._id}
                                className="bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                            >

                                {loadingId === order._id
                                    ? "Please wait..."
                                    : "Delete Order"}

                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}