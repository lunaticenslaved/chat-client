import {
  ActivateRequest,
  ActivateResponse,
  GetViewerResponse,
  RefreshRequest,
  RefreshResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@lunaticenslaved/schema/actions';

import { client } from './client';
import {
  ListDialogsRequest,
  ListDialogsResponse,
  SearchInChannelsRequest,
  SearchInChannelsResponse,
} from './types';

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
  },
  viewer: {
    get: client.createAction<GetViewerResponse, void>({
      endpoint: 'chat-api',
      path: '/viewer/get',
    }),
  },
  dialog: {
    list: client.createAction<ListDialogsResponse, ListDialogsRequest>({
      endpoint: 'chat-api',
      path: 'dialogs/list',
    }),
  },
  search: {
    inChannels: client.createAction<SearchInChannelsResponse, SearchInChannelsRequest>({
      endpoint: 'chat-api',
      path: 'search/in-channels',
    }),
  },
};
