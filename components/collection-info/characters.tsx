import Image from 'next/image';
import { Chip, Divider, Link } from '@nextui-org/react';

import { useCharacters } from '~/lib/bangumi/subjects';

import { CharacterType } from '~/types/bangumi/character';
import { CharactersSkeleton } from './skeleton';
import { useMemo } from 'react';

interface Props {
  subjectId: number
}

export default function Character({ subjectId }: Props) {
  const { data, isLoading } = useCharacters(subjectId);

  const characters = useMemo(() => {
    if (!data) return;

    return data
      .filter(character => character.type === CharacterType.角色)
      .sort(character => (character.relation === '主角' ? -1 : 1))
      .slice(0, 8);
  }, [data]);

  if (!characters || !data || isLoading)
    return <CharactersSkeleton />;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(11.5rem,auto))] gap-4">
        {
          characters.map(character => (
            <div key={character.id} className="flex gap-2 flex-auto">
              <Link href={`https://bgm.tv/character/${character.id}`} className="relative rounded-md h-14 min-w-[3.5rem]" isExternal>
                <Image
                  src={character.images.grid || 'https://placehold.jp/56x56@3.webp'}
                  alt={character.name}
                  className="object-cover object-top transition-all opacity-0 duration-300 rounded-md"
                  priority
                  fill
                  sizes="100%"
                  onLoad={e => { e.currentTarget.style.opacity = '1'; }}
                />
              </Link>
              <div className="overflow-hidden w-full">
                <Link className="w-full" color="foreground" href={`https://bgm.tv/character/${character.id}`} isExternal>
                  <div className="w-full truncate text-sm">{character.name}</div>
                  <Chip
                    color={character.relation === '主角' ? 'danger' : 'default'}
                    className="text-xs rounded-sm ml-1 items-baseline"
                    classNames={{
                      base: 'h-max',
                      content: 'p-0'
                    }}
                  >
                    {character.relation}
                  </Chip>
                </Link>
                <Divider className="my-1" />
                <Link color="foreground" className="w-full" href={`https://bgm.tv/person/${character.actors.at(0)?.id ?? ''}`} isExternal>
                  <Chip
                    className="text-xs rounded-sm mr-1 bg-blue-400/70"
                    classNames={{
                      base: 'h-max',
                      content: 'p-0'
                    }}
                  >
                    CV
                  </Chip>
                  {
                    character.actors.at(0)
                      ? (
                        <div className="w-full truncate text-sm">{character.actors.at(0)?.name}</div>
                      )
                      : null
                  }
                </Link>
              </div>
            </div>
          ))
        }
      </div>
      <div className="text-right flex-1">
        {
          data.length > 8
            ? (
              <Link
                href={`https://bgm.tv/subject/${subjectId}/characters`}
                size="sm"
                className="dark:text-blue-200 text-blue-400"
                isExternal
              >
                更多角色
              </Link>
            )
            : null
        }
      </div>
    </div>
  );
}
