'use client';

import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@heroui/react';
import NextLink from 'next/link';

import HeaderSearch from './search';
import ToggleTheme from './toggle-theme';

import { clsx } from 'clsx';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import { useUser } from '~/hooks/use-user';
import { useNotify } from '~/lib/bangumi/user';

const navItems = {
  '/': '收藏',
  '/calendar': '每日放送',
  '/timeline': '时间胶囊'
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const { data } = useNotify();

  let notifyCount: number | string = data?.data.length ?? 0;
  notifyCount = (notifyCount > 99 ? '99+' : notifyCount);

  const pn = usePathname();

  if (pn.startsWith('/login')) return null;

  return (
    <Navbar isMenuOpen={isOpen} onMenuOpenChange={setIsOpen} maxWidth="full" isBordered>

      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <h1 className="font-bold text-xl w-max text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-red-300">ACGN Collection</h1>
        {
          Object.entries(navItems).map(([path, name]) => (
            <NavbarItem
              key={path}
            >
              <Link
                as={NextLink}
                isDisabled={pn === path}
                color="foreground"
                className={clsx('opacity-75 font-[500] mt-0.5', pn === path && 'opacity-100')}
                href={path}
              >
                {name}
              </Link>
            </NavbarItem>
          ))
        }
      </NavbarContent>

      <NavbarContent justify="end">
        <HeaderSearch />
        <Dropdown placement="bottom-end">
          <Badge
            color="danger"
            content={notifyCount}
            isInvisible={notifyCount === 0}
            classNames={{
              badge: 'text-xs'
            }}
          >
            <DropdownTrigger>
              <Avatar
                isBordered
                type="button"
                as="button"
                className="transition-transform min-w-max"
                color="danger"
                name={user?.username}
                src={user?.avatar.small ?? 'https://placehold.co/32x32'}
                size="sm"
              />
            </DropdownTrigger>
          </Badge>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownSection showDivider>
              <DropdownItem
                as="a"
                key="bangumi-home"
                href={`https://bgm.tv/user/${user?.username ?? ''}`}
                textValue="Bangumi 主页"
              >
                Bangumi 主页
              </DropdownItem>
              <DropdownItem
                as="a"
                key="bangumi-notify"
                href="https://bgm.tv/notify/all"
                textValue="Bangumi 通知"
              >
                <Badge
                  color="danger"
                  content="new"
                  size="sm"
                  isInvisible={notifyCount === 0}
                  shape="circle"
                  classNames={{
                    badge: 'right-[-20px]'
                  }}
                >
                  电波提醒
                </Badge>
              </DropdownItem>
              <DropdownItem
                isReadOnly
                key="theme"
                className="cursor-default"
                classNames={{ base: 'bg-inherit! text-inherit!' }}
                endContent={
                  <ToggleTheme />
                }
              >
                主题
              </DropdownItem>
            </DropdownSection>
            <DropdownItem key="logout" color="danger" className="text-danger" onPress={() => signOut()}>
              登出
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {Object.entries(navItems).map(([path, name]) => (
          <NavbarMenuItem key={path}>
            <Link
              as={NextLink}
              className="w-full"
              color={pn === path ? 'danger' : 'foreground'}
              href={path}
              size="lg"
              onPress={() => setIsOpen(false)}
            >
              {name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

    </Navbar>
  );
}
