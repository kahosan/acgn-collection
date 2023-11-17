'use client';

import { Select, SelectItem, Tab, Tabs } from '@nextui-org/react';

import TimelinePosts from './posts';

import { parseAsString, useQueryState } from 'next-usequerystate';
import type { ParserBuilder } from 'next-usequerystate';

import { useUser } from '~/hooks/use-user';

import { useTimeline } from '~/lib/bangumi/timeline';

import { timelineTypeMap, type TimelinePayload, type TimelineScope, type TimelineType } from '~/types/bangumi/timeline';

export default function Timeline() {
  const user = useUser();
  const [scope, setScope] = useQueryState(
    'scope',
    (parseAsString as ParserBuilder<TimelineScope>)
      .withDefault('all')
  );

  const [type, setType] = useQueryState(
    'type',
    (parseAsString as ParserBuilder<TimelineType>)
      .withDefault('')
  );

  const payload: TimelinePayload = {
    userId: scope === 'me' ? user.data?.username : undefined,
    type: type as TimelineType,
    page: 1 // TODO
  };

  const { data, isLoading, error } = useTimeline(payload);

  if (error) throw error;

  return (
    <>
      <div className="flex gap-4 items-center">
        <Tabs
          selectedKey={scope}
          aria-label="options"
          onSelectionChange={key => {
            setScope(key as TimelineScope);
          }}
        >
          <Tab key="all" title="全站" />
          <Tab key="me" title="自己" />
        </Tabs>

        <Tabs
          selectedKey={type}
          aria-label="type options"
          className="hidden md:block"
          onSelectionChange={key => {
            setType(key as TimelineType);
          }}
        >
          {
            timelineTypeMap.map(type => (
              <Tab key={type.label} title={type.text} />
            ))
          }
        </Tabs>

        <Select
          radius="sm"
          placeholder="选择类型"
          aria-label="type options"
          labelPlacement="outside"
          className="max-w-[6rem] md:hidden"
          selectionMode="single"
          selectedKeys={[type]}
          disallowEmptySelection
          onChange={e => {
            setType(e.target.value as TimelineType);
          }}
        >
          {
            timelineTypeMap.map(type => (
              <SelectItem key={type.label} value={type.label} onPress={() => setType(type.label)}>
                {type.text}
              </SelectItem>
            ))
          }
        </Select>
      </div>
      <TimelinePosts data={data} isLoading={isLoading} scope={scope} user={user.data} />
    </>
  );
}
