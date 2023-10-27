'use client';

import { motion } from 'framer-motion';
import SearchBar from './search-bar';
import Loading from '~/components/loading';
import Pagination from '~/components/pagination';
import CollectionCard from '~/components/collection-card';

import { parseAsInteger, useQueryState } from 'next-usequerystate';

import { useSearch } from '~/lib/bangumi/subjects';

import type { SearchPayload } from '~/types/subjects';

interface Props {
  params: { query: string }
  searchParams: Record<string, string | undefined>
}

// enhance search filter
export default function Search({ params, searchParams }: Props) {
  const type = searchParams.type ?? '2';

  const [offset, setOffset] = useQueryState(
    'offset',
    parseAsInteger
      .withOptions({ shallow: true })
      .withDefault(0)
  );

  const payload: SearchPayload = {
    keyword: decodeURIComponent(params.query),
    filter: {
      // 7 is all, type is SubjectType
      type: +type === 7 ? [1, 2, 3, 4, 6] : [+type]
    }
  };

  const { data, isLoading, error } = useSearch(payload, offset, 20);

  if (error) throw error;

  return (
    <div>
      <SearchBar payload={{ keyword: payload.keyword, type }} />
      {
        data?.data.length === 0
          ? <div className="text-center text-gray-500 mt-[20rem]">没有更多了</div>
          : (isLoading || !data
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
                  {data.data.map(subject => (
                    <CollectionCard subject={subject} key={subject.id} mobileMask showType />
                  ))}
                </div>
                <Pagination offset={offset} setOffset={setOffset} total={data.total} />
              </motion.div>
            ))
      }
    </div>
  );
}
