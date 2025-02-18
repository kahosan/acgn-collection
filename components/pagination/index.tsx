import { Pagination as NextUIPagination } from '@heroui/react';

interface Props {
  total: number
  offset: number
  setOffset: (offset: number) => void
  limit: number
}

export default function Pagination({ total, offset, limit, setOffset, ...props }: Props) {
  return (
    <NextUIPagination
      className="m-0 mt-2 flex justify-center"
      showControls
      total={Math.ceil(total / limit)}
      onChange={page => {
        setOffset(page === 1 ? 0 : (page * limit) - limit);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      page={offset / limit + 1}
      {...props}
    />
  );
}
