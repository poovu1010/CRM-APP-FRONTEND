import React, { useContext, useEffect, useState } from 'react';
import AuthDetails from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../api/axios';

export default function CustomerPage() {
  const { Customers ,getCustomers} = useContext(AuthDetails);
  console.log(Customers)
  
  
  const [expandedId, setExpandedId] = useState(null);
  
let customerList = Customers?.data || [];

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };



  async function deleteCustomers(id){
    const isdeleted = await api.delete(
    // `http://localhost:5000/Owner/deleteCustomer/${id}`,
    `/Owner/deleteCustomer/${id}`,
    { withCredentials: true }
  );

  console.log(isdeleted.data);

  toast.success(isdeleted.data.message);

  const updatedCustomers = customerList.filter((value) => {
    return value._id !== id;
  });
  // customerList =  updatedCustomers
  getCustomers( {...Customers,data:updatedCustomers});
  }

 
 

  return (
    <div className="h-auto bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Directory</h1>

        {customerList.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No customers found.</p>
        ) : (
          <div className="space-y-4">
            {customerList.map((customer) => (
              <div 
                key={customer._id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200"
              >
                {/* Header Section (Always Visible & Clickable) */}
                <div
                  onClick={() => toggleExpand(customer._id)}
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 capitalize">
                      {customer.customer_name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {customer.Phone}
                    </p>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <div className="text-gray-400">
                    {expandedId === customer._id ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Expanded Details Section */}
                {expandedId === customer._id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <div className="mb-4 text-sm text-gray-700">
                      {/* Note: Using 'Addres' exactly as it appears in your console database log */}
                      <p><span className="font-medium text-gray-900">Address:</span> {customer.Addres || 'N/A'}</p>
                      <p><span className="font-medium text-gray-900">Added:</span> {new Date(customer.createdAt).toLocaleDateString()}</p>
                    </div>

                    {/* Action Buttons */}
                    <div  className="flex gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          console.log("Update clicked for", customer._id);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                      >
                        Update
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                         deleteCustomers(customer._id)
                        }}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}