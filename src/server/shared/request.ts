import { Request } from 'express';

import { Errors } from '@lunaticenslaved/schema';

export function getToken(req: Request, policy: 'strict'): string;
export function getToken(req: Request): string | undefined;
export function getToken(req: Request, policy?: 'strict'): string | undefined {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token && policy === 'strict') {
    throw new Errors.UnauthorizedError({ messages: 'Unknown token' });
  }

  return token;
}
