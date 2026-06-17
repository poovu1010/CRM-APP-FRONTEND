import { Filter, FilterIcon, FilterX, PlusCircle, PlusIcon } from 'lucide-react'
import React, { useContext } from 'react'
import BottomBar from '../components/Bottombar'
import { Outlet } from 'react-router-dom'
import AuthDetails from '../context/AuthContext'
import AddCustomer from '../components/AddCustomer'
import DashboardGrid from '../pages/DashBoard'

export default function OrderPageLayout() {

     const {isOpen,setopen} = useContext(AuthDetails)

    function openTogglefun(){
        setopen(!isOpen)
    }

    return (
        <div className='min-h-screen md:ml-50  px-4 py-3'>
            {/* heading */}
            <header className='flex justify-between '>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-bold '>Orders</h1>
                    <p className='text-xs text-gray-700'>Manage and track all Customers and oreders</p>
                </div>

                {/* buttons */}
                <div className='flex gap-5'>
                    {/* <button><Filter size={10} className='border rounded-lg h-10 w-10 p-2 text-violet-400 bg-violet-50 border-gray-400 shrink-0' /></button> */}
                    <button onClick={openTogglefun}><PlusIcon size={20} className='border rounded-lg h-10 w-10 p-2 text-white bg-violet-400 border-gray-400 shrink-0' /></button>
                </div>

            </header>

            <main className='mt-4  flex flex-col gap-5 pb-25 md:pb-5'>
                <DashboardGrid/>
                <AddCustomer/>
                <Outlet />
            </main>
            <BottomBar />


        </div>
    )
}
