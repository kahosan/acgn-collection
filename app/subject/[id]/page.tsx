'use client';

import { useSubject } from '~/lib/bangumi/subjects';

import { Divider } from '@nextui-org/react';
import Image from 'next/image';
import Loading from '~/components/loading';

interface Props {
  params: { id: string }
}

export default function Subject({ params }: Props) {
  const { data, isLoading, error } = useSubject(params.id);

  if (error) throw error;
  if (!data || isLoading) return <Loading />;

  return (
    <div>
      <div className="w-max">
        <h1 className="font-bold text-2xl">{data.name}</h1>
      </div>
      <Divider className="my-4" />
      <Image
        src={data.images.large}
        alt={data.name_cn || data.name}
        className="opacity-0 transition-opacity"
        onLoad={e => { e.currentTarget.style.opacity = '1'; }}
        width={240}
        height={340}
      />
    </div>
  );
}
