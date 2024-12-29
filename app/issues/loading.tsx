'use client';
import { Button, Flex, Table } from '@radix-ui/themes';

import React from 'react';
import Link from 'next/link';

import IssueStatusFilter from '@/components/IssueStatusFilter';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { usePathname } from 'next/navigation';

const Loading = () => {
  const pathname = usePathname();

  // Render the loading skeleton only if the user is on the /issues route
  if (pathname !== '/issues') {
    return null; // Prevent rendering when browsing child routes
  }

  const issues = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-5 px-5">
      <Flex mb={'5'} justify={'between'}>
        <IssueStatusFilter />
        <Button type="submit">
          <Link href="/issues/new-issue">New Issue</Link>
        </Button>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header className="text-center">
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              CreatedAt
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        {/* table  body */}
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton count={2} />
                <div className="block md:hidden">
                  <Skeleton count={2} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton count={2} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton count={2} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Loading;
