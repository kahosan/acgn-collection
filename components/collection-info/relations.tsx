import Image from 'next/image';
import { Link } from '@nextui-org/react';

import { RelationsSkeleton } from './skeleton';

import { useMemo } from 'react';

import { useRelations } from '~/lib/bangumi/subjects';

import type { Relation } from '~/types/bangumi/relation';

interface Props {
  subjectId: number
}

export default function Relations({ subjectId }: Props) {
  const { data, isLoading, error } = useRelations(subjectId);

  const relations = useMemo(() => {
    if (!data) return;

    return data.reduce<Record<string, Relation[]>>((acc, cur) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- 明明初始化的是空的。
      acc[cur.relation] = [...(acc[cur.relation] || []), cur];
      return acc;
    }, {});
  }, [data]);

  if (error) throw error;
  if (!relations || isLoading) return <RelationsSkeleton />;

  return (
    <div className="flex flex-wrap gap-2">
      {
        Object.entries(relations).sort(([, a], [, b]) => a.length - b.length).map(([relation, items]) => (
          <div key={relation} className="px-2 pb-1 rounded-md bg-slate-200/40 dark:bg-zinc-800">
            <small className="opacity-70">{relation}</small>
            <div className="flex flex-wrap gap-2">
              {
                items.map(item => (
                  <Link
                    color="foreground"
                    key={item.id}
                    className="w-20 block"
                    href={`/subject/${item.id}`}
                  >
                    <div className="relative p-2 rounded-md h-20 w-20">
                      <Image
                        src={item.images.small || 'https://placehold.co/64x64@3x.webp?text=No%20Image'}
                        alt={item.name}
                        className="object-cover bg-center transition-all opacity-20 duration-300 rounded-md"
                        priority
                        fill
                        sizes="100%"
                        onLoad={e => { e.currentTarget.style.opacity = '1'; }}
                      />
                    </div>
                    <p className="text-xs mt-1 line-clamp-3">{item.name}</p>
                  </Link>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}
