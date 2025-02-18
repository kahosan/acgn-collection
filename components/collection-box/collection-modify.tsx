import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from '@heroui/react';

import ModifyModal from './modal';

import { useUserCollectionModify } from '~/lib/bangumi/user';

import type { Subject } from '~/types/bangumi/subject';
import type { UserCollection, UserCollectionModifyPayload } from '~/types/bangumi/collection';

interface Props {
  subject: Subject
  userCollection: UserCollection
  userCollectionMutate: () => void
}

export default function CollectionModify({ subject, userCollection, userCollectionMutate }: Props) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { handleModify, isMutating } = useUserCollectionModify(subject.id);

  const handleUpdate = (payload: UserCollectionModifyPayload, cb: () => void) => {
    handleModify(payload, () => {
      userCollectionMutate();
      cb();
    });
  };

  return (
    <>
      <div>
        <ButtonGroup fullWidth radius="sm">
          <Button variant="faded" onPress={onOpen}>修改</Button>
          <Popover>
            <PopoverTrigger>
              <Button color="danger">删除</Button>
            </PopoverTrigger>
            <PopoverContent className="px-4">
              <div>API 没实现啦，呜呜呜</div>
              {/* <div>确定要删除收藏吗？</div>
          <Divider className="my-2" />
          <ButtonGroup size="sm" radius="sm" fullWidth>
            <Button color="primary" isLoading={isMutating}>确定</Button>
          </ButtonGroup> */}
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </div>

      <ModifyModal
        key={userCollection.type}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        userCollection={userCollection}
        handleUpdate={handleUpdate}
        isMutating={isMutating}
      />
    </>
  );
}
