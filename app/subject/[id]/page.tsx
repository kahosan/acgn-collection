'use client';

import Image from 'next/image';
import { Divider, Link } from '@nextui-org/react';

import Loading from '~/components/loading';
import CollectionBox from '~/components/collection-box';
import { Summary, Tags, Infomation, Relations, Characters } from '~/components/collection-info';

import { useSubject } from '~/lib/bangumi/subjects';

import { convertSpecialChar } from '~/utils';

import { SubjectType } from '~/types/bangumi/subject';

interface Props {
  params: { id: string }
}

export default function Subject({ params }: Props) {
  const { data, isLoading, error } = useSubject(params.id);

  if (error) throw error;
  if (!data || isLoading) return <Loading />;

  return (
    <>
      <title>{data.name}</title>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 bg-card">
          <div className="relative min-h-[28rem] max-h-[28rem] min-w-full sm:min-w-[18rem] w-[18rem]">
            <Image
              src={data.images.medium || 'https://placehold.co/288x448.webp?text=No%20Image'}
              alt={data.name}
              className="object-cover bg-center bg-zinc-300 dark:bg-zinc-700 opacity-20 transition-all duration-300 rounded-md w-auto h-auto"
              priority
              fill
              sizes="100%"
              onLoad={e => { e.currentTarget.style.opacity = '1'; }}
            />
          </div>
          <div className="w-full grid grid-rows-[auto_1fr]">
            <div>
              <Link
                href={`https://bgm.tv/subject/${data.id}`}
                color="foreground"
                className="font-medium text-xl max-w-max inline"
                isExternal
              >
                {convertSpecialChar(data.name)}
                <span className="ml-1 opacity-50 text-xs">{data.platform}</span>
              </Link>
              <Divider className="mt-2 mb-3" />
            </div>
            <CollectionBox subject={data} />
          </div>
        </div>
        <div className="mt-5 sm:flex gap-4">
          <div className="bg-card w-full sm:max-w-[18rem] sm:min-w-[18rem] mb-4 sm:mb-0 self-start">
            <Infomation infos={data.infobox} collection={data.collection} subjectId={data.id} />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="bg-card">
              <div className="mb-2 dark:text-blue-200 text-blue-400">剧情简介</div>
              <Summary summary={data.summary} />
            </div>
            <div className="bg-card">
              <div className="mb-2 dark:text-blue-200 text-blue-400">大家将「{data.name}」标注为</div>
              <Tags tags={data.tags} />
            </div>
            {
              data.type !== SubjectType.音乐 && data.type !== SubjectType.三次元
                ? (
                  <div className="bg-card">
                    <div className="mb-2 dark:text-blue-200 text-blue-400">角色介绍</div>
                    <Characters subjectId={data.id} />
                  </div>
                )
                : null
            }
            <div className="bg-card">
              <div className="mb-2 dark:text-blue-200 text-blue-400">关联条目</div>
              <Relations subjectId={data.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
