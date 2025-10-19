import { Divider, Link } from '@heroui/react';

import { clsx } from 'clsx';
import { match } from 'ts-pattern';

import type { Subject } from '~/types/bangumi/subject';

interface Props {
  infos: Array<{
    key: string
    value: string | Array<Record<'v' | 'k', string>>
  }>
  subjectId: number
  collection: Subject['collection']
  className?: string
}

function suffix(key: string) {
  return match(key)
    .with('wish', () => 'wishes')
    .with('collect', () => 'collections')
    .with('doing', () => 'doings')
    .otherwise(key => key);
}

export default function Information({ infos, collection, subjectId, className }: Props) {
  return (
    <>
      {
        infos.map(info => (
          <div key={info.key} className={clsx('', className)}>
            <div className="opacity-60 text-sm mb-1">{info.key}：</div>
            <div className="text-sm break-all">
              {
                Array.isArray(info.value)
                  ? (
                    info.value.map(item => (
                      <div key={item.k}>
                        <IsLink value={item.v}>
                          <div className="my-1 bg-current/5 inline-block px-2 py-1 rounded">
                            {item.v}
                            <sup className="ml-1 opacity-65">{item.k}</sup>
                          </div>
                        </IsLink>
                      </div>
                    ))
                  )
                  : <IsLink value={info.value}>{info.value}</IsLink>
              }
            </div>
            <Divider className="my-2 opacity-20" />
          </div>
        ))
      }
      <div className="opacity-60 text-sm mb-1">观看详情：</div>
      <div className="flex flex-wrap">
        {
          Object.entries(collection).map(([key, value]) => (
            <div key={key}>
              <Link
                color="foreground"
                size="sm"
                key={key}
                isExternal
                href={`https://bgm.tv/subject/${subjectId}/${suffix(key)}`}
              >
                {value}人
                {
                  match(key)
                    .with('wish', () => '想看')
                    .with('collect', () => '看过')
                    .with('doing', () => '在看')
                    .with('on_hold', () => '搁置')
                    .with('dropped', () => '抛弃')
                    .otherwise(key => key)
                }
              </Link>
              {
                key === 'doing'
                  ? null
                  : '、'
              }
            </div>
          ))
        }
      </div>
    </>
  );
}

function IsLink({ value, children }: React.PropsWithChildren<{ value: string }>) {
  return value.startsWith('http')
    ? (
      <Link size="sm" isExternal href={value}>
        {value}
      </Link>
    )
    : children;
}
