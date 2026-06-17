import { ArrowLeft, BadgeCheck, Clock3, Contact, Contact2, Contact2Icon, ContactRound, ContactRoundIcon, Edit, Edit2, Home, Hourglass, IndianRupee, Locate, LocateFixed, LocateFixedIcon, LucideContact, Mail, MoveLeft, Phone, PhoneCall, PhoneCallIcon, PiIcon, PointerIcon, Scissors, ShoppingBag, StepBack, Truck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import { div } from 'framer-motion/client'
import Skeleton from 'react-loading-skeleton'

export default function CustomerDetails() {
    const navigate = useNavigate()
    const { name, id } = useParams()
    const [customerDetail,setCustomerDetail] = useState(null)
    const [OrderDetail,setOrderDetail] = useState(null);
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
         getAllInfo()
        
    },[id])
    // console.log(name)

    async function getAllInfo(){
        try{
            setLoading(true)
            const getall = await  api.get(`/Owner/get-single-customer-allInfo/${id}`)
            console.log(getall.data.data[0])
            setCustomerDetail(getall.data.data[0])
            setOrderDetail(getall.data.data[0].OrdersData)
            
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    } 

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
        <div className='h-full md:ml-51 '>
            {/* navbar */}
            <header className='border-b h-15  sticky top-0 bg-white shadow-xl  flex items-center justify-between px-5'>
                <div className='flex gap-5'>
                    <button onClick={()=>navigate("/dashboard/CustomerPage")}>
                    <ArrowLeft className='cursor-pointer hover:text-violet-400' />
                    </button>
                    <p>Customer Details</p>
                </div>

                <div className='flex gap-2 text-violet-500 cursor-pointer'>
                    <Edit2 />
                    <span>Edit</span>
                </div>

            </header>

            <main className='bg-gray-200 py-5 flex flex-col gap-3 px-3 h-full'>
                {/* detail div */}
                <div className='bg-white border md:flex-row md:justify-between gap-3 flex-col  py-4    border-violet-400  flex   px-4 h-auto rounded-xl '>

                    <div className='flex gap-4'>
                        {/* profil */}
                        <div className='h-20 rounded-full w-20 bg-black'>

                        </div>
                        <div className='flex flex-col gap-2'>

                            <p className='font-bold text-xl'>{name}</p>
                            <p className='flex gap-3 text-sm'> <Phone size={18} className='text-violet-500' /> {customerDetail?.Phone}</p>
                            <p className='flex gap-3 text-sm '> <Mail size={18} className='text-violet-400' />   {new Date(customerDetail?.createdAt).toLocaleDateString("en-IN",{
                                day:"2-digit",
                                month:"short",
                                year:"numeric"
                            })}</p>
                        </div>
                    </div>

                    {/* Amount due section */}
                    <div className='flex  flex-col  w-full md:max-w-50   text-xs border w-auto bg-gray-200 border-gray-300 p-1 rounded-xl gap-2'>
                        <div className='flex justify-between  gap-5 items-center'>
                            <p className=''>Total Orders</p>
                            <p className=' w-20'>{customerDetail?.totalOrder}</p>
                        </div>
                        <div className='flex gap-5 justify-between items-center'>
                            <p>Total Amount </p>
                            <p className='text-green-500 w-20 flex text-sm'><IndianRupee size={16}/> {customerDetail?.totalAmount}</p>
                        </div>
                        <div className='flex gap-5 justify-between items-center'>
                            <p>Total Orders</p>
                            <p className='w-20'>5</p>
                        </div>

                    </div>

                </div>

                {/* overview */}

                {/* customerInformation */}
                <div className=' w-full flex items-center  rounded-xl   '>
                    <p className='font-bold relative flex gap-2 items-center w-30 justify-center rounded-xl text-white bg-violet-400 h-10'> <Home className='text-white'/> Overview</p>

                </div>
                {/* contact info */}
                <div className='bg-white rounded-xl '>
                    <div className='font-bold py-3 px-3 '>
                        <p className='flex gap-3'> <ContactRoundIcon className='text-violet-800'/> Contact Information</p>
                    </div>
                    <div className='border'></div>
                    <div className=' mt-3 flex flex-col gap-2 py-1 px-3'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3'>
                                <PhoneCallIcon size={18} className='text-violet-400' />
                                <p>Phone</p>
                            </div>
                            <p>{customerDetail?.Phone}</p>
                            <Phone size={18} className='border h-8 w-8 p-1 text-violet-400 rounded-xl' />
                        </div>

                        {/* whatsapp */}
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3'>
                                <PhoneCallIcon size={18} className='text-violet-400' />
                                <p>Phone</p>
                            </div>
                            <p>{customerDetail?.Phone}</p>
                            <Phone className='border h-8 w-8 p-1 text-violet-400 rounded-xl' />
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3'>
                                <Mail size={18} className='text-violet-400' />
                                <p>Email</p>
                            </div>
                            <p>{customerDetail?.Email}</p>
                            <Mail className='border h-8 w-8 p-1 text-violet-400 rounded-xl' />
                        </div>
                    </div>
                </div>

                {/* ADDress */}
                <div className=' bg-white px-3 py-3 rounded-xl'>
                    <div className='flex gap-3'>
                        <LocateFixedIcon className='text-violet-400' />
                        <p className='font-bold'>Address</p>
                    </div>
                    
                    <p className='ml-15 mt-3'>
                        {customerDetail?.Addres}
                    </p>
                </div>

                {/* Recent- orders */}

                <div className='bg-white px-3 py-2 flex flex-col gap-3 rounded-xl'>
                    <div className='flex justify-between'>
                        <div className='flex gap-3 text-md'>
                            <ShoppingBag  className='text-violet-400'/>
                            <p> Recent-orders</p>
                        </div>
                        <button className='text-sm text-violet-500 cursor-pointer'> View all</button>




                    </div>
                    <div className='flex flex-col px-3 gap-4'>
                        {/* order detail */}
                            <div className='flex justify-between bg-violet-200 text-sm px-2 py-2 rounded-md'>
                                <p>items</p>
                                <p>Status</p>
                                <p>price</p>
                            </div>

                        {OrderDetail?.map((value,index)=>(
                            <div className='flex justify-between px-2 text-sm'>
                            <p>{value.clothType}</p>
                            {value.status == "Queue" && (
                                <div className=' bg-orange-100 h-8 px-4 flex gap-1 items-center rounded-xl'>
                                   <Hourglass size={17} className='text-orange-600 '/>
                                    <p>{value.status}</p>
                                </div>
                            )
                            }
                            {value.status == "Stitching" && (
                                <div className=' bg-orange-100 h-8 px-4 flex gap-1 text-violet-500 bg-violet-100 items-center rounded-xl'>
                                    <Scissors size={17} className=''/>
                                    <p>{value.status}</p>
                                </div>
                            )
                            
                            }
                            {value.status == "Ready" && (
                                <div className=' bg-orange-100 h-8 px-4 flex gap-1 text-green-500 bg-green-100 items-center rounded-xl'>
                                     <BadgeCheck size={17} className='text-green-600 '/>
                                    <p>{value.status}</p>
                                </div>
                            )}
                            {value.status == "Delivered" && (
                                <div className=' bg-orange-100 h-8 px-4 flex text-green-400 bg-green-100 gap-1 items-center rounded-xl'>
                                    <Truck
                                    size={17} className='text-green-600 '/>
                                    <p>{value.status}</p>
                                </div>
                            )}
                           
                            <p>{value.price}</p>
                        </div>
                        ))}
                       
                        
                    </div>
                </div>
            </main>
        </div>
    )
}
