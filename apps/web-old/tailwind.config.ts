import path from 'node:path';
import tailwindBase from '@repo/tailwind';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [tailwindBase],
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    path.join(
      path.dirname(require.resolve("@repo/shadcn")),
      "**/*.{ts,tsx}"
    ),
    path.join(
      path.dirname(require.resolve("@repo/auth")),
      "**/*.{ts,tsx}"
    ),
  ],
};

export default config;
