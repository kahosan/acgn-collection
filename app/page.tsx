'use client';

import { motion } from 'framer-motion';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tab, Tabs } from '@nextui-org/react';

import Loading from '~/components/loading';
import Pagination from '~/components/pagination';
import CollectionCard from '~/components/collection-card';

import { useSearchParams, useRouter } from 'next/navigation';

import { useUserCollections } from '~/lib/bangumi/user';

import { transformCollectionTypeToJSX, transformSubjectTypeToJSX } from '~/utils';

import { SubjectType } from '~/types/bangumi/subject';

export default function Collection() {
  const subjectType = useSearchParams().get('subject-type') ?? '2';
  const collectionType = useSearchParams().get('collection-type') ?? '0'; // 0 是为了让选择为空

  const _offset = useSearchParams().get('offset') ?? '0';
  const offset = Number.parseInt(_offset, 10);

  const router = useRouter();

  const { data, isLoading, error } = useUserCollections({
    subject_type: +subjectType,
    type: +collectionType,
    offset,
    limit: 10
  });

  if (error) throw error;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Tabs
          aria-label="subject-type"
          radius="sm"
          variant="underlined"
          selectedKey={subjectType}
          onSelectionChange={t => router.push(`/?subject-type=${t}&offset=0`)}
          classNames={{
            base: 'w-full sm:w-auto',
            tabList: 'w-full sm:w-auto',
            tab: 'max-sm:h-7 max-sm:text-tiny max-sm:rounded-small',
            cursor: 'max-sm:rounded-small'
          }}
        >
          {
            transformSubjectTypeToJSX(type => (
              <Tab key={type} title={SubjectType[type]} />
            ))
          }
        </Tabs>

        <Dropdown
          radius="sm"
          classNames={{
            content: 'min-w-[6rem] text-center'
          }}
        >
          <DropdownTrigger>
            <Button
              radius="sm"
              variant="bordered"
              endContent={<div className="i-mdi-filter-outline text-sm min-w-unit-3" />}
              className="max-sm:px-unit-3 max-sm:min-w-unit-16 max-sm:h-unit-8 max-sm:text-tiny max-sm:gap-unit-2"
            >
              筛选
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="collection-type-menu"
            variant="light"
            selectedKeys={[collectionType]}
            selectionMode="single"
          >
            {
              transformCollectionTypeToJSX((type, label) => (
                <DropdownItem
                  key={type}
                  aria-label={label}
                  value={type}
                  onClick={() => {
                    if (+collectionType === type) {
                      router.push(`/?subject-type=${subjectType}&offset=0`);
                      return;
                    }
                    router.push(`/?subject-type=${subjectType}&collection-type=${type}&offset=0`);
                  }}
                >
                  {label}
                </DropdownItem>
              ), +subjectType)
            }
          </DropdownMenu>
        </Dropdown>
      </div>
      {
        data?.data.length === 0
          ? <div className="text-center text-gray-500 dark:text-gray-300 mt-[20rem]">没有更多了</div>
          : (isLoading || !data
            ? <Loading />
            : (
              <motion.div
                key={offset + +subjectType + +collectionType}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
              >
                <div className="grid-card">
                  {
                    data.data.map(collection => (
                      <motion.div
                        key={collection.subject_id}
                        layout
                      >
                        <CollectionCard subject={collection.subject} mobileMask />
                      </motion.div>
                    ))
                  }
                </div>
                <Pagination
                  offset={offset}
                  setOffset={offset => {
                    router.push(`/?subject-type=${subjectType}&offset=${offset}`);
                  }}
                  limit={10}
                  total={data.total} />
              </motion.div>
            )
          )
      }
    </div>
  );
}
