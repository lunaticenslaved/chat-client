import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { Socket, io } from 'socket.io-client';

import { Token } from '@/shared/token';

interface ISocketContext {
  socket: Socket;
}

const SocketContextBase = createContext<ISocketContext>({} as ISocketContext);

interface SocketContextProps {
  children: ReactNode;
}

// FIXME handle token expired
function createSocket() {
  const socket = io({
    auth: {
      token: Token.get().token,
    },
  });

  socket.on('connect', () => {
    console.log('SOCKET CONNECTED');
  });

  return socket;
}

export function SocketContext({ children }: SocketContextProps) {
  const [socket, setSocket] = useState(createSocket());
  const value = useMemo((): ISocketContext => ({ socket }), [socket]);

  useEffect(() => {
    function setNewToken() {
      setSocket(createSocket());
    }

    Token.listenTokenUpdate(setNewToken);

    return () => {
      Token.removeOnTokenUpdate(setNewToken);
    };
  }, []);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <SocketContextBase.Provider value={value}>{children}</SocketContextBase.Provider>;
}

export function useSocketContext() {
  return useContext(SocketContextBase);
}
