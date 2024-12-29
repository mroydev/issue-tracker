'use client';
import { Issue } from '@prisma/client';
import { usePathname } from 'next/navigation';

import React from 'react';

const CurrentPath = (issue: Issue) => {
  const pathname = usePathname();

  const currentPathname = pathname === `/issues/${issue.id}`;

  return <div>{currentPathname}</div>;
};

export default CurrentPath;
