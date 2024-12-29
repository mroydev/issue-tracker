'use client';

import { Issue } from '@prisma/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';

const EditIssueButton = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push(`/issues/${issue.id}/edit`)}
      className="flex items-center space-x-2 text-white transition-colors duration-200 hover:bg-blue-900"
      style={{ cursor: 'pointer' }}
    >
      <span>Edit Issue</span> <Pencil2Icon />
    </Button>
  );
};

export default EditIssueButton;
