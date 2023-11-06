import { apiSlice } from "@/shared/api";
import { MessageModel } from "../store";

export const dialogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<MessageModel[], { dialogId: number }>({
      query: (body) => ({ url: "/messages", body }),
    }),
  }),
});

export const { useGetMessagesQuery } = dialogsApi;
