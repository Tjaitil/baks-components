import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import rootConfig from '../../vite.config';
import tailwindcss from '@tailwindcss/vite';

export default mergeConfig(rootConfig, defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url))
    }
  },
  build: {
    cssCodeSplit: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        entryFileNames(chunkInfo) {
          return `${chunkInfo.name}.js`;
        }
      },
      input: {
        'index': resolve(__dirname, 'lib/index.ts'),
        'themes/default.css': '@shared/css/themes/default.css',
      }
    }
  }
}));