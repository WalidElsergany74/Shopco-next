"use client";
import React, {  useState } from "react";
import Card from "./ui/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation"; 

import Drawer from "./Drawer";

import {  ProductDataResponse } from "../interfaces";


const FeaturedProducts = ({ type , data }: { type: string  , data : ProductDataResponse}) => {
  const [reverse, setReverse] = useState(false); 
  const [showSizes, setShowSizes] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
   







  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
    setShowSizes(false)
    
  };
  const toggleShowSizes = (productId: number) => {
    setShowSizes(!showSizes)
    setSelectedProductId(productId === selectedProductId ? null : productId);

};



  



  return (
   
    <>
     <div className="py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center uppercase mb-7 ">
        {type} Products
      </h1>
      <div className="container mx-auto  relative">
      
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={2}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            reverseDirection: reverse, 
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          onReachEnd={() => setReverse(true)} 
          onReachBeginning={() => setReverse(false)}
          loop={false} 
          breakpoints={{
            
            320: { slidesPerView: 1.7, spaceBetween: 15 },
            400: { slidesPerView: 1.8, spaceBetween: 15 },
            520: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="product-swiper"
        >
          {data?.data?.map((item) => (
            <SwiperSlide key={item.id}>
              <Card  toggleShowSizes={() => toggleShowSizes(item.id)} showSizes={selectedProductId === item.id}   toggleDrawer={toggleDrawer}  item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

      {/* Custom Navigation Buttons */}
<div className="hidden md:block">
<div className="swiper-button-prev hidden md:block absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
  <MdArrowBackIos className="text-2xl text-white p-2 rounded-full cursor-pointer" />
</div>
<div className="swiper-button-next hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
  <MdArrowForwardIos className="text-2xl text-white p-2 rounded-full cursor-pointer" />
</div>
</div>
      </div>
    </div>

    <Drawer openRight={drawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default FeaturedProducts;
