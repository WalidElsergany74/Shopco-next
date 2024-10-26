"use client"
import React from 'react'
import dynamic from 'next/dynamic';
import ButtonIcon from './ui/ButtonIcon';

import Link from 'next/link';

import {  useUser } from '@clerk/nextjs';



const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });
const SignInButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignInButton), { ssr: false });






const NavAdmin = () => {
  const { isSignedIn } = useUser();
  
  const user = useUser()
 

  











 






 
  return (
    <>
  
    <nav className="flex justify-between items-center py-4 px-6 border-b border-b-gray-300 ">
    {/* Menu icon for small screens */}
   <Link className='flex-1 font-medium text-lg hover:text-stone-600' href={"/"}>Home</Link>



  

  
 
    

    <div className="flex items-center gap-0.5   md:gap-1 lg:gap-2">


    {user && user.user?.primaryEmailAddress?.emailAddress === "walidemad998@gmail.com" && (
          <Link href={"/admin"}>
            <ButtonIcon className='bg-black  text-white   py-1 px-2 rounded-xl'>Admin</ButtonIcon>
          </Link>
         )}    
       
         {isSignedIn ? (
          // Show UserButton when signed in
          <UserButton   />
        ) : (
          // Show SignInButton when signed out
          <SignInButton  />
        )}
        
 

      
    </div>
   
  </nav>

   

 </>
  )
}

export default NavAdmin
