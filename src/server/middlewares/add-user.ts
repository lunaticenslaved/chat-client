import { NextFunction, Request, Response } from 'express';

import schema, { ResponseUtils } from '@lunaticenslaved/schema';

import { logger } from '@/shared';

export async function addUser(request: Request, _: Response, next: NextFunction) {
  const { host: _host, ...headers } = request.headers;

  try {
    const { user } = await schema.actions.viewer
      .get({ config: { headers } })
      .then(ResponseUtils.unwrapResponse);

    logger.info(`[MIDDLEWARE] [GET USER] User found:\n${JSON.stringify(user, null, 2)}`);

    request.user = user || undefined;
  } catch (error) {
    logger.info(`[MIDDLEWARE] [GET USER] User not found`);
  }

  next();
}
