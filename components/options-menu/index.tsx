import { Dropdown, DropdownTrigger, Button, DropdownMenu } from '@nextui-org/react';

interface Props {
  ariaLabel: string
  selectedKeys: string[]
  triggerContent: React.ReactNode
  endContent?: React.ReactNode
  children: React.JSX.Element[]
}

export default function OptionsMenu({ ariaLabel, selectedKeys, triggerContent, endContent, children }: Props) {
  return (
    <Dropdown
      radius="sm"
      classNames={{
        content: 'min-w-[6rem] text-center'
      }}
    >
      <DropdownTrigger>
        <Button
          radius="sm"
          variant="bordered"
          endContent={endContent}
          className="max-sm:px-unit-3 max-sm:min-w-unit-16 max-sm:h-unit-8 max-sm:text-tiny max-sm:gap-unit-2"
        >
          {triggerContent}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={ariaLabel}
        variant="light"
        selectedKeys={selectedKeys}
        selectionMode="single"
      >
        {children}
      </DropdownMenu>
    </Dropdown>
  );
}
