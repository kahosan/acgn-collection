import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '每日放送'
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
