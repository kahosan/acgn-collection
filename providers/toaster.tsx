import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

export default function ToasterProvider() {
  const { theme } = useTheme();
  return (
    <Toaster theme={theme as ('dark' | 'light' | 'system' | undefined)} />
  );
}
