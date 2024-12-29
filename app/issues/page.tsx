import prisma from '@/prisma/client';
import { Button, Flex } from '@radix-ui/themes';
import React from 'react';
import Link from 'next/link';
import IssueStatusFilter from '@/components/IssueStatusFilter';
import { Status } from '@prisma/client';
import Pagination from '@/components/Pagination';
import IssueTable, { columnNames, IssueQuery } from '@/components/IssueTable';
import { Metadata } from 'next';

interface Props {
  searchParams: Promise<IssueQuery>;
}

const Page = async ({ searchParams }: Props) => {
  // Awaiting searchParams before using it
  const query = await searchParams;

  const statuses = Object.values(Status);

  const status = statuses.includes(query.status) ? query.status : undefined;

  const orderBy = columnNames.includes(query.orderBy)
    ? { [query.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(query.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: {
      status,
    },
  });

  return (
    <div className="space-y-8 rounded-lg bg-gray-50 p-6 shadow-md">
      <Flex justify="between" align="center" mb="4">
        <IssueStatusFilter />
        <Button type="submit">
          <Link href="/issues/new-issue">New Issue</Link>
        </Button>
      </Flex>

      <IssueTable searchParams={query} issues={issues} />

      {/* Pagination Section */}
      <div className="flex justify-center">
        <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
};
