"use client";
import React, { useState } from 'react';
import {  IProductSize } from '../interfaces';
import ButtonIcon from './ui/ButtonIcon';
import { FaPlus } from 'react-icons/fa';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import useDialog from './UseDialog';
import AddSize from './AddSize';
import EditSize from './EditSize';
import DeleteSize from './DeleteSize';

const SizeAdmin = ({ sizes }: { sizes: IProductSize[] }) => {
    console.log(sizes)
  const { isOpen, toggleDialog } = useDialog();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState<IProductSize | null>(null); 
  const [selectedDelete, setSelectedDelete] = useState<IProductSize | null>(null); 

  const toggleDialogEdit = () => {
    setIsOpenEdit((prev) => !prev);
  };
  const toggleDialogDelete = () => {
    setIsOpenDelete((prev) => !prev);
  };

  const toggleEdit = (documentId: string) => {
    const selectedItem = sizes.find((item) => item.documentId === documentId);
    setSelectedEdit(selectedItem || null);
    setIsOpenEdit(true);  // Open the edit dialog
  };
  const toggleDelete = (documentId: string) => {
    const selectedItem = sizes.find((item) => item.documentId === documentId);
    setSelectedDelete(selectedItem || null);
    setIsOpenDelete(true);  // Open the edit dialog
  };

  return (
    <>
      <div className="products flex flex-col justify-center p-4">
        <div className="flex flex-col justify-start items-start space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-wider">Sizes</h1>
          <ButtonIcon
            onClick={toggleDialog}
            className="py-2 px-4 flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
          >
            <FaPlus size={12} />
            <p className="text-base font-semibold">Create Size</p>
          </ButtonIcon>
        </div>
        {sizes.length === 0 ? (
          <p>No Sizes Created Yet</p>
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
                {sizes.map((item) => (
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
      <AddSize toggleDialog={toggleDialog} isOpen={isOpen} />
      {isOpenEdit && selectedEdit && (
        <EditSize
          isOpenEdit={isOpenEdit}
          subs={selectedEdit} 
          toggleDialogEdit={toggleDialogEdit}
        />
      )}
      {isOpenDelete && selectedDelete && (
        <DeleteSize
        subs={selectedDelete}
        toggleDialogDelete={toggleDialogDelete}
          isOpenDelete={isOpenDelete}
        />
      )}
    </>
  );
};

export default SizeAdmin;
