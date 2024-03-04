/* eslint-disable @eslint-react/no-children-prop -- */
'use client';

import { Provider as JotaiProvider } from 'jotai';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import AuthProvider from './auth';
import ToasterProvider from './toaster';
import TransitionProvider from './transition';

import { compose } from '~/utils';
import { useRouter } from 'next/navigation';

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return compose(
    children => <TransitionProvider children={children} />,
    // eslint-disable-next-line @typescript-eslint/unbound-method -- docs
    children => <NextUIProvider children={children} navigate={router.push} />,
    children => <NextThemeProvider children={children} attribute="class" enableSystem />,
    children => <JotaiProvider children={children} />,
    children => <AuthProvider children={children} />,
    <>
      {children}
      <ToasterProvider />
    </>
  );
}
