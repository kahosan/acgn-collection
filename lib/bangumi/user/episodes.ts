import useSWRImmutable from 'swr/immutable';
import useSWRMutation from 'swr/mutation';
import { HTTPError, fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { toast } from 'sonner';
import { useToken } from '~/hooks/use-token';

import type { UserEpisode, UserEpisodePatchPayload, UserEpisodePayload } from '~/types/bangumi/episode';

export const useUserEpisodes = (payload: UserEpisodePayload, subjectId: number) => {
  const token = useToken();

  return useSWRImmutable<UserEpisode>(
    token ? [`/v0/users/-/collections/${subjectId}/episodes`, token] : null,
    fetcher,
    {
      onError(error) {
        fetcherErrorHandler(error, '获取用户剧集信息失败');
      }
    }
  );
};

export const useUserEpisodesPatch = (subjectId: number) => {
  const token = useToken();

  const { trigger, isMutating } = useSWRMutation(
    token
      ? [`/v0/users/-/collections/${subjectId}/episodes`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      }]
      : null,
    fetcher
  );

  const handleUpdate = (payload: UserEpisodePatchPayload, refreshData: () => void) => {
    const fn = async () => {
      await trigger(payload);
      refreshData();
    };

    toast.promise(fn, {
      success: '更新进度成功',
      loading: '正在更新进度...',
      error(e) {
        if (e instanceof HTTPError)
          return `更新进度失败：${e.data.description}`;

        return '更新进度失败';
      }
    });
  };

  return {
    handleUpdate,
    isMutating
  };
};
