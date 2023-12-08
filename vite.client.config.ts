import resolveRollup from '@rollup/plugin-node-resolve';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsChecker from 'vite-plugin-checker';
import svgLoader from 'vite-plugin-svgr';

import { alias } from './vite.utils.config';

export default defineConfig({
  mode: process.env.NODE_ENV,
  build: {
    outDir: 'dist/client/client',
    rollupOptions: {
      plugins: [resolveRollup({ browser: true })],
    },
  },
  plugins: [
    react(),
    svgLoader(),
    tsChecker({
      typescript: {
        tsconfigPath: 'src/client/tsconfig.json',
      },
    }),
  ],
  resolve: {
    alias,
  },
});
