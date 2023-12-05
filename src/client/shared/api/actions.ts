import {
  ActivateRequest,
  ActivateResponse,
  GetViewerResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@lunaticenslaved/schema/actions';

import { client } from './client';
import { ListDialogRequest, ListDialogsResponse } from './types';

export const actions = {
  auth: {
    signIn: client.createAction<SignInResponse, SignInRequest>({
      endpoint: 'chat-api',
      path: '/auth/sign-in',
    }),
    signUp: client.createAction<SignUpResponse, SignUpRequest>({
      endpoint: 'chat-api',
      path: '/auth/sign-up',
    }),
    logout: client.createAction({
      endpoint: 'chat-api',
      path: '/auth/logout',
    }),
    activate: client.createAction<ActivateResponse, ActivateRequest>({
      endpoint: 'chat-api',
      path: '/auth/activate',
    }),
    resendEmail: client.createAction({
      endpoint: 'chat-api',
      path: '/auth/resend-email',
    }),
  },
  viewer: {
    get: client.createAction<GetViewerResponse, void>({
      endpoint: 'chat-api',
      path: '/viewer/get',
    }),
  },
  dialogs: {
    list: client.createAction<ListDialogsResponse, ListDialogRequest>({
      endpoint: 'chat-api',
      path: 'dialogs/list',
    }),
  },
};
