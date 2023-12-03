import { SignInRequest, SignInResponse } from '@lunaticenslaved/schema/actions';
import { OperationResponse } from '@lunaticenslaved/schema/models';

import { client } from './client';

export const actions = {
  auth: {
    signIn: client.createAction<OperationResponse<SignInResponse>, SignInRequest>({
      endpoint: 'chat-api',
      method: 'POST',
      path: '/auth/sign-in',
    }),
  },
};
