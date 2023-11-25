import type { UserInfo } from './bangumi/user';

declare module 'next-auth' {
  type User = UserInfo;
  interface Account {
    access_token: string
    refresh_token: string
  }
  interface Session {
    token: string
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    expires?: number
    refreshToken: string
    token: string
    user: User
  }
}
