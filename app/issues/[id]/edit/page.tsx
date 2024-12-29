import IssueForm from '@/components/forms/IssueForm';
import prisma from '@/prisma/client';
import React from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const selectedIssue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }, // Parse the id to an integer
  });

  if (!selectedIssue) {
    return <div>Issue not found</div>;
  }

  return (
    <div className="flex justify-center">
      <IssueForm actionType="edit" selectedIssue={selectedIssue} />
    </div>
  );
};

export default Page;
