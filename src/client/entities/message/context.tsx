import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { MessageEventsEmitter, MessageEventsListener, SendMessageRequest } from '#/api/message';
import { api } from '#/client/shared/api';
import { useToggle } from '#/client/shared/hooks';
import { useSocketContext } from '#/client/shared/socket-context';
import { Message } from '#/domain/message';

export interface IMessagesContext {
  messages: Message[];
  isLoadingMessages: boolean;
  isErrorWhileLoadingMessages: boolean;

  sendMessage(data: SendMessageRequest): void;
}

export type MessagesContextProps = {
  dialogId?: string;
  children?: ReactNode | ((value: IMessagesContext) => ReactNode | JSX.Element);
};

const Context = createContext<IMessagesContext | undefined>(undefined);

function Provider({ children, dialogId }: MessagesContextProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const loadingMessagesToggle = useToggle();
  const errorMessagesToggle = useToggle();

  const { socket } = useSocketContext();
  const messagesEmitter = useMemo(() => new MessageEventsEmitter(socket), [socket]);
  const messagesListener = useMemo(() => new MessageEventsListener(socket), [socket]);

  const value: IMessagesContext = useMemo(
    () => ({
      messages,
      isLoadingMessages: false,
      isErrorWhileLoadingMessages: false,

      sendMessage: messagesEmitter.sendMessage,
    }),
    [messagesEmitter, messages],
  );

  useEffect(() => {
    messagesListener.messageCreated(data => {
      console.log('MESSAGE CREATED', data);
    });
  }, [messagesListener]);

  useEffect(() => {
    if (!dialogId) return;

    console.log('LIST MESSAGES');

    loadingMessagesToggle.setTrue();
    errorMessagesToggle.setFalse();

    api.actions.message
      .list({
        data: { dialogId, take: 20 },
      })
      .then(({ messages }) => {
        setMessages(messages);
      })
      .catch(() => {
        errorMessagesToggle.setTrue();
      })
      .finally(() => {
        loadingMessagesToggle.setFalse();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogId]);

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  );
}

export function MessagesContext(props: MessagesContextProps) {
  const existingContext = useContext(Context);

  if (existingContext) {
    const { children } = props;

    return typeof children === 'function' ? children(existingContext) : children;
  }

  return <Provider {...props} />;
}

export function useMessagesContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('No messages context!');
  }

  return context;
}
