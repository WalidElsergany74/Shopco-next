"use client";
import React, { useEffect, useState } from 'react';


const Loading = () => {
    const [isLoading, setIsLoading] = useState(true); // Start loading as true

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Set loading to false after 5 seconds
        }, 5000); // Delay for 5 seconds

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []); // Empty dependency array to run once on mount

    if (!isLoading) {
        return null; // Don't render anything if not loading
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center">
                {/* Loader */}
                <div className="loader animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                {/* Loading text */}
                <span className="text-white mt-4 text-lg font-medium">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
