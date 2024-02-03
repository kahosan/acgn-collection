import Link from 'next/link';
import NextImage from 'next/image';
import { Card, CardBody, Chip, Tooltip } from '@nextui-org/react';

import clsx from 'clsx';
import { match } from 'ts-pattern';

import { SubjectType } from '~/types/bangumi/subject';
import type { SlimSubject } from '~/types/bangumi/subject';

interface Props {
  subject: {
    id: number
    name: string
    name_cn: string
    image?: string
    images?: SlimSubject['images']
    date?: string
    air_date?: string
    score?: number
    short_summary?: string
    summary?: string
    type: SubjectType
  }
  showMask?: boolean
  mobileMask?: boolean
  showType?: boolean
}

export default function CollectionCard({ subject, showMask, mobileMask, showType }: Props) {
  return (
    <Card
      shadow="none"
      className="bg-transparent relative group"
    >
      {
        showMask
          ? (
            <div className="absolute h-full w-full dark:bg-zinc-800 bg-zinc-100 rounded-large" />
          )
          : (
            <div
              className={clsx(
                'absolute h-full w-full dark:bg-zinc-800 bg-zinc-100  transition-all rounded-large',
                mobileMask ? 'sm:opacity-0 sm:scale-95 sm:group-hover:opacity-100 sm:group-hover:scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
              )}
            />
          )
      }
      <CardBody className="flex flex-row gap-4 p-5">
        <div className="relative bg-zinc-300 dark:bg-zinc-700 rounded-md min-h-[14rem] max-h-[14rem] min-w-[9rem] max-w-[9rem] sm:min-w-[10rem] sm:max-w-[10rem]">
          <NextImage
            src={(subject.images?.large ?? subject.image) || 'https://placehold.co/160x224/png'}
            alt={subject.name}
            className="object-cover opacity-0 transition-all duration-300 rounded-md"
            quality={100}
            priority
            fill
            onLoad={e => { e.currentTarget.style.opacity = '1'; }}
          />
          {
            showType
              ? (
                <Chip
                  size="sm"
                  className={clsx(
                    'rounded-none rounded-tl-md rounded-br-sm text-white',
                    'shadow-sm shadow-black',
                    match(subject.type)
                      .with(SubjectType.书籍, () => 'bg-orange-500')
                      .with(SubjectType.动画, () => 'bg-blue-500')
                      .with(SubjectType.音乐, () => 'bg-red-500')
                      .with(SubjectType.游戏, () => 'bg-indigo-500')
                      .with(SubjectType.三次元, () => 'bg-gray-500')
                      .otherwise(() => 'bg-gray-500')
                  )}
                  startContent={
                    <div
                      className={clsx('text-medium mr-1', {
                        'i-mdi-book-open-outline': subject.type === SubjectType.书籍,
                        'i-mdi-movie-outline': subject.type === SubjectType.动画,
                        'i-mdi-music-note-eighth': subject.type === SubjectType.音乐,
                        'i-mdi-gamepad-variant-outline': subject.type === SubjectType.游戏,
                        'i-mdi-television-classic': subject.type === SubjectType.三次元
                      })} />
                  }
                >
                  <div className="text-xs">{SubjectType[subject.type]}</div>
                </Chip>
              )
              : null
          }
        </div>
        <div className="flex flex-col justify-between gap-2 overflow-hidden w-[25rem]">
          <div>
            <Tooltip content={subject.name_cn || subject.name}>
              <Link href={`/subject/${subject.id}`} className="block font-medium text-xl max-w-max truncate">
                {subject.name_cn || subject.name}
              </Link>
            </Tooltip>
            <div className="mt-2 text-sm opacity-90 font-medium">
              放送 {subject.date || subject.air_date || '暂无'}
            </div>
            <div className="mt-2 text-sm opacity-90 font-medium">
              评分 {subject.score?.toFixed(1) ?? '暂无'}
            </div>
          </div>
          <div className="opacity-70 text-sm line-clamp-4">
            {(subject.short_summary ?? subject.summary ?? '').trim()}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
