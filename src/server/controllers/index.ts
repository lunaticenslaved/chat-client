import { Express } from 'express';

import _ from 'lodash';

import { Errors } from '@lunaticenslaved/schema';
import schema from '@lunaticenslaved/schema';

import { addDialogsRoutes } from './dialogs';

export function addRoutes(app: Express) {
  addDialogsRoutes(app);

  function addActions(path: string, value: unknown) {
    if (typeof value === 'function' && schema.actions.isAction(value)) {
      app.use(path, async (req, res) => {
        try {
          const { host: _host, ...headers } = req.headers;

          const response = await value(
            {
              data: req.body,
              config: { headers },
            },
            'raw',
          );

          res.setHeader('set-cookie', response.headers['set-cookie'] || []);

          return res.send(response.data).status(200);
        } catch (error) {
          return res.send({ error }).status(200);
        }
      });
    }

    if (typeof value === 'object') {
      const record = value as Record<string, unknown>;

      for (const key of Object.keys(record)) {
        addActions(`${path}/${_.kebabCase(key)}`, record[key]);
      }
    }
  }

  addActions('/api/auth', schema.actions.auth);

  app.use('/api/*', (_, response) => {
    response.status(404).json(
      new Errors.NotFoundError({
        messages: ['Resource not found for chat'],
        status: 400,
      }),
    );
  });
}
