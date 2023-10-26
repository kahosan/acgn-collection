import { Divider, Input, Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { SubjectType } from '~/types/subjects';
import { transformSubjectTypeToJSX } from '~/utils';

export default function HearderSearch() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState(SubjectType.动画);

  const router = useRouter();

  const handleSearch = () => {
    if (!query) return;
    router.push(`/search/${query}?type=${type}`);
  };

  return (
    <div className="flex min-w-[12rem]">
      <Select
        radius="sm"
        placeholder="选择类型"
        aria-label="选择类型"
        labelPlacement="outside"
        className="max-w-[3.5rem]"
        selectorIcon={<div />}
        classNames={{
          trigger: 'rounded-r-none dark:bg-default-500/20 bg-default-400/20',
          innerWrapper: 'w-max',
          popover: 'w-max'
        }}
        selectionMode="single"
        defaultSelectedKeys={[type.toString()]}
        disallowEmptySelection
        onChange={(e) => {
          setType(+e.target.value);
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
        onChange={e => setQuery(e.target.value)}
        value={query}
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
