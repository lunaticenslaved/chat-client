import { SignInRequest, SignInResponse } from '@lunaticenslaved/schema/actions';

import { client } from './client';

export const actions = {
  auth: {
    signIn: client.createAction<SignInResponse, SignInRequest>({
      endpoint: 'chat-api',
      path: '/auth/sign-in',
    }),
  },
};
