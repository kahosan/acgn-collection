'use client';

import { motion } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';

export default function Summary({ summary }: { summary: string }) {
  const [showAll, setShowAll] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const scrollHeight = entry.target.scrollHeight;
        setShowButton(scrollHeight > 80);
      }
    });

    if (summaryRef.current)
      observer.observe(summaryRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        initial={{ maxHeight: '5rem' }}
        animate={{ maxHeight: showAll ? '80rem' : '5rem' }}
        className="text-sm overflow-hidden"
        ref={summaryRef}
      >
        {summary || '暂无'}
      </motion.div>
      <div className="text-right">
        {
          showButton
            ? (
              <span className="cursor-pointer text-sm dark:text-blue-200 text-blue-400" onClick={() => setShowAll(p => !p)}>
                {
                  showAll ? '显示部分' : '显示全部'
                }
              </span>
            )
            : null
        }
      </div>
    </>
  );
}
