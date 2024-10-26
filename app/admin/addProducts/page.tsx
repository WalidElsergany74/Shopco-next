import { getFilterCats, getFilterColors, getSizes, getSubCategories } from '@/actions/action';
import AddProductDialog from '@/app/components/AddProduct'
import React from 'react'

export const metadata = {
  title: "Add New Product | ShopCo Admin Dashboard",
  description: "Easily add new products to ShopCo's collection through the admin dashboard. Manage inventory for men's and women's fashion including T-shirts, shorts, shirts, trousers, polo shirts, hats, and shoes. Streamline your product management and keep your online store updated with the latest trends.",
  keywords: "add new product, ShopCo admin, product management, inventory management, online clothing store, men's fashion, women's fashion, T-shirts, shorts, shirts, trousers, polo shirts, hats, shoes, admin dashboard",
};
const page = async () => {
    const cats = await getFilterCats()
    const subCats = await getSubCategories()
    const colors = await getFilterColors()
    const sizes  = await getSizes()
  
  return (
     <AddProductDialog sizes={sizes?.data} colors={colors} subCats={subCats?.data} cats={cats?.data}/>
  )
}

export default page
