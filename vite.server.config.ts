import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgLoader from 'vite-plugin-svgr';

import { alias } from './vite.utils.config';

export default defineConfig({
  plugins: [react(), svgLoader()],
  mode: process.env.NODE_ENV,
  build: {
    outDir: 'dist/client/server',
    lib: {
      entry: resolve(__dirname, 'src/client/index.server.tsx'),
      fileName: 'index',
      name: 'Client',
      formats: ['umd'],
    },
  },
  resolve: {
    alias,
  },
});
