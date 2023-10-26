import { Pagination as NextUIPagination } from '@nextui-org/react';

interface Props {
  total: number
  offset: number
  setOffset: (offset: number) => void
}

export default function Pagination({ total, offset, setOffset, ...props }: Props) {
  return (
    <NextUIPagination
      className="m-0 mt-2 flex justify-center"
      showControls
      total={Math.ceil(total / 8)}
      onChange={page => {
        setOffset(page === 1 ? 0 : (page * 8) - 8);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      page={offset / 8 + 1}
      {...props}
    />
  );
}
