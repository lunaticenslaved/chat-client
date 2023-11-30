import { useQuery } from 'react-query';

import { MessageAPI } from '../api';
import { MessageModel } from '../types';

export type UseMessagesResponse = {
  messages: MessageModel[] | undefined;
  isFetching: boolean;
  isError: boolean;
};

export function useMessages(): UseMessagesResponse {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['messages'],
    queryFn: MessageAPI.getMessages,
  });

  return {
    messages: data?.messages,
    isFetching,
    isError,
  };
}
