'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { tokenAtom } from '~/hooks/use-token';
import { useUser } from '~/hooks/use-user';

import {
  Avatar,
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
} from '@nextui-org/react';

import NextLink from 'next/link';
import ToggleTheme from './toggle-theme';
import HearderSearch from './search';

const navItems = {
  '/': '首页',
  '/timeline': '时间胶囊'
};

export default function Header() {
  const { data } = useUser();
  const setToken = useSetAtom(tokenAtom);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pn = usePathname();

  const logout = () => {
    setToken(null);
    router.push('/login');
  };

  if (pn === '/login') return null;

  return (
    <Navbar isMenuOpen={isOpen} onMenuOpenChange={setIsOpen} maxWidth="full" isBordered>

      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <h1 className="font-bold text-xl w-max text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-red-300">ACGN Collection</h1>
        {
          Object.entries(navItems).map(([path, name]) => (
            <NavbarItem
              key={path}
            >
              <Link as={NextLink} color="foreground" className="opacity-75 font-[500] mt-0.5" href={path}>{name}</Link>
            </NavbarItem>
          ))
        }
      </NavbarContent>

      <NavbarContent justify="end">
        <HearderSearch />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform min-w-max"
              color="danger"
              name={data?.username}
              src={data?.avatar.small ?? 'https://placehold.co/32x32'}
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownSection showDivider>
              <DropdownItem key="bangumi-home" as="a" href={`https://bgm.tv/user/${data?.username ?? ''}`} target="_blank">
                Bangumi 主页
              </DropdownItem>
              <DropdownItem
                isReadOnly
                key="theme"
                className="cursor-default"
                classNames={{ base: '!bg-inherit !text-inherit' }}
                endContent={
                  <ToggleTheme />
                }
              >
                主题
              </DropdownItem>
            </DropdownSection>
            <DropdownItem key="logout" color="danger" className="text-danger" onClick={logout}>
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
              onClick={() => setIsOpen(false)}
            >
              {name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

    </Navbar>
  );
}
