import React from 'react'
import MyOrders from '../components/MyOrders'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { getOrders } from '@/actions/action';
import { auth } from '@clerk/nextjs/server';



export const metadata = {
    title: ' Orders ',
    description: 'View and manage all customer orders . Track order statuses, amounts, and more.',
    keywords: ' orders, e-commerce, view orders, track orders, order statuses',
    openGraph: {
      title: ' Orders ',
      description: 'View and review all  orders ',
      type: 'website',
    },
  };
const page = async () => {
    const {userId} = auth()
    const orders = await getOrders(userId)
  return (
    <>
    <Header />
     <MyOrders initialOrders={orders} />
     <Footer/>
    </>
  
  )
}

export default page
