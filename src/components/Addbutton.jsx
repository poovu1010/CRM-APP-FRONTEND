import React, { useContext, useState } from 'react';
import AuthDetails from '../context/AuthContext';
import { Shirt, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddCustomer from './AddCustomer';




export default function CustomerPage() {

    const {isOpen,setopen} = useContext(AuthDetails)

    function openTogglefun(){
        setopen(!isOpen)
    }

    return (


        <div>

            <AddCustomer/>

            <button
            onClick={openTogglefun}

                className="h-16 w-16 flex items-center justify-center bg-purple-600 text-white rounded-full fixed z-40 bottom-20 right-10 shadow-2xl hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all"
                title="Add New Customer"
            >
                <Shirt size={28} />
            </button>
        </div>
    );
}