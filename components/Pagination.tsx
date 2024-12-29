'use client';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());

    router.push('?' + params.toString());
  };

  if (pageCount <= 1) return null;

  return (
    <Flex gap="2" align="center">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => handlePageChange(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
