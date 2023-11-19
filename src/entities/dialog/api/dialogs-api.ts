import { DialogModel } from '../types';

import { apiSlice } from '@/shared/api';

export const dialogsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDialogs: builder.query<DialogModel[], void>({
      query: () => ({ url: '/my-dialogs' }),
    }),
  }),
});

export const { useGetDialogsQuery } = dialogsApi;
