import { Link } from '@heroui/react';
import Image from 'next/image';

import { useAnitabi } from '~/lib/anitabi';

function formatSecsToTime(secs: number) {
  const minutes = Math.floor((secs % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (secs % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export default function Anitabi({ subjectId}: { subjectId: number }) {
  const { data, isLoading } = useAnitabi(subjectId);

  if (!data || isLoading) return null;

  return (
    <div className="bg-card">
      <div className="mb-2 dark:text-blue-200 text-blue-400">动画取景地标信息</div>
      <div>
        <div className="flex items-center justify-between *:text-sm mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <div>主要取景城市：<Link href={`https://anitabi.cn/map?bangumiId=${subjectId}`} size="sm" isExternal>{data.city}</Link></div>
          <div>共整理了 {data.pointsLength} 个地标、{data.imagesLength} 张截图</div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-3">
          {data.litePoints.map(point => (
            <div key={point.id}>
              <Link className="relative w-full min-h-24 mb-1" isExternal href={`https://www.anitabi.cn/map?bangumiId=${subjectId}&pid=${point.id}`}>
                <Image
                  src={point.image}
                  alt={point.name}
                  priority
                  fill
                  sizes="100%"
                  className="object-cover bg-center opacity-0 transition-all duration-300 rounded-md w-auto h-auto"
                  onLoad={e => { e.currentTarget.style.opacity = '1'; }}
                />
              </Link>
              <p className="text-sm line-clamp-1 leading-3.5">{point.cn ?? point.name}</p>
              <small className="opacity-60">
                {point.ep ? `EP${point.ep}` : ''}
                {' '}
                {point.s ? formatSecsToTime(point.s) : ''}
                {' '}
                {(!point.ep && !point.s) ? `坐标 ${point.geo.join(', ')}` : null}
              </small>
            </div>
          ))}
        </div>
        <div className="text-right w-full">
          <Link isExternal size="sm" href={`https://anitabi.cn/map?bangumiId=${subjectId}`}>前往巡礼地图</Link>
        </div>
      </div>
    </div>
  );
}
