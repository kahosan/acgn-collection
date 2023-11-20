import Providers from '~/providers';

import localFont from 'next/font/local';
import { Suspense } from 'react';

// TODO wait official fix
import { ScrollRestorer } from 'next-scroll-restorer';

import Header from '~/components/header';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'ACGN Collection',
  description: '使用 Bangumi API 的 ACGN 收藏夹',
  icons: 'https://unpkg.com/xfb/favicon/favicon.ico'
};

const harmonyOsSansSc = localFont({
  src: [
    {
      path: '../public/fonts/HarmonyOS_Sans_SC_Thin.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../public/fonts/HarmonyOS_Sans_SC_Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../public/fonts/HarmonyOS_Sans_SC_Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/HarmonyOS_Sans_SC_Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/HarmonyOS_Sans_SC_Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../public/fonts/HarmonyOS_Sans_SC_Black.woff2',
      weight: '900',
      style: 'normal'
    }
  ]
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={harmonyOsSansSc.className}>
        <Providers>
          <Header />
          <Suspense>
            <main className="max-w-8xl mx-auto py-4 px-6">
              {children}
              <ScrollRestorer />
            </main>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
