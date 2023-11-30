import { Chip, Link } from '@nextui-org/react';
import { useMemo } from 'react';
import { useEpisodes } from '~/lib/bangumi/episodes';
import type { Episode } from '~/types/bangumi/episode';

interface Props {
  subjectId: number
}

export function TrackList({ subjectId }: Props) {
  const { data, isLoading, error } = useEpisodes({ subject_id: subjectId });

  const tracksObj = useMemo(() => {
    return data?.data.reduce<Record<number, Episode[]>>((obj, track) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ts
      if (!obj[track.disc]) obj[track.disc] = [];
      obj[track.disc].push(track);

      return obj;
    }, {});
  }, [data?.data]);

  if (error) throw error;
  if (!tracksObj || isLoading) return null;

  return (
    <div>
      {
        Object.entries(tracksObj).map(([disc, tracks]) => (
          <div key={disc} className="mb-6">
            <div className="opacity-70 min-h-[15px] text-sm mb-2 p-2 w-full rounded-md bg-slate-200 dark:bg-zinc-700">Disc：{disc}</div>
            <div className="flex flex-wrap items-center gap-3">
              {
                tracks
                  .sort((a, b) => a.name.length - b.name.length)
                  .map(track => (
                    <Chip
                      key={track.id}
                      variant="flat"
                      radius="sm"
                      size="sm"
                      startContent={<div className="i-mdi-music" />}
                      className="p-2 min-w-min"
                    >
                      <Link className="text-sm" color="foreground" href={`https://bgm.tv/ep/${track.id}`} isExternal>{track.name}</Link>
                    </Chip>
                  ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}
