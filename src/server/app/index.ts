import { constants } from '@/shared';

import { createApp as createDevApp } from './app.dev';
import { createApp as createProdApp } from './app.prod';

export const createApp = constants.IS_DEV ? createDevApp : createProdApp;
