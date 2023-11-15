'use client';

import { motion } from 'framer-motion';

import { useState } from 'react';

export default function Summary({ summary }: { summary: string }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <motion.div
        initial={{ maxHeight: '5rem' }}
        animate={{ maxHeight: showAll ? '80rem' : '5rem' }}
        className="text-sm overflow-hidden"
      >
        {summary || '暂无'}
      </motion.div>
      <div className="text-right">
        <span className="cursor-pointer text-sm dark:text-blue-200 text-blue-400" onClick={() => setShowAll(p => !p)}>
          {
            showAll ? '显示部分' : '显示全部'
          }
        </span>
      </div>
    </>
  );
}
