import { Input, Tab, Tabs } from '@nextui-org/react';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { transformSubjectTypeToJSX } from '~/utils';

import { SubjectType } from '~/types/bangumi/subjects';

interface Props {
  payload: { keyword: string, type: string, api: string }
}

export default function SearchBar({ payload }: Props) {
  const [keyword, setKeyword] = useState(payload.keyword);

  const router = useRouter();
  const handleSearch = useCallback((api: string, type = payload.type) => {
    router.push(`/search?keyword=${encodeURIComponent(keyword)}&type=${type}&api=${api}`);
  }, [keyword, payload.type, router]);

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <Tabs
          radius="sm"
          selectedKey={payload.api}
          onSelectionChange={key => {
            handleSearch(key.toString());
          }}
          classNames={{
            tab: 'sm:h-8 sm:text-small px-2 sm:px-3 h-7 text-tiny'
          }}
          aria-label="options"
        >
          <Tab key="new" title="V0" />
          <Tab key="legacy" title="Legacy" />
        </Tabs>
        <Input
          value={keyword}
          onValueChange={v => setKeyword(v)}
          onKeyUp={e => {
            if (e.key === 'Enter')
              handleSearch(payload.api);
          }}
          endContent={
            <div
              className="cursor-pointer i-mdi-magnify text-lg"
              onClick={() => handleSearch(payload.api)} />
          }
          radius="sm"
          labelPlacement="outside"
          className="max-w-xl hidden sm:flex"
        />
        <Tabs
          radius="sm"
          selectedKey={payload.type}
          onSelectionChange={key => {
            handleSearch(payload.api, key.toString());
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
