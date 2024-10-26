"use client"
import React, { useState, useEffect } from 'react';
import ButtonIcon from './ui/ButtonIcon';
import { BiSearch } from 'react-icons/bi';
import useSWR from 'swr';
import { IProduct } from '../interfaces';
import Image from 'next/image';
import Link from 'next/link';






const fetcher = (url: string) => fetch(url).then(res => res.json());

const Searchbar = ({ searchVisible }: { searchVisible: boolean }) => {
 
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [filteredData, setFilteredData] = useState<IProduct[]>([]); 

  

  const { data: productsData } = useSWR(
    `${process.env.NEXT_STRAPI_URL}/products?populate=*`,
    fetcher
);


  useEffect(() => {
    if (searchQuery) {
      const products = productsData?.data || [];
      const results = products?.filter((item : IProduct) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
      setFilteredData(results); 
    } else {
      setFilteredData([]); 
    }
  }, [productsData?.data, searchQuery]);

  return (
    <>
      <div
        className={`relative lg:block hidden xl:w-[400px] lg:w-[250px] ${
          searchVisible ? 'block' : 'hidden'
        }`}
      >
        <label htmlFor="Search" className="sr-only">
          Search
        </label>
        <input
          type="search"
          id="Search"
          placeholder="Search for products..."
          className="w-full rounded-full bg-[#F0F0F0] border-none outline-none active:border-2 active:border-black py-3 pe-10 px-4 shadow-sm sm:text-sm"
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <ButtonIcon className="text-gray-600 hover:text-gray-700" aria-label="Search">
            <BiSearch />
          </ButtonIcon>
        </span>

        
        {filteredData.length > 0 && (
          <div className="absolute bg-gray-50 shadow-lg h-[200px] overflow-scroll top-[55px] w-full flex flex-col p-3">
            {filteredData.map((product) => (
              <Link href={`/product/${product?.documentId}`} key={product.id} className="flex gap-3 cursor-pointer hover:bg-gray-100 items-center p-3 border-b">
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
                  <p className="uppercase text-[#565656] mb-1.5 text-sm font-[400]">
                    price : ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
