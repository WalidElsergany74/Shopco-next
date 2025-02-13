import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-full h-40 bg-gray-200 rounded-md"></div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="flex w-full h-screen animate-pulse p-4">
      <div className="hidden md:block w-1/4 h-full bg-gray-200 rounded-md"></div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-4 space-y-4">
        {/* Image Skeleton */}
        <div className="w-full h-64 bg-gray-300 rounded-md"></div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
