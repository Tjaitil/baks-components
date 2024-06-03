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
      '@baks': path.resolve(__dirname, './packages'),
      '@test': fileURLToPath(new URL('packages', import.meta.url))
    }
  }
});
