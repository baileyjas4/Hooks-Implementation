import React from "react";
import usePagination from "../hooks/usePagination";

function PaginationDemo() {
  const items = Array.from({ length: 123 }, (_, i) => `Item ${i + 1}`);

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    nextPage,
    prevPage,
    setPage,
    canNextPage,
    canPrevPage,
  } = usePagination(items.length, 10, 1);

  const currentItems = items.slice(startIndex, endIndex + 1);

  return (
    <div>
      <h2>Pagination Demo</h2>

      <ul>
        {currentItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <button onClick={prevPage} disabled={!canPrevPage}>
        Previous
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {currentPage} of {totalPages}
      </span>

      <button onClick={nextPage} disabled={!canNextPage}>
        Next
      </button>

      <p>
        Showing items {startIndex + 1} - {endIndex + 1} (
        Total on this page: {itemsOnCurrentPage})
      </p>

      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PaginationDemo;
git 