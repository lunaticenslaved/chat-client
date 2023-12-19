import { Service } from '@lunaticenslaved/schema/dist/types/models';

export const PORT = Number(process.env.PORT) || 3000;
export const IS_DEV = process.env.APP_ENV === 'dev';
export const SERVICE: Service = 'chat';
