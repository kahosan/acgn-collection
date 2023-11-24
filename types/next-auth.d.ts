import type { UserInfo } from './bangumi/user';

declare module 'next-auth' {
  type User = UserInfo;
  interface Session {
    token: string
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string
    user: User
  }
}
