import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';

import { auth } from '@/auth';
import IssueDetails from '@/components/IssueDetails';
import AssigneeSelect from '@/components/AssigneeSelect';
import DeleteIssueButton from '@/components/buttons/DeleteIssueButton';
import EditIssueButton from '@/components/buttons/EditIssueButton';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const issueId = parseInt(id);
  const session = await auth();

  if (isNaN(issueId)) {
    console.error('Invalid issue ID:', id);
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid
      columns={{
        initial: '1',
        sm: '5',
      }}
      gap="5"
      align="center"
    >
      <Box className="md:col-span-4 ">
        <IssueDetails issue={issue!} />
      </Box>

      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issue={issue!} />
            <DeleteIssueButton issue={issue!} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default Page;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params before accessing it
  const { id } = await params;

  const issueId = parseInt(id);

  if (isNaN(issueId)) {
    console.error('Invalid issue ID:', id);
    return {
      title: 'Issue Not Found',
      description: 'Invalid issue ID provided.',
    };
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return {
      title: 'Issue Not Found',
      description: 'No issue found for the given ID.',
    };
  }

  return {
    title: issue.title || `Issue #${issueId}`,
    description: `Details of Issue #${issueId}`,
  };
}
