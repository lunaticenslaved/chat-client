import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { io } from 'socket.io-client';

import { Token } from '@/shared/token';

interface ISocketContext {}

const SocketContextBase = createContext<ISocketContext>({});

interface SocketContextProps {
  children: ReactNode;
}

// FIXME handle token expired
function createSocket() {
  return io({
    auth: {
      token: Token.get().token,
    },
  });
}

export function SocketContext({ children }: SocketContextProps) {
  const [socket, setSocket] = useState(createSocket());

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
    socket.on('connect', () => {
      console.log('SOCKET CONNECTED');
    });

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <SocketContextBase.Provider value={{}}>{children}</SocketContextBase.Provider>;
}

export function useSocketContext() {
  return useContext(SocketContextBase);
}
