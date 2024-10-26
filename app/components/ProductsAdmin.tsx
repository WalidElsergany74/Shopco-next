"use client";
import React, { useEffect, useState } from 'react';
import ButtonIcon from './ui/ButtonIcon';
import { FaEye, FaPlus } from 'react-icons/fa';
import { LuPencil, LuTrash2 } from "react-icons/lu";
import Image from 'next/image';
import { IProduct } from '../interfaces';
import Link from 'next/link';

import { Alert } from './ui/Alert';
import { getProductsAdmin } from '@/actions/action';

const ProductsAdmin = ({ products , totalItems }: { products: IProduct[] , totalItems : number }) => {
    const [open, setOpen] = useState(false);

     const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(products || []); 
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Items per page
    const totalPages = Math.ceil(totalItems / pageSize);

    const handleOpen = (documentId: string) => {
        setSelectedProductId(documentId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProductId(null);
    };

    const handlePageChange = async (newPage: number) => {
        setCurrentPage(newPage);
        // Fetch new products based on the page
        const newProducts = await getProductsAdmin(newPage);
        setFilteredData(newProducts?.data || []);
    };
    


 
    useEffect(() => {
        if (search) {
            const results = products?.filter((item: IProduct) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            ) || [];
            setFilteredData(results);
        } else {
            setFilteredData(products || []); 
        }
    }, [search, products]);

     
    return (
        <>
      
            <div className="w-full flex justify-between my-5">
                <div className='flex flex-col justify-start space-y-3'>
                    <h3 className="text-lg font-semibold text-slate-800">Table with products</h3>
                    <p className="text-slate-500">Overview of the current products.</p>
                </div>
            </div>

            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row gap-1 w-full justify-start items-start md:justify-between md:items-center mb-5">
                <div className="w-full max-w-xs min-w-[100px] relative">
                    <div className="relative">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder="Search for invoice..."
                        />
                        <ButtonIcon className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </ButtonIcon>
                    </div>
                </div>
                <Link href={"/admin/addProducts"}  className='py-2 px-4 flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg'>
                    <FaPlus size={12} />
                    <p className='text-base font-semibold'>Create Product</p>
                </Link>
            </div>

            {filteredData.length === 0 ? (
                <p>No Products Created Yet</p>
            ) : (
                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Image</p>
                                </th>
                                <th className="p-4 border-b text-center border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Name</p>
                                </th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">
                                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Category</p>
                                </th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">
                                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Color</p>
                                </th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">
                                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Price</p>
                                </th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">
                                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Actions</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 border-b cursor-pointer border-slate-200">
                                    <td className="p-4 py-5">
                                        <Image
                                            src={item?.img1?.url}
                                            quality={85}
                                            width={70}
                                            height={70}
                                            alt="Product Image"
                                            className=""
                                        />
                                      
                                    </td>
                                    <td className="p-4 py-5 text-center">
                                        <p className="text-sm text-slate-500">{item.title}</p>
                                    </td>
                                    <td className="p-4 py-5 text-center">
                                        <p className="text-sm text-slate-500 capitalize">{item.sub_category.title}</p>
                                    </td>
                                    <td className="p-4 py-5 text-center">
                                        <p className="text-sm text-slate-500 capitalize">{item.color.title}</p>
                                    </td>
                                    <td className="p-4 py-5 text-center">
                                        <p className="text-sm text-slate-500">{item.price}$</p>
                                    </td>
                                    <td className="p-4 py-5 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                        <Link href={`/product/${item.documentId}`} className='bg-green-800 text-white py-2 px-2 rounded-lg'>
                                                <FaEye />
                                            </Link>
                                            <Link href={`/admin/editProduct/${item.documentId}`} className='bg-blue-800 text-white py-2 px-2 rounded-lg'>
                                                <LuPencil />
                                            </Link>
                                            <ButtonIcon onClick={()=> handleOpen(item.documentId)} className='bg-red-800 text-white py-2 px-2 rounded-lg'>
                                                <LuTrash2 />
                                            </ButtonIcon>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    

                      {/* Pagination Controls */}
                      <div className="flex justify-between items-center px-4 py-3">
                        <div className="text-sm text-slate-500">
                            Showing <b>{filteredData.length}</b> of {totalItems}
                        </div>
                        <div className="flex space-x-1">
                            <ButtonIcon
                                className={`px-3 py-1 text-sm font-normal ${currentPage === 1 ? 'text-gray-400' : 'text-slate-500'} border border-slate-200 rounded`}
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </ButtonIcon>
                            {[...Array(totalPages)].map((_, i) => (
                                <ButtonIcon
                                    key={i}
                                    className={`px-3 py-1 text-sm font-normal ${i + 1 === currentPage ? 'bg-slate-800 text-white' : 'text-slate-500 border'} rounded`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </ButtonIcon>
                            ))}
                            <ButtonIcon
                                className={`px-3 py-1 text-sm font-normal ${currentPage === totalPages ? 'text-gray-400' : 'text-slate-500'} border border-slate-200 rounded`}
                                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </ButtonIcon>
                        </div>
                    </div>
               
        
                </div>
            )}
      
      <Alert open={open} handleOpen={handleClose} products={products} documentId={selectedProductId} />
            
        </>
    );
};

export default ProductsAdmin;