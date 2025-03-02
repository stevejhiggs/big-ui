import path from 'node:path';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    path.join(
      path.dirname(require.resolve("@repo/ui")),
      "**/*.{ts,tsx}"
    ),
  ],
};

export default config;
