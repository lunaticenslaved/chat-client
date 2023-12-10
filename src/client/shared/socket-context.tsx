import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react';

import { Socket, io } from 'socket.io-client';

import schema from '@lunaticenslaved/schema';

import { AuthEventsListener } from '#/api/auth';
import { Token } from '#/client/shared/token';

interface ISocketContext {
  socket: Socket;
}

const SocketContextBase = createContext<ISocketContext>({} as ISocketContext);

interface SocketContextProps {
  children: ReactNode;
  isAuthorized: boolean;
  onTokenInvalid(): void;
}

const socket = io({
  withCredentials: false,
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

const authListener = new AuthEventsListener(socket);

export function SocketContext({ children, onTokenInvalid, isAuthorized }: SocketContextProps) {
  const value = useMemo((): ISocketContext => ({ socket }), []);

  useEffect(() => {
    if (!isAuthorized) {
      socket.disconnect();
    } else {
      // Need disconnect and connect with new token to update handshake
      updateToken(Token.get().token);
      socket.disconnect().connect();

      authListener.onTokenInvalid(() => {
        onTokenInvalid();
        socket.disconnect();
      });
      authListener.onTokenExpired(() => {
        schema.actions.auth.refresh().then(() => socket.disconnect().connect());
      });
    }

    return () => {
      socket.close();
    };
  }, [isAuthorized, onTokenInvalid]);

  return <SocketContextBase.Provider value={value}>{children}</SocketContextBase.Provider>;
}

export function useSocketContext() {
  return useContext(SocketContextBase);
}
