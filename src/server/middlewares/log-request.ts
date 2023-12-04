import { NextFunction, Request, Response } from 'express';

import { logger } from '@/shared';

export async function logRequest(request: Request, _: Response, next: NextFunction) {
  logger.info(
    `[MIDDLEWARE] Log request:
  - method: ${request.method}
  - url: ${request.originalUrl}
  - headers: ${JSON.stringify(request.headers, null, 2)}`,
  );

  next();
}
