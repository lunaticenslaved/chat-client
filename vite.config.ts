import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsChecker from 'vite-plugin-checker';
import svgLoader from 'vite-plugin-svgr';

export default defineConfig({
  mode: process.env.NODE_ENV,
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5001,
    hmr: true,
    open: false,
  },
  plugins: [
    react(),
    svgLoader(),
    reactRefresh(),
    tsChecker({
      typescript: {
        tsconfigPath: './tsconfig.json',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
