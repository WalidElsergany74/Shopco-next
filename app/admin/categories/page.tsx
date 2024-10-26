import { getCateogries } from '@/actions/action'
import CatAdmin from '@/app/components/CatAdmin'
import React from 'react'



export const metadata = {
  title: " New Category | ShopCo Admin Dashboard",
  description: "Add , edit and delete new product categories to ShopCo's collection using the admin dashboard. Organize your inventory for men's and women's fashion including T-shirts, shirts, trousers, hats, and shoes, and keep your store updated with the latest categories.",
  keywords: "add category, ShopCo admin, category management, product categories, men's fashion, women's fashion, online clothing store, T-shirts, shirts, trousers, hats, shoes, admin dashboard",
};


const page = async () => {
    const categories = await getCateogries()
  return (
  <>
  <CatAdmin categories={categories?.data}/>
  </>
  )
}

export default page
