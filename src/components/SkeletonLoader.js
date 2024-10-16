import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
                <div key={index} className="border rounded-lg p-4 flex flex-col animate-pulse">
                    <div className="bg-gray-300 h-48 w-full mb-2 rounded"></div>
                    <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/2 mb-2 rounded"></div>
                    <div className="flex justify-between items-center mt-2">
                        <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                        <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                    </div>
                    <div className="bg-gray-300 h-4 w-1/3 mt-2 rounded"></div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;