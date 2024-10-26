import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="flex gap-3 items-center p-3 animate-pulse">
    <div className="w-[150px] h-[150px] bg-gray-200 rounded-md"></div>
    <div className="flex flex-col flex-1">
      <div className="h-4 bg-gray-200 rounded-md mb-1"></div>
      <div className="h-4 bg-gray-200 rounded-md mb-1 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-md mb-1 w-1/2"></div>
      <div className="flex items-center gap-2 mb-1">
        <div className="h-8 bg-gray-200 rounded-md w-12"></div>
        <div className="h-8 bg-gray-200 rounded-md w-12"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
    </div>
  </div>
  )
}

export default SkeletonLoader
