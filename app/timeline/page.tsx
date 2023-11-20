'use client';

import { Select, SelectItem, Tab, Tabs } from '@nextui-org/react';

import TimelinePosts from './posts';

import { useRouter, useSearchParams } from 'next/navigation';

import { useUser } from '~/hooks/use-user';

import { useTimeline } from '~/lib/bangumi/timeline';

import { timelineTypeMap } from '~/types/bangumi/timeline';
import type { TimelineScope, TimelinePayload, TimelineType } from '~/types/bangumi/timeline';

export default function Timeline() {
  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const scope = searchParams.get('scope') ?? 'all';
  const type = searchParams.get('type') ?? '';

  const _page = searchParams.get('page') ?? '1';
  const page = Number.parseInt(_page, 10);

  const payload: TimelinePayload = {
    userId: scope === 'me' ? user.data?.username : undefined,
    type: type as TimelineType,
    page: scope === 'me' ? page : 1
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
            router.push(`/timeline?scope=${key}&type=${type}`);
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
            router.push(`/timeline?scope=${scope}&type=${key}`);
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
            router.push(`/timeline?scope=${scope}&type=${e.target.value}`);
          }}
        >
          {
            timelineTypeMap.map(type => (
              <SelectItem
                key={type.label}
                value={type.label}
                onPress={() => router.push(`/timeline?scope=${scope}&type=${type.label}`)}
              >
                {type.text}
              </SelectItem>
            ))
          }
        </Select>
      </div>
      <TimelinePosts
        data={data}
        isLoading={isLoading}
        scope={scope as TimelineScope}
        page={page}
        type={type}
        user={user.data}
      />
    </>
  );
}
