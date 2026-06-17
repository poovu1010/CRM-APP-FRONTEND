import {
    User,
    Phone,
    MapPin,
    ClipboardList,
    Calendar,
    IndianRupee,
    ShoppingBag,
    Notebook,
    EditIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Skeleton from "react-loading-skeleton";

export default function OrderDetail() {
    const { name, id } = useParams();
    const [order,setOrders] =useState(null)
    const [loading,setLoading] = useState(false)
   


   


    async function GetAllDetails() {
        try {
            setLoading(true)
        console.log(id)
        const GetOrderRes = await api.get(`/Owner/getSingle-order/${id}`)
        const orderData = GetOrderRes.data.data[0]
        console.log(orderData)
        setOrders(orderData)
            
        } catch(error) {
           console.log(error.message)
        }finally{
            setLoading(false)
        }
        
     }
 useEffect(() => {
        GetAllDetails()
    },[])

    const statusColors = {
        Queue: "bg-slate-100 text-slate-700",
        Processing: "bg-blue-100 text-blue-700",
        Stitching: "bg-amber-100 text-amber-700",
        Ready: "bg-green-100 text-green-700",
        Delivered: "bg-purple-100 text-purple-700",
    };


    if (loading) {
        return(
            <>
                <div className="flex flex-col gap-5">
                    <div>
                        <Skeleton  height={20}/>
                    </div>

                    <div className="flex gap-3 flex-col bg-gray-200 rounded-2xl p-4">
                        <Skeleton circle width={50} height={50} borderRadius={30}  baseColor="#FFFFFF"/>
                        <Skeleton count={5}  baseColor="#FFFFFF"/>
                    </div>
                    <div className="flex gap-3 flex-col bg-gray-200 rounded-2xl p-4">
                        <Skeleton circle width={50} height={50} borderRadius={30}  baseColor="#FFFFFF"/>
                        <Skeleton count={5}  baseColor="#FFFFFF"/>
                    </div>
                    <div className="flex gap-3 flex-col bg-gray-200 rounded-2xl p-4">
                        <Skeleton circle width={50} height={50} borderRadius={30}  baseColor="#FFFFFF"/>
                        <Skeleton count={5}  baseColor="#FFFFFF"/>
                    </div>
                    </div>            
            </>
        )
    }

    return (
        <section className="min-h-screen bg-gray-50 space-y-3 max-w-4xl mx-auto">

            
            <div className="flex justify-center items-center">
               

                <div className="flex justify-between items-center mb-4">
                    {["Queue", "Processing", "Stitching", "Ready", "Delivered"].map(
                        (status, index) => (
                            <div
                                key={status}
                                className={`px-2 min-w-0 py-1 rounded-full text-xs font-medium ${order?.status === status
                                    ? statusColors[status]
                                    : "bg-gray-100 text-gray-400"
                                    }`}
                            >
                                <p className="truncate">{status}</p>
                            </div>
                        )
                    )}
                </div>
            </div>

            
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">
                        <User size={20} />
                    </div>
                    <h2 className="font-bold">Customer Details</h2>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-[24px_1fr_1.4fr] gap-2">
                        <User size={17} className="text-gray-500" />
                        <p className="text-gray-500">Name</p>
                        <p className="font-medium text-right">
                            {order?.CustomerDetail?.customer_name}
                        </p>
                    </div>

                    <div className="grid grid-cols-[24px_1fr_1.4fr] gap-2">
                        <Phone size={17} className="text-gray-500" />
                        <p className="text-gray-500">Phone</p>
                        <p className="font-medium text-right">
                            +91 {order?.CustomerDetail?.Phone}
                        </p>
                    </div>

                    <div className="grid grid-cols-[24px_1fr_1.4fr] gap-2">
                        <MapPin size={17} className="text-gray-500" />
                        <p className="text-gray-500">Address</p>
                        <p className="font-medium text-right">
                            {order?.CustomerDetail?.Addres}
                        </p>
                    </div>
                </div>
            </div>

           
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <ClipboardList size={20} />
                    </div>
                    <h2 className="font-bold">Order Summary</h2>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-[24px_1fr_1.4fr] gap-2">
                        <ShoppingBag size={17} className="text-gray-500" />
                        <p className="text-gray-500">Cloth Type</p>
                        <p className="font-medium text-right">{order?.clothType}</p>
                    </div>

                    <div className="grid grid-cols-[24px_1fr_1.4fr] gap-2">
                        <Calendar size={17} className="text-gray-500" />
                        <p className="text-gray-500">Order Date</p>
                        <p className="font-medium text-right">
                            {new Date(order?.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>

                    <div className="grid grid-cols-[24px_1fr_1.4fr] gap-2">
                        <Calendar size={17} className="text-gray-500" />
                        <p className="text-gray-500">Delivery Date</p>
                        <p className="font-medium text-right">
                            {new Date(order?.expectedDeliveryDate).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>

                    <div className="grid grid-cols-[24px_1fr_1.4fr] gap-2">
                        <ClipboardList size={17} className="text-gray-500" />
                        <p className="text-gray-500">Status</p>
                        <p className="ml-auto w-fit rounded-lg bg-green-100 px-2 py-0.5 font-medium text-green-700">
                            {order?.status}
                        </p>
                    </div>
                </div>
            </div>

           
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <IndianRupee size={20} />
                    </div>
                    <h2 className="font-bold">Pricing Details</h2>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <p>Total Amount</p>
                        <p className="font-bold">₹{order?.price}</p>
                    </div>

                    <div className="flex justify-between text-green-600">
                        <p>Advance Paid</p>
                        <p className="font-bold">₹{order?.advancePaid}</p>
                    </div>

                    <div className="flex justify-between text-blue-600">
                        <p>Received Amount</p>
                        <p className="font-bold">₹{order?.receivedAmount}</p>
                    </div>

                    <div className="flex justify-between bg-red-50 text-red-600 p-3 rounded-xl font-bold">
                        <p>Balance Amount</p>
                        <p>₹{order?.balanceAmount}</p>
                    </div>

                    <div className="flex justify-between">
                        <p>Payment Status</p>
                        <p className="rounded-lg bg-green-100 px-2 py-0.5 font-medium text-green-700">
                            {order?.paymentStatus}
                        </p>
                    </div>
                </div>
            </div>

      
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                        <Notebook size={20} />
                    </div>
                    <h2 className="font-bold">Order Notes</h2>
                </div>

                <p className="text-sm text-gray-600">{order?.notes}</p>
            </div>

             <button className="flex gap-2 w-full justify-center bg-violet-500 text-white h-10 px-4 items-center rounded-xl">
                    <EditIcon size={18} />
                    <p className="text-sm font-medium">Update Status</p>
                </button>
        </section>
    );
}