import { apiSlice } from '@/shared/api';

import { DialogModel } from '../types';

export const dialogsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDialogs: builder.query<DialogModel[], void>({
      query: () => ({ url: '/my-dialogs' }),
    }),
  }),
});

export const { useGetDialogsQuery } = dialogsApi;
