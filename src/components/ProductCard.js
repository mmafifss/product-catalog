import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, HeartIcon } from '@heroicons/react/solid';

const ProductCard = ({ product, isWishlisted, toggleWishlist }) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <Link to={`/product/${product.id}`}>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <Link to={`/product/${product.id}`}>
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                        {product.title}
                    </h2>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.category}</p>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">${product.price}</span>
                    <span className="text-sm text-green-500">-{product.discountPercentage}%</span>
                </div>
                <div className="flex items-center mb-2">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-900 dark:text-gray-100">{product.rating}</span>
                </div>
                <p className={`text-sm ${product.stock <= 5 ? 'text-red-500' : 'text-green-500'}`}>
                    {product.stock <= 5 ? 'Low stock' : 'In stock'}
                </p>
                <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`mt-2 p-2 rounded-full ${isWishlisted ? 'text-red-500 bg-red-100 dark:bg-red-200' : 'text-gray-400 bg-gray-100 dark:bg-gray-700'
                        } hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300`}
                >
                    <HeartIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
