"use client"
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaCartArrowDown } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { HiMiniCurrencyDollar } from "react-icons/hi2";

type OrderStatus = {
    placed: number;
    shipping: number;
    processing: number;
    delivered: number;
  };

const Dashboard = ({ orderStatus, totalOrders, totalProducts, totalEarnings } : {
    orderStatus : OrderStatus 
    totalOrders : number 
    totalProducts : number
    totalEarnings : number
}) => {
  const data = {
    labels: ['Placed', 'Processing', 'Shipping', 'Delivered'],
    datasets: [
      {
        label: 'Order Status',
        data: [
          orderStatus.placed || 0,
          orderStatus.shipping || 0,
          orderStatus.processing || 0,
          orderStatus.delivered || 0,
        ],
        backgroundColor: ['#ef4444','#4f46e5', '#f59e0b' , '#10b981' ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>
      
      <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 border-b-4 border-b-[#4f46e5]">
          <h3 className="text-gray-600 font-semibold mb-1">Total Orders</h3>
          <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-indigo-600">{totalOrders}</p>
          <FaCartArrowDown color='4f46e5' size={22} />
          </div>
          
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 border-b-4 border-b-[#10b981]">
          <h3 className="text-gray-600 font-semibold mb-1">Total Products</h3>
          <div className="flex justify-between items-center ">
            <p className="text-2xl font-bold text-green-500">{totalProducts}</p>
            <TiShoppingCart color="#10b981" size={24} />
          </div>
          
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 border-b-4 border-b-[#f59e0b]">
          <h3 className="text-gray-600 font-semibold mb-1">Total Earnings</h3>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-yellow-500">${totalEarnings}</p>
            <HiMiniCurrencyDollar size={24} color='#f59e0b'  />
          </div>
          
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h3 className="text-gray-600 font-semibold mb-4">Order Status Overview</h3>
        <div className='mx-auto w-full h-72'> 
        <Doughnut data={data} options={options} />
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
