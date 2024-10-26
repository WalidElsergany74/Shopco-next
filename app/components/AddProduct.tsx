"use client"
import ButtonIcon from '@/app/components/ui/ButtonIcon';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import React, {  useState } from 'react';
import { FiX } from 'react-icons/fi';
import { ICategories, IProductColor, IProductSize, IProductSubCat } from '../interfaces';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Input from './ui/Input';
import Image from 'next/image';
import { addProductSchema } from '../validation';

interface IProps {
    cats : ICategories[];
    subCats : IProductSubCat[]
    colors : IProductColor[]
    sizes : IProductSize[]
}



type Inputs = z.infer<typeof addProductSchema>

const AddProductDialog = ({cats , subCats , colors , sizes} :IProps) => {
  const { register, handleSubmit, setValue, clearErrors , formState: { errors } } = useForm<Inputs>({
    resolver : zodResolver(addProductSchema)
  });
  
  


  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
   const [oldPrice, setOldPrice] = useState<null | number>(null)
  const [isNewProduct, setIsNewProduct] = useState(false);
 
  const [img1, setImg1] = useState<File | null>(null);
  const [img2, setImg2] = useState<File | null>(null);
  const [img3, setImg3] = useState<File | null>(null);
  
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [preview3, setPreview3] = useState<string | null>(null);
  
 
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(e.target.value);
    
    if (size && !selectedSizes.includes(size)) {
      setSelectedSizes([...selectedSizes, size]);  // Update selected sizes
      clearErrors("size");  // Clear size error immediately after selection
    }
  };

  const removeSize = (size: number) => {
    setSelectedSizes(selectedSizes.filter((s) => s !== size));
  };


const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageKey: "img1" | "img2" | "img3") => {
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];


    const previewUrl = URL.createObjectURL(file);


    setValue(imageKey, file); 

   
    if (imageKey === 'img1') {
      setPreview1(previewUrl);
    } else if (imageKey === 'img2') {
      setPreview2(previewUrl);
    } else if (imageKey === 'img3') {
      setPreview3(previewUrl);
    }

    clearErrors(imageKey);
  }

 
  }
  
  

  const handleRemoveImage = (imageKey: string) => {
    if (imageKey === 'img1') {
      setImg1(null);
      setPreview1(null);
    } else if (imageKey === 'img2') {
      setImg2(null);
      setPreview2(null);
    } else if (imageKey === 'img3') {
      setImg3(null);
      setPreview3(null);
    }
  };
  

  

const submitForm:SubmitHandler<Inputs> = async (data) => {
  setIsLoading(true)
    try {
      const formData = new FormData();
  
      // Add product details
      formData.append("data[title]", data.productName);
      formData.append("data[desc]", data.productDescription);
      formData.append("data[price]", data.productPrice);
      if (oldPrice !== null && oldPrice !== undefined) {
        formData.append("data[oldPrice]", oldPrice.toString());
      }
      formData.append("data[isNew]", JSON.stringify(isNewProduct));
      formData.append("data[stock]", data.productStock);
      formData.append("data[type]", data.productType);
      formData.append("data[category]", data.category);
      formData.append("data[sub_category]", data.subCategory);
      formData.append("data[color]", data.color);
    
  
      // Add sizes
      selectedSizes.forEach((size, index) => {
        formData.append(`data[sizes][${index}]`, size.toString());
      });
  
      // Upload images first
      let img1Id = null;
      let img2Id = null;
      let img3Id = null;
  
      const uploadImage = async (image: File) => {
        const uploadFormData = new FormData();
        uploadFormData.append('files', image);
        const uploadResponse = await axios.post(`${process.env.NEXT_STRAPI_URL}/upload`, uploadFormData);
        console.log('Upload Response:', uploadResponse.data); // فحص البيانات التي يتم إرجاعها
        return uploadResponse.data[0].id; // تأكد من وجود الـ id في هذه البيانات
      };
      
  
      if (data.img1) {
        img1Id = await uploadImage(data.img1);
      }
      if (data.img2) {
        img2Id = await uploadImage(data.img2);
      }
      if (data.img3) {
        img3Id = await uploadImage(data.img3);
      }
  
      // Now attach image IDs to the product
      if (img1Id) {
        formData.append("data[img1]", img1Id);
      }
      if (img2Id) {
        formData.append("data[img2]", img2Id);
      }
      if (img3Id) {
        formData.append("data[img3]", img3Id);
      }
  
      console.log("Form Data:", Array.from(formData.entries()))
  
      // إرسال البيانات إلى Strapi
      const response = await axios.post(`${process.env.NEXT_STRAPI_URL}/products?populate=*`, formData);
  
      console.log("Response data:", response.data);
  
      toast.success("Product added successfully");
      router.refresh(); 
       router.prefetch("/admin/products")
      router.push("/admin/products")
    } catch (error) {
      toast.error(`Error: ${error}`);
    }finally {
      setIsLoading(false)
    }
}
  

  return (
    <>
     

       <div className=" py-2 md:py-0 md:px-2">
       <form onSubmit={handleSubmit(submitForm)}>
            {/* Flex container for inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700" htmlFor="productName">
    Product Name
  </label>
  <Input
  {...register("productName")}
    // name="productName"
    type="text"
    id="productName"
    // value={data.productName}
    // onChange={handleInputChange}
    className={`mt-1 block w-full border ${errors?.productName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition`}
    placeholder="e.g. White Shoes"
  />
  {errors?.productName && (
    <p className="text-red-500 text-sm mt-1">{errors?.productName.message}</p>
  )}
</div>
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700" htmlFor="description">
    Product Description
  </label>
  <textarea
  {...register("productDescription")}
    id="description"
    // name="productDescription"
    rows={2}
    cols={50}
    className={`mt-1 block w-full resize-none border rounded-md p-2 transition ${
      errors?.productDescription ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
    }`}
    placeholder="Enter product description"
    // value={data.productDescription}
    // onChange={handleInputChange}
  />
  {errors.productDescription && (
    <p className="text-red-500 text-sm mt-1">
      {errors?.productDescription.message}
    </p>
  )}
</div>


              {/* Price, Old Price, and Stock */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700" htmlFor="stock">
      Stock
    </label>
    <input
    {...register("productStock")}
      // name="productStock"
      type="number"
      id="stock"
      className={`mt-1 block w-full border rounded-md p-2 transition ${
        errors?.productStock ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
      }`}
      placeholder="Enter product stock"
      // value={data.productStock}
      // onChange={handleInputChange}
    />
    {errors.productStock && (
      <p className="text-red-500 text-sm mt-1">
        {errors?.productStock.message}
      </p>
    )}
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700" htmlFor="price">
      Price
    </label>
    <input
    {...register("productPrice")}
      // name="productPrice"
      type="number"
      id="price"
      className={`mt-1 block w-full border rounded-md p-2 transition ${
        errors?.productPrice ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
      }`}
      placeholder="Enter product price"
      // value={data.productPrice}
      // onChange={handleInputChange}
    />
    {errors.productPrice && (
      <p className="text-red-500 text-sm mt-1">
        {errors?.productPrice.message}
      </p>
    )}
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700" htmlFor="oldPrice">
      Old Price (Optional)
    </label>
    <input
      
      name="oldPrice"
      type="number"
      id="oldPrice"
      value={oldPrice ?? ""} 
  onChange={(e) => setOldPrice(e.target.value ? parseFloat(e.target.value) : null)}
      className={`mt-1 block w-full border rounded-md p-2 transition ${
         'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
      }`}
      placeholder="Enter old product price"
    />
  
  </div>
</div>

            {/* Category, Subcategory, and Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
  <div>
    <label className="block text-sm font-medium text-gray-700" htmlFor="category">
      Category
    </label>
    <select
    {...register("category")}
      id="category"
      // name="category"
      className={`mt-1 block w-full border rounded-md p-2 transition ${
        errors?.category ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
      }`}
      // value={data.category}
      // onChange={handleInputChange}
    >
      <option value="">Select Category</option>
      {cats?.map((cat) => (
        <option key={cat.id} value={cat?.id}>
          {cat?.title}
        </option>
      ))}
    </select>
    {errors?.category && (
      <p className="text-red-500 text-sm mt-1">
        {errors?.category.message}
      </p>
    )}
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700" htmlFor="subCategory">
      Subcategory
    </label>
    <select
    {...register("subCategory")}
      id="subCategory"
      // name="subCategory"
      className={`mt-1 block w-full border rounded-md p-2 transition ${
        errors?.subCategory ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
      }`}
      // value={data.subCategory}
      // onChange={handleInputChange}
    >
      <option value="">Select Subcategory</option>
      {subCats?.map((sub) => (
        <option key={sub.id} value={sub?.id}>
          {sub?.title}
        </option>
      ))}
    </select>
    {errors.subCategory && (
      <p className="text-red-500 text-sm mt-1">
        {errors?.subCategory.message}
      </p>
    )}
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700" htmlFor="type">
      Type
    </label>
    <select
      id="type"
      {...register("productType")}
      // name="productType"
      className={`mt-1 block w-full border rounded-md p-2 transition ${
        errors?.productType ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
      }`}
      // value={data.productType}
      // onChange={handleInputChange}
    >
      <option value="">Select Type</option>
      <option value="normal">normal</option>
      <option value="trending">trending</option>
      <option value="featured">featured</option>
    </select>
    {errors.productType && (
      <p className="text-red-500 text-sm mt-1">
        {errors?.productType.message}
      </p>
    )}
  </div>
</div>

           
            {/* Image Uploads */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Product Images</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="h-32 flex items-center justify-center border border-dashed border-gray-400 rounded-lg cursor-pointer relative">
   
 <input
  type="file"
  accept="image/*"
 
  onChange={(e) => handleImageUpload(e, 'img1')}
  className="hidden"
/>
{errors.img1 && (
      <p className="text-red-500 text-sm mt-1">
        {errors?.img1.message}
      </p>
    )}
  {preview1 ? (
    <div className="relative h-full w-full">
      <Image width={500} height={500} src={preview1} alt="Image 1" className="h-full w-full object-cover rounded-lg" />
      <ButtonIcon
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
        onClick={() => handleRemoveImage('img1')}
      >
        X
      </ButtonIcon>
    </div>
  ) : (
    <span className="text-gray-500">Upload Image 1</span>
  )}
   
</label>

<label className="h-32 flex items-center justify-center border border-dashed border-gray-400 rounded-lg cursor-pointer relative">
  <input
    type="file"
    accept="image/*"
  
    className="hidden"
    onChange={(e) => handleImageUpload(e, 'img2')}
  />
  {errors.img2 && (
      <p className="text-red-500 text-sm mt-1">
        {errors?.img2.message}
      </p>
    )}
  {preview2 ? (
    <div className="relative h-full w-full">
      <Image width={500} height={500} src={preview2} alt="Image 2" className="h-full w-full object-cover rounded-lg" />
      <ButtonIcon
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
        onClick={() => handleRemoveImage('img2')}
      >
        X
      </ButtonIcon>
    </div>
  ) : (
    <span className="text-gray-500">Upload Image 2</span>
  )}
 
</label>

<label className="h-32 flex items-center justify-center border border-dashed border-gray-400 rounded-lg cursor-pointer relative">
  <input
    type="file"
    accept="image/*"
    className="hidden"

    onChange={(e) => handleImageUpload(e, 'img3')}
  />
  {errors.img3 && (
      <p className="text-red-500 text-sm mt-1">
        {errors?.img3.message}
      </p>
    )}
  {preview3 ? (
    <div className="relative h-full w-full">
      <Image width={500} height={500} src={preview3} alt="Image 3" className="h-full w-full object-cover rounded-lg" />
      <ButtonIcon
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
        onClick={() => handleRemoveImage('img3')}
      >
        X
      </ButtonIcon>
    </div>
  ) : (
    <span className="text-gray-500">Upload Image 3</span>
  )}
  
</label>

              </div>
            </div>

            {/* Sizes */}
            <div className="flex justify-between gap-3">
                
              <div className="mb-4 flex-1">
              <label htmlFor='size' className="block text-sm font-medium text-gray-700">Sizes</label>
              <div className="flex mb-2">
                <select
                id='size'
               {...register("size", { required: "Size is required" })}
                 className={`mt-1 block w-full border rounded-md p-2 transition ${
                  errors?.size ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                onChange={(e) => {
                  handleSizeChange(e);  
                  clearErrors("size");  
                }}
                >
                               {errors?.size && (
      <p className="text-red-500 text-sm mt-1">
        {errors?.size.message}
      </p>
    )}
                   <option value="">Select Size</option>
                  {sizes.map((size) => (
                    
                     <option key={size.id} value={size.id}>{size.title}</option>
                  ))}
                 
                 
                </select>
              </div>
             {/* Display selected sizes */}
<div className="flex gap-2 flex-wrap">
  {selectedSizes.map((sizeId) => {
    const size = sizes.find(s => s.id === sizeId); 
    return (
      
      size && (
        <span
          key={size.id}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md flex items-center"
        >
          {size.title} 
          <ButtonIcon
            className="ml-2 text-red-500 hover:text-red-600"
            onClick={() => removeSize(size.id)} // إزالة الحجم باستخدام id
          >
            <FiX />
          </ButtonIcon>
        </span>
      )
    );
  })}
</div>

            </div>

            <div className='flex-1'>
                <label  className="block text-sm font-medium text-gray-700" htmlFor="color">
                  Color
                </label>
                <select
                  id="color"
                  {...register("color")}
                
                  className={`mt-1 block w-full border rounded-md p-2 transition ${
                    errors?.color?.message ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                >
                   {errors?.color && (
      <p className="text-red-500 text-sm mt-1">
        {errors?.color.message}
      </p>
    )}
                  <option value="">Select Color</option>
                  {colors?.map((sub) => (
                    <option key={sub.id} value={sub?.id}>{sub?.title}</option>
                  ))}
    
 
                </select>
              </div>  

         
            </div>
          
                    {/* New Product Checkbox */}
          <div className="flex items-center mb-2">
           
            <label htmlFor="isNewProduct" className="mr-2 block text-base text-gray-900">
              Is this  New Product ?
            </label>

            <input
              type="checkbox"
              id="isNewProduct"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={isNewProduct}
              onChange={() => setIsNewProduct(!isNewProduct)}
            />
          </div>

            {/* Submit Button */}
            <ButtonIcon
            disabled={isLoading}
    type="submit"
    className="flex justify-center items-center space-x-2 w-full bg-blue-600 disabled:bg-blue-300 disabled:cursor-none text-white font-semibold rounded-md p-2 hover:bg-blue-700 transition"
>
    {isLoading ? (
        <>
            <svg
                aria-hidden="true"
                className="w-6 h-6 text-transparent animate-spin fill-blue-600 mr-3"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span>Adding</span>
        </>
    ) : (
        <span>Add Product</span>
    )}
</ButtonIcon>
          </form>
       </div>
       
    
    </>
  );
};

export default AddProductDialog;
