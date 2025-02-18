import useSWR from 'swr';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { useUser } from '~/hooks/use-user';
import { useToken } from '~/hooks/use-token';

import type { UserCollections, UserCollectionsPayload } from '~/types/bangumi/collection';

export function useUserCollections(payload: UserCollectionsPayload) {
  const token = useToken();
  const user = useUser();

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(payload))
    params.set(key, value);

  const { data, isLoading, mutate } = useSWR<UserCollections, Error>(
    (user?.username && token) ? [`/v0/users/${user.username}/collections?${params.toString()}`, token] : null,
    fetcher,
    {
      onError(error) {
        fetcherErrorHandler(error, '收藏获取失败');
        throw error;
      }
    }
  );

  return {
    data,
    isLoading,
    mutate
  };
}
