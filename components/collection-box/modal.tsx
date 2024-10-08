import { Button, ButtonGroup, Checkbox, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Tab, Tabs, Textarea, Tooltip } from '@nextui-org/react';

import clsx from 'clsx';
import { useState } from 'react';

import { transformCollectionTypeToJSX } from '~/utils';

import type { UserCollection, UserCollectionModifyPayload } from '~/types/bangumi/collection';

interface Props {
  userCollection: UserCollection
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
  handleUpdate: (payload: UserCollectionModifyPayload, cb: () => void) => void
  isMutating: boolean
}

const ratingTexts = [
  '不忍直视',
  '很差',
  '差',
  '较差',
  '不过不失',
  '还行',
  '推荐',
  '力荐',
  '神作',
  '超神作'
];

export default function ModifyModal({ isOpen, onOpenChange, onClose, userCollection, handleUpdate, isMutating }: Props) {
  const [selected, setSelected] = useState(userCollection.type);
  const [isPrivate, setIsPrivate] = useState(userCollection.private);

  const [tags, setTags] = useState(userCollection.tags);
  const [comment, setComment] = useState(userCollection.comment ?? '');
  const [rating, setRating] = useState(userCollection.rate);

  const handleModify = () => handleUpdate({ comment, tags: tags.length ? tags : undefined, type: selected, private: isPrivate, rate: rating }, onClose);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} radius="sm" placement="center">
      <ModalContent>
        <ModalHeader>修改收藏</ModalHeader>
        <ModalBody>
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
                userCollection.subject_type
              )
            }
          </Tabs>

          <Divider />

          <div>
            <label className="text-sm">我的评价</label>
            <ButtonGroup
              className="grid grid-cols-10 mt-1.5"
              size="sm"
              variant="flat"
              isIconOnly
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(_rating => (
                <Tooltip key={_rating} content={ratingTexts[_rating - 1]}>
                  <Button
                    className={clsx('w-auto', rating === _rating && 'bg-primary text-white')}
                    value={rating}
                    onPress={() => setRating(_rating)}
                  >
                    {_rating}
                  </Button>
                </Tooltip>
              ))}
            </ButtonGroup>
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
            classNames={{
              input: 'h-[60px]'
            }}
            value={comment}
            onValueChange={v => setComment(v)}
          />

        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>返回</Button>
          <ButtonGroup color="primary">
            <Button onPress={handleModify} isLoading={isMutating} radius="sm">
              保存
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button isIconOnly variant="faded" radius="sm">
                  <div className="i-mdi-chevron-up" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Checkbox size="sm" isSelected={isPrivate} onValueChange={() => setIsPrivate(p => !p)}>
                  独属于我的 Moment
                </Checkbox>
              </PopoverContent>
            </Popover>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
