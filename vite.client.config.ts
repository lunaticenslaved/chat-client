import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsChecker from 'vite-plugin-checker';
import svgLoader from 'vite-plugin-svgr';

export default defineConfig({
  mode: process.env.NODE_ENV,
  build: {
    outDir: './dist/client',
  },
  server: {
    port: 5001,
    hmr: true,
    open: false,
  },
  plugins: [
    viteCommonjs(),
    react(),
    svgLoader(),
    tsChecker({
      typescript: {
        tsconfigPath: './src/client/tsconfig.json',
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
