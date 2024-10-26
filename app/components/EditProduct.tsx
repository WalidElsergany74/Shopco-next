"use client"
import ButtonIcon from '@/app/components/ui/ButtonIcon';
import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { ICategories, IProduct, IProductColor, IProductImage, IProductSize, IProductSubCat } from '../interfaces';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


interface IProps {
    cats : ICategories[];
    subCats : IProductSubCat[]
    colors : IProductColor[]
    sizes : IProductSize[]
    product : IProduct
}


const EditProduct = ({cats , subCats , colors , sizes , product} :IProps) => {
 
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState<IProductSize[]>(product?.sizes);
  const [selectedSize, setSelectedSize] = useState('');
  const [isNewProduct, setIsNewProduct] = useState(product.isNew);
  const [img1, setImg1] = useState<File | null>();
  const [img2, setImg2] = useState<File | null>(null);
  const [img3, setImg3] = useState<File | null>(null);
  const [preview1, setPreview1] = useState<string | null>(product.img1.url);
  const [preview2, setPreview2] = useState<string | null>(product.img2.url);
  const [preview3, setPreview3] = useState<string | null>(product.img3.url);
  
  const [data, setData] = useState({
    productName: product?.title,
    productDescription: product?.desc,
    productPrice: product?.price,
    productStock: product?.stock,
    oldPrice: product?.oldPrice,
    category: product?.category,
    subCategory: product?.sub_category,
    productType: product.type,
    color: product?.color,
  });
  console.log(data.category)


  useEffect(() => {
     router.replace(`/admin/editProduct/${product.documentId}`)
     router.refresh()
  }, [product.documentId, router]);
  
 
  const defaultImage: IProductImage = {
    id: 0,
    documentId: '',
    name: '',
    alternativeText: null,
    caption: null,
    width: 0,
    height: 0,
    hash: '',
    ext: '',
    mime: '',
    size: 0,
    url: '',
    previewUrl: null,
    provider: '',
    provider_metadata: null,
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
    locale: null
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    const parsedValue = 
      (type === "number" || name === "category" || name === "subCategory" || name === "color")
        ? Number(value) 
        : value;
  
    if (name === "category") {
     
      
      setData({ 
        ...data, 
        category: {
          id: Number(parsedValue), 
          title: cats.find(cat => cat.id === Number(parsedValue))?.title || ""
          ,
          documentId: '',
          createdAt: '',
          updatedAt: '',
          img: defaultImage,
          publishedAt: '',
          locale: null
        } 
      });
    } else if (name === "subCategory") {
      // Update both id and title for subCategory
      setData({ 
        ...data, 
        subCategory: {
          id: Number(parsedValue), // Ensure id is a number
          title: subCats.find(subCat => subCat.id === Number(parsedValue))?.title || "" // Fallback to empty string if undefined
          ,
          documentId: '',
          createdAt: '',
          updatedAt: '',
          img: defaultImage,
          publishedAt: '',
          locale: null
        } 
      });
    } else if (name === "color") {
      // Update both id and title for color
      setData({ 
        ...data, 
        color: {
          id: Number(parsedValue), // Ensure id is a number
          title: colors.find(color => color.id === Number(parsedValue))?.title || "" // Fallback to empty string if undefined
          ,
          documentId: '',
          createdAt: '',
          updatedAt: '',
          publishedAt: '',
          locale: null
        } 
      });
    } else {
      // Handle other fields normally
      setData({ ...data, [name]: parsedValue });
    }
  };
  
  
  
  
  
  
  
  

  // const parsedValue = type === "number" || name === "category" || name === "subCategory" || name === "color"
    //   ? Number(value)
    //   : value;

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeId = Number(e.target.value); 
    const selectedSize = sizes.find(size => size.id === sizeId); 
    
    if (selectedSize && !selectedSizes.includes(selectedSize)) {
      setSelectedSizes([...selectedSizes, selectedSize]); 
      setSelectedSize(""); 
    }
  };

  const removeSize = (size: number) => {
    setSelectedSizes(selectedSizes.filter((s) => s.id !== size));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageKey: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        
        if (imageKey === 'img1') {
          setImg1(file);
          setPreview1(previewUrl);
        } else if (imageKey === 'img2') {
          setImg2(file);
          setPreview2(previewUrl);
        } else if (imageKey === 'img3') {
          setImg3(file);
          setPreview3(previewUrl);
        }
      }
    }
  };

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
  



  

  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.productName.trim() === "") {
      toast.error("Product name cannot be empty!");
      return; // Prevent submission
    }
    if (data.productDescription.trim() === "") {
      toast.error("Product name cannot be empty!");
      return; // Prevent submission
    }
    if (data.productDescription.length <= 10) {
      toast.error("Product Description cannot be less than or equal 10 characters!");
      return; // Prevent submission
    }
    if (data.productDescription.length >= 600) {
      toast.error("Product Description cannot be less greater or equal 600 characters!");
      return; // Prevent submission
    }
    if (data.productName.length  <= 5) {
      toast.error("Product name cannot be less than or equal 5 characters!");
      return; // Prevent submission
    }
    if (!preview1 && !preview2 && ! preview3  ) { 
      toast.error("Product Images cannot be empty!");
      return; // Prevent submission
  }
  if(selectedSizes.length ===0) {
    toast.error("Product Sizes cannot be empty!");
    return; // Prevent submission
  }
  if (data.productPrice === 0 || data.productStock === 0) {
    toast.error("Product Price and Stock cannot be 0 !");
    return; // Prevent submission
  }
     setIsLoading(true)
    try {
      const formData = new FormData();
      
  
      // Add product details
      formData.append("data[title]", data.productName.toString());
      formData.append("data[desc]", data.productDescription.toString());
      formData.append("data[price]", data.productPrice.toString());
      formData.append("data[oldPrice]", data.oldPrice.toString());
      formData.append("data[isNew]", JSON.stringify(isNewProduct));
      formData.append("data[stock]", data.productStock.toString());
      formData.append("data[type]", data.productType.toString());
      formData.append("data[category]", JSON.stringify(data.category.id));

      formData.append("data[sub_category]", JSON.stringify(data.subCategory.id))
      formData.append("data[color]", JSON.stringify(data.color.id));
  
      // Add sizes
      selectedSizes.forEach((size, index) => {
        formData.append(`data[sizes][${index}]`, size.id.toString());
      });
  
      // Upload images first
      let img1Id = null;
      let img2Id = null;
      let img3Id = null;
  
      const uploadImage = async (image: File) => {
        const uploadFormData = new FormData();
        uploadFormData.append('files', image);
        const uploadResponse = await axios.post(`${process.env.NEXT_STRAPI_URL}/upload`, uploadFormData);
        return uploadResponse.data[0].id; // get the file ID
      };
  
      if (img1) {
        img1Id = await uploadImage(img1);
      }
      if (img2) {
        img2Id = await uploadImage(img2);
      }
      if (img3) {
        img3Id = await uploadImage(img3);
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
  
      console.log("Form Data:", Array.from(formData.entries()));
  
    
       await axios.put(`${process.env.NEXT_STRAPI_URL}/products/${product.documentId}?populate=*`, formData);
       router.refresh()
      
  
      toast.success("Product updated successfully");
    
    
      router.replace("/admin/products")
      router.prefetch("/admin/products")
    
        
        
      
    
    } catch (error) {
      toast.error(`Error: ${error}`);
    }finally{
        setIsLoading(false)
    }
  };
  

 

  return (
    <>
     

       <div className=" py-2 md:py-0 md:px-2">
       <form onSubmit={handleSubmit}>
            {/* Flex container for inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="productName">
                  Product Name
                </label>
                <input
                name='productName'
                  type="text"
                  id="productName"
                  value={data.productName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  placeholder="e.g. White Shoes"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                  Product Description
                </label>
                <textarea
                  id="description"
                  name='productDescription'
                  rows={2}
                  cols={50}
                  className="mt-1 block w-full resize-none border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  placeholder="Enter product description"
                  value={data.productDescription}
                  onChange={handleInputChange}
                />
              </div>

              {/* Price, Old Price, and Stock */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="stock">
                  Stock
                </label>
                <input
                name='productStock'
                  type="number"
                  id="stock"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  placeholder="Enter product stock"
                  value={data.productStock}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="price">
                  Price
                </label>
                <input
                name='productPrice'
                  type="number"
                  id="price"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  placeholder="Enter product price"
                  value={data.productPrice}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="oldPrice">
                  Old Price (Optional)
                </label>
                <input
                  type="number"
                  id="oldPrice"
                  name='oldPrice'
                  value={data.oldPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
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
  id="category"
  name="category"
  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
  value={data.category?.id ?? data.category ?? ''}
  onChange={handleInputChange}
>
  
  <option value={data.category?.id}>{data.category?.title}</option>
  
 
  {cats
  ?.filter(cat => cat.id !== (data.category?.id ?? data.category ?? ''))
  .map((cat) => (
    <option key={cat.id} value={cat?.id}>
      {cat?.title}
    </option>
  ))}
</select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="subCategory">
                  Subcategory
                </label>
                <select
  id="subCategory"
  name="subCategory"
  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
  value={data.subCategory?.id}
  onChange={handleInputChange}
>

  <option value={data.subCategory.id}>{data.subCategory?.title}</option>
  
 
  {subCats
    ?.filter(sub => sub.id !== data.subCategory.id) 
    .map((sub) => (
      <option key={sub.id} value={sub?.id}>
        {sub?.title}
      </option>
    ))}
</select>

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="type">
                  Type
                </label>
                <select
                  id="type"
                  name='productType'
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  value={data.productType}
                  onChange={handleInputChange}
                >
                  
                  {data.productType === "normal" && (
                    <>
                   <option value={data.productType}>{data.productType}</option>
                   <option value="trending">trending</option>
                   <option value="featured">featured</option>
                   </>
                  )}
                  {data.productType === "featured" && (
                    <>
                   <option value={data.productType}>{data.productType}</option>
                   <option value="trending">trending</option>
                   <option value="normal">normal</option>
                 
                   </>
                  )}
                  {data.productType === "trending" && (
                    <>
                   <option value={data.productType}>{data.productType}</option>
                   <option value="featured">featured</option>
                   <option value="normal">normal</option>
                 
                   </>
                  )}
                  
                  
                </select>
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
    className="hidden"
  
    onChange={(e) => handleImageUpload(e, 'img1')}
  />
  {preview1 ? (
    <div className="relative h-full w-full">
      <img src={preview1} alt="Image 1" className="h-full w-full object-cover rounded-lg" />
      <button
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
        onClick={() => handleRemoveImage('img1')}
      >
        X
      </button>
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
  {preview2 ? (
    <div className="relative h-full w-full">
      <img src={preview2} alt="Image 2" className="h-full w-full object-cover rounded-lg" />
      <button
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
        onClick={() => handleRemoveImage('img2')}
      >
        X
      </button>
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
  {preview3 ? (
    <div className="relative h-full w-full">
      <img src={preview3} alt="Image 3" className="h-full w-full object-cover rounded-lg" />
      <button
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
        onClick={() => handleRemoveImage('img3')}
      >
        X
      </button>
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
                  className="mt-1 block border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition flex-grow"
                  value={selectedSize}
                  onChange={handleSizeChange}
                >
                   <option value="">Select Size</option>
                  {sizes.map((size) => (
                     <option key={size.id} value={size.id}>{size.title}</option>
                  ))}
                 
                 
                </select>
              </div>
             {/* Display selected sizes */}
<div className="flex gap-2 flex-wrap">
  {selectedSizes.map((size) => {
    return (
      
      selectedSizes && (
        <span
          key={size.id}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md flex items-center"
        >
          {size.title} 
          <ButtonIcon
            className="ml-2 text-red-500 hover:text-red-600"
            onClick={() => removeSize(size.id)} 
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
                  name='color'
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  value={data.color?.id}
                  onChange={handleInputChange}
                >
                <option  value={data.color.id}>{data.color?.title}</option>
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
            <span>Editing</span>
        </>
    ) : (
        <span>Edit Product</span>
    )}
</ButtonIcon>

          </form>
       </div>
       
    
    </>
  );
};

export default EditProduct;
