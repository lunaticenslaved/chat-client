import { Request, Response } from 'express';

import { ParsedQs } from 'qs';

import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { IRestContext } from '#/server/shared/operation';

type RequestContextConstructor = {
  request: Request;
  response: Response;
  origin: string;
  userId?: string;
  token?: string;
};

export class RequestContext<TResponse = void, TRequest = void>
  implements IRestContext<TResponse, TRequest>
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: Request<any, any, TRequest, ParsedQs, Record<string, any>>;
  response: Response<OperationResponse<TResponse | null>>;
  userId?: string | undefined;
  origin: string;
  token?: string | undefined;

  constructor(data: RequestContextConstructor) {
    this.request = data.request;
    this.response = data.response;
    this.origin = data.origin;
    this.userId = data.userId;
    this.token = data.token;
  }

  getUserIdStrict(): string {
    if (!this.userId) {
      throw new Error('User id not found');
    }

    return this.userId;
  }
}
