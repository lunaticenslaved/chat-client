import { useCallback, useMemo } from 'react';

import { CreateMessageRequest, MessageClientEvent } from '#/api/message';
import { useSocketContext } from '#/client/shared/socket-context';

export type UseMessageResponse = {
  send(data: CreateMessageRequest): void;
};

export function useMessage(): UseMessageResponse {
  const { socket } = useSocketContext();

  const send: UseMessageResponse['send'] = useCallback(
    value => {
      socket.emit(MessageClientEvent.Send, value);
    },
    [socket],
  );

  return useMemo(
    () => ({
      send,
    }),
    [send],
  );
}
