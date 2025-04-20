import { Link } from '@heroui/react';
import { Fragment, useMemo } from 'react';

import { useEpisodes } from '~/lib/bangumi/episodes';

import type { Episode } from '~/types/bangumi/episode';

interface Props {
  subjectId: number
}

export default function TrackList({ subjectId }: Props) {
  const { data, isLoading } = useEpisodes({ subject_id: subjectId });

  const tracksObj = useMemo(() => {
    return data?.data.reduce<Record<number, Episode[]>>((obj, track) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ts
      if (!obj[track.disc]) obj[track.disc] = [];
      obj[track.disc].push(track);

      return obj;
    }, {});
  }, [data?.data]);

  if (!tracksObj || isLoading) return null;

  return Object.entries(tracksObj).map(([disc, tracks]) => (
    <Fragment key={disc}>
      <div className="mb-4 opacity-70 min-h-[15px] text-sm p-2 w-full rounded-md bg-slate-200 dark:bg-zinc-700">Disc：{disc}</div>
      <div className="grid sm:grid-cols-2">
        {
          tracks
            .map(track => (
              <div key={track.id} className="mb-4 text-sm flex gap-2 items-center">
                <div className="i-mdi-music min-w-4 max-w-4" />
                <Link
                  className="text-sm line-clamp-1 pr-2"
                  color="foreground"
                  underline="hover"
                  href={`https://bgm.tv/ep/${track.id}`}
                  isExternal
                >
                  {track.name}
                </Link>
              </div>
            ))
        }
      </div>
    </Fragment>
  ));
}
