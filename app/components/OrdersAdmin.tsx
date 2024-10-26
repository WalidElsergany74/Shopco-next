"use client";
import React, { useState } from 'react';
import ButtonIcon from './ui/ButtonIcon';
import { IOrderResponse } from '../interfaces';

import { getOrdersAdmin } from '@/actions/action';

import { FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const OrdersAdmin = ({ initialOrders, totalItems }: { initialOrders: IOrderResponse, totalItems: number }) => {
    const [orders, setOrders] = useState<IOrderResponse>(initialOrders);
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Items per page
    const totalPages = Math.ceil(totalItems / pageSize);

    // Fetch orders for the current page
    const fetchOrders = async (page: number) => {
        const newOrders = await getOrdersAdmin(page);
        setOrders(newOrders);
    };

    // Handle page change
    const handlePageChange = async (newPage: number) => {
        setCurrentPage(newPage);
        await fetchOrders(newPage);
    };

    // Format date helper
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
        <>
            <div className="w-full flex justify-between my-5">
                <div className="flex flex-col justify-start space-y-3">
                    <h3 className="text-lg font-semibold text-slate-800">Table with Orders</h3>
                    <p className="text-slate-500">Open an order details to <strong>Change Order Status</strong></p>
                </div>
            </div>


            {orders?.data?.length === 0 ? (
                <p>No Orders Created Yet</p>
            ) : (
                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-b text-center border-slate-200 bg-slate-50">Date</th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">Order ID</th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">Order Amount</th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">Order Status</th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">Order Details</th>
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
                                    <td className="p-4 py-5 text-center">
                                        <div>
                                             <ButtonIcon
                                             onClick={() => router.push(`/admin/orders/${item.documentId}`)}
                                             className='bg-green-600 text-white py-2 px-2 rounded-lg'>
                                                <FaEye />
                                            </ButtonIcon> 
                                        </div>
                                  
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center px-4 py-3">
                        <div className="text-sm text-slate-500">
                            Showing <b>{orders?.data?.length}</b> of {totalItems}
                        </div>
                        <div className="flex space-x-1">
                            <ButtonIcon
                                className={`px-3 py-1 text-sm font-normal ${currentPage === 1 ? 'text-gray-400' : 'text-slate-500'} border border-slate-200 rounded`}
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </ButtonIcon>
                            {[...Array(totalPages)].map((_, i) => (
                                <ButtonIcon
                                    key={i}
                                    className={`px-3 py-1 text-sm font-normal ${i + 1 === currentPage ? 'bg-slate-800 text-white' : 'text-slate-500 border'} rounded`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </ButtonIcon>
                            ))}
                            <ButtonIcon
                                className={`px-3 py-1 text-sm font-normal ${currentPage === totalPages ? 'text-gray-400' : 'text-slate-500'} border border-slate-200 rounded`}
                                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </ButtonIcon>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrdersAdmin;
