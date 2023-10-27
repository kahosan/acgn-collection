import { Card, CardBody, Chip, Link, Tooltip } from '@nextui-org/react';
import NextLink from 'next/link';
import NextImage from 'next/image';

import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';

import clsx from 'clsx';

import type { SlimSubject } from '~/types/subjects';
import { SubjectType } from '~/types/subjects';

interface Props {
  subject: {
    id: number
    name: string
    name_cn: string
    image?: string
    images?: SlimSubject['images']
    score: number
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
    <div>
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
        <CardBody className="flex flex-row">
          <div className="relative min-h-[14rem] max-h-[14rem] min-w-[9rem] max-w-[9rem] sm:min-w-[10rem] sm:max-w-[10rem]">
            <NextImage
              src={(subject.images?.medium ?? subject.image) || 'https://placehold.co/160x224/png'}
              alt={subject.name}
              className="object-cover bg-center bg-zinc-300 dark:bg-zinc-700 opacity-20 transition-all duration-300 rounded-md w-auto h-auto"
              priority
              fill
              sizes="100%"
              onLoad={e => { e.currentTarget.style.opacity = '1'; }}
            />
          </div>
          <div className="flex flex-col justify-between gap-2 overflow-hidden ml-4">
            <div>
              <Tooltip content={subject.name_cn || subject.name}>
                <Link as={NextLink} href={`/subject/${subject.id}`} color="foreground" className="block font-bold text-xl w-min max-w-[100%] truncate">
                  {subject.name_cn || subject.name}
                </Link>
              </Tooltip>
              <div className="mt-2">
                <p className="font-bold italic">评分：{subject.score}</p>
                <Rate
                  className="[&_li.rc-rate-star-zero.rc-rate-star]:text-[#f8b0405c] [&_li.rc-rate-star.rc-rate-star-half]:text-[#f8b0405c]"
                  defaultValue={subject.score / 2}
                  character={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  }
                  disabled
                  allowHalf
                />
              </div>
              {
                showType
                  ? (
                    <Chip
                      variant="flat"
                      radius="sm"
                      size="sm"
                      color={
                        clsx({
                          warning: subject.type === SubjectType.书籍,
                          primary: subject.type === SubjectType.动画,
                          danger: subject.type === SubjectType.音乐,
                          success: subject.type === SubjectType.游戏,
                          default: subject.type === SubjectType.三次元
                        }) as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
                      }
                      startContent={
                        <div
                          className={clsx('text-medium', {
                            'i-mdi-book-open-outline': subject.type === SubjectType.书籍,
                            'i-mdi-movie-outline': subject.type === SubjectType.动画,
                            'i-mdi-music-note-eighth': subject.type === SubjectType.音乐,
                            'i-mdi-gamepad-variant-outline': subject.type === SubjectType.游戏,
                            'i-mdi-television-classic': subject.type === SubjectType.三次元
                          })} />
                      }
                    >
                      <small>{SubjectType[subject.type]}</small>
                    </Chip>
                  )
                  : null
              }
            </div>
            <div className="opacity-70 text-sm line-clamp-4">
              {(subject.short_summary ?? subject.summary ?? '').trim() || '暂无简介'}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
