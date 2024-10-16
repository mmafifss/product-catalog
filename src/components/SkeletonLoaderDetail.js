import React from 'react';

const SkeletonLoaderDetail = () => {
    return (
        <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-6 w-24 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="grid grid-cols-4 gap-2">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="w-full h-20 bg-gray-300 rounded"></div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                    </div>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoaderDetail;