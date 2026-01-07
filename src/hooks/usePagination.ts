import { useState, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  itemsOnCurrentPage: number;
  setPage: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canNextPage: boolean;
  canPrevPage: boolean;
}

export const usePagination = ({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginationData = useMemo(() => {
    // Calculate total pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Ensure current page is within valid bounds
    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
    
    // Calculate start and end indices (0-based)
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
    
    // Calculate items on current page
    const itemsOnCurrentPage = totalItems === 0 ? 0 : Math.min(itemsPerPage, totalItems - startIndex);
    
    // Calculate navigation capabilities
    const canNextPage = validCurrentPage < totalPages;
    const canPrevPage = validCurrentPage > 1;

    return {
      totalPages,
      validCurrentPage,
      startIndex,
      endIndex,
      itemsOnCurrentPage,
      canNextPage,
      canPrevPage,
    };
  }, [totalItems, itemsPerPage, currentPage]);

  const setPage = (pageNumber: number) => {
    const validPage = Math.max(1, Math.min(pageNumber, paginationData.totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    if (paginationData.canNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (paginationData.canPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return {
    currentPage: paginationData.validCurrentPage,
    totalPages: paginationData.totalPages,
    startIndex: paginationData.startIndex,
    endIndex: paginationData.endIndex,
    itemsOnCurrentPage: paginationData.itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage: paginationData.canNextPage,
    canPrevPage: paginationData.canPrevPage,
  };
};
