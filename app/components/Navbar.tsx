"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import ButtonIcon from './ui/ButtonIcon';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { IoCartOutline } from 'react-icons/io5';
import Searchbar from './Searchbar';
import Drawer from './Drawer';
import Image from 'next/image';
import {  useAuth, useUser } from '@clerk/nextjs';
import useSWR from 'swr';
import { ICategories, IProduct } from '../interfaces';
import axios from 'axios';
import Loading from '../loading';


const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });
const SignInButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignInButton), { ssr: false });






const Navbar = () => {
  const { isSignedIn } = useUser();
    const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [openRight, setOpenRight] = useState(false);

  
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [filteredData, setFilteredData] = useState<IProduct[]>([]); 
  const {userId} = useAuth()
  const user = useUser()
  console.log(user)

  

  const fetcher = async (url: string) => {
      const response = await axios.get(url);
      return response.data.data; 
    };
    
    const { data: cartData } = useSWR(
      userId ? `${process.env.NEXT_STRAPI_URL}/carts?populate=cart_items&filters[userId][$eq]=${userId}` : null,
      fetcher,
      { refreshInterval: 1000 }
    );
  
   
    const cartItemsCount = cartData?.[0]?.cart_items?.length || 0;
   

   

    
   

  const { data: productsData } = useSWR(
    `${process.env.NEXT_STRAPI_URL}/products?populate=*`,
    fetcher
);


useEffect(() => {
  const products = productsData?.data || [];

  if (searchQuery) {
    const results = products.filter((item: IProduct) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(results);
  } else {
    setFilteredData([]);
  }
}, [ searchQuery]); 

  const { data: categories  } = useSWR(
    `${process.env.NEXT_STRAPI_URL}/categories`,
    fetcher
);







  const toggleDrawer = () => {
    setOpenRight(!openRight);
  };

 

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };





 
  return (
    <>
  
    <nav className="flex justify-between items-center py-4 px-6 ">
    {/* Menu icon for small screens */}
    <ButtonIcon
      onClick={toggleMenu}
      className="lg:hidden block mr-1 text-gray-600"
      aria-label="Open menu"
    >
      <AiOutlineMenu size={24} />
    </ButtonIcon>
    <Link href={"/"} className="uppercase flex-1 lg:flex-none text-center text-3xl font-extrabold tracking-wider">
      shopco.
    </Link>

    {/* Drawer for small screens */}
    <div className="relative">
  {/* Overlay with blur effect */}
  {menuOpen && (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
      onClick={toggleMenu} 
    ></div>
  )}

  {/* Drawer  */}
  <div
    className={`fixed top-0 left-0 w-full md:w-1/2 md:rounded-e-lg h-full bg-white shadow-lg transform transition-transform duration-300 
      ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden z-50`}
  >
    <div className="flex justify-between items-center p-4 border-b border-gray-100">
      <div className="flex justify-center flex-1">
        <Link href={"/"} className="uppercase text-3xl font-bold justify-end tracking-wider">
          shopco.
        </Link>
      </div>
      <ButtonIcon
        onClick={toggleMenu}
        className="text-gray-600 flex justify-end"
        aria-label="Close menu"
      >
        <AiOutlineClose size={24} />
      </ButtonIcon>
    </div>

    <ul className=" ">
      {!categories ? <Loading/> : (
        categories.map((cat : ICategories) => (
          <li className="border-b border-b-gray-100 w-full" key={cat.id}>
        <Link href={"/men"} className="text-xl tracking-widest uppercase font-bold hover:text-gray-500 py-3 px-5 hover:bg-gray-100 transition-colors duration-300 block">
          {cat.title}
        </Link>
       
      </li>
        ))
      )}

     <Link className=' justify-start items-center hover:bg-gray-100 transition-colors duration-300 hover:text-gray-500   md:hidden text-xl tracking-widest uppercase font-bold flex py-3 px-5 border-b border-b-gray-100  ' href={"/myOrders"}>
           My Orders
          </Link>
   {user && user.user?.primaryEmailAddress?.emailAddress === "walidemad998@gmail.com" && (
          <Link className='flex justify-center items-center ' href={"/admin"}>
            <ButtonIcon className='bg-black  text-white  mt-5  py-2 px-2 rounded-xl'>Admin</ButtonIcon>
          </Link>
         )}    

    </ul>
  </div>
</div>


    {/* Links for large screens */}
    <ul className="lg:flex justify-start items-center space-x-4 hidden uppercase font-medium">
    {
   !categories ? <Loading/> : (
    categories.map((cat : ICategories) => (
      <li key={cat.id}>
      <Link href={`/products/${cat.documentId}`} className="text-lg hover:text-gray-500">
       {cat.title}
      </Link>
    </li>
   ))
   )
   
   } 
    
    </ul>

    {/* Search bar for large screens */}
     <Searchbar searchVisible={searchVisible}/>
    

    <div className="flex items-center gap-0.5  md:gap-1 lg:gap-2">

        
        

   
     <Link className=' justify-center items-center text-base font-medium hidden md:flex hover:text-gray-500 ' href={"/myOrders"}>
           My Orders
          </Link>
  

    {user && user.user?.primaryEmailAddress?.emailAddress === "walidemad998@gmail.com" && (
          <Link href={"/admin"}>
            <ButtonIcon className='bg-black hidden sm:block text-white text-left   sm:py-2 sm:px-2 sm:rounded-xl'>Admin</ButtonIcon>
          </Link>
         )}    
       

      {/* Search icon for small screens */}
      <ButtonIcon
        onClick={toggleSearch}
        className="lg:hidden block text-gray-600 "
        aria-label="Search"
      >
        <BiSearch size={24} />
      </ButtonIcon>
            

        
         {isSignedIn ? (
          // Show UserButton when signed in
          <UserButton   />
        ) : (
          // Show SignInButton when signed out
          <SignInButton  />
        )}
        
    
      <ButtonIcon onClick={toggleDrawer}  className="flex items-center relative " >
        <IoCartOutline size={24} />
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full -top-3 -end-2">
          {cartItemsCount}
        </div>
      </ButtonIcon>

      
    </div>
    <Drawer openRight={openRight} toggleDrawer={toggleDrawer}/>
  </nav>

   
     

<div className={`relative  lg:hidden  transition-all duration-700 ${searchVisible ? 'translate-y-0 opacity-100 block ' : '-translate-y-1/2 opacity-0 hidden '}`}>
{filteredData.length > 0 && (
          <div className="absolute z-[999] bg-gray-50 shadow-lg overflow-scroll top-[55px] w-full flex flex-col p-3">
            {filteredData.map((product) => (
            <Link key={product.id} href={`/product/${product?.documentId}`} className='cursor-pointer hover:bg-gray-100'>
              <div  className="flex gap-3 items-center p-3 border-b">
                <div className="image pr-1">
                <Image
                   alt='Product Search'
                    className="w-full h-[100px] object-contain"
                    src={product?.img1?.url}
                    quality={85}
                     width={700}
                     height={500}
                  />
                </div>
                <div className="details flex flex-col flex-1">
                  <span className="uppercase block text-[#565656] tracking-widest text-sm font-[400] mb-1.5">
                    {product.title}
                  </span>
                  <span className="uppercase text-[#565656] mb-1.5 text-sm font-[400]">
                    price : ${product.price}
                  </span>
                </div>
              </div>
            </Link>
            ))}
          </div>
        )}
<div className="p-3">
  <label htmlFor="Search" className="sr-only">
    Search
  </label>
  <input
  value={searchQuery} 
  onChange={(e) => setSearchQuery(e.target.value)} 
    type="search"
    id="Search"
    placeholder="Search for products..."
    className="w-full rounded-full bg-[#F0F0F0] border-none outline-none py-3 px-4 shadow-sm sm:text-sm"
  />
  <span className="absolute inset-y-0 end-10 grid w-10 place-content-center">
    <ButtonIcon className="text-gray-600 hover:text-gray-700" aria-label="Search">
      <BiSearch />
    </ButtonIcon>
  </span>

 
</div>

</div> 
 </>
  )
}

export default Navbar
