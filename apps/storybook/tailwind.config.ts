import path from 'path';
import tailwindBase from '@repo/tailwind';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [tailwindBase],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    path.join(
      path.dirname(require.resolve("@repo/shadcn")),
      "**/*.{ts,tsx}"
    ),
  ],
};

export default config;
