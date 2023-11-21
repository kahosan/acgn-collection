import useSWRMutation from 'swr/mutation';

import { toast } from 'sonner';
import { useToken } from '~/hooks/use-token';

import type { UserProgressPayload } from '~/types/bangumi/episode';

const fetcher = async ([url, token]: [string, string], { arg }: { arg: UserProgressPayload }) => {
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);

  const formData = new FormData();

  for (const [key, value] of Object.entries(arg))
    formData.append(key, value);

  await fetch(url, { method: 'POST', headers, body: formData });
};

export const useUserProgressUpdate = (subjectId: number) => {
  const [token] = useToken();

  const { trigger, isMutating } = useSWRMutation(
    token
      ? [`https://bgmapi.kahosan.workers.dev/subject/${subjectId}/update/watched_eps`, token]
      : null,
    fetcher
  );

  const handleUpdate = (payload: UserProgressPayload, refreshData: () => void) => {
    const fn = async () => {
      await trigger(payload);
      refreshData();
    };

    toast.promise(fn, {
      success: '更新进度成功',
      loading: '正在更新进度...',
      error: '更新进度失败'
    });
  };

  return {
    handleUpdate,
    isMutating
  };
};
