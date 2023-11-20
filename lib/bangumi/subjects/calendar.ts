import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import type { Calendar } from '~/types/bangumi/subject';

export const useCalendar = () => useSWRImmutable<Calendar, Error>(
  '/calendar',
  fetcher,
  {
    onError(error) {
      fetcherErrorHandler(error, '每日放送获取失败');
    }
  }
);
