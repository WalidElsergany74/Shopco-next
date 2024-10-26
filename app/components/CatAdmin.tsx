"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import ButtonIcon from './ui/ButtonIcon';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa';
import { IProductSubCat } from '../interfaces';
import AddProductDialog from './ui/DialogCat';
import DialogCatEdit from './DialogCatEdit';
import DeleteCatDialog from './ui/DeleteCat';


const CatAdmin = ({ categories }: { categories: IProductSubCat[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<IProductSubCat | null>(null); // Single category instead of array
  const [selectedCategoryD, setSelectedCategoryD] = useState<IProductSubCat | null>(null); // Single category instead of array

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const toggleDialogEdit = (catId?: string) => {
    const cat = categories.find((item) => item.documentId === catId);
    setSelectedCategory(cat || null); // Set the selected category
    setIsOpenEdit(!isOpenEdit); // Toggle the edit dialog
  };
  const toggleDialogDelete = (catId?: string) => {
    const cat = categories.find((item) => item.documentId === catId);
    setSelectedCategoryD(cat || null); // Set the selected category
    setIsOpenDelete(!isOpenDelete); // Toggle the edit dialog
  };

  return (
    <>
      <div className="products flex flex-col justify-center p-4">
        <div className="flex flex-col justify-start items-start space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-wider">Categories</h1>
          <ButtonIcon
            onClick={toggleDialog}
            className="py-2 px-4 flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
          >
            <FaPlus size={12} />
            <p className="text-base font-semibold">Create Category</p>
          </ButtonIcon>
        </div>
        {categories.length === 0 ? (
          <p>No Categories Created Yet</p>
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
                    <p className="text-sm font-normal uppercase leading-none text-slate-500">Actions</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 border-b cursor-pointer border-slate-200">
                    <td className="p-4 py-5">
                      <Image src={item?.img?.url} quality={85} width={70} height={70} alt="Category Image" />
                    </td>
                    <td className="p-4 py-5 text-center">
                      <p className="text-sm text-slate-500">{item.title}</p>
                    </td>
                    <td className="p-4 py-5 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <ButtonIcon
                          onClick={() => toggleDialogEdit(item?.documentId)}
                          className="bg-blue-800 text-white py-2 px-2 rounded-lg"
                        >
                          <LuPencil />
                        </ButtonIcon>
                        <ButtonIcon  onClick={() => toggleDialogDelete(item?.documentId)}className="bg-red-800 text-white py-2 px-2 rounded-lg">
                          <LuTrash2 />
                        </ButtonIcon>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AddProductDialog  isOpen={isOpen} toggleDialog={toggleDialog} />
      {selectedCategory && (
        <DialogCatEdit
          category={selectedCategory} // Pass the selected category to edit
          isOpenEdit={isOpenEdit}
          toggleDialogEdit={toggleDialogEdit}
        />
      )}
      {selectedCategoryD && (
        <DeleteCatDialog
          category={selectedCategoryD} // Pass the selected category to edit
          isOpenDelete={isOpenDelete}
          toggleDialogDelete={toggleDialogDelete}
        />
      )}
    </>
  );
};

export default CatAdmin;
