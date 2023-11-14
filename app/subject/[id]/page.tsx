'use client';

import Image from 'next/image';
import { Divider } from '@nextui-org/react';

import Loading from '~/components/loading';
import Tags from '~/components/collection-info/tags';
import CollectionBox from '~/components/collection-box';
import InfoBox from '~/components/collection-info/info-box';

import { useSubject } from '~/lib/bangumi/subjects';

interface Props {
  params: { id: string }
}

export default function Subject({ params }: Props) {
  const { data, isLoading, error } = useSubject(params.id);

  if (error) throw error;
  if (!data || isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 bg-card">
        <div className="relative min-h-[28rem] max-h-[28rem] min-w-full sm:min-w-[18rem] w-[18rem]">
          <Image
            src={data.images.medium}
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
            <a href={`https://bgm.tv/subject/${data.id}`} className="font-medium text-xl hover:opacity-60 transition-opacity" target="_blank" rel="noreferrer">
              {data.name}
              <small className="ml-1 opacity-50 text-xs">{data.platform}</small>
            </a>
            <Divider className="mt-2 mb-4" />
          </div>
          <CollectionBox subjectData={data} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap sm:flex-nowrap gap-4">
        <div className="bg-card sm:max-w-[18rem] sm:min-w-[18rem]">
          <InfoBox infos={data.infobox} />
        </div>
        <div>
          <div className="bg-card">
            <div className="mb-2 dark:text-blue-200 text-blue-400">剧情简介</div>
            <p className="text-sm">{data.summary}</p>
          </div>
          <div className="bg-card mt-2">
            <div className="mb-2 dark:text-blue-200 text-blue-400">大家将「{data.name}」标注为</div>
            <Tags tags={data.tags} />
          </div>
        </div>
      </div>
    </div>
  );
}
