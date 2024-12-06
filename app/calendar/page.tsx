'use client';

import { motion } from 'framer-motion';
import { DropdownItem, Tab, Tabs } from '@nextui-org/react';

import Loading from '~/components/loading';
import OptionsMenu from '~/components/options-menu';
import CollectionCard from '~/components/collection-card';

import { useMemo } from 'react';
import { match } from 'ts-pattern';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCalendar } from '~/lib/bangumi/subjects';

import { transformEnumToJSX } from '~/utils';

import { Weekday } from '~/types/bangumi/calendar';

const sortOptions = {
  doing: '在看人数',
  count: '评分人数',
  rating: '社区评分'
} as const;

type SortKeys = keyof typeof sortOptions;

export default function Calendar() {
  const { data, isLoading } = useCalendar();

  const searchParams = useSearchParams();

  const today = new Date().getDay();
  const _day = searchParams.get('day');
  const day = _day ? Number.parseInt(_day, 10) : (today === 0 ? 7 : today);

  const sort = searchParams.get('sort') as SortKeys | null ?? 'doing';

  const router = useRouter();

  const subjects = useMemo(() => {
    return data?.find(({ weekday }) => weekday.id === day)
      ?.items
      .sort(
        (a, b) => match(sort)
          .with('doing', () => (b.collection?.doing ?? 0) - (a.collection?.doing ?? 0))
          .with('count', () => (b.rating?.total ?? 0) - (a.rating?.total ?? 0))
          .with('rating', () => (b.rating?.score ?? 0) - (a.rating?.score ?? 0))
          .exhaustive()
      );
  }, [data, day, sort]);

  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-baseline mb-4">
        <Tabs
          aria-label="subject-type"
          radius="sm"
          variant="underlined"
          selectedKey={day.toString()}
          onSelectionChange={d => router.push(`/calendar?day=${d}&sort=${sort}`)}
          classNames={{
            base: 'w-full sm:w-auto mb-2',
            tabList: 'w-full sm:w-auto',
            tab: 'max-sm:h-7 max-sm:text-tiny max-sm:rounded-small',
            cursor: 'max-sm:rounded-small'
          }}
        >
          {
            transformEnumToJSX((key, value) => (
              <Tab key={key} title={value} />
            ), Weekday)
          }
        </Tabs>
        <OptionsMenu
          ariaLabel="sort-menu"
          selectedKeys={[sort]}
          endContent={<div className="i-mdi-filter-outline text-sm min-w-unit-3" />}
          triggerContent="排序"
        >
          {
            Object.entries(sortOptions).map(([key, value]) => (
              <DropdownItem
                key={key}
                aria-label={key}
                value={key}
                onClick={() => router.push(`/calendar?day=${day}&sort=${key}`)}
              >
                {value}
              </DropdownItem>
            ))
          }
        </OptionsMenu>
      </div>

      {
        isLoading || !subjects
          ? <Loading />
          : (
            <motion.div
              key={day}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.3 }}
            >
              <div className="grid-card">
                {
                  subjects.map(subject => (
                    <motion.div
                      key={subject.id}
                      layout
                    >
                      <CollectionCard subject={{ ...subject, score: subject.rating?.score }} mobileMask />
                    </motion.div>
                  ))
                }
              </div>
            </motion.div>
          )
      }
    </>
  );
}
