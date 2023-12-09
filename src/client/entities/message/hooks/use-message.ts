import { useMemo } from 'react';

import { MessageEventsEmitter, SendMessageRequest } from '#/api/message';
import { useSocketContext } from '#/client/shared/socket-context';

export type UseMessageResponse = {
  send(data: SendMessageRequest): void;
};

export function useMessage(): UseMessageResponse {
  const { socket } = useSocketContext();
  const emitter = useMemo(() => new MessageEventsEmitter(socket), [socket]);

  return useMemo(
    () => ({
      send: emitter.sendMessage,
    }),
    [emitter],
  );
}
