import Image from 'next/image'
import React from 'react'
import verify from "@/app/public/verified.gif"
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'




export const metadata = {
	title: "Payment Successful - ShopCo | Men's and Women's Fashion",
	description: "Thank you for your purchase at ShopCo! Explore a wide range of clothing for men and women, including T-shirts, Shorts, Shirts, Trousers, Polo-Shirts, Hats, and Shoes. Shop the latest fashion trends with a seamless checkout process.",
	keywords: "payment successful, ShopCo, online clothing store, men's fashion, women's fashion, T-shirts, Shorts, Shirts, Trousers, Polo-Shirts, Hats, Shoes, fashion shopping, online store",
};


function PaymentConfirm() {
	return (
		<>
		<Header />
		<div className='flex p-4 min-h-screen flex-col items-center justify-center px-5 '>
			<Image src={verify}
				alt='check'
				width={130}
				height={130}
			/>
			<h2 className='text-[24px]'>Payment Successful !</h2>
			<h2 className='text-[17px] text-center mt-6 text-gray-500'>We sent an email with your
				order confirmation
				along with Digital Content</h2>
			<Link
				href="/"
				className='p-2 mt-6 bg-cyan-400 text-white rounded-md bg-primary'>
				Go to Home
                </Link>
          
		</div>
		<Footer/>
		</>
	)
}

export default PaymentConfirm