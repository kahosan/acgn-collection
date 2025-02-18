import type { Config } from 'tailwindcss';

import { heroui } from '@heroui/react';
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
  },
  darkMode: 'class',
  plugins: [heroui(), iconsPlugin({ collections: getIconCollections(['mdi']) })]
};
export default config;
