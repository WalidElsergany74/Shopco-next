import { getOrdersAdmin } from '@/actions/action'
import OrdersAdmin from '@/app/components/OrdersAdmin'
import React from 'react'




export const metadata = {
    title: 'Admin Orders ',
    description: 'View and manage all customer orders in the admin dashboard. Track order statuses, amounts, and more.',
    keywords: 'admin, orders, e-commerce, manage orders, track orders, order statuses',
    openGraph: {
      title: 'Admin Orders - ShopCo.',
      description: 'View and manage all customer orders in the admin dashboard.',
      type: 'website',
    },
  };

const page = async () => {
    const orders = await getOrdersAdmin()
    const totalItems = orders?.meta?.pagination?.total || 0;
  return (
    <div className="products flex flex-col justify-center  ">
        <h1 className="text-3xl font-extrabold tracking-wider">Orders</h1>
       
             
           <OrdersAdmin initialOrders={orders} totalItems={totalItems}/>
       
        </div>   
 
  )
}

export default page
