import type { NextAuthOptions } from 'next-auth';
import type { UserInfo } from '~/types/bangumi/user';

export const options: NextAuthOptions = {
  providers: [
    {
      id: 'bangumi',
      name: 'Bangumi',
      type: 'oauth',
      authorization: 'https://bgm.tv/oauth/authorize',
      token: 'https://bgm.tv/oauth/access_token',
      userinfo: 'https://api.bgm.tv/v0/me',
      profile: (userInfo: UserInfo) => userInfo,
      clientId: process.env.BANGUMI_ID,
      clientSecret: process.env.BANGUMI_SECRET
    }
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account?.access_token)
        token.token = account.access_token;

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- user may be undefined
      if (user)
        token.user = user;

      return token;
    },
    session({ session, token }) {
      session.token = token.token;
      session.user = token.user;
      return session;
    }
  }
};
