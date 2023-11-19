import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'

export default defineConfig({
  mode: process.env.NODE_ENV,
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    hmr: true,
    open: true
  },
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '#/': resolve(__dirname, './src'),
    },
  },
})
