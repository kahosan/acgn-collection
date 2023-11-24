import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login'
  }
});

export const config = {
  matcher: '/((?!api|_next/static|_next/image|fonts|musume|placeholder|favicon.ico|login).*)'
};
