import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IProductSubCat } from '../interfaces';
import ButtonIcon from './ui/ButtonIcon';
import Image from 'next/image';

interface IProps {
  isOpenEdit: boolean;
  toggleDialogEdit: () => void;
  category: IProductSubCat;
}

const DialogCatEdit = ({ isOpenEdit, toggleDialogEdit, category  }: IProps) => {
  const [preview, setPreview] = useState(category?.img?.url || null); 
  const [img, setImg] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(category?.title); 
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageKey: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        if (imageKey === 'img') {
          setImg(file);
          setPreview(previewUrl);
        }
      }
    }
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>, imageKey: string) => {
    e.preventDefault();
    if (imageKey === 'img') {
      setImg(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") {
      toast.error("Category name cannot be empty!");
      return; // Prevent submission
    }
    if (title.length  <= 3) {
      toast.error("Category name cannot be less than or equal 3 characters!");
      return; // Prevent submission
    }
    if (!img) { 
      toast.error("Category Image cannot be empty!");
      return; // Prevent submission
  }
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Add product details
      formData.append('data[title]', title || ''); // تأكد أن `title` ليس فارغًا

      let imgId = null;

      // Function to handle image upload
      const uploadImage = async (image: File) => {
        const uploadFormData = new FormData();
        uploadFormData.append('files', image);

        // Upload image to Strapi
        const uploadResponse = await axios.post(`https://strapi-ecommerce-demo2.onrender.com/api/upload`, uploadFormData);
        return uploadResponse.data[0].id; // Return the ID of the uploaded image
      };

      // If there's an image, upload it and get the ID
      if (img) {
        imgId = await uploadImage(img);
      }

      // Append the image ID to the form data if available
      if (imgId) {
        formData.append('data[img]', imgId.toString()); // Append the image ID to formData
      }

      // Log the form data for debugging purposes
      console.log('Form Data:', Array.from(formData.entries()));

      // Send the category data to Strapi
      const response = await axios.put(`https://strapi-ecommerce-demo2.onrender.com/api/categories/${category?.documentId}?populate=*`, formData);

      console.log('Response data:', response.data);

      toast.success('Category updated successfully');

      router.refresh(); 
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(`Error: ${error}`);
    } finally {
        toggleDialogEdit()
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpenEdit && (
        <div
          className={`fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-500 ease-in-out ${isOpenEdit ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Dialog */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ease-in-out transform ${
          isOpenEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 md:w-[400px] lg:w-[500px] transform transition-transform duration-500 ease-in-out">
          {/* Close Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Category</h2>
            <ButtonIcon
              className="text-gray-500 hover:text-gray-800 transition-colors"
              onClick={toggleDialogEdit} 
            >
              <FiX className="mb-4" size={24} />
            </ButtonIcon>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Product Fields */}
            <div className="mb-4 flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="productName">
                Category Name
              </label>
              <input
                type="text"
                id="productName"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                placeholder="e.g. Men"
              />

              <label className="block text-sm font-medium text-gray-700">Category Image</label>
              <div className="w-full">
                <label className="h-32 flex items-center justify-center border border-dashed border-gray-400 rounded-lg cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'img')}
                  />
                  {preview ? (
                    <div className="relative h-full w-full">
                      <Image width={500} height={500} src={preview} alt="Category Image" className="h-full w-full object-cover rounded-lg" />
                      <button
                        className="absolute z-10 top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
                        onClick={(e) => handleRemoveImage(e, 'img')}
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500">Upload Image </span>
                  )}
                </label>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={toggleDialogEdit}
                className="mr-2 px-4 py-2 bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold rounded"
              >
                Cancel
              </button>
             {/* Submit Button */}
             <ButtonIcon
            disabled={isLoading}
    type="submit"
    className="flex justify-center items-center space-x-2 w-full bg-green-600 disabled:bg-green-300 disabled:cursor-none text-white font-semibold rounded-md p-2 hover:bg-green-700 transition"
>
    {isLoading ? (
        <>
            <svg
                aria-hidden="true"
                className="w-6 h-6 text-transparent animate-spin fill-green-600 mr-3"
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
        <span>Edit Category</span>
    )}
</ButtonIcon>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DialogCatEdit;
