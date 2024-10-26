"use client"
import Link from 'next/link'
import React from 'react'
import ButtonIcon from './ui/ButtonIcon'
import Image from 'next/image'
import { ICategories } from '../interfaces'



interface CategoriesProps {
  cats: ICategories[];  
}

const Categories = ({cats} : CategoriesProps) => {

 


  return (
    <div className='py-16 min-h-[60vh]'>
      <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-20'>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
           
            {cats?.map((cat :ICategories) => (
         
       
    
                <div className="relative " key={cat.id} >
                  <Image
                  width={800}
                  height={500}
                  quality={85}
                    alt="categories"
                    src={cat?.img?.url}
                    className="object-cover w-full h-full"
                  />
                  <ButtonIcon className="absolute left-1/2 uppercase -translate-x-1/2 -translate-y-1/2 top-1/2 flex items-center justify-center bg-white p-2.5 hover:bg-blue-500 hover:text-white text-black font-semibold">
                 <Link className='' href={`/products/${cat.documentId}`} >{cat.title}</Link>
                 </ButtonIcon>
                </div>
               
                
            ))}
     
         


        </div>
      </div>
      
    </div>
  )
}

export default Categories;
