import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

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
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- user may be undefined
      if (account && user) { // init
        return {
          token: account.access_token,
          expires: account.expires_at,
          refreshToken: account.refresh_token,
          user
        };
      }

      return token;
    },
    session({ session, token }) {
      session.token = token.token;
      session.user = token.user;
      return session;
    }
  }
};

// eslint-disable-next-line unused-imports/no-unused-vars -- https://github.com/nextauthjs/next-auth/issues/7558
async function refreshAccessToken(token: JWT) {
  try {
    const res = await fetch('https://bgm.tv/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
        client_id: process.env.BANGUMI_ID ?? '',
        client_secret: process.env.BANGUMI_SECRET ?? ''
      })
    });

    const data = await res.json();

    if (!res.ok)
      throw data;

    return {
      ...token,
      token: data.access_token,
      expires: Date.now() + data.expires_in * 1000,
      refreshToken: data.refresh_token
    };
  } catch (error) {
    const { error_description } = error as { error_description: string };
    console.error(error_description);
    return token;
  }
}
