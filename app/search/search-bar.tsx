import { Input, Tab, Tabs } from '@heroui/react';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { transformSubjectTypeToJSX } from '~/utils';

import { SubjectType } from '~/types/bangumi/subject';

interface Props {
  payload: { keyword: string, type: string }
}

export default function SearchBar({ payload }: Props) {
  const [keyword, setKeyword] = useState(payload.keyword);

  const router = useRouter();
  const handleSearch = useCallback((type = payload.type) => {
    if (!keyword) {
      toast('请输入关键词');
      return;
    }

    router.push(`/search?keyword=${encodeURIComponent(keyword)}&type=${type}`);
  }, [keyword, payload.type, router]);

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          value={keyword}
          onValueChange={v => setKeyword(v)}
          onKeyUp={e => {
            if (e.key === 'Enter')
              handleSearch();
          }}
          endContent={
            <div
              className="cursor-pointer i-mdi-magnify text-lg"
              onClick={() => handleSearch()}
            />
          }
          radius="sm"
          labelPlacement="outside"
          className="max-w-xl hidden sm:flex"
        />
        <Tabs
          radius="sm"
          variant="light"
          selectedKey={payload.type}
          onSelectionChange={key => {
            handleSearch(key.toString());
          }}
          classNames={{
            tab: 'sm:h-8 sm:text-small px-2 sm:px-3 h-7 text-tiny'
          }}
          aria-label="options"
        >
          {
            transformSubjectTypeToJSX(type => (
              <Tab key={type} title={{ ...SubjectType, 7: '全部条目' }[type]} />
            ), { 7: '全部条目' })
          }
        </Tabs>
      </div>
      <div />
    </div>
  );
}
