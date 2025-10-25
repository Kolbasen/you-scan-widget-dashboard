import { useCallback, useState } from 'react';

export const useEditModal = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleModalOpenChange = useCallback((open: boolean) => {
    setIsEditModalOpen(open);
  }, []);

  return {
    isEditModalOpen,
    handleModalOpenChange,
  };
};
