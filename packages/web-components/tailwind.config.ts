import type { Config } from 'tailwindcss/types/config';

export default {
  content: [
    './lib/**/*.{js,jsx,ts,tsx,vue,ce.vue}',
    './src/**/*.{js,jsx,ts,tsx,vue,ce.vue}',
    './index.html',
    '../../node_modules/baks-components-vue/lib/components/**/*.{js,jsx,ts,tsx,vue,ce.vue}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config;
