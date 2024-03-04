import { Button, ButtonGroup, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Tab, Tabs, Textarea } from '@nextui-org/react';

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

export default function ModifyModal({ isOpen, onOpenChange, onClose, userCollection, handleUpdate, isMutating }: Props) {
  const [selected, setSelected] = useState(userCollection.type);
  const [isPrivate, setIsPrivate] = useState(userCollection.private);

  const [tags, setTags] = useState(userCollection.tags);
  const [comment, setComment] = useState(userCollection.comment ?? '');

  const handleModify = () => handleUpdate({ comment, tags: tags.length ? tags : undefined, type: selected, private: isPrivate }, onClose);

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
