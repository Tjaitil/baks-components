import js from '@eslint/js';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.storybook/**',
      '**/coverage/**',
      // Config files - these often aren't part of the main TypeScript project
      '**/eslint.config.ts',
      '**/vite.config.ts',
      '**/vitest.config.ts',
      '**/vitest.workspace.ts',
      '**/postcss.config.js',
      // Root level config files
      'eslint.config.ts',
      'vite.config.ts',
      'vitest.config.ts',
      'vitest.workspace.ts',
      // Environment declaration files
      '**/env.d.ts',
      '**/css.d.ts'
    ]
  },
  ...defineConfigWithVueTs(
    {
      name: 'monorepo/files-to-lint',
      files: [
        'packages/**/src/**/*.{ts,mts,tsx,vue,js,jsx}',
        'packages/**/lib/**/*.{ts,mts,tsx,vue,ce.vue,js}',
        'packages-private/**/src/**/*.{ts,mts,tsx,vue,js}'
      ]
    },
    pluginVue.configs['flat/recommended'],
    vueTsConfigs.strictTypeChecked,
    skipFormatting,
    prettierRecommended,
    {
      rules: {
        'prettier/prettier': ['off']
      }
    }
  )
];
