import { DialogModel } from './types';
import { API } from '@/shared/api';

export type GetDialogsResponse = {
  dialogs: DialogModel[];
};

export const DialogsAPI = {
  getDialogs() {
    return API.request<GetDialogsResponse>('/api/dialogs', {
      method: 'GET',
    });
  },
};
