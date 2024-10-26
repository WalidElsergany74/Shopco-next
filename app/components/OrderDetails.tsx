"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import Image from 'next/image'; // Ensure you import Image if using Next.js images
import { ICartItem, IOrder } from '../interfaces';
import axios from 'axios';
import ButtonIcon from './ui/ButtonIcon';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OrderDetails = ({ order } : {order : IOrder}) => {
    const orderCart = order?.cart_items || [];
    const orderShipping = order?.shipping || {};
    const [isLoading, setIsLoading] = useState(false)
     const router = useRouter()
    const [status, setStatus] = useState(order?.orderstatus || '');


    useEffect(() => {
        router.replace(`/admin/orders/${order?.documentId}`)
        router.refresh()
     }, [order?.documentId, router]);

    const handleStatusChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setStatus(event.target.value);
    };
  
    const handleClick = async () => {
        setIsLoading(true)
      try {
        await axios.put(`${process.env.NEXT_STRAPI_URL}/orders/${order.documentId}`, {
          data: {
            orderstatus: status,
          },
        });
        toast.success("Order status updated successfully");
        router.refresh()
        router.replace("/admin/orders")
        router.prefetch("/admin/orders")

      } catch (err : any) {
        toast.error("Error updating order status:", err);
      }finally{
        setIsLoading(false)
      }
    };
  
   

    return (
        <div className="p-3">
            <div className="flex flex-col">
                <h2 className="font-bold tracking-wider text-3xl">Order Details</h2>

                <div className="flex justify-between items-start flex-col md:flex-row space-y-3 md:space-y-0">
                    <div className="left flex-col gap-2">
                        <Link className="text-gray-400 mt-2 flex items-center" href="/admin/orders">
                            <LiaLongArrowAltLeftSolid size={18} className="mr-1" />
                            Back to Orders 
                        </Link>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-semibold text-lg">Order ID:</span>
                            <span className="text-gray-400">{order.documentId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-semibold text-lg">Order Amount:</span>
                            <span className="text-gray-400">${order.amount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-semibold text-lg">Order Status:</span>
                            <span className="text-gray-400 capitalize">{order.orderstatus}</span>
                        </div>
                        <div className="flex items-center gap-1">
                                <span className="text-slate-800 font-semibold text-base">Name:</span>
                                <span className="text-gray-400">{orderShipping.firstName} {orderShipping.lastname}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-slate-800 font-semibold text-base">Email:</span>
                                <span className="text-gray-400">{orderShipping.email}</span>
                            </div>
                    </div>

                    <div className="right">
                        <h4 className="font-semibold text-xl">Shipping Details</h4>
                        <div className="flex flex-col gap-1">
                          
                            <div className="flex items-center gap-1">
                                <span className="text-slate-800 font-semibold text-base w-[200px]">Country:
                              <span className="text-gray-400 ml-1">{orderShipping.country}</span>,
                                State:
                                 <span className="text-gray-400 ml-1">{orderShipping.state}</span>,
                               City:
                                 <span className="text-gray-400 ml-1">{orderShipping.city}</span>
                                </span>
                               
                            </div>
                           {orderShipping.phonenumber && (
                             <div className="flex items-center gap-1">
                             <span className="text-slate-800 font-semibold text-base">Phone:</span>
                             <span className="text-gray-400">{orderShipping.phonenumber}</span>
                         </div>
                           )}
                            <div className="flex items-start gap-1">
                                <span className="text-slate-800 font-semibold text-base">Address:</span>
                                <span className="text-gray-400">{orderShipping.address}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border mt-4">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Image</p>
                                </th>
                                <th className="p-4 border-b text-center border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Name</p>
                                </th>
                                <th className="p-4 border-b text-center border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Size</p>
                                </th>
                                <th className="p-4 border-b text-center border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Quantity</p>
                                </th>
                                <th className="p-4 border-b text-center border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Price</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderCart.map((item : ICartItem) => (
                                <tr key={item.id} className="hover:bg-slate-50 border-b cursor-pointer border-slate-200">
                                    <td className="p-4 py-5">
                                        <Image
                                            src={item.image}
                                            width={70}
                                            height={70}
                                            alt="Product Image"
                                            quality={85}
                                        />
                                    </td>
                                    <td className="p-4 py-5 text-center">
                                        <p className="text-sm text-slate-500">{item.name}</p>
                                    </td>
                                    <td className="p-4 py-5 text-center">
                                        <p className="text-sm text-slate-500 capitalize">{item.size}</p>
                                    </td>
                                    <td className="p-4 py-5 text-center">
                                        <p className="text-sm text-slate-500">{item.quantity}</p>
                                    </td>
                                    <td className="p-4 py-5 text-center">
                                        <p className="text-sm text-slate-500">${item.price}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className="p-4 bg-white shadow-lg rounded-lg max-w-md  border mt-5 border-gray-200">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Update Order Status</h3>
      
      <div className="mb-4">
        <label htmlFor="status-select" className="block text-gray-600 mb-1">
          Select New Status
        </label>
        <select
          id="status-select"
          value={status}
          onChange={handleStatusChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
        >
          <option value="" disabled>Select status</option>
          <option value="placed">Placed</option>
          <option value="processing">Processing</option>
          <option value="shipping">Shipping</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <ButtonIcon
      disabled={isLoading}

           onClick={handleClick}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-400 disabled:cursor-none font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
      >
       {isLoading ? "Updatting..." : " Update Status"}
      </ButtonIcon>
    </div>

                <div>

                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
