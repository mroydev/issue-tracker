'use client';

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IssueDetailsSkeleton = () => {
  return (
    <div className="p-5">
      {/* Title Skeleton */}
      <Skeleton width={300} height={40} />

      {/* Body Skeleton */}
      <Skeleton width="100%" height={20} count={4} className="mt-4" />
    </div>
  );
};

export default IssueDetailsSkeleton;
