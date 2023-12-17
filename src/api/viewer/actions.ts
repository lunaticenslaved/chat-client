import {
  GetViewerResponse,
  UpdateAvatarRequest,
  UpdateAvatarResponse,
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
};
