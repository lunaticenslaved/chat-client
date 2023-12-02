import { Express } from 'express';

export const createRoutes = (fn: (app: Express) => void) => (app: Express) => {
  fn(app);
};
