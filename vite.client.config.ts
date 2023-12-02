import resolveRollup from '@rollup/plugin-node-resolve';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsChecker from 'vite-plugin-checker';
import svgLoader from 'vite-plugin-svgr';

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
    alias: {
      '@': resolve(__dirname, './src/client'),
      '@common': resolve(__dirname, './src/common'),
    },
  },
});
