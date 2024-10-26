import { getSubCategories } from '@/actions/action'
import SubAdmin from '@/app/components/SubAdmin'
import React from 'react'




export const metadata = {
  title: "New Subcategory | ShopCo Admin Dashboard",
  description: "Add new subcategories to your product categories through ShopCo's admin dashboard. Easily manage subcategories like T-shirts, trousers, and shoes for men's and women's fashion, ensuring a seamless shopping experience.",
  keywords: "add subcategory, edit and delete subcategory ShopCo admin, subcategory management, product subcategories, men's fashion, women's fashion, online clothing store, T-shirts, trousers, shoes, admin dashboard",
};


const page = async () => {
    const subs =  await getSubCategories()
  return (
   <>
   <SubAdmin subs={subs?.data}/>
   </>
  )
}

export default page
