import React, { useState } from 'react';
import Image from 'next/image';
import Leftarrow from '@Images/offers/leftarrow.svg';
import Rightarrow from '@Images/offers/rightarrow.svg';

const Pagination = ({ data, TotalPages, CurrentPage, setCurrentPage }) => {
  const totalPages = TotalPages;
  const [currentPage1, setCurrentPage1] = useState(CurrentPage);
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // Update the parent component's state
    setCurrentPage1(pageNumber); // Update local state if needed
  };

  const handleNext = () => {
    const newPage = Math.min(currentPage1 + 1, totalPages);
    setCurrentPage(newPage);
    setCurrentPage1(newPage);
  };

  const handlePrev = () => {
    const newPage = Math.max(currentPage1 - 1, 1);
    setCurrentPage(newPage);
    setCurrentPage1(newPage);
  };

  const renderPageNumbers = () => {
    let pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage1 <= 3) {
        pages = [1, 2, 3, 4, 5];
      } else if (currentPage1 > totalPages - 3) {
        pages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [currentPage1 - 2, currentPage1 - 1, currentPage1, currentPage1 + 1, currentPage1 + 2];
      }
    }

    return (
      <>
        {currentPage1 > 3 && totalPages > maxPagesToShow && (
          <>
            <li className="cursor-pointer border px-4 py-2 font-bold" onClick={() => paginate(1)}>1</li>
            <li>...</li>
          </>
        )}
        {pages.map(page => (
          <li key={page} className={`cursor-pointer border px-4 py-2 ${page === currentPage1 ?
            'font-bold bg-secondaryColor text-white' : 'font-bold'}`} onClick={() => paginate(page)}>
            {page}
          </li>
        ))}
        {currentPage1 < totalPages - 2 && totalPages > maxPagesToShow && (
          <>
            <li>...</li>
            <li className="cursor-pointer border px-4 py-2 font-bold" onClick={() => paginate(totalPages)}>{totalPages}</li>
          </>
        )}
      </>
    );
  };

  return (
    <div className="pagination mt-4 flex justify-center items-center space-x-2">
      <button onClick={handlePrev} className="border px-4 py-2 cursor-pointer" disabled={currentPage1 === 1}>
        <Image src={Leftarrow} alt='left' />
      </button>
      <ul className="flex space-x-2 sm:overflow-y-visible overflow-y-auto">
        {renderPageNumbers()}
      </ul>
      <button onClick={handleNext} className="border px-4 py-2 cursor-pointer" disabled={currentPage1 === totalPages}>
        <Image src={Rightarrow} alt='right' />
      </button>
    </div>
  );
};

export default Pagination;
