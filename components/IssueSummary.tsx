import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import React from 'react';
import LinkStyled from './LinkStyled';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: ' Open Issues',
      value: open,
      status: 'OPEN',
    },
    {
      label: ' In Progress Issues',
      value: inProgress,
      status: 'IN_PROGRESS',
    },
    {
      label: ' Closed Issues',
      value: closed,
      status: 'CLOSED',
    },
  ];

  return (
    <Flex gap="2">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <LinkStyled href={`/issues?status=${container.status}`}>
              {container.label}
            </LinkStyled>
            <Text size="5" className="font-bold" align="center">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
