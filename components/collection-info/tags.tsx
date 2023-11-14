import { Chip } from '@nextui-org/react';

import { useState } from 'react';
import { match } from 'ts-pattern';

interface Props {
  tags: Array<{ name: string, count: number }>
}

export default function Tags({ tags }: Props) {
  const total = tags.length;

  const [count, setCount] = useState(20);

  const handleClick = () => setCount(total);
  return (
    <div className="flex flex-wrap gap-2">
      {
        tags.slice(0, count).map(tag => (
          <Chip
            key={tag.name}
            className="text-xs"
            color={
              match(tag.count)
                .returnType<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'>()
                .when(c => c >= 200, () => 'danger')
                .when(c => c >= 100, () => 'primary')
                .when(c => c >= 50, () => 'secondary')
                .otherwise(() => 'default')
            }
            variant="dot"
            size="sm"
            radius="sm"
          >
            {tag.name}
            <small> ({tag.count})</small>
          </Chip>
        ))
      }
      {
        total > 20 && count < total
          ? (
            <Chip
              className="text-xs cursor-pointer"
              variant="bordered"
              size="sm"
              radius="sm"
              onClick={handleClick}
            >
              加载更多
            </Chip>
          )
          : null
      }
    </div>
  );
}
