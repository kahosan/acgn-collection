import { AnimatePresence } from 'framer-motion';

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence
      // initial={false}
      // mode="wait"
    >
      {children}
    </AnimatePresence>
  );
}
