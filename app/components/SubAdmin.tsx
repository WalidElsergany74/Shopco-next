"use client";
import React, { useState } from 'react';
import { IProductSubCat } from '../interfaces';
import ButtonIcon from './ui/ButtonIcon';
import { FaPlus } from 'react-icons/fa';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import useDialog from './UseDialog';
import DeleteSub from './DeleteSub';

const SubAdmin = ({ subs }: { subs: IProductSubCat[] }) => {
  const { isOpen, toggleDialog } = useDialog();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState<IProductSubCat | null>(null); 
  const [selectedDelete, setSelectedDelete] = useState<IProductSubCat | null>(null); 

  const toggleDialogEdit = () => {
    setIsOpenEdit((prev) => !prev);
  };
  const toggleDialogDelete = () => {
    setIsOpenDelete((prev) => !prev);
  };

  const toggleEdit = (documentId: string) => {
    const selectedItem = subs.find((item) => item.documentId === documentId);
    setSelectedEdit(selectedItem || null);
    setIsOpenEdit(true);  // Open the edit dialog
  };
  const toggleDelete = (documentId: string) => {
    const selectedItem = subs.find((item) => item.documentId === documentId);
    setSelectedDelete(selectedItem || null);
    setIsOpenDelete(true);  // Open the edit dialog
  };

  return (
    <>
      <div className="products flex flex-col justify-center p-4">
        <div className="flex flex-col justify-start items-start space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-wider">Sub-Categories</h1>
          <ButtonIcon
            onClick={toggleDialog}
            className="py-2 px-4 flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
          >
            <FaPlus size={12} />
            <p className="text-base font-semibold">Create SubCategory</p>
          </ButtonIcon>
        </div>
        {subs.length === 0 ? (
          <p>No SubCategories Created Yet</p>
        ) : (
          <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th className="p-4 border-b text-center border-slate-200 bg-slate-50">Name</th>
                  <th className="p-4 border-b border-slate-200 bg-slate-50 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subs.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 border-b cursor-pointer border-slate-200">
                    <td className="p-4 py-5 text-center">{item.title}</td>
                    <td className="p-4 py-5 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <ButtonIcon 
                          onClick={() => toggleEdit(item?.documentId)} 
                          className="bg-blue-800 text-white py-2 px-2 rounded-lg">
                          <LuPencil />
                        </ButtonIcon>
                        <ButtonIcon  onClick={() => toggleDelete(item?.documentId)}className="bg-red-800 text-white py-2 px-2 rounded-lg">
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
      <AddDialog toggleDialog={toggleDialog} isOpen={isOpen} />
      {isOpenEdit && selectedEdit && (
        <EditDialog
          isOpenEdit={isOpenEdit}
          subs={selectedEdit} 
          toggleDialogEdit={toggleDialogEdit}
        />
      )}
      {isOpenDelete && selectedDelete && (
        <DeleteSub
        subs={selectedDelete}
        toggleDialogDelete={toggleDialogDelete}
          isOpenDelete={isOpenDelete}
        />
      )}
    </>
  );
};

export default SubAdmin;
