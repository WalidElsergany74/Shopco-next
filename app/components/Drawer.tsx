import React, { useEffect, useState, useMemo, useCallback, memo } from "react";
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
  createdAt: string;
}

const Drawer = (({ openRight, toggleDrawer }: IDrawer) => {
  const { userId } = useAuth();
  const [items, setItems] = useState<ICartItem[]>([]);
  const [isUpdating, setIsUpdating] = useState(false); 
  const router = useRouter();

  const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

  const { data: cartData, mutate, isLoading } = useSWR(
    userId ? `https://strapi-ecommerce-demo2.onrender.com/api/carts?populate=cart_items&filters[userId][$eq]=${userId}` : null,
    fetcher
  );

  // Sort cart items by creation date
  useEffect(() => {
    if (cartData && cartData.length > 0) {
      const cartItems = cartData[0]?.cart_items || [];
      const sortedItems = [...cartItems].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setItems(sortedItems);
    }
  }, [cartData]);

  const subtotal = useMemo(() => items.reduce((acc, item) => acc + item.totalItem, 0), [items]);

  const handleClearCart = useCallback(async () => {
    try {
      setIsUpdating(true);
      const cartId = cartData?.[0]?.documentId;
      if (!cartId) return;
      await axios.delete(`https://strapi-ecommerce-demo2.onrender.com/api/carts/${cartId}`);
      mutate();
      setItems([]);
    } catch (error) {
      console.error("Error clearing cart", error);
    }  finally {
      setIsUpdating(false);
    }
  }, [cartData, mutate]);

  const handleUpdateQuantity = useCallback(async (itemId: string, change: number) => {
    try {
      setIsUpdating(true);
      const existsItem = items.find((item) => item.documentId === itemId);
      if (!existsItem) return;

      const updatedQuantity = existsItem.quantity + change;
      const productRes = await axios.get(`https://strapi-ecommerce-demo2.onrender.com/api/products/${existsItem.productId}`);
      const availableStock = productRes.data.data.stock;

      if (updatedQuantity > availableStock || updatedQuantity < 1) {
        toast.error(updatedQuantity > availableStock ? "Stock is less than quantity" : "Invalid quantity", { duration: 4000, position: "top-center" });
        return;
      }

      const updatedPrice = updatedQuantity * existsItem.price;
      await axios.put(`https://strapi-ecommerce-demo2.onrender.com/api/cart-items/${existsItem.documentId}`, {
        data: { quantity: updatedQuantity, totalItem: updatedPrice },
      });

      mutate();
    } catch (error) {
      console.log("Error updating quantity", error);
    }finally {
      setIsUpdating(false);
    }
  }, [items, mutate]);

  const handleRemoveItem = useCallback(async (itemId: string) => {
    try {
      setIsUpdating(true);
      if (items.length === 1) {
        await handleClearCart();
        return;
      }

      await axios.delete(`https://strapi-ecommerce-demo2.onrender.com/api/cart-items/${itemId}`);
      mutate();
    } catch (error) {
      console.log("Error removing item", error);
    }finally {
      setIsUpdating(false);
    }
  }, [items, mutate, handleClearCart]);

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
          <ButtonIcon onClick={toggleDrawer} className="text-gray-600 flex justify-end" aria-label="Close menu">
            <AiOutlineClose size={24} />
          </ButtonIcon>
        </div>

        {isLoading || isUpdating ? (
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
});

export default memo(Drawer);
