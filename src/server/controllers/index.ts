import { Express } from 'express';

import { Errors } from '@lunaticenslaved/schema';

import { addDialogsRoutes } from './dialogs';

export function addRoutes(app: Express) {
  addDialogsRoutes(app);

  app.use('/api/*', (_, response) => {
    response.status(404).json(
      new Errors.NotFoundError({
        messages: ['Resource not found for chat'],
        status: 400,
      }),
    );
  });
}
