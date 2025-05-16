import React from "react";
import type { PaginationProps } from "../../types/movies";
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const siblingsCount = 1;

  const handlePageChange = (pageNum: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onPageChange(pageNum);
  };

  const createPageButton = (pageNum: number) => (
    <button key={pageNum} type="button" onClick={() => handlePageChange(pageNum)} className={`px-3 py-1 rounded ${currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
      {pageNum}
    </button>
  );

  const createCustomButton = (label: string, pageNum: number) => (
    <button key={`${label}-${pageNum}`} type="button" onClick={() => handlePageChange(pageNum)} className={`px-3 py-1 rounded ${currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
      {label}
    </button>
  );

  const renderPageNumbers = () => {
    const pages = [];

    const dots = (key: string) => (
      <span key={key} className="px-2 select-none">
        ...
      </span>
    );

    // If total pages <= 5, show all pages
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(createPageButton(i));
      }
      return pages;
    }

    // show [1][2][3]...[last]
    if (currentPage <= 2) {
      pages.push(createPageButton(1));
      pages.push(createPageButton(2));
      pages.push(createPageButton(3));
      pages.push(dots("right-dots"));
      pages.push(createCustomButton("Last", totalPages));
      return pages;
    }

    // show [1]...[totalPages-2][totalPages-1][totalPages]
    if (currentPage >= totalPages - 1) {
      pages.push(createPageButton(1));
      pages.push(dots("left-dots"));
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(createPageButton(i));
      }
      return pages;
    }

    // show [1]...[496][497][498]...[Last]
    pages.push(createPageButton(1));
    pages.push(dots("left-dots"));

    for (let i = currentPage - siblingsCount; i <= currentPage + siblingsCount; i++) {
      pages.push(createPageButton(i));
    }

    pages.push(dots("right-dots"));
    pages.push(createCustomButton("Last", totalPages));

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <button type="button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
        Prev
      </button>

      <div className="flex items-center space-x-2">{renderPageNumbers()}</div>

      <button type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
        Next
      </button>
    </div>
  );
};

export default Pagination;
