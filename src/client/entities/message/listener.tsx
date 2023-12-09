import { PropsWithChildren, createContext, useEffect } from 'react';

import { MessageServerEvent } from '#/api/message';

import { useSocketContext } from '../../shared/socket-context';

const MessagesContextBase = createContext({});

export function MessagesListener({ children }: PropsWithChildren) {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket.on(MessageServerEvent.Created, data => {
      console.log('MESSAGE CREATED', data);
    });

    return () => {
      socket.off(MessageServerEvent.Created);
    };
  });

  return <MessagesContextBase.Provider value={{}}>{children}</MessagesContextBase.Provider>;
}
