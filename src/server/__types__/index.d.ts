import { User } from '@lunaticenslaved/schema/models';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'dev' | 'production';
      DATABASE_URL: string;
      PORT?: string;
    }
  }
}

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
