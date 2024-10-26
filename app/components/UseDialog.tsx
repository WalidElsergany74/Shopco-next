import { useState } from 'react';

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const openDialogWithItem = (item :any) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  return {
    isOpen,
    selectedItem,
    toggleDialog,
    openDialogWithItem,
    closeDialog,
  };
};

export default useDialog;
