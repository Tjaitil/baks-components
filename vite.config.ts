import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@shared': fileURLToPath(new URL('packages/shared/src', import.meta.url))
    }
  }
});