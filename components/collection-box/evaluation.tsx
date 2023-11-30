import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import { Chip, Link, Divider } from '@nextui-org/react';

import type { UserCollection } from '~/types/bangumi/collection';
import type { Subject } from '~/types/bangumi/subject';

interface Props {
  userCollection: UserCollection
  subject: Subject
}

export default function Evaluation({ subject, userCollection }: Props) {
  return (
    <div>
      <div>
        <div className="text-sm pb-1.5">我的评价</div>
        <Rate
          className="[&_li.rc-rate-star-zero.rc-rate-star]:text-[#f8b0405c] [&_li.rc-rate-star.rc-rate-star-half]:text-[#f8b0405c]"
          value={userCollection.rate}
          count={10}
          character={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
          }
          disabled
          allowHalf
        />
      </div>

      <div className="mt-2">
        <div className="text-sm pb-1.5">社区评价</div>
        <div className="flex flex-row gap-2">
          <Chip radius="sm" color="secondary" startContent={<div className="p-2">排名</div>}>{subject.rating.rank}</Chip>
          <Chip radius="sm" color="primary" startContent={<div className="p-2">评分数</div>}>{subject.rating.total}</Chip>
          <Chip radius="sm" color="danger" startContent={<div className="p-2">用户评分</div>}>{subject.rating.score.toFixed(1)}</Chip>
        </div>
        <Divider className="mt-2.5 mb-1 max-w-[8rem]" />
        <Link href={`https://bgm.tv/subject/${subject.id}/stats`} isExternal showAnchorIcon size="sm">全站用户评价</Link>
      </div>
    </div>
  );
}
