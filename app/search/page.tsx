'use client';

import { motion } from 'framer-motion';

import SearchBar from './search-bar';
import Loading from '~/components/loading';
import Pagination from '~/components/pagination';
import CollectionCard from '~/components/collection-card';

import { useSearchParams } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'next-usequerystate';

import { useLegacySearch, useSearch } from '~/lib/bangumi/subjects';

import type { SearchPayload } from '~/types/bangumi/subject';

// enhance search filter
export default function Search() {
  const searchParams = useSearchParams();

  const api = searchParams.get('api') ?? 'new';
  const type = searchParams.get('type') ?? '7';
  const keyword = searchParams.get('keyword') ?? '';

  const [offset, setOffset] = useQueryState(
    'offset',
    parseAsInteger
      .withDefault(0)
  );

  const payload: SearchPayload = {
    keyword: decodeURIComponent(keyword),
    filter: {
      // 7 is all, type is SubjectType
      type: +type === 7 ? [1, 2, 3, 4, 6] : [+type]
    }
  };

  const { data, isLoading, error } = useSearch(payload, offset, 20);
  const { data: legacyData, isLoading: legacyIsLoading, error: legacyError } = useLegacySearch(payload, offset, 20);

  if (error) throw error;
  if (legacyError) throw legacyError;

  return (
    <div>
      <SearchBar key={keyword} payload={{ keyword: payload.keyword, type, api }} />
      {
        data?.data.length === 0
          ? <div className="text-center text-gray-500 mt-[20rem]">没有更多了</div>
          : (isLoading || !data || legacyIsLoading || !legacyData
            ? <Loading />
            : (
              <motion.div
                key={offset + +type}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
              >
                <div
                  className="grid sm:grid-cols-[repeat(auto-fill,minmax(25rem,auto))] grid-cols-[repeat(auto-fill,minmax(20rem,auto))] gap-8"
                >
                  {(api === 'new' ? data.data : legacyData.list).map(subject => (
                    <CollectionCard subject={subject} key={subject.id} mobileMask showType />
                  ))}
                </div>
                <Pagination offset={offset} limit={20} setOffset={setOffset} total={api === 'new' ? data.total : legacyData.results} />
              </motion.div>
            ))
      }
    </div>
  );
}
