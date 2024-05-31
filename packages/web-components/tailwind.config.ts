import type { Config } from 'tailwindcss/types/config';

export default {
  content: [
    './lib/**/*.{js,jsx,ts,tsx,vue,ce.vue}',
    './src/**/*.{js,jsx,ts,tsx,vue,ce.vue}',
    './index.html'
  ],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config;
