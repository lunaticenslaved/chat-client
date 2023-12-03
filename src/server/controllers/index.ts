import { Express } from 'express';

import { Errors } from '@lunaticenslaved/schema';

import { addDialogsRoutes } from './dialogs';

export function addRoutes(app: Express) {
  addDialogsRoutes(app);

  // function addActions(path: string, value: unknown) {
  //   if (typeof value === 'function' && actions.isAction(value)) {
  //     app.use(path, async (req, res) => {
  //       const response = await value({
  //         data: req.body,
  //         config: {
  //           headers: req.headers,
  //         },
  //       });

  //       return res.send(response).status(200);
  //     });
  //   }

  //   if (typeof value === 'object') {
  //     const record = value as Record<string, unknown>;

  //     for (const key of Object.keys(record)) {
  //       addActions(`${path}/${key}`, record[key]);
  //     }
  //   }
  // }

  // addActions('/api', schema.actions);

  app.use('/api/*', (_, response) => {
    response.status(404).json(
      new Errors.NotFoundError({
        messages: ['Resource not found for chat'],
        status: 400,
      }),
    );
  });
}
