import { getColorsAdmin } from '@/actions/action'
import ColorAdmin from '@/app/components/ColorAdmin'
import React from 'react'


export const metadata = {
  title: "New Color | ShopCo Admin Dashboard",
  description: "Add  and manage product colors in ShopCo's admin dashboard. Offer diverse color options such as red, white, yellow, blue, black, and more for men's and women's fashion items, ensuring a variety of choices for your customers.",
  keywords: "add color , edit color, delete color, ShopCo admin, color management, product colors, red, white, yellow, blue, black, men's fashion, women's fashion, admin dashboard",
};


const page = async () => {
    const colors = await getColorsAdmin()
  return (
    <>
     <ColorAdmin colors={colors?.data}/>
    </>
  )
}

export default page
