import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import SkeletonLoader from './SkeletonLoader';
import SortingDropdown from './SortingDropdown';
import Pagination from './Pagination';

const ProductGrid = ({ products, searchTerm, handleSearch, wishlist, toggleWishlist, currentPage, setCurrentPage, sortBy, setSortBy, isLoading }) => {
    const productsPerPage = 12; // Jumlah produk per halaman

    const sortedProducts = useMemo(() => {
        let result = [...products];
        switch (sortBy) {
            case 'priceAsc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'ratingDesc':
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }
        return result;
    }, [products, sortBy]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <div className='px-4' >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-black"
                />
                <div className="w-full flex justify-end">
                    <SortingDropdown sortBy={sortBy} setSortBy={setSortBy} />
                </div>
            </div>
            {isLoading ? (
                <SkeletonLoader />
            ) : (
                <>
                    {currentProducts.length === 0 ? (
                        <div className=" flex justify-center py-6 text-center text-gray-500">
                            <p>Product is empty.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                            {currentProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isWishlisted={wishlist.includes(product.id)}
                                    toggleWishlist={toggleWishlist}
                                />
                            ))}

                        </div>
                    )}

                    {currentProducts.length !== 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ProductGrid;