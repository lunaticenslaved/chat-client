import { useMemo } from 'react';

import { Message } from '#/domain/message';

export type UseMessagesResponse = {
  messages: Message[] | undefined;
  isFetching: boolean;
  isError: boolean;
};

export function useMessages(): UseMessagesResponse {
  return useMemo(
    () => ({
      messages: [],
      isFetching: false,
      isError: false,
    }),
    [],
  );
}
