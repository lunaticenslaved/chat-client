import { resolve } from 'path';

export const alias = {
  '@': resolve(__dirname, './src/client'),
  '@domain': resolve(__dirname, './src/domain'),
  '@store': resolve(__dirname, './src/store/index.ts'),
  '@api': resolve(__dirname, './src/api'),
};
