import React from 'react'

const SkeletonCard = () => {
  return (
    <>
    <div className="relative flex flex-col items-start w-full animate-pulse">
    {/* Image Skeleton */}
    <div className="relative w-full h-64 bg-gray-200 rounded-md"></div>

    {/* Details Skeleton */}
    <div className="flex flex-col w-full mt-2 space-y-3">
      {/* Title Skeleton */}
      <div className="w-3/4 h-4 bg-gray-200 rounded-md"></div>

      {/* Color and Rating Skeleton */}
      <div className="flex items-center gap-2 mt-1">
        <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="w-4 h-4 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>

      {/* Price and Discount Skeleton */}
      <div className="mt-2 flex items-center space-x-2">
        <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
        <div className="w-10 h-4 bg-gray-200 rounded-md"></div>
        <div className="w-12 h-4 bg-gray-200 rounded-md"></div>
      </div>

      {/* Add Button Skeleton */}
      <div className="mt-2 w-full h-10 bg-gray-300 rounded-md"></div>
    </div>
  </div>
    <div className="relative flex flex-col items-start w-full animate-pulse">
    {/* Image Skeleton */}
    <div className="relative w-full h-64 bg-gray-200 rounded-md"></div>

    {/* Details Skeleton */}
    <div className="flex flex-col w-full mt-2 space-y-3">
      {/* Title Skeleton */}
      <div className="w-3/4 h-4 bg-gray-200 rounded-md"></div>

      {/* Color and Rating Skeleton */}
      <div className="flex items-center gap-2 mt-1">
        <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="w-4 h-4 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>

      {/* Price and Discount Skeleton */}
      <div className="mt-2 flex items-center space-x-2">
        <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
        <div className="w-10 h-4 bg-gray-200 rounded-md"></div>
        <div className="w-12 h-4 bg-gray-200 rounded-md"></div>
      </div>

      {/* Add Button Skeleton */}
      <div className="mt-2 w-full h-10 bg-gray-300 rounded-md"></div>
    </div>
  </div>
    <div className="relative flex flex-col items-start w-full animate-pulse">
    {/* Image Skeleton */}
    <div className="relative w-full h-64 bg-gray-200 rounded-md"></div>

    {/* Details Skeleton */}
    <div className="flex flex-col w-full mt-2 space-y-3">
      {/* Title Skeleton */}
      <div className="w-3/4 h-4 bg-gray-200 rounded-md"></div>

      {/* Color and Rating Skeleton */}
      <div className="flex items-center gap-2 mt-1">
        <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="w-4 h-4 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>

      {/* Price and Discount Skeleton */}
      <div className="mt-2 flex items-center space-x-2">
        <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
        <div className="w-10 h-4 bg-gray-200 rounded-md"></div>
        <div className="w-12 h-4 bg-gray-200 rounded-md"></div>
      </div>

      {/* Add Button Skeleton */}
      <div className="mt-2 w-full h-10 bg-gray-300 rounded-md"></div>
    </div>
  </div>
    <div className="relative flex flex-col items-start w-full animate-pulse">
    {/* Image Skeleton */}
    <div className="relative w-full h-64 bg-gray-200 rounded-md"></div>

    {/* Details Skeleton */}
    <div className="flex flex-col w-full mt-2 space-y-3">
      {/* Title Skeleton */}
      <div className="w-3/4 h-4 bg-gray-200 rounded-md"></div>

      {/* Color and Rating Skeleton */}
      <div className="flex items-center gap-2 mt-1">
        <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="w-4 h-4 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>

      {/* Price and Discount Skeleton */}
      <div className="mt-2 flex items-center space-x-2">
        <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
        <div className="w-10 h-4 bg-gray-200 rounded-md"></div>
        <div className="w-12 h-4 bg-gray-200 rounded-md"></div>
      </div>

      {/* Add Button Skeleton */}
      <div className="mt-2 w-full h-10 bg-gray-300 rounded-md"></div>
    </div>
  </div>
  </>
  )
}

export default SkeletonCard
