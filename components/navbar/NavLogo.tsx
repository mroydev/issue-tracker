import { Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { IoBugSharp } from 'react-icons/io5';

const NavLogo = () => {
  return (
    <Flex align="center" gap="3" className="mb-4 md:mb-0">
      <Link href="/" className="flex items-center text-xl text-gray-700">
        <IoBugSharp className="text-2xl" />
      </Link>
    </Flex>
  );
};

export default NavLogo;
