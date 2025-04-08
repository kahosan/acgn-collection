import NextLink from 'next/link';
import NextImage from 'next/image';
// eslint-disable-next-line import-x/no-unresolved -- i don't know
import { GeistSans } from 'geist/font/sans';
import CollectionState from '../collection-state';
import { Card, CardBody, Chip, Link, Tooltip } from '@heroui/react';

import { clsx } from 'clsx';
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
  collectionType?: number
  showMask?: boolean
  mobileMask?: boolean
  showType?: boolean
  showState?: boolean
}

export default function CollectionCard({ subject, collectionType, showMask, mobileMask, showType, showState }: Props) {
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
                    'absolute left-[-3px] top-[-3px] py-0.5 px-2.5 rounded-xs rounded-tl-md rounded-br-md text-sm font-medium',
                    match(subject.type)
                      .with(SubjectType.书籍, () => 'bg-orange-400 text-orange-100 drop-shadow-[2px_3px_3px_#de7500]')
                      .with(SubjectType.动画, () => 'bg-blue-400 text-blue-100 drop-shadow-[2px_3px_3px_#3c82d2]')
                      .with(SubjectType.音乐, () => 'bg-red-400 text-red-100 drop-shadow-[2px_3px_3px_#c71c1c]')
                      .with(SubjectType.游戏, () => 'bg-indigo-400 text-indigo-100 drop-shadow-[2px_3px_3px_#5057ac]')
                      .with(SubjectType.三次元, () => 'bg-stone-400 text-stone-100 drop-shadow-[2px_3px_3px_#9a938e]')
                      .otherwise(() => 'bg-gray-400 text-gray-100 drop-shadow-[2px_3px_3px_gray]')
                  )}
                  startContent={
                    <div
                      className={clsx('text-medium mr-1', {
                        'i-mdi-book-open-outline': subject.type === SubjectType.书籍,
                        'i-mdi-movie-outline': subject.type === SubjectType.动画,
                        'i-mdi-music-note-eighth': subject.type === SubjectType.音乐,
                        'i-mdi-gamepad-variant-outline': subject.type === SubjectType.游戏,
                        'i-mdi-television-classic': subject.type === SubjectType.三次元
                      })}
                    />
                  }
                >
                  <div className="text-xs">{SubjectType[subject.type]}</div>
                </Chip>
              )
              : null
          }
          {
            showState
              ? <CollectionState className="absolute left-[-4px] top-[-4px] py-0.5 px-2.5" collectionType={collectionType} subjectType={subject.type} />
              : null
          }
        </div>
        <div className="flex flex-col justify-between gap-2 overflow-hidden w-[25rem]">
          <div>
            <Tooltip content={subject.name_cn || subject.name}>
              <Link as={NextLink} href={`/subject/${subject.id}`} color="foreground" className="block font-medium text-xl max-w-max truncate">
                {subject.name_cn || subject.name}
              </Link>
            </Tooltip>
            <div className={`mt-1 text-sm opacity-90 font-medium text-zinc-400 ${GeistSans.className}`} lang="en">
              {(subject.type === SubjectType.书籍 || subject.type === SubjectType.游戏) ? '发售' : '放送'}
              {' '}
              {subject.date || subject.air_date || '暂无'}
            </div>
            {subject.score ? (
              <div className={`mt-2 text-sm opacity-90 font-medium text-amber-400 dark:text-amber-300 ${GeistSans.className}`} lang="en">
                评分 <span className="text-2xl font-bold">{subject.score.toFixed(1)}</span>
              </div>
            ) : null}
          </div>
          <div className="opacity-70 text-sm line-clamp-4">
            {(subject.short_summary ?? subject.summary ?? '').trim()}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
