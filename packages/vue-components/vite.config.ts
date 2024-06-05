import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import rootConfig from '../../vite.config';

export default mergeConfig(rootConfig, defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    vue(),
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
