'use client';

import { Button, Input, Link } from '@nextui-org/react';

import { toast } from 'sonner';
import { useState } from 'react';
import { useSetAtom } from 'jotai';

import { tokenAtom } from '~/hooks/use-token';

import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import type { UserInfo } from '~/types/bangumi/user';

export default function Login() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const _setToken = useSetAtom(tokenAtom);

  const login = async () => {
    try {
      setIsLoading(true);

      const trimmedToken = token.trim();

      // Auth Provider will redirect to /
      const data = await fetcher<UserInfo>(
        [
          '/login/api',
          { base: '/', headers: { Authorization: `Bearer ${trimmedToken}` } }
        ]
      );

      toast(`欢迎 ${data.username}!`);

      _setToken(trimmedToken);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (e instanceof Error)
        fetcherErrorHandler(e, `登入失败: ${e.message}`);
    }
  };

  return (
    <main className="mt-24 max-w-lg mx-auto">
      <h1 className="mb-14 text-center text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-red-300">
        ACGN Collection
      </h1>
      <p className="text-sm opacity-50">
        你可以在
        <Link className="text-sm" href="https://next.bgm.tv/demo/access-token" target="_blank">这里</Link>
        获取一个 Token
      </p>
      <div className="">
        <Input
          label="Token"
          size="sm"
          onValueChange={v => setToken(v)}
          onKeyUp={e => e.key === 'Enter' && login()}
        />
        <Button
          onPress={login}
          isLoading={isLoading}
          color="primary"
          size="lg"
          className="w-[100%] mt-4"
        >
          登入
        </Button>
      </div>
    </main>
  );
}
