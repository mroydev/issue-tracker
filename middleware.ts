// export { auth as middleware } from '@/auth';

import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export default async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session) {
    const pathname = request.nextUrl.pathname;

    if (
      pathname !== '/' &&
      pathname !== '/issues' &&
      pathname !== '/issues/new-issue' &&
      pathname !== '/sign-in' &&
      !/^\/issues\/\d+$/.test(pathname) // Allow routes like `/issues/44`
    ) {
      const absoluteURL = new URL('/', request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
