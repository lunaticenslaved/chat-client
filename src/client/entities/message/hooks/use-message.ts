import { useCallback, useMemo } from 'react';

import { CreateMessageRequest, MessageEvent } from '@api/messages';

import { useSocketContext } from '@/shared/socket-context';

export type UseMessageResponse = {
  send(data: CreateMessageRequest): void;
};

export function useMessage(): UseMessageResponse {
  const { socket } = useSocketContext();

  const send: UseMessageResponse['send'] = useCallback(
    value => {
      console.log('SEND MESSAGE');

      socket.emit(MessageEvent.send, value);
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
