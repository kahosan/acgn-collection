import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler, HTTPError } from '~/lib/fetcher';

import { useToken } from './use-token';

import type { UserInfo } from '~/types/bangumi/user';

export const useUser = () => {
  const [token, setToken] = useToken();

  const { data, error, isLoading, mutate } = useSWRImmutable<UserInfo, Error>(
    token ? ['/v0/me', token] : null,
    fetcher,
    {
      shouldRetryOnError: false,
      onError(error) {
        if (error instanceof HTTPError && error.status === 401) {
          setToken(null); // Auth Provider will redirect to /login

          fetcherErrorHandler(error, 'Token 失效, 尝试重新登入');
          return;
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
