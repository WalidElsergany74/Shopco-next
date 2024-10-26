
import { Montserrat} from "next/font/google"
import "./globals.css";


import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "react-hot-toast";


const  montserrat =  Montserrat({
 subsets : ["latin"],
  display : "swap"
})



export const metadata  = {
  title : {
    template : "%s |  ShopCo.",
    default : "Welcome | ShopCo."
  },
  desciption :
   "ShopCo is a brand have many clothes for mens and women , Have Many cateogries such as T-shirts Shorts Shirts Trousers Polo-Shirt Hats Shoeses"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <ClerkProvider>
     
      
     
    <html lang="en">
      <body
        className={`${montserrat.className}antialiased`}
      >
         <Toaster/>
       

       <main className=" min-h-screen  ">
       {children}
       </main>
       
      </body>
    </html>
  
    </ClerkProvider>
  );
}
