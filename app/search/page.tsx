'use client';

import { motion } from 'framer-motion';

import SearchBar from './search-bar';
import Loading from '~/components/loading';
import Pagination from '~/components/pagination';
import CollectionCard from '~/components/collection-card';

import { useRouter, useSearchParams } from 'next/navigation';

import { useSearch } from '~/lib/bangumi/subjects';

import type { SearchPayload } from '~/types/bangumi/subject';

export default function Search() {
  const searchParams = useSearchParams();

  const type = searchParams.get('type') ?? '7';
  const keyword = searchParams.get('keyword') ?? '';

  const _offset = searchParams.get('offset') ?? '0';
  const offset = Number.parseInt(_offset, 10);

  const router = useRouter();

  const payload: SearchPayload = {
    keyword: decodeURIComponent(keyword),
    filter: {
      // 7 is all, type is SubjectType
      type: +type === 7 ? [] : [+type]
    }
  };

  const { data, isLoading } = useSearch(payload, offset, 20);

  return (
    <div>
      <SearchBar key={keyword} payload={{ keyword, type }} />
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
                  className="grid-card"
                >
                  {data.data.map(subject => (
                    <CollectionCard
                      subject={{
                        ...subject,
                        name_cn: subject.nameCN,
                        score: subject.rating.score,
                        summary: subject.info
                      }}
                      key={subject.id}
                      mobileMask
                      showType
                    />
                  ))}
                </div>
                {data.data.length ? (
                  <Pagination
                    offset={offset}
                    limit={20}
                    setOffset={offset => {
                      router.push(`/?keyword=${payload.keyword}&type=${type}&offset=${offset}`);
                    }}
                    total={data.total}
                  />
                ) : null}
              </motion.div>
            ))
      }
    </div>
  );
}
