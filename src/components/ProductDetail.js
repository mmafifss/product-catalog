import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/solid';
import SkeletonLoaderDetail from './SkeletonLoaderDetail';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (isLoading) {
        return <SkeletonLoaderDetail />;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to products</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={product.thumbnail} alt={product.title} className="w-full h-64 object-cover rounded-lg" />
                    <div className="grid grid-cols-4 gap-2 mt-4">
                        {product.images.slice(0, 4).map((image, index) => (
                            <img key={index} src={image} alt={`${product.title} ${index + 1}`} className="w-full h-20 object-cover rounded" />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold">${product.price}</span>
                        <span className="text-green-500 text-lg">-{product.discountPercentage}%</span>
                    </div>
                    <p className="mb-2"><strong>Category:</strong> {product.category}</p>
                    <div className="flex items-center mb-2">
                        <strong className="mr-2">Rating:</strong>
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1">{product.rating}</span>
                    </div>
                    <p className="mb-2"><strong>Stock:</strong> {product.stock}</p>
                    <p className="mb-2"><strong>Brand:</strong> {product.brand}</p>
                    <p className="mb-2"><strong>SKU:</strong> {product.id}</p>
                    <p className={`mt-2 ${product.stock <= 5 ? 'text-red-500' : 'text-green-500'} font-bold`}>
                        {product.stock <= 5 ? 'Low stock' : 'In stock'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;