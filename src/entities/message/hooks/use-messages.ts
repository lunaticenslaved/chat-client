import { useQuery } from "react-query";

import { MessageModel } from "../types";
import { MessageAPI } from "../api";

export type UseMessageResponse = {
  messages: MessageModel[] | undefined;
  isFetching: boolean;
};

export function useMessages(): UseMessageResponse {
  const { data, isFetching } = useQuery({
    queryKey: ["messages"],
    queryFn: MessageAPI.getMessages,
  });

  return {
    messages: data?.messages,
    isFetching,
  };
}
