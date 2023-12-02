import { NextFunction, Request, Response } from 'express';

import schema, { ResponseUtils } from '@lunaticenslaved/schema';

export async function addUser(request: Request, _: Response, next: NextFunction) {
  console.log('HEADERS\n', request.headers);

  try {
    const { user } = await schema.actions.viewer
      .get({
        token: request.headers['authorization'],
      })
      .then(res => {
        console.log('RESPONSE', res);

        return ResponseUtils.unwrapResponse(res);
      });

    request.user = user || undefined;
  } catch (error) {
    console.log('ERROR', error);
    console.log('Cannot get user from token');
  }

  next();
}
