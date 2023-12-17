import {
  GetViewerResponse,
  UpdateAvatarRequest,
  UpdateAvatarResponse,
  UpdateInfoRequest,
  UpdateInfoResponse,
} from '@lunaticenslaved/schema/dist/types/actions';

import { client } from '../client';

export const actions = {
  get: client.createAction<GetViewerResponse, void>({
    endpoint: 'chat-api',
    path: '/viewer/get',
  }),
  updateAvatar: client.createAction<UpdateAvatarResponse, UpdateAvatarRequest>({
    endpoint: 'chat-api',
    path: '/viewer/update-avatar',
  }),
  updateInfo: client.createAction<UpdateInfoResponse, UpdateInfoRequest>({
    endpoint: 'chat-api',
    path: '/viewer/update-info',
  }),
};
