import React from 'react';

/**
 * SkeletonLoader component
 * A clean loading layout that mimics the product grid structure using pulsing Tailwind skeleton blocks.
 */
export const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
      {[...Array(4)].map((_, i) => (
        <div 
          key={i} 
          className={`flex flex-col gap-3 ${i === 2 ? 'hidden sm:flex' : ''} ${i === 3 ? 'hidden lg:flex' : ''}`}
        >
          <div className="skeleton aspect-[4/5] rounded-2xl w-full"></div>
          <div className="skeleton h-6 w-3/4 rounded mt-2"></div>
          <div className="skeleton h-5 w-1/4 rounded"></div>
        </div>
      ))}
    </div>
  );
};
