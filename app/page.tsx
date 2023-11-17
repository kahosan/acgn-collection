'use client';

import { motion } from 'framer-motion';
import { Select, SelectItem } from '@nextui-org/react';

import Loading from '~/components/loading';
import Pagination from '~/components/pagination';
import CollectionCard from '~/components/collection-card';

import { useSearchParams, useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'next-usequerystate';

import { useUserCollections } from '~/lib/bangumi/user';

import { transformSubjectTypeToJSX } from '~/utils';

import { SubjectType } from '~/types/bangumi/subjects';

export default function Collection() {
  const [offset, setOffset] = useQueryState(
    'offset',
    parseAsInteger
      .withDefault(0)
  );

  const type = useSearchParams().get('type') ?? '2';
  const router = useRouter();

  // TODO：获取到了旧的 type，可能是 next 14 的问题
  // const [type, setType] = useQueryState<SubjectType>(
  //   'type',
  //   parseAsInteger
  //     .withDefault(SubjectType.动画)
  // );

  const { data, isLoading, error } = useUserCollections({
    subject_type: +type,
    offset,
    limit: 10
  });

  if (error) throw error;

  return (
    <div>
      <div className="ml-1 text-2xl font-medium my-4 flex items-center gap-4">
        最新收藏
        <Select
          size="sm"
          placeholder="选择类型"
          aria-label="选择类型"
          labelPlacement="outside"
          className="max-w-[6rem]"
          selectionMode="single"
          selectedKeys={[type]}
          disallowEmptySelection
          onChange={e => {
            setOffset(0);
            router.push(`/?type=${e.target.value}`);
          }}
        >
          {
            transformSubjectTypeToJSX(type => (
              <SelectItem key={type} value={type} aria-label={SubjectType[type]}>
                {SubjectType[type]}
              </SelectItem>
            ))
          }
        </Select>
      </div>
      {
        data?.data.length === 0
          ? <div className="text-center text-gray-500 dark:text-gray-300 mt-[20rem]">没有更多了</div>
          : (isLoading || !data
            ? <Loading />
            : (
              <motion.div
                key={offset + +type}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
              >
                <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(25rem,auto))] grid-cols-[repeat(auto-fill,minmax(20rem,auto))] gap-8">
                  {data.data.map(collection => (
                    <CollectionCard key={collection.subject_id} subject={collection.subject} mobileMask />
                  ))}
                </div>
                <Pagination offset={offset} setOffset={setOffset} limit={10} total={data.total} />
              </motion.div>
            )
          )
      }
    </div>
  );
}
