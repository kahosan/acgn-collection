'use client';

import { motion } from 'framer-motion';
import { Tab, Tabs } from '@nextui-org/react';

import Loading from '~/components/loading';
import CollectionCard from '~/components/collection-card';

import { useMemo, useState } from 'react';

import { useCalendar } from '~/lib/bangumi/subjects';

import { transformEnumToJSX } from '~/utils';

import { Weekday } from '~/types/bangumi/calendar';

export default function Calendar() {
  const { data, isLoading, error } = useCalendar();

  const today = new Date().getDay();
  const [date, setDate] = useState(() => (today === 0 ? 7 : today));

  const subjects = useMemo(() => {
    return data?.find(({ weekday }) => weekday.id === date)?.items;
  }, [data, date]);

  if (error) throw error;

  return (
    <div>
      <Tabs
        aria-label="subject-type"
        radius="sm"
        variant="underlined"
        selectedKey={date.toString()}
        onSelectionChange={d => setDate(+d)}
        classNames={{
          base: 'w-full sm:w-auto mb-4',
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

      {
        isLoading || !subjects
          ? <Loading />
          : (
            <motion.div
              key={date}
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
    </div>
  );
}
