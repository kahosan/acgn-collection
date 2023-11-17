import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.cookies.has('token'))
    return NextResponse.next();

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|fonts|musume|placeholder|favicon.ico|login).*)'
};
