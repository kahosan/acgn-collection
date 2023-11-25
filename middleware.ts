import { withAuth } from 'next-auth/middleware';
import { encode, getToken } from 'next-auth/jwt';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { refreshAccessToken } from './lib/auth';

function signOut(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url));

  request.cookies.getAll().forEach(cookie => {
    if (cookie.name.includes('next-auth.session-token'))
      response.cookies.delete(cookie.name);
  });

  return response;
}

const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';

export default withAuth(async req => {
  const token = await getToken({ req });

  if (!token) return signOut(req);
  if (!token.expires) return signOut(req);

  if (Date.now() < token.expires) return NextResponse.next();

  const _token = await refreshAccessToken(token);
  if (!_token) return signOut(req);

  const session = await encode({
    secret: process.env.NEXTAUTH_SECRET ?? '',
    token: _token,
    maxAge: (_token.expires - Date.now()) / 1000
  });

  req.cookies.set(sessionCookie, session);

  const response = NextResponse.next({ request: { headers: req.headers } });
  response.cookies.set(sessionCookie, session);

  return response;
},
{
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login'
  }
});

export const config = {
  matcher: '/((?!api|_next/static|_next/image|fonts|musume|placeholder|favicon.ico|login).*)'
};
