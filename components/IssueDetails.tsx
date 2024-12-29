import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import React from 'react';
import IssueStatusBadge from './IssueStatusBadge';
import { Issue } from '@prisma/client';
import Markdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>

      <Flex gap="3" className="my-3">
        <Text>
          <IssueStatusBadge status={issue.status} />
        </Text>
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>

      <Card className="prose max-w-full " mt="5">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
