"use client";
import React, { useEffect, useState } from "react";
import ButtonIcon from "./ui/ButtonIcon";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";
import SkeletonLoader from "./ui/SkeletonLoader";
import toast from "react-hot-toast";


import { useRouter } from "next/navigation";

interface IDrawer {
  openRight: boolean;
  toggleDrawer: () => void;
}

interface ICartItem {
  id: number;
  size: string;
  quantity: number;
  totalItem: number;
  name: string;
  image: string;
  documentId: string;
  price: number;
  productId: string;
  createdAt: string; // Add createdAt field for sorting
}

const Drawer = ({ openRight, toggleDrawer }: IDrawer) => {
  const { userId } = useAuth();
  const [subtotal, setSubtotal] = useState(0);
  const router= useRouter()
 
  const [items, setItems] = useState<ICartItem[]>([]);

  // Fetcher function with global loading state
  const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

  const { data: cartData, mutate, isLoading } = useSWR(
    userId ? `${process.env.NEXT_STRAPI_URL}/carts?populate=cart_items&filters[userId][$eq]=${userId}` : null,
    fetcher,
    // { suspense: true } // Enabling suspense for a global loading state
  );

  // Sort cart items by creation date
  useEffect(() => {
    if (cartData && cartData.length > 0) {
      const cartItems = cartData[0]?.cart_items || [];
      // Sort items by createdAt field
      const sortedItems = [...cartItems].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setItems(sortedItems);
    }
  }, [cartData]);

  useEffect(() => {
    const calculateSubtotal = (cartProducts: ICartItem[]) => {
      const totalAmount = cartProducts.reduce(
        (acc: number, item: ICartItem) => acc + item.totalItem,
        0
      );
      setSubtotal(totalAmount);
    };
    if (items.length > 0) {
      calculateSubtotal(items);
    }
  }, [items]);

  const handleClearCart = async () => {
    try {
      const cartId = cartData?.[0]?.documentId;
      if (!cartId) {
        console.log("No cart found for this user");
        return;
      }

      await axios.delete(`${process.env.NEXT_STRAPI_URL}/carts/${cartId}`);
      mutate(); // Refresh cart data
      setItems([]);
      setSubtotal(0);
    } catch (error) {
      console.error("Error clearing cart", error);
    }
  };

  const handleUpdateQuantity = async (itemId: string, change: number) => {
    try {
      const existsItem = items.find((item) => item.documentId === itemId);
      if (!existsItem) return;

      const updatedQuantity = existsItem.quantity + change;
      const productRes = await axios.get(`${process.env.NEXT_STRAPI_URL}/products/${existsItem.productId}`);
      const availableStock = productRes.data.data.stock;

      if (updatedQuantity > availableStock ) {
        toast.error("Stock is less than quantity  ", { duration: 4000, position: "top-center" });
        return;
      }

      if ( updatedQuantity < 1) {
        toast.error(" invalid quantity ", { duration: 4000, position: "top-center" });
        return;
      }

      const updatedPrice = updatedQuantity * existsItem.price;

      if (updatedQuantity === 0) {
        await axios.delete(`${process.env.NEXT_STRAPI_URL}/cart-items/${existsItem.documentId}`);
      } else {
        await axios.put(`${process.env.NEXT_STRAPI_URL}/cart-items/${existsItem.documentId}`, {
          data: { quantity: updatedQuantity, totalItem: updatedPrice },
        });
      }

      mutate(); // Refresh cart data
    } catch (error) {
      console.log("Error updating quantity", error);
    }
  };
  const handleRemoveItem = async (itemId: string) => {
    try {
      const foundItem = items.find((item) => item.documentId === itemId);
      
      if (!foundItem) return;
  
      // If this is the last item in the cart, delete the entire cart
      if (items.length === 1) {
        await handleClearCart(); // Clear the whole cart
        return;
      }
  
      // Otherwise, remove the item from the cart
      await axios.delete(`${process.env.NEXT_STRAPI_URL}/cart-items/${itemId}`);
  
      // After successful deletion, refresh the cart data
      mutate();
      
    } catch (error) {
      console.log("Error removing item", error);
    }
  };
  

  return (
    <div className="relative">
      {openRight && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-500"
          onClick={toggleDrawer}
        ></div>
      )}

      <div
        className={`fixed overflow-scroll top-0 right-0 w-3/4 md:w-1/2 lg:w-1/3 p-1 h-full bg-white transform transition-transform duration-500 
          ${openRight ? "translate-x-0" : "translate-x-full"} z-50`}
      >
        <div className="flex justify-between items-start p-4 border-t border-b border-gray-100">
          <span className="uppercase text-gray-500">Items in your bag</span>
          <ButtonIcon
            onClick={toggleDrawer}
            className="text-gray-600 flex justify-end"
            aria-label="Close menu"
          >
            <AiOutlineClose size={24} />
          </ButtonIcon>
        </div>

        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className="py-3">
              {items.length === 0 ? (
                <p className="text-base font-semibold flex justify-center items-center">
                  No Products Added to cart yet..
                </p>
              ) : (
                items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center p-3">
                    <div className="image pr-1">
                      <Image
                        width={500}
                        height={400}
                        quality={85}
                        className="w-full h-[150px] object-contain"
                        alt={item.name}
                        src={item?.image}
                      />
                    </div>
                    <div className="details flex flex-col flex-1">
                      <span className="uppercase block text-[#565656] tracking-widest text-sm font-[400] mb-1.5">
                        {item.name}
                      </span>
                      <span className="uppercase text-[#565656] mb-1.5 text-sm font-[400] ">
                        size : {item.size}
                      </span>
                      <span className="uppercase mb-2.5 text-sm font-[400] ">
                        price : ${item.totalItem}
                      </span>
                      <div className="flex items-center gap-2 mb-1">
                        <ButtonIcon
                          onClick={() => handleUpdateQuantity(item.documentId, -1)}
                          className="py-0.5 px-2 bg-gray-200 rounded-md space-x-3"
                        >
                          -
                        </ButtonIcon>
                        {item.quantity}
                        <ButtonIcon
                          onClick={() => handleUpdateQuantity(item.documentId, 1)}
                          className="py-0.5 px-2 bg-gray-200 rounded-md space-x-3"
                        >
                          +
                        </ButtonIcon>
                      </div>

                      <ButtonIcon
                        onClick={() => handleRemoveItem(item.documentId)}
                        className="text-gray-500 underline text-left flex justify-start"
                      >
                        REMOVE
                      </ButtonIcon>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-between items-center p-3 border-t border-t-[#ccc]">
              <span className="uppercase text-[#565656] text-sm pl-1">Subtotal</span>
              <span className="uppercase text-[#565656] text-sm pr-1">${subtotal}</span>
            </div>

            <div className="p-3 flex justify-between items-center">
              <ButtonIcon
                onClick={handleClearCart}
                className="uppercase border px-5 py-2 tracking-wider text-sm font-semibold text-gray-600"
              >
                Clear Cart
              </ButtonIcon>

              <ButtonIcon 
                onClick={() => router.push(`/shipping`)}
                className="uppercase bg-black text-white px-5 py-2 tracking-wider text-sm font-semibold"
              >
                Checkout
              </ButtonIcon>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Drawer;
