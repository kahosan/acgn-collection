import Image from 'next/image';
import { Chip, Divider, Link } from '@nextui-org/react';

import { useCharacters } from '~/lib/bangumi/subjects';

import { CharacterType } from '~/types/bangumi/character';
import { CharactersSkeleton } from './skeleton';

interface Props {
  subjectId: number
}

export default function Character({ subjectId }: Props) {
  const { data, isLoading, error } = useCharacters(subjectId);

  if (error) throw error;
  if (!data || isLoading)
    return <CharactersSkeleton />;

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {
          data
            .slice(0, 8)
            .filter(character => character.type === CharacterType.角色)
            .map(character => (
              <div key={character.id} className="flex gap-2 flex-1">
                <div className="relative rounded-md h-14 w-[3.5rem]">
                  <Image
                    src={character.images.grid || 'https://placehold.jp/56x56@3.webp'}
                    alt={character.name}
                    className="object-cover object-top transition-all opacity-20 duration-300 rounded-md"
                    priority
                    fill
                    sizes="100%"
                    onLoad={e => { e.currentTarget.style.opacity = '1'; }}
                  />
                </div>
                <div className="overflow-hidden">
                  <Link color="foreground" href={`https://bgm.tv/character/${character.id}`} isExternal>
                    <div className="w-[3.5rem] sm:w-[7rem] truncate text-sm">{character.name}</div>
                    <Chip
                      color={character.relation === '主角' ? 'danger' : 'default'}
                      className="text-xs rounded-sm ml-1 items-baseline opacity-60"
                      classNames={{
                        base: 'h-max',
                        content: 'p-0'
                      }}
                    >
                      {character.relation}
                    </Chip>
                  </Link>
                  <Divider className="my-1" />
                  <Link color="foreground" href={`https://bgm.tv/person/${character.actors.at(0)?.id ?? ''}`} isExternal>
                    <Chip
                      color="primary"
                      className="text-xs rounded-sm mr-1 opacity-40"
                      classNames={{
                        base: 'h-max',
                        content: 'p-0'
                      }}
                    >
                      CV
                    </Chip>
                    <small>{character.actors.at(0)?.name}</small>
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
