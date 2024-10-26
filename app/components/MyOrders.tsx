"use client"
import React, { useState } from 'react'
import { IOrderResponse } from '../interfaces';

const MyOrders = ({ initialOrders }: { initialOrders: IOrderResponse }) => {
    const [orders, setOrders] = useState<IOrderResponse>(initialOrders);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,
        });
        return `${formattedDate} at ${formattedTime}`;
    };

  return (
    <div className='min-h-screen py-5 px-6'>
     <div className="flex flex-col  p-4">
       <h3 className='text-2xl font-bold capatilize tracking-wider'>My Orders</h3>
     
       {orders?.data?.length === 0 ? (
                <p>No Orders Created Yet</p>
            ) : (
                <div className="relative mt-4  flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-b text-center border-slate-200 bg-slate-50">Date</th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">Order ID</th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">Order Amount</th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">Order Status</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.data?.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 border-b cursor-pointer border-slate-200">
                                    <td className="p-4 py-5 text-center">{formatDate(item.createdAt)}</td>
                                    <td className="p-4 py-5 text-center">{item.documentId}</td>
                                    <td className="p-4 py-5 text-center text-slate-700 font-semibold">{item.amount}$</td>
                                    <td className={`p-4 py-5 text-center capitalize ${item.orderstatus === "delivered" ? "text-green-500" : "text-red-500"}`}>
                                    {item.orderstatus}
                                    </td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>

                   
                </div>
            )}
     </div>
    </div>
  )
}

export default MyOrders
