
"use client"
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
  } from "react-country-state-city";
  import "react-country-state-city/dist/react-country-state-city.css";
  import { PhoneNumberUtil } from 'google-libphonenumber';
  import 'react-international-phone/style.css';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { z } from 'zod';
  
  import { PhoneInput } from 'react-international-phone';
  


import { ICartItem } from "../interfaces";
import Loading from "../loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";






// Define the type for form data
type FormData = {
    firstName: string;
    lastName: string;
    country: string; // Add type for country
    state: string;   // Add type for state
    city: string;    // Add type for city
    address: string;
    email : string
  };
  
  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone: string) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };
  
  const schema = z.object({
    firstName: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters' })
      .max(20, { message: 'First name must be at most 20 characters' })
      .nonempty({ message: 'First name is required' }),
      
    lastName: z
      .string()
      .min(2, { message: 'Last name must be at least 2 characters' })
      .max(20, { message: 'Last name must be at most 20 characters' })
      .nonempty({ message: 'Last name is required' }),
      
    country: z.string().nonempty({ message: 'Country is required' }),
    state: z.string().optional(),
    city: z.string().nonempty({ message: 'City is required' }),
    
    address: z
      .string()
      .max(150, { message: 'Address must be at most 150 characters' })
      .nonempty({ message: 'Address is required' }),
      
    email: z
      .string()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Invalid email format' }),
      

  });
  




export default function Shipping() {

    const { register, handleSubmit, setValue , formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
      });
    const { userId } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    const [country, setCountry] = useState<string>('');
   
const [state, setState] = useState<string>('');
const [city, setCity] = useState<string>('');
    const [phone, setPhone] = useState("")
    
    const [cartProducts, setCartProducts] = useState<ICartItem[]>([]);
  const [existingCart, setExistingCart] = useState<any>(null);
  const subTotal = cartProducts.reduce((total, item) => total + item.price * item.quantity, 0)


 


  // Fetch cart data in useEffect using axios
  useEffect(() => {
    const fetchCartData = async () => {
      if (userId) {
     setIsLoading(true)
        try {
          const response = await axios.get(
            `${process.env.NEXT_STRAPI_URL}/carts?populate=cart_items&filters[userId][$eq]=${userId}`
          );
          const cartData = response.data.data[0]; // Assuming the user has only one cart
          setExistingCart(cartData);
          setCartProducts(cartData?.cart_items || []);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }finally{
            setIsLoading(false)
        }
      }
    };

    fetchCartData();
  }, [userId]); // Fetch cart only when userId is available

// Change handler for country
const handleCountryChange = (selectedCountry: any) => {
    setCountry(selectedCountry); // Update state
    setCountryid(selectedCountry.id); // Assuming id corresponds to the country id
    setValue('country', selectedCountry.name)
};

// Change handler for state
const handleStateChange = (selectedState: any) => {
    setState(selectedState); // Update state
    setstateid(selectedState.id); // Assuming id corresponds to the state id
    setValue('state', selectedState.name);
};

// Change handler for city
const handleCityChange = (selectedCity: any) => {
    setCity(selectedCity); // Update state
    setValue('city', selectedCity.name)
};

const onSubmit = (data: FormData) => {
  
    const shippingData = {
        ...data,
        phone: phone 
    };

    
    localStorage.setItem('shippingInfo', JSON.stringify(shippingData));
    
    
   
    router.push(`/checkout?amount=${subTotal}`); // اضبط المسار كما هو مطلوب
};


  return (
    <>
  {isLoading &&  <Loading/>}
  <Navbar/>
    <div className="py-10 bg-gray-100 min-h-screen">
        <div className="container p-3 mx-auto">
            <div className="flex flex-col md:flex-row justify-center gap-4 w-full ">
               
               <div className=" flex-1  w-full  md:w-[50%] lg:w-[60%]">
                            <div className="bg-white mx-auto p-8 rounded-lg shadow-lg w-full max-w-md">
                                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Shipping Information</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4">
                                        <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            placeholder="John"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register('firstName')}
                                        />
                                        {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            placeholder="Doe"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register('lastName')}
                                        />
                                        {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="mohamed74@gmail.com"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register('email')}
                                        />
                                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">
                                            Country
                                        </label>
                                        <CountrySelect
                                         onChange={handleCountryChange} // Use custom handler
                                            className="overflow-scroll"
                                         
                                            placeHolder="Select Country"
                                          
                                        />
                                        {errors.country && <p className="text-red-600">{errors.country.message}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">
                                            State
                                        </label>
                                        <StateSelect
                                            countryid={countryid}
                                            onChange={handleStateChange} 
                                            placeHolder="Select State"
                                            
                                           
                                        />
                                        {errors.state && <p className="text-red-600">{errors.state.message}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">
                                            City
                                        </label>
                                        <CitySelect
                                            countryid={countryid}
                                            stateid={stateid}
                                            onChange={handleCityChange} 
                                            placeHolder="Select City"
                                           
                                        />
                                        {errors.city && <p className="text-red-600">{errors.city.message}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            placeholder="123 Street, Apartment 4B"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register('address')}
                                        />
                                        {errors.address && <p className="text-red-600">{errors.address.message}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                                            Mobile Number
                                        </label>
                                        <PhoneInput
                                        value={phone}
                                        onChange={(phone) => setPhone(phone)}
                                        required
      countrySelectorStyleProps={{buttonClassName : "rounded-xl py-5 px-3"}}
         inputClassName='w-full'
         inputStyle={{padding : "10px  15px"  , }}
        defaultCountry="eg"
        
      />
      
                                       
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
    </div>  
    <div className="w-full md:w-[50%] lg:w-[40%]">
      
            <>
           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
     
  {cartProducts.map((item) => (
    <div key={item.id} className="flex justify-between mb-4 border-b pb-2">
      <div className="flex">
        <img src={item.image} alt={item.name} className="w-auto h-[110px] object-fill rounded-lg mr-4" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <span className="text-gray-600">Quantity: {item.quantity}</span>
        </div>
      </div>
      <span className="text-lg font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  ))}
  
  {/* حساب المجموع الكلي */}
  <div className="flex justify-between mt-4">
    <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
    <span className="text-lg font-bold text-gray-800">
      {subTotal}
    </span>
  </div>


    </div>
    {/* </div> */}
            </>
    

    </div>
            </div>
        </div>
    </div>
     <Footer/>
    </>
   
  );
}
