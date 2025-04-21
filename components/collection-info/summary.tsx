'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Summary({ summary }: { summary: string }) {
  const [showAll, setShowAll] = useState(false);
  const [showButton, setShowButton] = useState(false);

  if (summary.length > 210 && !showButton)
    setShowButton(true);

  const initH = showButton ? '5.5em' : 'auto';

  return (
    <>
      <motion.div
        className="text-sm overflow-hidden"
        initial={{ height: initH }}
        animate={{ height: showAll ? 'auto' : initH }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {summary || '暂无'}
      </motion.div>
      <div className="text-right">
        {
          showButton
            ? (
              <span
                className="cursor-pointer text-sm dark:text-blue-200 text-blue-400"
                onClick={() => setShowAll(p => !p)}
              >
                {showAll ? '显示部分' : '显示全部'}
              </span>
            )
            : null
        }
      </div>
    </>
  );
}
