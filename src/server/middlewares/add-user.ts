import { NextFunction, Request, Response } from 'express';

import schema, { ResponseUtils } from '@lunaticenslaved/schema';

export async function addUser(request: Request, _: Response, next: NextFunction) {
  try {
    const { user } = await schema.actions.viewer
      .get({
        config: {
          headers: request.headers,
        },
      })
      .then(ResponseUtils.unwrapResponse);

    request.user = user || undefined;
  } catch (error) {
    console.log('Cannot get user from token');
  }

  next();
}
