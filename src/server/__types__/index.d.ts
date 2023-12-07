import { User } from '@lunaticenslaved/schema/models';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'dev' | 'prod';
      DATABASE_URL: string;
      PORT?: string;
      AUTH_API_URL?: string;
    }
  }
}

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
