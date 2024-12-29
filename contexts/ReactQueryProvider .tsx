'use client';

import { User } from '@prisma/client';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';
import axios from 'axios';

const queryClient = new QueryClient();

const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClientProvider;

export const useUsersQuery = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => await axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, // 1 minute
    retry: 3,
  });
};
