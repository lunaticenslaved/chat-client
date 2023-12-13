import { NextFunction, Request, Response } from 'express';

import schema from '@lunaticenslaved/schema';

import { logger } from '#/server/shared';

export async function addUser(request: Request, _: Response, next: NextFunction) {
  try {
    const { user } = await schema.actions.auth.validateRequest({
      data: undefined,
      config: {
        headers: {
          Origin: request.headers.origin,
          Cookie: request.headers.cookie,
        },
      },
    });

    request.user = user;

    logger.info(`[MIDDLEWARE] [GET USER] User found:\n${JSON.stringify(user, null, 2)}`);
  } catch {
    logger.info(`[MIDDLEWARE] [GET USER] User not found`);
  }

  next();
}
