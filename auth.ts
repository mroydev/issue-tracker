import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

import { PrismaAdapter } from '@auth/prisma-adapter';
// import { prisma } from "@/prisma"
// replace {prisma} with your global prisma client import
// import prisma from '@/prisma/client';
// or the following, as is your case
// import prisma from "@/lib/prisma";
import prisma from '@/prisma/client';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [Google],
  session: {
    strategy: 'jwt',
  },
});
