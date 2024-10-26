"use client";

import React, { useState } from 'react';

import { MdOutlineShoppingBag } from "react-icons/md";
import ButtonIcon from './ButtonIcon';
import Link from 'next/link';

import { ICartItem, IProduct } from '@/app/interfaces';
import Image from 'next/image';

import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';





  
  interface ICardProps {
    item: IProduct;
    toggleDrawer: () => void;
    showSizes: boolean;
    toggleShowSizes: () => void; 
  }

const Card = ({   item, toggleDrawer, showSizes, toggleShowSizes  } : ICardProps) => {
    const discountPercentage = Math.round(((item?.oldPrice - item?.price) / item?.oldPrice) * 100);
    
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
   
    const {userId} = useAuth()
    const router = useRouter();
    const fetcher = async (url: string) => {
        const response = await axios.get(url);
        return response.data.data; // Assuming the user has only one cart
      };
      
     
      const { data: existingCart, mutate } = useSWR(
        userId ? `${process.env.NEXT_STRAPI_URL}/carts?populate=cart_items&filters[userId][$eq]=${userId}` : null,
        fetcher, {refreshInterval : 1000}
      );

      const cartProducts: ICartItem[] = existingCart?.cart_items || [];

    
      const handleAddToCart = async (size: string) => {
        if (!userId) {
            toast.error('You must sign-in to add products to cart', {
                duration: 4000,
                position: 'top-center',
            });
            router.push('/sign-in');
            return;
        }
    
        setSelectedSize(size);
        const quantity = 1;
        const totalItemPrice = item.price * quantity;
    
        const cartData = {
            productId: item.documentId,
            size,
            quantity,
            price: item.price,
            totalItem: totalItemPrice,
            name: item.title,
            image: item?.img1?.url,
        };
    
        try {
            let updatedCart;
            
            console.log("Existing cart data:", existingCart);
            if (!existingCart || existingCart.length === 0) {
                
                console.log("Creating a new cart with data:", cartData);
                const newCartResponse = await axios.post(`${process.env.NEXT_STRAPI_URL}/carts`, {
                    data: {
                        userId: userId,
                        cart_items: cartProducts.map((item) => ({
                          id: item.id, 
                        })),
                    },
                });
                updatedCart = newCartResponse.data.data;
            } else {
             
                updatedCart = existingCart[0]; 
            }
    
            const existingCartItems = updatedCart.cart_items || [];
            
      
            const existingItem = existingCartItems.find(
                (cartItem: ICartItem) =>
                    cartItem.productId === item.documentId && cartItem.size === size
            );
    
            if (existingItem) {
             
                const newQuantity = existingItem.quantity + 1;
                const updatedTotalItemPrice = item.price * newQuantity;
    
              
                console.log("Updating existing cart item:", existingItem);
                await axios.put(`${process.env.NEXT_STRAPI_URL}/cart-items/${existingItem.documentId}`, {
                  data: {
                              quantity: newQuantity,
                              totalItem: updatedTotalItemPrice,
                              productId: item.documentId,
                              size,
                              name: existingItem.name,
                              image: existingItem.image, 
                              price : existingItem.price
                            }
                });
            } else {
              
                const addResponse = await axios.post(`${process.env.NEXT_STRAPI_URL}/cart-items`, { data: cartData });
    
                const updatedCartItems = [...existingCartItems, addResponse.data.data];
    
                // تحديث السلة بدمج العناصر القديمة والجديدة
                console.log("Updating cart with new items:", updatedCartItems);
                await axios.put(`${process.env.NEXT_STRAPI_URL}/carts/${updatedCart.documentId}`, {
                    data: {
                        cart_items: updatedCartItems.map((item: ICartItem) => item.documentId),
                    },
                });
            }
    
            // تحديث بيانات السلة باستخدام SWR mutate
            mutate();
            toast.success('Item added to cart successfully', {
                duration: 3000,
                position: 'top-center',
            });
        } catch (error) {
            console.error("Error while adding to cart:", error);
            toast.error('Error adding product to cart', {
                duration: 4000,
                position: 'top-center',
            });
        }
    
        toggleShowSizes();
        toggleDrawer();
    };
    
   

      

   
   
    

  

    return (
        <div className="relative flex flex-col items-start w-full ">
            {/* Image Wrapper */}
            <div className="relative group w-full">
                {item?.isNew && (
                    <div className="absolute top-[8px] right-0 bg-[#fff] text-[11px] lg:text-sm font-normal lg:font-medium text-center text-[##565656] tracking-[1px] uppercase px-2 py-1 z-10">
                        New Season
                    </div>
                )}

                {/* قائمة اختيار الأحجام */}
                <div className={`absolute bottom-0 bg-white  left-0 w-full transition-all duration-500  ${showSizes ? "translate-y-0 opacity-[0.8] z-10" : "translate-y-6 opacity-0 z-0"}`}>
                    <div className="p-4 flex flex-col items-center space-y-2">
                        <p className="text-center font-semibold text-gray-700">Add Size</p>
                        <div className="flex flex-wrap justify-center items-start gap-1">

                            {item?.sizes.map((size) => (
                                  <ButtonIcon 
                                  onClick={() => handleAddToCart(size.title)}
                                  key={size.id} className={`border flex justify-center border-gray-300 py-1 px-5 text-sm font-medium hover:outline-stone-500 hover:border-stone-500 hover:border-2 transition-all duration-100  focus:outline-none focus:ring-2 focus:ring-gray-400 ${selectedSize && "bg-black text-white"}`}>
                                {size.title}
                            </ButtonIcon>
                          
                            ))}
                          
                        </div>
                    </div>
                </div>

               <Link  href={`/product/${item?.documentId}`}>
               <Image
                    src={item?.img1?.url}
                    quality={85}
                     width={700}
                     height={500}
                    alt="Product"
                    className="w-full opacity-100 group-hover:opacity-0 inset-0 h-auto object-contain md:max-h-[400px] lg:max-h-[450px]"
                />
               </Link>
             <Link  href={`/product/${item?.documentId}`}>
             <Image
                    src={item?.img2?.url}
                    quality={85}
                     width={700}
                     height={500}
                    alt="Product Hover"
                    className="w-full opacity-0 group-hover:opacity-100 inset-0 h-auto object-contain absolute md:max-h-[400px] lg:max-h-[400px]"
                />
             </Link>
            </div>

            {/* Product Details */}
            <div className="flex flex-col w-full mt-2 space-y-3">
                <div className="flex flex-col lg:flex-1">
                    <h4 className="text-sm w-full lg:text-base font-medium truncate w-full]">
                        {/* {truncateTitle(item.title, 28)} */}
                        {item?.title}
                    </h4>

                    <div className="flex items-center gap-2 md:gap-3 mt-1">
                        <p className="text-gray-500 text-sm md:text-base capitalize">{item?.color?.title}</p>
                     
                    </div>

                    <div className="mt-2 flex items-center space-x-2 md:space-x-3">
                        {item?.oldPrice && (
                            <p className="line-through text-sm md:text-base text-gray-500">${item?.oldPrice}</p>
                        )}
                        <p className="text-sm md:text-base font-semibold text-gray-900">${item?.price}</p>

                        {item?.oldPrice && (
                            <p className="text-xs md:text-sm font-semibold text-red-500 bg-red-100  rounded-full px-2 py-1">
                                -{discountPercentage}%
                            </p>
                        )}
                    </div>
                </div>

                <ButtonIcon onClick={toggleShowSizes} className="mt-2 cursor-pointer lg:mt-0 w-full h-fit text-base md:text-lg rounded-md bg-black text-white flex items-center justify-center space-x-1 py-2 px-1 font-medium md:py-2 md:px-3">
                    <MdOutlineShoppingBag size={16} />
                    <span>Add</span>
                </ButtonIcon>
            </div>
            
        </div>

    );
}

export default Card;
