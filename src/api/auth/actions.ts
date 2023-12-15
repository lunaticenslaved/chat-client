import {
  ActivateRequest,
  ActivateResponse,
  RefreshRequest,
  RefreshResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@lunaticenslaved/schema/dist/types/actions';

import { client } from '../client';

export const actions = {
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
  refresh: client.createAction<RefreshResponse, RefreshRequest>({
    endpoint: 'chat-api',
    path: '/auth/refresh',
  }),
  activate: client.createAction<ActivateResponse, ActivateRequest>({
    endpoint: 'chat-api',
    path: '/auth/activate',
  }),
  resendEmail: client.createAction({
    endpoint: 'chat-api',
    path: '/auth/resend-email',
  }),
};
