import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '时间胶囊'
};

export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
