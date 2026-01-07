import React, { useState } from 'react';
import { usePagination } from '../hooks/usePagination';

const PaginationDemo: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = 123;
  
  // Generate sample data
  const allItems = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);
  
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  } = usePagination({
    totalItems,
    itemsPerPage,
    initialPage: 1,
  });

  // Get items for current page
  const currentItems = allItems.slice(startIndex, endIndex + 1);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handlePageJump = (pageNum: number) => {
    setPage(pageNum);
  };

  // Generate page numbers for pagination controls
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 10;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first few, current page area, and last few
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Pagination Demo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="itemsPerPage">Items per page: </label>
        <select 
          id="itemsPerPage"
          value={itemsPerPage} 
          onChange={handleItemsPerPageChange}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <p><strong>Total Items:</strong> {totalItems}</p>

      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px', 
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        {currentItems.map((item, index) => (
          <div key={startIndex + index} style={{ 
            padding: '8px 0', 
            borderBottom: index < currentItems.length - 1 ? '1px solid #eee' : 'none' 
          }}>
            {item}
          </div>
        ))}
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <button 
          onClick={prevPage} 
          disabled={!canPrevPage}
          style={{
            padding: '8px 16px',
            backgroundColor: canPrevPage ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: canPrevPage ? 'pointer' : 'not-allowed'
          }}
        >
          Previous
        </button>

        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button 
          onClick={nextPage} 
          disabled={!canNextPage}
          style={{
            padding: '8px 16px',
            backgroundColor: canNextPage ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: canNextPage ? 'pointer' : 'not-allowed'
          }}
        >
          Next
        </button>
      </div>

      <p style={{ textAlign: 'center', color: '#666' }}>
        Showing items {startIndex + 1} - {endIndex + 1} (Total on this page: {itemsOnCurrentPage})
      </p>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '5px', 
        justifyContent: 'center',
        marginTop: '20px'
      }}>
        {getPageNumbers().map(pageNum => (
          <button
            key={pageNum}
            onClick={() => handlePageJump(pageNum)}
            style={{
              padding: '8px 12px',
              backgroundColor: pageNum === currentPage ? '#007bff' : '#f8f9fa',
              color: pageNum === currentPage ? 'white' : '#007bff',
              border: '1px solid #007bff',
              borderRadius: '4px',
              cursor: 'pointer',
              minWidth: '40px'
            }}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationDemo;
