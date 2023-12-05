import { Request, Response } from 'express';

import { Errors, Models } from '@lunaticenslaved/schema';

export type CreateOperationArg<TResponse, TRequest, TContext> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: Request<any, any, TRequest>,
  response: Response<Models.OperationResponse<TResponse | null>>,
  context: TContext,
) => Promise<TResponse> | TResponse;

export function createOperationWithContext<TContext>(context: TContext) {
  return <TResponse, TRequest>(fn: CreateOperationArg<TResponse, TRequest, TContext>) => {
    return async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: Request<any, any, TRequest>,
      response: Response<Models.OperationResponse<TResponse | null>>,
    ) => {
      try {
        const result = await fn(request, response, context);

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
