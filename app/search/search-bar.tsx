import { Input, Tab, Tabs } from '@nextui-org/react';

import { useState } from 'react';

import { transformSubjectTypeToJSX } from '~/utils';

import { SubjectType } from '~/types/bangumi/subjects';

interface Props {
  payload: { keyword: string, type: string }
  updateParams: (type: string, keyword: string) => void
}

export default function SearchBar({ payload, updateParams }: Props) {
  const [keyword, setKeyword] = useState(payload.keyword);

  const handleSearch = (type?: string) => updateParams(type ?? payload.type, keyword);
  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <Input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyUp={e => {
            if (e.key === 'Enter')
              handleSearch();
          }}
          endContent={
            <div
              className="cursor-pointer i-mdi-magnify text-lg"
              onClick={() => handleSearch()} />
          }
          className="max-w-xl hidden sm:block"
        />
        <Tabs
          selectedKey={payload.type}
          onSelectionChange={key => {
            handleSearch(key.toString());
          }}
          classNames={{
            tabList: 'rounded-medium',
            tab: 'sm:h-8 sm:text-small px-2 sm:px-3 h-7 text-tiny rounded-small',
            cursor: 'rounded-small'
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
