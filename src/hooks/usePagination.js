import { useState, useMemo } from "react";

function usePagination(totalItems, itemsPerPage = 10, initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage - 1,
    totalItems - 1
  );

  const itemsOnCurrentPage =
    totalItems === 0 ? 0 : endIndex - startIndex + 1;

  const canPrevPage = safePage > 1;
  const canNextPage = safePage < totalPages;

  const setPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const nextPage = () => {
    if (canNextPage) setCurrentPage((p) => p + 1);
  };

  const prevPage = () => {
    if (canPrevPage) setCurrentPage((p) => p - 1);
  };

  return {
    currentPage: safePage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  };
}

export default usePagination;
