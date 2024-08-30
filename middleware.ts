import { withAuth } from 'next-auth/middleware';
import { encode, getToken } from 'next-auth/jwt';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import process from 'node:process';

import { refreshAccessToken } from './lib/auth';

function secureCheck(cookie: string) {
  return cookie.startsWith('__Secure') || cookie.startsWith('__Host');
}

function signOut(request: NextRequest, message?: string) {
  const response = NextResponse.redirect(new URL(`/login${message ? `?error=${message}` : ''}`, request.url));

  request.cookies.getAll().forEach(cookie => {
    if (cookie.name.includes('next-auth')) {
      const options = { maxAge: 0, secure: secureCheck(cookie.name) };
      response.cookies.set(cookie.name, cookie.value, options);
    }
  });

  return response;
}

const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';

export default withAuth(
  async req => {
    const token = await getToken({ req });

    if (!token) return signOut(req, '获取 token 失败');
    if (!token.expires) return signOut(req, 'token expires 不存在');

    if (Date.now() < token.expires) return NextResponse.next();

    const _token = await refreshAccessToken(token);
    if (!_token) return signOut(req, '刷新 token 失败');

    const session = await encode({
      secret: process.env.NEXTAUTH_SECRET ?? '',
      token: _token,
      maxAge: (_token.expires - Date.now()) / 1000 + 43200 // 多添加半天的有效期
    });

    req.cookies.set(sessionCookie, session);

    const response = NextResponse.next({ request: { headers: req.headers } });
    response.cookies.set(sessionCookie, session, { secure: secureCheck(sessionCookie) });

    return response;
  },
  {
    pages: {
      signIn: '/login',
      signOut: '/login',
      error: '/login'
    }
  }
);

export const config = {
  matcher: '/((?!api|_next/static|_next/image|fonts|musume|placeholder|favicon.ico|login).*)'
};
