import useSWRImmutable from 'swr/immutable';

import { fetcherErrorHandler, fetcherWithAuth, HTTPError } from '~/lib/fetcher';

import { useRouter } from 'next/navigation';
import { useToken } from './use-token';

import type { UserInfo } from '~/types/user';

export const useUser = () => {
  const [token, setToken] = useToken();
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWRImmutable<UserInfo, Error>(
    token ? ['/v0/me', token] : null,
    fetcherWithAuth,
    {
      shouldRetryOnError: false,
      onError(error) {
        if (error instanceof HTTPError && error.status === 401) {
          setToken(null);
          router.push('/login');
          fetcherErrorHandler(error, 'Token 失效, 尝试重新登入');
        }

        fetcherErrorHandler(error, `获取用户信息失败: ${error.message}`);
      }
    }
  );

  return {
    data,
    error,
    mutate,
    isLoading
  };
};
