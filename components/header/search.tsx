import { Divider, Input, Select, SelectItem } from '@nextui-org/react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { transformSubjectTypeToJSX } from '~/utils';

import { SubjectType } from '~/types/bangumi/subjects';

export default function HearderSearch() {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('7' /** all */);

  const router = useRouter();

  const handleSearch = () => {
    if (!keyword) return;
    router.push(`/search?keyword=${keyword}&type=${type}`);
  };

  return (
    <div className="flex min-w-[12rem] max-w-[14rem]">
      <Select
        radius="sm"
        placeholder="选择类型"
        aria-label="选择类型"
        labelPlacement="outside"
        className="max-w-[4rem]"
        classNames={{
          trigger: 'rounded-r-none dark:bg-default-500/20 bg-default-400/20 justify-center',
          innerWrapper: 'w-max',
          selectorIcon: 'hidden',
          popoverContent: 'w-max'
        }}
        selectionMode="single"
        selectedKeys={[type]}
        disallowEmptySelection
        onChange={e => {
          setType(e.target.value);
        }}
      >
        {
          transformSubjectTypeToJSX(type => (
            <SelectItem key={type} value={type} aria-label={SubjectType[type]}>
              {{ ...SubjectType, 7: '全部' }[type]}
            </SelectItem>
          ), { 7: '全部' })
        }
      </Select>
      <Divider orientation="vertical" />
      <Input
        onValueChange={v => setKeyword(v)}
        value={keyword}
        classNames={{
          base: 'max-w-full sm:max-w-[20rem] h-10',
          mainWrapper: 'h-full ',
          input: 'text-small',
          inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-l-none'
        }}
        placeholder="搜索条目..."
        size="sm"
        onKeyUp={e => {
          if (e.key === 'Enter')
            handleSearch();
        }}
        endContent={
          <div className="cursor-pointer i-mdi-magnify p-2" onClick={handleSearch} />
        }
      />
    </div>
  );
}
