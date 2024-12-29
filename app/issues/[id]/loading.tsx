import { Box, Flex, Grid } from '@radix-ui/themes';

import React from 'react';

import { auth } from '@/auth';

import IssueDetailsSkeleton from '@/components/skeleton/IssueDetailsSkeleton';
import AssigneeSelectSkeleton from '@/components/skeleton/AssigneeSelectSkeleton';
import EditIssueButtonSkeleton from '@/components/skeleton/EditIssueButtonSkeleton';
import DeleteIssueButtonSkeleton from '@/components/skeleton/DeleteIssueButtonSkeleton';

const loading = async () => {
  const session = await auth();

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
        <IssueDetailsSkeleton />
      </Box>

      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelectSkeleton />
            <EditIssueButtonSkeleton />

            <DeleteIssueButtonSkeleton />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default loading;
