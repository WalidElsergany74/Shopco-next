"use client"
import React, { useState } from 'react'
import ButtonIcon from './ui/ButtonIcon';
import { AiOutlineClose } from 'react-icons/ai';

const TopBanner = () => {

    const [close, setClose] = useState(false);

    const toggleClosed = () => {
        setClose(!close);
      };
  return (
    
     <div
     className={`bg-black text-white text-center px-1 lg:px-6 py-1.5 transition-all duration-700 transform ${
       close ? "opacity-0 -translate-y-5" : "opacity-100 translate-y-0"
     } ${close ? "hidden" : "block"}`}
   >
     <div className="flex items-center justify-between">
       <div className="flex-1 flex items-center justify-between">
         <p className="md:mr-2 text-xs md:text-base">
          FREE DELIVERY 
         </p>
         <p className="md:mr-2 text-xs md:text-base">
         OFFER 15% OFF 
         </p>
         <p className="md:mr-2 text-xs md:text-base">
          FREE RETURNS
         </p>
       </div>

       <ButtonIcon onClick={toggleClosed} aria-label="Close banner">
         <AiOutlineClose size={18} />
       </ButtonIcon>
     </div>
   </div>
  )
}

export default TopBanner
