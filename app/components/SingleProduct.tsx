"use client";

import Image from "next/image";

import React, {  useState } from "react";
import {  FaStar } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import Drawer from "@/app/components/Drawer";
import ButtonIcon from "@/app/components/ui/ButtonIcon";
import { ICartItem, IProduct } from "../interfaces";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";




const SingleProduct = ({product , products} : {product : IProduct , products : IProduct[]}) => {
   
 
     
  const sameNameProducts = products?.filter(
    (item :IProduct) => item.title === product.title && item.documentId !== product.documentId
  );
 


   
    const [selectedSize, setSelectedSize] = useState("S"); 
    const [drawerOpen, setDrawerOpen] = useState(false); 
 
   
    
    const [selectedImage, setSelectedImage] = useState(product?.img1?.url);
    console.log(selectedImage)
  

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);
 
    const discountPercentage = Math.round(((product?.oldPrice - product?.price) / product?.oldPrice) * 100);
 
 
    const {userId} = useAuth()
    const router = useRouter();
    const fetcher = async (url: string) => {
        const response = await axios.get(url);
        return response.data.data[0]; // Assuming the user has only one cart
      };
      
      // استخدام SWR لجلب بيانات السلة
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
        const totalItemPrice = product.price * quantity;
    
        const cartData = {
            productId: product.documentId,
            size,
            quantity,
            price: product.price,
            totalItem: totalItemPrice,
            name: product.title,
            image: product?.img1?.url
        };
    
        try {
            let updatedCart;
            
            console.log("Existing cart data:", existingCart); // مراجعة السلة الحالية
            if (!existingCart || existingCart.length === 0) {
                // إنشاء سلة جديدة
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
                // استخدام السلة الحالية
                updatedCart = existingCart[0]; // لأن SWR قد يعيد قائمة بالسلات
            }
    
            const existingCartItems = updatedCart.cart_items || [];
            
            // التحقق مما إذا كان المنتج بالحجم المحدد موجود بالفعل في السلة
            const existingItem = existingCartItems.find(
                (cartItem: ICartItem) =>
                    cartItem.productId === product.documentId && cartItem.size === size
            );
    
            if (existingItem) {
                // تحديث الكمية إذا كان العنصر موجودًا
                const newQuantity = existingItem.quantity + 1;
                const updatedTotalItemPrice = product.price * newQuantity;
    
                // تحديث عنصر السلة
                console.log("Updating existing cart item:", existingItem);
                await axios.put(`${process.env.NEXT_STRAPI_URL}/cart-items/${existingItem.documentId}`, {
                  data: {
                              quantity: newQuantity,
                              totalItem: updatedTotalItemPrice,
                              productId: product.documentId,
                              size,
                              name: existingItem.name,
                              image: existingItem.image, 
                              price : existingItem.price
                            }
                });
            } else {
                // إضافة عنصر جديد إلى السلة
                console.log("Adding new item to cart:", cartData);
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
    
      
        toggleDrawer();
    };

  

  

  return (
    <div className="product pt-[30px] lg:px-[40px] min-h-screen ">
      <div className="container mx-auto">
        <div className="flex  flex-col lg:flex-row  gap-5 mb-5">
         
          <div className="left w-full md:w-full lg:w-[60%] flex flex-col md:flex-row lg:flex-row gap-5">
            <div className="images order-2 md:order-2 lg:order-1 flex flex-row md:flex-col lg:flex-col gap-3">
              <Image
                width={800}
                height={500}
                quality={85}
                className="w-auto  md:w-auto lg:w-full h-[150px]  object-contain md:object-contain  lg:object-cover cursor-pointer mb-[10px] "
                alt="..."
                src={product?.img1?.url}
                onClick={() => setSelectedImage(product?.img1?.url)}
              />
              <Image
              width={800}
              height={500}
              quality={85}
                className="w-auto  md:w-auto lg:w-full h-[150px]  object-contain md:object-contain  lg:object-cover cursor-pointer mb-[10px] "
                alt="..."
                src={product?.img2?.url}
                onClick={() => setSelectedImage(product?.img2?.url)}
              />
              <Image
             width={800}
             height={500}
             quality={85}
                className="w-auto  md:w-auto lg:w-full h-[150px]  object-contain md:object-contain  lg:object-cover cursor-pointer mb-[10px]   "
                alt="..."
                src={product?.img3?.url}
                onClick={() => setSelectedImage(product?.img3?.url)}
              />
            </div>
            <div className="mainImage order-1 md:order-1 lg:order-2  flex-1">
              <Image
               width={800}
               height={500}
               quality={85}
                className="w-full h-[auto]  lg:h-full object-center object-contain md:object-contain lg:object-cover cursor-pointer mb-[10px] "
                alt="main image"
                src={selectedImage} 
              />
            </div>
          </div>

          <div className="right w-full md:w-full lg:w-[40%] p-2  lg:p-8 ">
            <div className="details space-y-4">
              <h2 className="text-2xl font-semibold capitalize text-gray-800">
              {product.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
               {product.desc}
              </p>

             

            
              <div className="mt-2 flex items-center space-x-3">
               {product.oldPrice ? 
                <p className="line-through text-sm md:text-xl text-gray-500">
                ${product.oldPrice}
              </p>
               : ""}
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  ${product.price}
                </p>
               {product?.oldPrice ? 
                <p className="text-sm md:text-base font-semibold text-red-500 bg-red-100 rounded-full px-3 py-1">
                -{discountPercentage}%
              </p>
               : ""}
              </div>

              {/* الألوان المتاحة */}
              <div className="colors mt-4">
      <span className="text-lg font-medium text-gray-700">Available Colors:</span>
      <div className="images flex gap-3 mt-2">
        {sameNameProducts.length > 0 ? (
          sameNameProducts.map((item, index) => (
            <>
            
          <Link href={item?.documentId}>
          <Image
              key={index}
              quality={100}
              width={800}
              height={800}
              className="w-auto  h-[100px] object-contain md:object-contain lg:object-cover cursor-pointer"
              alt={`Color ${index + 1}`}
              src={item?.img1?.url} 
              
            />
          </Link>
            </>
           
          ))
        ) : (
          <span className="text-gray-500">No other colors available.</span>
        )}
      </div>
    </div>

           
              <div className="sizes mt-6">
                <span className="text-lg font-medium text-gray-700">
                  Choose Size:
                </span>
                <div className="flex gap-2 mt-2 flex-wrap">
                {product?.sizes?.map((size) => (
                    <ButtonIcon
                      key={size.id}
                      onClick={() => setSelectedSize(size.title)}
                      className={`size-btn px-4 py-2 rounded-md transition-all duration-300 border border-black 
                        ${  selectedSize === size.title
                          ? "bg-black text-white"
                          : "hover:bg-black hover:text-white"
                      }`}
                    >
                      {size.title}
                    </ButtonIcon>
                  ))}
                </div>
              </div>
            </div>

           
          

            <ButtonIcon  onClick={()=> handleAddToCart(selectedSize)}  className="mt-4 w-full text-lg rounded-md bg-black text-white py-3 px-6 font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition-all duration-300">
              <MdOutlineShoppingBag size={20} />
              <span>ADD TO CART</span>
            </ButtonIcon>

           
          </div>
        </div>

      </div>
  

 
  <Drawer openRight={drawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default SingleProduct;