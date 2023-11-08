import { useQuery } from "react-query";

import { MessageModel } from "../types";
import { MessageAPI } from "../api";

export type UseMessagesResponse = {
  messages: MessageModel[] | undefined;
  isFetching: boolean;
  isError: boolean;
};

export function useMessages(): UseMessagesResponse {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["messages"],
    queryFn: MessageAPI.getMessages,
  });

  return {
    messages: data?.messages,
    isFetching,
    isError,
  };
}
