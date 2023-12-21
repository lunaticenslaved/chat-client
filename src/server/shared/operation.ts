import { Request, Response } from 'express';

import { Socket } from 'socket.io';

import { Errors, Models } from '@lunaticenslaved/schema';

import { AuthEventServer } from '#/api/auth/types';
import { RequestContext } from '#/server/context';
import { logger } from '#/server/shared/logger';

export interface IRequestContext {
  userId?: string;
  origin: string;
  token?: string;
  getUserIdStrict(): string;
}

export interface ISocketContext extends IRequestContext {
  socket: Socket;
}

export interface IRestContext<TResponse, TRequest> extends IRequestContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: Request<any, any, TRequest>;
  response: Response<Models.OperationResponse<TResponse | null>>;
}

export function createSocketOperationWithContext<TEventContext extends ISocketContext>() {
  return <TRequest>(fn: (args: TRequest, eventContext: TEventContext) => Promise<void>) => {
    return (eventContext: TEventContext, errorEvent: string) => {
      // FIXME: handle error in socket operation
      return async (data: TRequest) => {
        try {
          await fn(data, eventContext);
        } catch (error) {
          logger.error(errorEvent);

          // FIXME send errors only to required connections

          if (error instanceof Errors.TokenExpiredError) {
            eventContext.socket.emit(AuthEventServer.ExpiredToken);
          } else if (error instanceof Errors.TokenInvalidError) {
            eventContext.socket.emit(AuthEventServer.InvalidToken);
          } else {
            eventContext.socket.emit(errorEvent, { data: null, error });
          }
        }
      };
    };
  };
}

export type CreateOperationArg<TResponse, TRequest> = (
  data: TRequest,
  requestContext: RequestContext<TResponse, TRequest>,
) => Promise<TResponse> | TResponse;

export function createOperationWithContext() {
  return <TResponse, TRequest>(fn: CreateOperationArg<TResponse, TRequest>) => {
    return async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: Request<any, any, TRequest>,
      response: Response<Models.OperationResponse<TResponse | null>>,
    ) => {
      const requestContext = new RequestContext<TResponse, TRequest>({
        request,
        response,
        token: request.headers.authorization?.split(' ')[1],
        origin: request.headers.origin || '',
        userId: request.user?.id,
      });

      try {
        const result = await fn(request.body, requestContext);

        return response.status(200).json({ data: result || null, error: null });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        if (err instanceof Errors.ApiError) {
          const error = err as Errors.ApiError;

          return response.status(error.status).json({ data: null, error });
        } else {
          const error = err as Error;

          return response.status(500).json({
            data: null,
            error: new Errors.UnknownError({ messages: error.message, status: 500 }),
          });
        }
      }
    };
  };
}
