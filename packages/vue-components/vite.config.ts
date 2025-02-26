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
      }
    }
  }
}));
