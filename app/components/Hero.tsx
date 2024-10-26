import Image from 'next/image'
import React from 'react'
import hero from "@/app/public/Hero.png"
import hero2 from "@/app/public/Hero2.png" // form smaal screens
import ButtonIcon from './ui/ButtonIcon'
import brand1 from "@/app/public/brand1.png"
import brand2 from "@/app/public/brand2.png"
import brand3 from "@/app/public/brand3.png"
import brand4 from "@/app/public/brand4.png"
import brand5 from "@/app/public/brand5.png"
import star from "@/app/public/star.png"


const Hero = () => {
  return (
    <div className='relative w-full min-h-screen mb-20  flex items-center'>
         <Image
          priority={true}
          quality={100}
          className='  absolute hidden xl:block top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2'
          src={star}
          alt='Hero image....'
        />
      <Image
          priority={true}
          quality={100}
          className='  absolute w-[70px] hidden xl:block z-10 right-10 top-20'
          src={star}
          alt='Hero image....'
        />
      {/* Images*/}
     <div className='flex flex-col md:flex-none flex-1 '>
  
     <div className="md:absolute order-2   md:inset-0 md:z-0 w-full h-full">

        <Image
          priority={true}
          quality={100}
          className='w-full h-full object-cover hidden md:block'
          src={hero}
          alt='Hero image....'
        />
        <Image
          priority={true}
          quality={100}
          className='w-full h-full object-cover block md:hidden'
          src={hero2}
          alt='Hero image....'
        />
      </div>

      {/*Text content */}
      <div className="relative z-10 order-1   w-full p-6 lg:p-12 bg-[#F2F0F1]  md:bg-transparent">
        <div className='max-w-xl text-center lg:text-left '>
          <h3 className='font-extrabold lg:leading-[64px] text-4xl md:text-5xl lg:text-6xl uppercase'>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h3>
          <p className='text-gray-500 my-5'>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <ButtonIcon className="bg-black text-white py-3 px-4 rounded-full hover:bg-white hover:text-black">
            Shop Now
          </ButtonIcon>

          <div className="flex justify-center flex-wrap lg:justify-start items-center gap-8 mt-5">
            <div>
              <span className="block text-3xl md:text-4xl 
              
              font-bold">200+</span>
              <span className="block text-sm md:text-lg text-gray-500">International Brands</span>
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-bold">2,000+</span>
              <span className="block text-sm md:text-lg text-gray-500">Happy Customers</span>
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-bold">30,000+</span>
              <span className="block text-sm md:text-lg text-gray-500">Unique Products</span>
            </div>
          </div>
        </div>
      </div>
          

     </div>
      

       <div className="flex justify-center md:justify-evenly flex-wrap gap-4 absolute -bottom-20 left-0  items-center  uppercase     bg-black w-full  py-8 px-2 ">
       <Image
          priority={true}
          quality={100}
          
          className='w-[116px] h-[23px] md:w-[166px] md:h-[34px]'
          src={brand1}
          alt='Hero image....'
        />
       <Image
          priority={true}
          quality={100}
          
          className='w-[63px] h-[26px] md:w-[96px] md:h-[38px] '
          src={brand2}
          alt='Hero image....'
        />
       <Image
          priority={true}
          quality={100}
         
          className=' w-[109px] h-[23px] md:w-[194px] md:h-[36px]'
          src={brand3}
          alt='Hero image....'
        />
       <Image
          priority={true}
          quality={100}
         
          className='w-[127px] h-[21px] md:w-[194px] md:h-[32px] '
          src={brand4}
          alt='Hero image....'
        />
       <Image
          priority={true}
          quality={100}
         
          className='w-[134px] h-[21px] md:w-[206px] md:h-[33px] '
          src={brand5}
          alt='Hero image....'
        />

      </div>
      
    


    </div>



  )
}

export default Hero
