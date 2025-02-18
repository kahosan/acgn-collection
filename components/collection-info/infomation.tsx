import { Divider, Link } from '@nextui-org/react';

import { clsx } from 'clsx';
import { match } from 'ts-pattern';

import type { Subject } from '~/types/bangumi/subject';

interface Props {
  infos: Array<{
    key: string
    value: string | Array<Record<'v', string>>
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

export default function Infomation({ infos, collection, subjectId, className }: Props) {
  return (
    <>
      {
        infos.map(info => (
          <div key={info.key} className={clsx('', className)}>
            <div className="opacity-60 text-sm">{info.key}：</div>
            <div className="text-sm break-all">
              {
                Array.isArray(info.value)
                  ? info.value.map(item => item.v)
                  : info.value
              }
            </div>
            <Divider className="my-2 opacity-20" />
          </div>
        ))
      }
      <div className="opacity-60 text-sm">观看详情：</div>
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
