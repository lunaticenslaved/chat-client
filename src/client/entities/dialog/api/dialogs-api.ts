import { Dialog } from '@common/models';

import { apiSlice } from '@/shared/api';

export const dialogsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDialogs: builder.query<Dialog[], void>({
      query: () => ({ url: '/my-dialogs' }),
    }),
  }),
});

export const { useGetDialogsQuery } = dialogsApi;
