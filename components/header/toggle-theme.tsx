import { Select, SelectItem } from '@heroui/react';

import { useTheme } from 'next-themes';

export default function ToggleTheme() {
  const { setTheme, systemTheme, theme } = useTheme();

  return (
    <Select
      size="sm"
      variant="flat"
      placeholder="选择主题"
      aria-label="选择主题"
      labelPlacement="outside"
      className="max-w-[6rem]"
      selectionMode="single"
      selectedKeys={[theme ?? systemTheme ?? 'system']}
      disallowEmptySelection
      onChange={e => setTheme(e.target.value)}
    >
      <SelectItem key="system">系统</SelectItem>
      <SelectItem key="light">浅色</SelectItem>
      <SelectItem key="dark">深色</SelectItem>
    </Select>
  );
}
