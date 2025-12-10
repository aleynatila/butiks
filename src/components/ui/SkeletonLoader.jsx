const SkeletonLoader = ({ variant = 'product-card' }) => {
  if (variant === 'product-card') {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
        {/* Image skeleton */}
        <div className="relative aspect-[3/4] bg-gray-200" />
        
        {/* Content skeleton */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <div className="h-3 w-16 bg-gray-200 rounded" />
          
          {/* Title */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>
          
          {/* Rating */}
          <div className="h-4 w-24 bg-gray-200 rounded" />
          
          {/* Price */}
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (variant === 'category-card') {
    return (
      <div className="animate-pulse">
        {/* Image skeleton - rectangular */}
        <div className="relative aspect-[16/9] bg-gray-200 rounded-lg" />
      </div>
    );
  }

  if (variant === 'page-header') {
    return (
      <div className="animate-pulse space-y-4 mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded" />
        <div className="h-4 w-96 bg-gray-200 rounded" />
      </div>
    );
  }

  // Default skeleton
  return (
    <div className="animate-pulse">
      <div className="h-40 bg-gray-200 rounded" />
    </div>
  );
};

export default SkeletonLoader;
