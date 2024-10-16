import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center py-6">
            <ul className="flex list-none">
                {/* Previous Page */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 mx-1 border rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
                    >
                        Previous
                    </button>
                </li>

                {/* Page Numbers */}
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`px-4 py-2 mx-1 border rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}

                {/* Next Page */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 mx-1 border rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
