import { resolve } from 'path';

export const alias = {
  '#/domain': resolve(__dirname, './src/domain'),
  '#/store': resolve(__dirname, './src/store/index'),
  '#/api': resolve(__dirname, './src/api'),
  '#/client': resolve(__dirname, './src/client'),
  '#/shared': resolve(__dirname, './src/shared'),
};
