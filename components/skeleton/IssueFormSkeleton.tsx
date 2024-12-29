import React from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IssueFormSkeleton = () => {
  return (
    <div className="mx-auto max-w-2xl items-center justify-center text-center">
      <Skeleton width={600} height={40} />
      <Skeleton width={600} height={300} className="mt-4" />
    </div>
  );
};

export default IssueFormSkeleton;
