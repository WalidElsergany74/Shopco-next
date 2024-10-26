
"use client"
import React, {  useState } from 'react'
import Input from '@/app/components/ui/Input'
import ProductsList from '@/app/components/ProductsList'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import ButtonIcon from '@/app/components/ui/ButtonIcon'
import { AiOutlineClose } from 'react-icons/ai'
import { IProductColor } from '../interfaces'
import useSWR from 'swr'




export interface IFiltered {
    id: number,
    documentId: string,
    title: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    locale: null
}

const fetcher = (url: string) => fetch(url).then(res => res.json());
const ProductsCo = ({data , id , colors  } : {data : IFiltered[] , id : string , colors : IProductColor[] }) => {
  
  

  
     const [selectedSubCats, setSelectedSubCats] = useState<string[]>([])
     const [selectedColors, setSelectedColors] = useState<string[]>([])
  
  
    const [maxPrice, setMaxPrice] = useState(10000)
    const [sort, setSort] = useState<string| null>(null)
    // const [products, setProducts] =useState<IProduct[]>([])
   

    const [showCategories, setShowCategories] = useState(true)
    const [showColors, setShowColors] = useState(true)
    const [showPrice, setShowPrice] = useState(true)
    const [showSort, setShowSort] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false);
   

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
         const value = e.target .value
         const isChecked = e.target.checked

         setSelectedSubCats(isChecked ? [...selectedSubCats , value] : selectedSubCats.filter((item) => item !== value))

      };
    const handleChangeColors = (e : React.ChangeEvent<HTMLInputElement>) => {
         const value = e.target .value
         const isChecked = e.target.checked

         setSelectedColors(isChecked ? [...selectedColors , value] : selectedColors.filter((item) => item !== value))

      };



      const subCategoriesQuery = selectedSubCats
      .map((item) => `&filters[sub_category][documentId][$eq]=${item}`)
      .join('');
  const colorsQuery = selectedColors
      .map((item) => `&filters[color][documentId][$eq]=${item}`)
      .join('');

          let sortQuery = '';
               if (sort) {
                    sortQuery = `&sort=price:${sort}`;
         }

  const { data: productsData, isLoading } = useSWR(
      `${process.env.NEXT_STRAPI_URL}/products?populate=*&filters[category][documentId]=${id}${subCategoriesQuery}${colorsQuery}&filters[price][$lte]=${maxPrice}&${sortQuery}`,
      fetcher
  );

  const products = productsData?.data || [];

    return (
      
        <div className='products py-5 md:py-7 lg:py-10 px-[5px]  md:px-[10px] lg:px-[20px] xl:px-[50px] lg:flex gap-3 min-h-screen '>
            
            <div className="left border-2 sticky top-[130px] h-full hidden md:hidden lg:block border-gray-100 px-4 py-6 rounded-2xl lg:w-[30%] xl:w-[20%]">
                {/* Products Categories */}
                <div className='filterItem'>
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowCategories(!showCategories)}>
                        <h2 className='font-semibold text-2xl mb-1'>Products Categories</h2>
                        {showCategories ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showCategories && (
                         <>
                         {data?.map((item : IFiltered) => (
                             <div className='mt-2' key={item.id}>
                             <div className='inputItem'>
                                 <div className='flex items-center mb-1'>
                                     <input
                                     onChange={handleChange}
                                         type='checkbox'
                                         id={item.documentId}
                                         value={item.documentId}
                                         className='w-5 h-5 rounded-md appearance-none border border-gray-400  checked:bg-blue-600 relative checked:before:content-["✓"] checked:before:text-white checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:outline-none checked:border-none checked:before:-translate-x-1/2 checked:before:-translate-y-1/2'
                                     />
                                     <label className='ml-2 text-base font-medium capitalize' htmlFor={item.documentId}>{item.title}</label>
                                 </div>
                             </div>
                           
                         </div>
                         ))}
                         </>
                    )}
                </div>
 
                {/* Filter By Colors */}
                <div className="filterItem my-3">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowColors(!showColors)}>
                        <h2 className='font-semibold text-2xl mb-2'>Filter By Colors</h2>
                        {showColors ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showColors && (
                        <>
                      {colors?.map((color : IProductColor) => (
                        
                         <div className="mt-2" key={color.id}>
                            <div className='inputItem'>
                                <div className='flex items-center mb-1'>
                                    <input
                                    onChange={handleChangeColors}
                                        type='checkbox'
                                        id={color.documentId}
                                        value={color.documentId}
                                        className='w-5 h-5 rounded-md appearance-none border border-gray-400  checked:bg-blue-600 relative checked:before:content-["✓"] checked:before:text-white checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:outline-none checked:border-none checked:before:-translate-x-1/2 checked:before:-translate-y-1/2'
                                    />
                                    <label className='ml-2 text-base font-medium capitalize' htmlFor={color.documentId}>{color.title}</label>
                                </div>
                            </div>
                           
                           
                        </div>
                       
                       ))}
                        </>
                    )}
                </div>

                {/* Filter By Price */}
                <div className="filterItem my-3">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowPrice(!showPrice)}>
                        <h2 className='font-semibold text-2xl mb-2'>Filter By Price</h2>
                        {showPrice ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showPrice && (
                        <div className="mt-2 flex items-center space-x-1">
                            <span>0</span>
                            <Input value={maxPrice} type='range' min={0} max={10000} onChange={(e) => setMaxPrice(parseInt(e.target.value))} />
                            <span>{maxPrice}</span>
                        </div>
                    )}
                </div>

                {/* Sort By */}
                <div className="filterItem my-3">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowSort(!showSort)}>
                        <h2 className='font-semibold text-2xl mb-2'>Sort By</h2>
                        {showSort ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showSort && (
                        <div className='my-2'>
                           <div className="inputItem flex items-center my-2 ">
    <Input
        className='w-4 h-4 appearance-none border border-gray-400 rounded-full checked:bg-blue-600 checked:border-white focus:outline-none focus:ring-2 focus:ring-blue-600 checked:ring-2 checked:ring-blue-600' 
        type='radio'
        id='asc'
        value={"asc"}
        name='price'
        onChange={() => setSort("asc")}
    />
    <label className='ml-2 text-base font-medium' htmlFor='asc'>Price (Lowest First)</label>
</div>
                            <div className="inputItem flex items-center my-2">
                                <Input
                                 className='w-4 h-4 appearance-none border border-gray-400 rounded-full checked:bg-blue-600 checked:border-white focus:outline-none focus:ring-2 focus:ring-blue-600 checked:ring-2 checked:ring-blue-600' 
                                type='radio' id='desc' value={"desc"} name='price' onChange={() => setSort("desc")} />
                                <label className='ml-2 text-base font-medium' htmlFor='desc '>Price (Highest First)</label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="relative">
  {/* Overlay with blur effect */}
  {menuOpen && (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
      onClick={toggleMenu} 
    ></div>
  )}



  {/* Drawer (القائمة الجانبية) */}
  <div
    className={`fixed top-0 left-0 w-full md:w-1/2 md:rounded-e-lg h-full p-3 bg-white shadow-lg transform transition-transform duration-300 
      ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden z-50`}
  >
    <ButtonIcon
        onClick={toggleMenu}
        className="text-gray-600 w-full flex justify-end mb-4"
        aria-label="Close menu"
      >
        <AiOutlineClose size={24} />
      </ButtonIcon>
    <div className="left h-full  block md:block lg:hidden mt-2   px-4  ">
                {/* Products Categories */}
                <div className='filterItem'>
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowCategories(!showCategories)}>
                        <h2 className='font-bold text-xl mb-1'>Products Categories</h2>
                        {showCategories ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showCategories && (
                        <>
                        {data?.map((item : IFiltered) => (
                             <div className='mt-2' key={item.id}>
                             <div className='inputItem'>
                                 <div className='flex items-center mb-1'>
                                     <input
                                         type='checkbox'
                                         id={item.documentId}
                                         value={item.documentId}
                                         className='w-5 h-5 rounded-md appearance-none border border-gray-400  checked:bg-blue-600 relative checked:before:content-["✓"] checked:before:text-white checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:outline-none checked:border-none checked:before:-translate-x-1/2 checked:before:-translate-y-1/2'
                                     />
                                     <label className='ml-2 text-base font-medium capitalize' htmlFor={item.documentId}>Shoes</label>
                                 </div>
                             </div>
                             
                             
                         </div>
                        ))}
                        </>
                       
                    )}
                </div>

                {/* Filter By Colors */}
                <div className="filterItem my-3">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowColors(!showColors)}>
                        <h2 className='font-bold text-xl mb-2'>Filter By Colors</h2>
                        {showColors ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showColors && (
                        <div className="mt-2">
                         {colors.map((color) => (
                               <div className='inputItem' key={color.id}>
                               <div className='flex items-center mb-1'>
                                   <input
                                       type='checkbox'
                                       id={color.documentId}
                                       value={color.documentId}
                                       className='w-5 h-5 rounded-md appearance-none border border-gray-400  checked:bg-blue-600 relative checked:before:content-["✓"] checked:before:text-white checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:outline-none checked:border-none checked:before:-translate-x-1/2 checked:before:-translate-y-1/2'
                                   />
                                   <label className='ml-2 text-base font-medium capitalize' htmlFor={color.documentId}>White</label>
                               </div>
                           </div>
                         ))}
                          
                        </div>
                    )}
                </div>

                {/* Filter By Price */}
                <div className="filterItem my-3">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowPrice(!showPrice)}>
                        <h2 className='font-bold text-xl mb-2'>Filter By Price</h2>
                        {showPrice ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showPrice && (
                        <div className="mt-2 flex items-center space-x-1">
                            <span>0</span>
                            <Input type='range' min={0} max={1000} onChange={(e) => setMaxPrice(parseInt(e.target.value))} />
                            <span>1000</span>
                        </div>
                    )}
                </div>

                {/* Sort By */}
                <div className="filterItem my-3">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowSort(!showSort)}>
                        <h2 className='font-bold text-xl mb-2'>Sort By</h2>
                        {showSort ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showSort && (
                        <div className='my-2'>
                           <div className="inputItem flex items-center my-2 ">
    <Input
        className='w-4 h-4 appearance-none border border-gray-400 rounded-full checked:bg-blue-600 checked:border-white focus:outline-none focus:ring-2 focus:ring-blue-600 checked:ring-2 checked:ring-blue-600' 
        type='radio'
        id='asc'
        value={"asc"}
        name='price'
        onChange={() => setSort("asc")}
    />
    <label className='ml-2 text-base font-medium' htmlFor='asc'>Price (Lowest First)</label>
</div>
                            <div className="inputItem flex items-center my-2">
                                <Input
                                 className='w-4 h-4 appearance-none border border-gray-400 rounded-full checked:bg-blue-600 checked:border-white focus:outline-none focus:ring-2 focus:ring-blue-600 checked:ring-2 checked:ring-blue-600' 
                                type='radio' id='desc' value={"desc"} name='price' onChange={() => setSort("desc")} />
                                <label className='ml-2 text-base font-medium' htmlFor='desc '>Price (Highest First)</label>
                            </div>
                        </div>
                    )}
                </div>
            </div>

  </div>
</div>

            <div className="right w-full lg:w-[70%] xl:w-[80%]">
                <img className='w-full h-[220px] xl:h-[300px] object-cover mb-[50px]' alt="..." src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600" />
                <ProductsList isLoading={isLoading}  products={products}  toggleMenu={toggleMenu}  />
            </div>
        </div>
    )
}

export default ProductsCo
