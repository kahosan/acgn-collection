import {
  Button, ButtonGroup,
  Checkbox,
  Chip,
  Input,
  Textarea,
  Popover, PopoverContent, PopoverTrigger,
  Tab, Tabs
} from '@heroui/react';

import { useState } from 'react';

import { transformCollectionTypeToJSX } from '~/utils';

import { useUserCollectionModify } from '~/lib/bangumi/user';

import type { Subject } from '~/types/bangumi/subject';

interface Props {
  subject: Subject
  mutate: () => void
}

export default function UnCollection({ subject, mutate }: Props) {
  const [selected, setSelected] = useState<number>(1); // CollectionType - /types/bangumi/collection 查看详细定义
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState(false);

  const { handleModify, isMutating } = useUserCollectionModify(subject.id);

  const handleCollection = () => {
    handleModify({
      type: selected,
      tags: tags.length ? tags : undefined,
      comment,
      private: isPrivate
    }, () => mutate());
  };

  return (
    <div className="grid gap-4 sm:gap-2 h-full">

      <div>
        <div className="text-sm pb-1.5">社区评价</div>
        <div className="flex flex-row gap-2">
          <Chip radius="sm" color="secondary" startContent={<div className="p-2">排名</div>}>{subject.rating.rank}</Chip>
          <Chip radius="sm" color="primary" startContent={<div className="p-2">评分数</div>}>{subject.rating.total}</Chip>
          <Chip radius="sm" color="danger" startContent={<div className="p-2">用户评分</div>}>{subject.rating.score}</Chip>
        </div>
      </div>

      <div>
        <div className="text-small pb-1.5">收藏类型</div>
        <Tabs
          fullWidth
          selectedKey={selected.toString()}
          onSelectionChange={key => setSelected(Number.parseInt(key.toString(), 10))}
        >
          {
            transformCollectionTypeToJSX(
              (type, label) => (
                <Tab key={type} title={label} />
              ),
              subject.type
            )
          }
        </Tabs>
      </div>

      <Input
        label="标签"
        placeholder="请输入标签，以空格分隔"
        labelPlacement="outside"
        radius="sm"
        classNames={{
          mainWrapper: 'flex-auto'
        }}
        value={tags.join(' ')}
        onValueChange={v => setTags(v.split(' '))}
      />

      <Textarea
        label="吐槽"
        labelPlacement="outside"
        placeholder="喂，你对我的名字有什么看法的话不妨说来听听啊"
        maxRows={3}
        value={comment}
        onValueChange={v => setComment(v)}
        classNames={{
          input: 'h-[60px]'
        }}
      />

      <div className="self-end">
        <ButtonGroup fullWidth>
          <Button color="primary" onPress={handleCollection} isLoading={isMutating}>收藏</Button>
          <Popover>
            <PopoverTrigger>
              <Button variant="faded">私密</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Checkbox size="sm" isSelected={isPrivate} onValueChange={() => setIsPrivate(p => !p)}>
                独属于我的 Moment
              </Checkbox>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </div>

    </div>
  );
}
