import { Button, ButtonGroup, Checkbox, Input, Popover, PopoverContent, PopoverTrigger, Tab, Tabs, Textarea } from '@nextui-org/react';

import { useState } from 'react';

import { transformCollectionTypeToJSX } from '~/utils';

import { useAddUserCollection } from '~/lib/bangumi/user/collection-add';

import type { SubjectType } from '~/types/bangumi/subjects';

interface Props {
  subjectId: number
  subjectType: SubjectType
  mutate: () => void
}

export function UnCollection({ subjectId, subjectType, mutate }: Props) {
  const [selected, setSelected] = useState<number>(1); // CollectionType - /types/bangumi/collection 查看详细定义
  const [tags, setTags] = useState<string[]>();
  const [comment, setComment] = useState<string>();
  const [privateMode, setPrivateMode] = useState(false);

  const { handleAdd, isMutating } = useAddUserCollection({
    type: selected,
    tags,
    comment,
    private: privateMode
  }, subjectId);

  const handleCollection = async () => {
    await handleAdd();
    mutate();
  };

  return (
    <div className="grid gap-4 sm:gap-0 h-full">
      <div>
        <div className="text-small pb-1.5">收藏类型</div>
        <Tabs
          fullWidth
          selectedKey={selected.toString()}
          onSelectionChange={(key) => setSelected(Number.parseInt(key.toString(), 10))}
        >
          {
            transformCollectionTypeToJSX(
              (type, label) => (
                <Tab key={type} title={label} />
              ),
              subjectType
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
        value={tags?.join(' ')}
        onValueChange={v => setTags(v.split(' '))}
      />

      <Textarea label="吐槽" labelPlacement="outside" maxRows={3} value={comment} onValueChange={v => setComment(v)} />

      <div className="self-end">
        <ButtonGroup fullWidth>
          <Button onClick={handleCollection} isLoading={isMutating}>收藏</Button>
          <Popover>
            <PopoverTrigger>
              <Button variant="faded">私密</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Checkbox size="sm" isSelected={privateMode} onValueChange={() => setPrivateMode(p => !p)}>
                独属于我的 Moment
              </Checkbox>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </div>

    </div>
  );
}
