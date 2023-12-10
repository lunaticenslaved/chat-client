import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react';

import { Socket, io } from 'socket.io-client';

import { Token } from '#/client/shared/token';

interface ISocketContext {
  socket: Socket;
}

const SocketContextBase = createContext<ISocketContext>({} as ISocketContext);

interface SocketContextProps {
  children: ReactNode;
}

const socket = io({
  autoConnect: false,
  auth: {
    token: undefined,
  },
});

function updateToken(token: string | undefined) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (socket.auth as any).token = token;
}

// FIXME handle token expired
Token.listenTokenUpdate(updateToken);

socket.on('connect', () => {
  console.log('SOCKET CONNECTED');
});

export function SocketContext({ children }: SocketContextProps) {
  const value = useMemo((): ISocketContext => ({ socket }), []);

  useEffect(() => {
    // Need disconnect and connect with new token to update handshake
    updateToken(Token.get().token);
    socket.disconnect().connect();

    return () => {
      socket.close();
    };
  }, []);

  return <SocketContextBase.Provider value={value}>{children}</SocketContextBase.Provider>;
}

export function useSocketContext() {
  return useContext(SocketContextBase);
}
