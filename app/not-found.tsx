'use client';

import Image from 'next/image';

import { useHitokoto } from '~/hooks/use-hitokoto';

export default function NotFound() {
  const musume = {
    1: '/musume/musume1.png',
    2: '/musume/musume2.png',
    3: '/musume/musume3.png',
    4: '/musume/musume4.png',
    5: '/musume/musume5.png',
    6: '/musume/musume6.png',
    7: '/musume/musume7.png'
  } as const;

  const key = Math.floor(Math.random() * 7) + 1 as keyof typeof musume;

  const { data } = useHitokoto();

  return (
    <>
      <title>404 Not Found</title>
      <div className="flex flex-col gap-3 justify-center items-center h-[65vh]">
        <Image
          alt="not found"
          src={musume[key]}
          width={64}
          height={64}
        />
        <p className="opacity-70">此页面不存在</p>
        <p className="opacity-60">{data?.hitokoto} —— {data?.from}</p>
      </div>
    </>
  );
}
