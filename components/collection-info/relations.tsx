import Image from 'next/image';
import { Link, Tooltip } from '@heroui/react';
import { motion } from 'framer-motion';

import { RelationsSkeleton } from './skeleton';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useRelations } from '~/lib/bangumi/subjects';

import { convertSpecialChar } from '~/utils';

import type { Relation } from '~/types/bangumi/relation';

interface Props {
  subjectId: number
}

export default function Relations({ subjectId }: Props) {
  const { data, isLoading } = useRelations(subjectId);

  const [showAll, setShowAll] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const relationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const scrollHeight = entry.target.scrollHeight;
        setShowButton(scrollHeight > 432);
      }
    });

    if (relationsRef.current)
      observer.observe(relationsRef.current);

    return () => observer.disconnect();
  }, []);

  const relations = useMemo(() => {
    if (!data) return;

    const groupData = data.reduce<Record<string, Array<Relation & { kind?: string }>>>((acc, cur) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- 明明初始化的是空的。
      acc[cur.relation] = [...(acc[cur.relation] || []), cur];
      return acc;
    }, {});

    return Object.entries(groupData).sort(([, a], [, b]) => a.length - b.length);
  }, [data]);

  if (!relations || isLoading) return <RelationsSkeleton />;

  return (
    <>
      <motion.div
        initial={{ maxHeight: '27rem' }}
        animate={{ maxHeight: showAll ? '1000rem' : '27rem' }}
        className="grid grid-cols-[repeat(auto-fill,minmax(5rem,auto))] gap-4 overflow-hidden"
        ref={relationsRef}
      >
        {
          relations.map(([relation, items]) => {
            return items.map((item, index) => (
              <Tooltip key={item.id} content={item.name_cn}>
                <Link
                  color="foreground"
                  className="flex-col items-start flex-auto"
                  href={`/subject/${item.id}`}
                >
                  <div className="opacity-70 text-xs min-h-[15px]">{index === 0 ? relation : ''}</div>
                  <div className="relative p-2 rounded-md min-h-[5rem] w-full">
                    <Image
                      src={item.images.small || 'https://placehold.co/64x64@3x.webp?text=No%20Image'}
                      alt={item.name}
                      className="object-cover bg-center transition-all opacity-0 duration-300 rounded-md"
                      priority
                      fill
                      sizes="100%"
                      onLoad={e => { e.currentTarget.style.opacity = '1'; }}
                    />
                  </div>
                  <p className="text-xs mt-1 line-clamp-2 break-all">{convertSpecialChar(item.name)}</p>
                </Link>
              </Tooltip>
            ));
          })
        }
      </motion.div>
      <div className="text-right">
        {
          showButton
            ? (
              <span className="cursor-pointer text-sm dark:text-blue-200 text-blue-400" onClick={() => setShowAll(p => !p)}>
                {
                  showAll ? '显示部分' : '显示全部'
                }
              </span>
            )
            : null
        }
      </div>
    </>
  );
}
