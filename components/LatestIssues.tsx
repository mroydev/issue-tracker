import prisma from '@/prisma/client';
import { Avatar, Flex, Heading, Table } from '@radix-ui/themes';
import React from 'react';
import LinkStyled from './LinkStyled';
import IssueStatusBadge from './IssueStatusBadge';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      assignedToUser: true,
    },
  });

  return (
    <div>
      <Heading size="4" className="mb-5" align="center">
        Latest Issues
      </Heading>
      <Table.Root variant="surface">
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex direction="row" gap="2" align="center" justify="between">
                  <Flex direction="column" gap="2">
                    <LinkStyled href={`/issues/${issue.id}`}>
                      {issue.title}
                    </LinkStyled>
                    <div className="">
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </Flex>

                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                      className=" cursor-pointer"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LatestIssues;
