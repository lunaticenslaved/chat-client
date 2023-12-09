import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { MessageEventsEmitter, MessageEventsListener, SendMessageRequest } from '#/api/message';
import { useSocketContext } from '#/client/shared/socket-context';
import { Message } from '#/domain/message';

export interface IMessagesContext {
  messages: Message[];
  isLoadingMessages: boolean;
  isErrorWhileLoadingMessages: boolean;

  setMessages(messages: Message[]): void;
  sendMessage(data: SendMessageRequest): void;
}

export type MessagesContextProps = PropsWithChildren & {
  dialogId?: string;
};

const Context = createContext<IMessagesContext>({} as IMessagesContext);

function Provider({ children, dialogId }: MessagesContextProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const { socket } = useSocketContext();
  const messagesEmitter = useMemo(() => new MessageEventsEmitter(socket), [socket]);
  const messagesListener = useMemo(() => new MessageEventsListener(socket), [socket]);

  const value: IMessagesContext = useMemo(
    () => ({
      messages,
      isLoadingMessages: false,
      isErrorWhileLoadingMessages: false,

      setMessages,
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

    messagesEmitter.listMessages({ dialogId, take: 20 });
  }, [dialogId, messagesEmitter]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function MessagesContext(props: MessagesContextProps) {
  const existingContext = useMessagesContext();

  if (existingContext) {
    return props.children;
  }

  return <Provider {...props} />;
}

export function useMessagesContext() {
  const context = useContext(Context);

  return context;
}
