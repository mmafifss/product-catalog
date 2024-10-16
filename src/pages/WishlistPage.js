import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const WishlistPage = ({ products, wishlist, toggleWishlist }) => {
    const wishlistProducts = products.filter(product => wishlist.includes(product.id));

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-8 text-center">My Wishlist</h1>
            {wishlistProducts.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>Your wishlist is empty.</p>
                    <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
                        Go back to products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isWishlisted={true}
                            toggleWishlist={toggleWishlist}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;