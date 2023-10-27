'use client';

import { motion } from 'framer-motion';
import { Select, SelectItem } from '@nextui-org/react';
import Loading from '~/components/loading';
import CollectionCard from '~/components/collection-card';

import { parseAsInteger, useQueryState } from 'next-usequerystate';

import { useUserCollections } from '~/lib/bangumi/user';

import { SubjectType } from '~/types/subjects';
import Pagination from '~/components/pagination';
import { transformSubjectTypeToJSX } from '~/utils';

export default function Collection() {
  const [offset, setOffset] = useQueryState(
    'offset',
    parseAsInteger
      .withOptions({ shallow: true })
      .withDefault(0)
  );
  const [type, setType] = useQueryState<SubjectType>(
    'type',
    parseAsInteger
      .withOptions({ shallow: true })
      .withDefault(SubjectType.动画)
  );

  const { data, isLoading, error } = useUserCollections({
    subject_type: type,
    offset,
    limit: 9
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
          defaultSelectedKeys={[type.toString()]}
          disallowEmptySelection
          onChange={(e) => {
            setOffset(0);
            setType(+e.target.value);
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
                key={offset + type}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
              >
                <div
                  className="grid sm:grid-cols-[repeat(auto-fill,minmax(25rem,auto))] grid-cols-[repeat(auto-fill,minmax(20rem,auto))] gap-8"
                >
                  {data.data.map(collection => (
                    <CollectionCard key={collection.subject_id} subject={collection.subject} mobileMask />
                  ))}
                </div>
                <Pagination offset={offset} setOffset={setOffset} total={data.total} />
              </motion.div>
            )
          )
      }
    </div>
  );
}
