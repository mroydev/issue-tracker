'use client';
import { Avatar, Box, DropdownMenu, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const AuthButtons = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <Skeleton width={100} height={40} />;
  return (
    <Box className="mt-4 md:mt-0">
      {session ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session?.user?.image ?? undefined}
              fallback="?"
              size="3"
              radius="full"
              className=" cursor-pointer"
            />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user?.email}</Text>
            </DropdownMenu.Label>

            <DropdownMenu.Item className="flex justify-center">
              <Link href="/api/auth/signout">Sign out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Link
          href="/api/auth/signin"
          className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        >
          Sign in
        </Link>
      )}
    </Box>
  );
};

export default AuthButtons;
