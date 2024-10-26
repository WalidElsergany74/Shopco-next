import { getSizes } from '@/actions/action'
import SizeAdmin from '@/app/components/SizeAdmin'
import React from 'react'



export const metadata = {
  title: "New Size | ShopCo Admin Dashboard",
  description: "Add and manage clothing sizes in ShopCo's admin dashboard. Define sizes like small, medium, large, XL, and XXL for men's and women's fashion, ensuring your store meets diverse customer needs.",
  keywords: "add , edit and delete size, ShopCo admin, size management, clothing sizes, small, medium, large, XL, XXL, men's fashion, women's fashion, admin dashboard",
  canonical: "https://yourdomain.com/admin/add-size"
};


const page = async () => {
    const sizes = await getSizes()
  return (
   <>
   <SizeAdmin sizes={sizes?.data}/>
   </>
  )
}

export default page
