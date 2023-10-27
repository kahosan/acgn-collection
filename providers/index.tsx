/* eslint-disable react/no-children-prop -- */
'use client';

import React from 'react';

import { Provider as JotaiProvider } from 'jotai';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import AuthProvider from './auth';
import ToasterProvider from './toaster';
import TransitionProvider from './transition';

import { compose } from '~/utils';

export default function Providers({ children }: { children: React.ReactNode }) {
  return compose(
    children => <TransitionProvider children={children} />,
    children => <NextUIProvider children={children} />,
    children => <NextThemeProvider children={children} attribute="class" enableSystem />,
    children => <JotaiProvider children={children} />,
    children => <AuthProvider children={children} />,
    <>
      {children}
      <ToasterProvider />
    </>
  );
}
