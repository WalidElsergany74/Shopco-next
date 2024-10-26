import React from 'react'
import Dashboard from '../components/Dashboard'
import { getOrdersAdmin, getProducts } from '@/actions/action'

const page = async () => {
  const orders = await getOrdersAdmin()
  const products = await getProducts()
  const totalOrders = orders.data?.length
  const totalEarnings = orders.data?.reduce((acc: any, order: { amount: any }) => acc + order.amount, 0) || 0;
  const totalProducts = products.data?.length
  const statusCounts = orders.data?.reduce((acc: { [x: string]: any }, order: { orderstatus: string | number }) => {
    acc[order.orderstatus] = (acc[order.orderstatus] || 0) + 1;
    return acc;
  }, {});
  return (
   <Dashboard totalEarnings={totalEarnings} totalProducts={totalProducts} totalOrders={totalOrders} orderStatus={statusCounts} />
  )
}

export default page
